import { Group } from './../webchat/group.model';
import { WebchatService } from './../webchat/webchat.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogComponent } from '../templates/dialog/dialog.component';
import { DialogService } from '../templates/dialog/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'description', 'action'];
  count = 0;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentUser: any;
  decoded: any;
  userId: any;

  constructor(private dialog: MatDialog, private dialogService: DialogService, private tokenStorage: TokenStorageService, private snackBar: MatSnackBar, private webchatService: WebchatService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
      this.userId = this.decoded.id;
    }
    this.getAllGroups();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllGroups();
      }
    })
  }

  getAllGroups() {
    this.dialogService.getGroup()
      .subscribe({
        next: (res) => {
          //var result = res.filter(g => !this.groups.includes(g.id));
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          this.showMessage("Erro listando os grupos")
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editGroup(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllGroups();
      }
    })
  }

  addGroupToUser(id: number) {
    this.dialogService.addUserInGroup(id, this.userId);
    this.showMessage("Usuário adicionado a grupo aberto");
    window.location.reload();
  }

  removeUserFromGroup(id: number) {
    this.dialogService.removeUserInGroup(id, this.userId);
    this.showMessage("Usuário foi removido do grupo");
    window.location.reload();
  }

  removeGroup(id: number) {
    this.dialogService.deleteGroup(id).subscribe({
      next: (res) => {
        this.showMessage("Grupo removido");
        this.getAllGroups();
      },
      error: () => {
        this.showMessage("Erro ao deletar grupo")
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
