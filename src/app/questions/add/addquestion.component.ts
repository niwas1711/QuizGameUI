import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';


import { User, Question, QuestionStatus, Answer }     from '../../model';
import { debounceTime } from 'rxjs/operators';
import { QuestionService } from '../../service/question.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.scss']
})
export class AddQuestionComponent implements OnInit {

  questionForm: FormGroup;
  question: Question;

  user: User;
  gameId: string = '';
  questionCount: number = 0;
  questionCountInDB: number = 0;
  get answers(): FormArray { 
    return this.questionForm.get('answers') as FormArray; 
  }

  //Constructor
  constructor(private fb: FormBuilder,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private dialogref: MatDialogRef<AddQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  //Lifecycle hooks
  ngOnInit() {
    this.question = new Question();
    this.createForm(this.question);
    this.gameId = this.data.game._id;
    this.questionCount = this.data.game.questionCount;
    console.log("gameId", this.gameId);
    let questionControl = this.questionForm.get('questionText');
  }

  ngOnDestroy() {

  }


  onSubmit() {
    //validations
    this.questionForm.updateValueAndValidity();
    if (this.questionForm.invalid)
      return;

    let question: Question = this.getQuestionFromFormValue(this.questionForm.value);
    question.gameId = this.gameId;
    this.saveQuestion(question);
  }
  
  //Helper functions
  getQuestionFromFormValue(formValue: any): Question {
    let question: Question;

    question = new Question();
    question.questionText = formValue.questionText;
    question.answers = formValue.answers;

    return question;
  }

  saveQuestion(question: Question) {
   console.log("Save Question", question, this.questionCountInDB, this.questionCount, this.gameId);
   question.gameId = this.gameId;
   this.questionService.addQuestion(question).subscribe(result =>
    {
      this.dialogref.close();
    });
   
  }

  createForm(question: Question) {

    let fgs:FormGroup[] = question.answers.map(answer => {
      let fg = new FormGroup({
        answerText: new FormControl(answer.answerText, Validators.required),
        correct: new FormControl(answer.correct),
      });
      return fg;
    });
    let answersFA = new FormArray(fgs);

    this.questionForm = this.fb.group({
      questionText: [question.questionText, Validators.required],
      answers: answersFA,
      }, {validator: questionFormValidator}
    );
  }
  

}



//Custom Validators
function questionFormValidator(fg: FormGroup): {[key: string]: boolean} {
  let answers: Answer[] = fg.get('answers').value;
  if (answers.filter(answer => answer.correct).length !== 1)
    return {'correctAnswerCountInvalid': true}
}
