import { Component, Input } from '@angular/core';
import { Comment } from '../domain/comment';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'commentlist',
  templateUrl: './commentlist.component.html',
  styleUrls: ['./commentlist.component.css']
})
export class CommentlistComponent {

  private comments: Comment[] = [];
  showComments: boolean;
  constructor(private commentService: CommentService) { }
  

  @Input("post-id")
  set postId(postId: number){
    this.commentService.getCommentsByPost(postId).subscribe(d => {
      this.comments = d
    });
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  isCommentListNotEmpty(): boolean {
    return this.comments.length > 0;
  }
}
