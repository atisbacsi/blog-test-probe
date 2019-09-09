import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { CommenteditorComponent } from '../commenteditor/commenteditor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Configuration } from '../service/configuration';
import { CommentService } from '../service/comment.service';
import { By } from '@angular/platform-browser';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let configuration: Configuration = {serverUrl: 'http://localhost:3000', userEmail: 'es@istmireg.al'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentComponent,
        CommenteditorComponent
      ],
      imports: [  HttpClientModule, FormsModule ],      
      providers: [
        {provide: Configuration, useValue: configuration},
        CommentService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
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
    component.comment = {id: 1,  postId: 12, name: 'noname', email: 'email@email.de',body: 'Body Text'};

    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('div');
    expect(div).toBeTruthy();
  });
 
  it('should have an name = "This ist the Name" been rendered', () => {
    component.comment = {id: 123,  postId: 12, name: 'This ist the Name', email: 'email@email.de',body: 'Body Text'};

    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('.name');
    expect(div.innerHTML).toEqual('This ist the Name');
  });

  it('should have an email = "This ist the Name" been rendered', () => {
    component.comment = {id: 123,  postId: 12, name: 'This ist the Name', email: 'email@email.de',body: 'Body Text'};

    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('a');
    expect(div.getAttribute('href')).toEqual('mailto:email@email.de');
    expect(div.innerHTML).toEqual('email@email.de');
  });

  it('should have not an editable body', () => {
    component.comment = {id: 123,  postId: 12, name: 'This ist the Name', email: 'email@email.de',body: 'This is currently the Body Text'};

    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('.body');
    expect(div.innerHTML).toEqual('This is currently the Body Text');
  });

  it('should have an editable body', () => {
    component.comment = {id: 123,  postId: 12, name: 'This ist the Name', email: configuration.userEmail ,body: 'Body Text'};

    fixture.detectChanges();
    
    const commenteditor = fixture.debugElement.query(By.directive(CommenteditorComponent));

    expect(commenteditor).toBeTruthy();
  });
});
