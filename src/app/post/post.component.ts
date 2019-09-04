import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../domain/Post';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private postData: Post;
  constructor() { }

  ngOnInit() {
  }

  @Input('postData')
  set post(data: Post) {
    this.postData = data;
  }
}
