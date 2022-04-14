import { DadosPessoais } from './../../dados-pessoais/dados-pessoais.model';
import { CadastroService } from './../../cadastro/cadastro.service';
import { Component, ViewChildren, QueryList, ElementRef, EventEmitter, Output, Renderer2, OnInit, Input } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Swipe } from './swipe.model';

@Component({
  selector: 'tinder-ui',
  templateUrl: 'tinder-ui.component.html',
  styleUrls: ['tinder-ui.component.css'],
})
export class TinderUIComponent implements OnInit {

  @Input('users') users: DadosPessoais[];

  @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef>;
  tinderCardsArray: Array<ElementRef>;

  @Output() choiceMade = new EventEmitter();

  base_url: string = "http://localhost:8080/avatars/file"

  moveOutWidth: number;
  shiftRequired: boolean;
  transitionInProgress: boolean;
  heartVisible: boolean;
  crossVisible: boolean;

  cadastro = new DadosPessoais();
  currentUser: any;
  decoded: any;
  userLogged: any;

  swipe = new Swipe();

  constructor(private renderer: Renderer2, private cadastroService: CadastroService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();
      var tokenDec = this.currentUser.token;
      this.decoded = jwt_decode(tokenDec);
      this.cadastroService.readById(this.decoded.id).subscribe(cadastro => {
        this.cadastro = cadastro;
        this.userLogged = cadastro.id;
        this.swipe.user_id1 = cadastro.id;
      });
      this.cadastroService.readUsers().subscribe((res: DadosPessoais[]) => {
        res = res.filter(x => x.id != this.userLogged);
        this.users = res;
      })
    }
  }

  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.users.length) return false;
    if (heart) {
      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)');
      this.toggleChoiceIndicator(false, true);
      this.emitChoice(heart, this.users[0]);
      this.swipe.status = true;
    } else {
      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)');
      this.toggleChoiceIndicator(true, false);
      this.emitChoice(heart, this.users[0]);
      this.swipe.status = false;
    };
    this.shiftRequired = true;
    this.transitionInProgress = true;
  };

  handlePan(event) {
    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.users.length) return;

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) {
      this.toggleChoiceIndicator(false, true)
      this.swipe.status = true;
    }
    if (event.deltaX < 0) {
      this.toggleChoiceIndicator(true, false)
      this.swipe.status = false;
    }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)');

    this.shiftRequired = true;

  };

  handlePanEnd(event) {

    this.toggleChoiceIndicator(false, false);

    if (!this.users.length) return;

    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {

      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', '');
      this.shiftRequired = false;

    } else {

      let endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)');

      this.shiftRequired = true;

      this.emitChoice(!!(event.deltaX > 0), this.users[0]);
    }
    this.transitionInProgress = true;
  };

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  };

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false)
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.users.shift();
    };
  };

  emitChoice(heart, card) {
    this.choiceMade.emit({
      choice: heart,
      payload: card
    })
  };

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
    })
  };

}
