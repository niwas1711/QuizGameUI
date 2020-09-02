import { Component, OnInit, Inject } from '@angular/core';
import { QuestionService } from '../../service/question.service';
import { Question } from '../../model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-showquestions',
  templateUrl: './showquestions.component.html',
  styleUrls: ['./showquestions.component.scss']
})
export class ShowquestionsComponent implements OnInit {

  questions: Question[] = [];
  displayedColumns: string[] = ['questionText', 'actionsColumn'];

  constructor(private questionService: QuestionService,
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("show questions ngoninit", this.data.game._id);
   // this.gameService.getGameById(this.data.game._id).subscribe(game => {
   //   console.log("show questions for game...", game);
      
    //  if(game){
        this.questionService.getQuestions(this.data.game._id, -1)
        .subscribe(questions => {
          this.questions = questions;
      //  });
    //  }
    });
   
  }

  deleteQuestion(event){
    console.log("Delete Question event", event);
    this.questionService.deleteQuestion(event).subscribe(data => 
      {
        console.log("deleted", data);
        this.questionService.getQuestions(this.data.game._id, -1)
        .subscribe(questions => {
          this.questions = questions;
        });
      },err => {
        console.log("err", err);
      });

  }

}
