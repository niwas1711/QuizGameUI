import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddcreatorsComponent } from '../addcreators/addcreators.component';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {
  displayedColumns: string[] = ['email'];
  users: User[] = [];
  creatorForm: FormGroup;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.creatorForm = this.fb.group({
      email: ['', Validators.required]
      }
    );
    this.authService.getUsersWithRole('creator').subscribe(users =>
      this.users = users);
  }

  addCreator(){
    const creatorDialogRef = this.dialog.open(AddcreatorsComponent, {

      width: "600px",
      height: "500px"
    });
  }

}
