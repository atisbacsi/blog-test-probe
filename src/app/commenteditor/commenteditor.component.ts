import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'commenteditor',
  templateUrl: './commenteditor.component.html',
  styleUrls: ['./commenteditor.component.css']
})
export class CommenteditorComponent implements OnInit {

  private id: number = 0;
  private text: string;
  private editingVal: boolean;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  @Input('content')
  set commentId(comment: string){
    this.text = comment;
    
  }

  @Output('save') emitterSave = new EventEmitter<string>();

  @ViewChild('editor') editorField: ElementRef;

  set editing(ed: boolean){
    this.editingVal = ed;
    if(this.editingVal){
      this.editorField.nativeElement.focus();
    }
  }
  get editing(): boolean {
    return this.editingVal;
  }

  public save(){
    this.emitterSave.emit(this.text);
    this.editingVal = false;
  }
}
