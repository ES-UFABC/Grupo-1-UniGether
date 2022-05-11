import { DialogEventComponent } from './../templates/dialog-event/dialog-event.component';
import { Group } from './../webchat/group.model';
import { WebchatService } from './../webchat/webchat.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogService } from '../templates/dialog/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  hasClicked = false

  constructor(private dialog: MatDialog, private dialogService: DialogService, private tokenStorage: TokenStorageService, private snackBar: MatSnackBar, private webchatService: WebchatService) { }
  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogEventComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        // this.getAllGroups(this.userId);
      }
    })
  }

}
