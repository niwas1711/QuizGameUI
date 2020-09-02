import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game, GameStatus } from '../model/game';
import { GameService } from '../service/game.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.scss']
})
export class AddgameComponent implements OnInit {

  game: Game;
  gameForm: FormGroup;
  editMode: boolean = false;
  questionCounts: number[] = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  minDate = Date.now();
  stepHour: boolean = true;
  stepMinute: boolean = true;
  disableMinute: boolean = false;
  title = "Add";
  hideTime: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private gameService: GameService,
    private dialogRef: MatDialogRef<AddgameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.title = "Edit";
      this.editMode = true;
    }
    this.createForm();
  }

  cancelDialog() {
    console.log("Cancel Dialog");
    this.dialogRef.close();
  }
  createForm() {
    if(this.data){
      console.log("this.data.start", new Date(this.data.game.start));
    }
    
    this.gameForm = this.formBuilder.group({
      gameName: [this.data ? this.data.game.gameName : '', Validators.required],
      start: [this.data ? new Date(this.data.game.start) : '', Validators.required],
      end: [this.data ? new Date(this.data.game.end) : '', Validators.required],
      status: [this.data ? this.data.game.status : '0'],
      questionCount: [this.data ? this.data.game.questionCount : 10, Validators.required]
    });
  }

  onSubmit() {
    console.log("Submit addgame", this.gameForm.value);
    if (!this.editMode) {
      this.gameService.addGame(this.gameForm.value).subscribe(result => {
        console.log("game added", result);
        this.dialogRef.close();
      });
    } else {
      this.gameService.updateGame(this.gameForm.value, this.data.game._id).subscribe(result => {
        console.log("game added", result);
        this.dialogRef.close();
      });
    }


  }

}
