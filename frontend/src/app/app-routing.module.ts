import { ChatComponent } from './components/chat/chat.component';
import { TinderUIComponent } from './components/templates/tinder-ui/tinder-ui.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { DadosPessoaisComponent } from './components/dados-pessoais/dados-pessoais.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dados-pessoais', component: DadosPessoaisComponent },
  { path: 'match', component: TinderUIComponent },
  { path: 'chat', component: ChatComponent },
  //{ path: 'user',component:}
  //{ path: 'quem-somos', component: QuemSomosComponent },
  //{ path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
