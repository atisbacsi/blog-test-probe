import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentlistComponent } from './commentlist.component';
import { CommentComponent } from '../comment/comment.component';
import { CommenteditorComponent } from '../commenteditor/commenteditor.component';
import { Configuration } from '../service/configuration';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../service/comment.service';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Comment } from '../domain/comment';

let commentServiceStub: Partial<CommentService> = {
  getCommentsByPost(pId: number): Observable<Comment[]> {return of([{id: 1, postId: pId, name: 'Name', email: '', body: 'Body Text'}]);}
};

describe('CommentlistComponent', () => {
  let component: CommentlistComponent;
  let fixture: ComponentFixture<CommentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentlistComponent,
        CommentComponent,
        CommenteditorComponent
      ],
      imports: [  HttpClientModule, FormsModule ],      
      providers: [
        { provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'} },
        { provide: CommentService, useValue: commentServiceStub }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read CommentService', () => {

    expect(component.isCommentListNotEmpty()).toBeFalsy();

    component.postId = 1;    
    fixture.detectChanges();

    expect(component.isCommentListNotEmpty()).toBeTruthy();

  });

  it('should have a CommentList HtmlElement', () => {

    component.postId = 1;    
    fixture.detectChanges();
    
    const commentElement = fixture.nativeElement.querySelector(".commentlist");
    expect(commentElement).toBeTruthy();
  });

  it('should hide comments by default', () => {

    component.postId = 1;    
    fixture.detectChanges();
    
    //Check flag
    expect(component.showComments).toBeFalsy();

    //Check displayed components
    const commentComponent = fixture.debugElement.query(By.directive(CommentComponent));
    expect(commentComponent).toBeFalsy();
  });

  it('should have a Button that triggers toggleComments() function', () => {

    component.postId = 1;    
    fixture.detectChanges();

    //By default: aus
    expect(component.showComments).toBeFalsy();
    const toggleButton = fixture.debugElement.query(By.css(".button-short"));

    //Ein
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showComments).toBeTruthy();

    //Aus
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showComments).toBeFalsy();

    //Ein
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showComments).toBeTruthy();
  });

  it('should have a toggleComments() function', () => {

    component.postId = 1;    
    fixture.detectChanges();

    component.toggleComments();

    fixture.detectChanges();

    expect(component.showComments).toBeTruthy();
    const commentComponent = fixture.debugElement.query(By.directive(CommentComponent));
    expect(commentComponent).toBeTruthy();
  });

});
