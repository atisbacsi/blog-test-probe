import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../domain/Comment';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  private commentData: Comment;
  constructor() { }

  ngOnInit() {
  }

  @Input('data')
  set comment(data: Comment) {
    this.commentData = data;
  }

}
