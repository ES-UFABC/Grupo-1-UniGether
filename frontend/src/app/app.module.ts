import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { AuthGuardService } from './services/auth.guard'

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { DadosPessoaisComponent } from './components/dados-pessoais/dados-pessoais.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { TinderUIComponent } from './components/templates/tinder-ui/tinder-ui.component';
import { BottomDeleteComponent } from './components/templates/bottom-delete/bottom-delete.component';
import { ChatComponent } from './components/chat/chat.component';
import { WebchatComponent } from './components/webchat/webchat.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { EventsComponent } from './components/events/events.component';
import { DialogComponent } from './components/templates/dialog/dialog.component';
import { PostComponent } from './components/post/post.component';
import { ItsMatchComponent } from './components/templates/its-match/its-match.component';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { DialogEventComponent } from './components/templates/dialog-event/dialog-event.component';

declare var Hammer: any;

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { enable: true, direction: Hammer.DIRECTION_HORIZONTAL },
    pan: { enable: true, direction: Hammer.DIRECTION_VERTICAL },
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    CadastroComponent,
    DadosPessoaisComponent,
    ProfileComponent,
    TinderUIComponent,
    BottomDeleteComponent,
    ChatComponent,
    WebchatComponent,
    GroupListComponent,
    EventsComponent,
    DialogComponent,
    PostComponent,
    ItsMatchComponent,
    DialogEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    HammerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, authInterceptorProviders, AuthGuardService, { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
