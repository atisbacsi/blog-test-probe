import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../domain/Comment';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'commentlist',
  templateUrl: './commentlist.component.html',
  styleUrls: ['./commentlist.component.css']
})
export class CommentlistComponent implements OnInit {

  private comments: Comment[] = [];
  private showComments: boolean;
  constructor(private commentService: CommentService) { 
    
  }
  
  ngOnInit() {
  }
  @Input("post-id")
  set postId(postId: number){
    this.commentService.getCommentsByPost(postId).subscribe(d => this.comments = d);
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  isCommentListEmpty(): boolean {
    return this.comments.length > 0;
  }
}
