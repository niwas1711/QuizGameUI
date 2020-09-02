import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-addcreators',
  templateUrl: './addcreators.component.html',
  styleUrls: ['./addcreators.component.scss']
})
export class AddcreatorsComponent implements OnInit {
  creatorForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService) { 
    }

  ngOnInit(): void {
    this.creatorForm = this.fb.group({
      email: ['',[Validators.required]],

      }
    );
  }

  onSubmit(){
    this.authService.upgradeToCreator(this.creatorForm.value.email);
  }

}
