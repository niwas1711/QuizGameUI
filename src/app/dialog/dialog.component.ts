import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Question } from '../model/question';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  gameForm: FormGroup;
  constructor(private service: QuestionService,
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({});
  }

  onSubmit(){
    let question = new Question();
    
    this.service.addQuestion(question);
    this.dialogRef.close();
  }
}
