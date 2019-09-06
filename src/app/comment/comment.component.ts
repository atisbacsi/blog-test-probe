import { Component, OnInit, Input, Optional } from '@angular/core';
import { Comment } from '../domain/comment';
import { Configuration } from '../service/configuration';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  private commentData: Comment;
  private editable: boolean;
  constructor(@Optional() private config: Configuration) { }

  ngOnInit() {
  }

  @Input('commentData')
  set comment(data: Comment) {
    this.commentData = data;

    this.editable = this.commentData.email === this.config.userEmail;
  }
}
