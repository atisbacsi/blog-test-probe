import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { Post } from '../domain/Post';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ]
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
    let comment: Post = new Post();
    // comment.body = "body";
    // comment.id = 1;
    // comment.title = "title";
    // comment.userId = 1212;

    component.post = comment;
    fixture.detectChanges();
    const commentElement: HTMLElement = fixture.nativeElement;

    const div = commentElement.querySelector('div');
    expect(div).toBeTruthy();
  });      
});
