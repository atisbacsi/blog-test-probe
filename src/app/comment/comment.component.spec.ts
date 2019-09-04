import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { Comment } from '../domain/Comment';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ]
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
    let comment: Comment = new Comment();
    comment.body = "body";
    comment.email = "email";
    comment.id = 1;
    comment.name = "name";
    comment.postId = 12;

    component.comment = comment;
    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('div');
    expect(div).toBeTruthy();
  });

  // it('should have <p> with "banner works!"', () => {
  //   const bannerElement: HTMLElement = fixture.nativeElement;
  //   const p = bannerElement.querySelector('p');
  //   expect(p.textContent).toEqual('banner works!');
  // });  
});
