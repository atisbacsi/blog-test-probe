import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommentService } from '../service/comment.service';
import { Comment } from '../domain/Comment';

@Component({
  selector: 'commenteditor',
  templateUrl: './commenteditor.component.html',
  styleUrls: ['./commenteditor.component.css']
})
export class CommenteditorComponent implements OnInit {

  private id: number = 0;
  private text: string;
  private origComment: Comment;
  private isEdited: boolean = false;
  private isNetworkError: boolean;
  private isSaving: boolean;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  @Input('content')
  set comment(comment: Comment){
    this.text = comment.body;
    this.origComment = comment;
  }

  @Output('save') emitterSave = new EventEmitter<string>();

  public save(){
    this.emitterSave.emit(this.text);
    this.isSaving = true;

    let newComment: Comment = Object.assign({}, this.origComment);
    newComment.body = this.text;

    this.commentService.saveComment(newComment).subscribe( {
      next: d=>{
        this.comment = d;
      }, 
      error: e =>{
        this.isSaving = false;
        this.isNetworkError = true;
        this.text = this.origComment.body;
      },
      complete: () => {
        this.isSaving = false;
        this.isEdited = false;
      }
    });

  }
  public cancel(): void {
    this.isEdited = false;
    this.isSaving = false;
    this.isNetworkError = false;
    this.text = this.origComment.body;
  }
}
