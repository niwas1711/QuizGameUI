import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsComponent } from './questions/questions.component';
import { AddQuestionComponent } from './questions/add/addquestion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { InviteComponent } from './questions/invite/invite/invite.component';
import { HomeComponent } from './home/home.component';
import { AddgameComponent } from './addgame/addgame.component';
import { AddcreatorsComponent } from './admin/addcreators/addcreators.component';
import { ShowquestionsComponent } from './questions/showquestions/showquestions.component';
import { CreatorsComponent } from './admin/creators/creators.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    AppComponent,
    QuestionsComponent,
    AddQuestionComponent,
    DashboardComponent,
    LoginComponent,
    InviteComponent,
    HomeComponent,
    AddgameComponent,
    ShowquestionsComponent,
    AddcreatorsComponent,
    CreatorsComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatProgressBarModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
