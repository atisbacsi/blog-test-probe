import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommentService } from '../service/comment.service';
import { Comment } from '../domain/comment';

@Component({
  selector: 'commenteditor',
  templateUrl: './commenteditor.component.html',
  styleUrls: ['./commenteditor.component.css']
})
export class CommenteditorComponent implements OnInit {

  private origComment: Comment;
  private text: string;
  editedtext: string;


  isEditing: boolean;
  hasNetworkError: boolean;
  isSaving: boolean;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  @Input('content')
  set comment(comment: Comment){
    this.origComment = comment;
    this.text = comment.body;
    this.editedtext = this.text;
  }

  get comment(): Comment {
    return this.origComment;
  }

  public save(){
    this.isSaving = true;

    let newComment: Comment = Object.assign({}, this.comment);
    newComment.body = this.editedtext;

    this.commentService.saveComment(newComment).subscribe( {
      next: d=>{
        this.comment = d;
      }, 
      error: e =>{
        this.isSaving = false;
        this.hasNetworkError = true;
      },
      complete: () => {
        this.isSaving = false;
        this.isEditing = false;
      }
    });
    
  }
  public cancel(): void {
    this.isEditing = false;
    this.isSaving = false;
    this.hasNetworkError = false;
    this.editedtext = this.text;
  }
}
