import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../domain/comment';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  private commentData: Comment;
  private editable: boolean;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  @Input('commentData')
  set comment(data: Comment) {
    this.commentData = data;

    this.editable = this.commentData.email === 'Just@do.it';
  }

  public onSave(text: string) {
    this.commentData.body = text;
    this.commentService.saveComment(this.commentData).subscribe(d=>console.log(d));
  }

}
