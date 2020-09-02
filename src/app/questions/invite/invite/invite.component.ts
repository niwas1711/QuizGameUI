import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { QuestionService } from '../../../service/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ScoreService } from '../../../service/score.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Score } from '../../../model/score';
import { User } from 'src/app/model';
import { InviteService } from 'src/app/service/invite.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  ctlUsers: string[]; 
  visible = true;
  selectable = true;
  removable = true;
  score: any;
  separatorKeysCodes: number[] = [ENTER, COMMA]
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  invitees: string[] = [];
  gameIdPassed: string;
  timer: string;
  email: string;
  allUsers: User[];
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
/*get friendsArray(): FormArray { 
  return this.inviteForm.get('friendsArray') as FormArray; 
}*/

  constructor(private fb: FormBuilder,
            public scoreService: ScoreService,
            private authService: AuthService,
            private inviteService: InviteService,
            private router: Router,
            private activatedRoute: ActivatedRoute) {
    
           this.authService.getUsers().subscribe(data =>{
             console.log("users = ", data);
             this.allUsers = data;
             this.ctlUsers = this.allUsers.map( el => el.email); 
             this.filteredUsers = this.userCtrl.valueChanges.pipe(
              startWith(null),
              map((user: string | null) => user ? this._filter(user) : this.ctlUsers.slice()));
           });
          
         
   }

  ngOnInit(): void {
    this.gameIdPassed = this.activatedRoute.snapshot.params.id;
    this.email = this.authService.currentUserValue.email;

    this.scoreService.getMyScore(this.email, this.gameIdPassed).subscribe(
      data => {
        console.log("gameScores =", data, data.score);
        this.score = data.score;
        this.timer = data.timeTaken;
      }
    );
   /* this.inviteForm = this.fb.group({
      friends: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      });  
    this.sub = this.categoryService.getCategories()
                   .subscribe(categories => this.categories = categories);*/

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our user
    if ((value || '').trim()) {
      this.invitees.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.invitees.indexOf(user);

    if (index >= 0) {
      this.invitees.splice(index, 1);
    }
  }
 /* addFriend() {
    let friend = this.inviteForm.get('friends').value;
    console.log("friend added", friend);
    if (friend) {
      if (this.enteredFriends.indexOf(friend) < 0)
        this.enteredFriends.push(friend);
      this.inviteForm.get('friends').setValue('');
    }
    this.setFriendsArray();
  }
  removeEnteredFriend(friend) {
    this.enteredFriends = this.enteredFriends.filter(t => t !== friend); 
    this.setFriendsArray();
  }*/

  /*setFriendsArray() {
    this.friendsArray.controls = [];
    [ ...this.enteredFriends].forEach(friend => this.friendsArray.push(new FormControl(friend)));
  }*/

  selected(event: MatAutocompleteSelectedEvent): void {
    this.invitees.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ctlUsers.filter(user => user.toLowerCase().indexOf(filterValue) === 0);
  }

  onInviteSubmit(){
    
    //remove duplicates

    let uniqueUsers = this.invitees.filter((item, i, ar) => ar.indexOf(item) === i);
    console.log("Invitees", uniqueUsers);
    if(uniqueUsers.length > 0){
      this.inviteService.sendEmail(this.email, uniqueUsers).subscribe(data =>
        {
          console.log(data);
          this.router.navigate(['/dashboard']);
        },err =>{
          console.log("error", err);
          this.router.navigate(['/dashboard']);
        });
    } else {
      alert ("Please invite your friends to play the game !!!!");
    }
   
  }

}
