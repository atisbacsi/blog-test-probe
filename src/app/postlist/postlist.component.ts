import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../domain/Post';

@Component({
  selector: 'postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {

  @Input("posts")
  public posts: Post[] = [];
  constructor() { }

  ngOnInit() {
  }

}
