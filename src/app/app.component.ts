import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { QuestionService } from './service/question.service';
import { Role } from './model/role';
import { first } from 'rxjs/operators';
import { QuestionsComponent } from './questions/questions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Centurylink Trivia';
  user: User = null;
  isCreator: boolean = true;

  constructor(private dialog: MatDialog,
            private authService: AuthService,
            private router: Router,
            private questionService: QuestionService){
   
  }
  
  login(){
    const passwordAuthDialogRef = this.dialog.open(LoginComponent, {
      disableClose: false,
      width: "600px",
      height: "500px"
    });
    

    passwordAuthDialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.authService.login(data.email, data.password).pipe(first()).subscribe(
          loginData => {
            console.log("Login Data", loginData);
            if (loginData){
              this.router.navigate(['/dashboard']);
              console.log("signin", loginData);
            }else {
              const passwordAuthDialogRef = this.dialog.open(LoginComponent, {
                disableClose: false,
                width: "600px",
                height: "500px"
              });
            }
            
             /* this.authService.currentUser.subscribe(x => {
              console.log("ngInit", this.user);
              this.user = x
              this.isCreator = this.authService.getCurrentUser().role === Role.Creater;
              console.log("appcomponent isCreator", this.isCreator);*/
              
             //}
             // ); 
           
        },
        error => {
          console.log("Error in login");
          this.router.navigate(['/login']);
         // this.error = error;
         // this.loading = false;
      });
      }
     );    
    
  }
  ngOnInit() {
    console.log("Inside ngOninit");
    this.authService.currentUser.subscribe(x => {
      console.log("Inside currentuser", x);
      this.user = x;
      if (this.user){
        console.log("Inside currentuser", this.user.role);
        this.isCreator = this.user.role === Role.Creater;
      }
    });
   
  }

  logout(){
    this.authService.logout();
    clearInterval(this.questionService.timer);
    this.router.navigateByUrl('/home');
  }
}
