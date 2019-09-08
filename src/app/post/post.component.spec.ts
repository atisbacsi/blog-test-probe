import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { Post } from '../domain/Post';
import { CommentlistComponent } from '../commentlist/commentlist.component';
import { CommentComponent } from '../comment/comment.component';
import { CommenteditorComponent } from '../commenteditor/commenteditor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Configuration } from '../service/configuration';
import { CommentService } from '../service/comment.service';
import { By } from '@angular/platform-browser';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostComponent,
        CommentlistComponent,
        CommentComponent,
        CommenteditorComponent
      ],
      imports: [  HttpClientModule, FormsModule ],      
      providers: [
        {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
        CommentService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty when there is no input', () => {
    const commentElement: HTMLElement = fixture.nativeElement;
    const div = commentElement.querySelector('div');
    expect(div).toBeFalsy();
  });

  it('should be rendered when there is an input', () => {
    component.post = {id: 1, userId: 12, title: 'title', body: 'Body Text'};

    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('div');
    expect(div).toBeTruthy();
  });      

  it('should have an id=123', () => {
    component.post = {id: 123, userId: 8, title: 'title', body: 'Body Text'};
    
    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('.post-id');
    expect(div.innerHTML).toEqual('123');
  });      

  it('should have an user id=321', () => {
    component.post = {id: 8, userId: 321, title: 'title', body: 'Body Text'};
    
    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('.user-id');
    expect(div.innerHTML).toEqual('(User id: 321)');
  }); 

  it('should have an title = "The Title"', () => {
    component.post = {id: 8, userId: 321, title: 'The Title', body: 'Body Text'};
    
    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('.title');
    expect(div.innerHTML).toEqual('The Title');
  }); 

  it('should have a body = "The Body Text"', () => {
    component.post = {id: 8, userId: 321, title: 'The Title', body: 'The Body Text'};
    
    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('.body');
    expect(div.innerHTML).toEqual('The Body Text');
  });   
  
  it('should have a comment list', () => {
    component.post = {id: 8, userId: 321, title: 'The Title', body: 'The Body Text'};
    
    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const commentlist = fixture.debugElement.query(By.directive(CommentlistComponent))
    expect(commentlist).toBeTruthy();
  }); 
});
