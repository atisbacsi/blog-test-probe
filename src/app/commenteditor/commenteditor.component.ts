import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'commenteditor',
  templateUrl: './commenteditor.component.html',
  styleUrls: ['./commenteditor.component.css']
})
export class CommenteditorComponent implements OnInit {

  private id: number = 0;
  private text: string;
  private editing: boolean;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  @Input('content')
  set commentId(comment: string){
    this.text = comment;
    
  }

  @Output('save') emitterSave = new EventEmitter<string>();

  public save(){
    this.emitterSave.emit(this.text);
    this.editing = false;
  }
}
