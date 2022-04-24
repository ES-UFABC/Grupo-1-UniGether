import { NgModule } from '@angular/core';
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
    MatSortModule
  ],
  providers: [authInterceptorProviders, { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
