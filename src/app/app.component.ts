import { Component } from '@angular/core';
import { PostService } from './service/post.service';
import { Post } from './domain/post';
import { CommentService } from './service/comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jjj';
  private posts: Post[];
  constructor(private postService: PostService, private commentService: CommentService) {
    
  }
  ngOnInit(){
    this.loadPosts();
  }

  loadPosts() : void {
    this.postService.getPosts().subscribe(p => this.posts = p);
  }

}
