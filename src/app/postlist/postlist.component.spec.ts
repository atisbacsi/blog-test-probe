import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlistComponent } from './postlist.component';
import { PostComponent } from '../post/post.component';
import { CommentlistComponent } from '../commentlist/commentlist.component';
import { CommentComponent } from '../comment/comment.component';
import { CommenteditorComponent } from '../commenteditor/commenteditor.component';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../service/comment.service';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from '../service/configuration';

describe('PostlistComponent', () => {
  let component: PostlistComponent;
  let fixture: ComponentFixture<PostlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostlistComponent,
        PostComponent,
        CommentlistComponent,
        CommentComponent,
        CommenteditorComponent
      ],
      imports: [  HttpClientModule, FormsModule ],      
      providers: [
        {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
        CommentService
        ], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Post', () => {
    component.posts = [{id: 1, userId: 12, title: 'Title', body: 'Body Text'}]
    
    fixture.detectChanges();
    const postElement = fixture.debugElement.query(By.css('.post'));


    expect(postElement).toBeTruthy();
  });

});
