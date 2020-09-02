import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { AddQuestionComponent } from './questions/add/addquestion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { InviteComponent } from './questions/invite/invite/invite.component';
import { HomeComponent } from './home/home.component';
import { AddgameComponent } from './addgame/addgame.component';
import { AuthGuard } from './auth/auth.guard';
import { Role } from './model/role';
import { ShowquestionsComponent } from './questions/showquestions/showquestions.component';
import { CreatorsComponent } from './admin/creators/creators.component';
import { AddcreatorsComponent } from './admin/addcreators/addcreators.component';


const routes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]

},
{
  path:'invite/:id',
  component: InviteComponent,
  canActivate: [AuthGuard]
},
{
  path: 'questions/:id',
  component: QuestionsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'questions/show',
  component: ShowquestionsComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.Creater] }
},
{
  path: 'admin/creators',
  component: CreatorsComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin] }
},
{
  path: 'admin/creators/add',
  component: AddcreatorsComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin] }
},
{
  path: 'questions/add/:id',
  component: AddQuestionComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.Creater] }
},
{
  path: 'games/add',
  component: AddgameComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.Creater] }
},
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
