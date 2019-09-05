import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'commenteditor',
  templateUrl: './commenteditor.component.html',
  styleUrls: ['./commenteditor.component.css']
})
export class CommenteditorComponent implements OnInit {

  private id: number = 0;
  private text: string;
  private origText: string;
  private isEdited: boolean;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  @Input('content')
  set commentId(comment: string){
    this.text = comment;
    this.origText = comment;
    
  }

  @Output('save') emitterSave = new EventEmitter<string>();

  public save(){
    this.emitterSave.emit(this.text);
    this.isEdited = false;
    this.origText = this.text;
  }
  public cancel(): void {
    this.isEdited = false;
    this.text = this.origText;
  }
}
