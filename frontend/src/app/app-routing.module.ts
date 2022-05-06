import { ItsMatchComponent } from './components/templates/its-match/its-match.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { EventsComponent } from './components/events/events.component';
import { WebchatComponent } from './components/webchat/webchat.component';
import { TinderUIComponent } from './components/templates/tinder-ui/tinder-ui.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { DadosPessoaisComponent } from './components/dados-pessoais/dados-pessoais.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuardService } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'dados-pessoais', component: DadosPessoaisComponent, canActivate: [AuthGuardService] },
  { path: 'match', component: TinderUIComponent, canActivate: [AuthGuardService] },
  { path: 'chat', component: WebchatComponent, canActivate: [AuthGuardService] },
  { path: 'groups', component: GroupListComponent, canActivate: [AuthGuardService] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuardService] },
  { path: 'post', component: PostComponent },
  { path: 'itsmatch', component: ItsMatchComponent },

  //{ path: 'quem-somos', component: QuemSomosComponent },
  //{ path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
