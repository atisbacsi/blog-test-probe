import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Configuration } from './service/configuration';
import { PostService } from './service/post.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentService } from './service/comment.service';
import { PostlistComponent } from './postlist/postlist.component';
import { PostComponent } from './post/post.component';
import { CommentlistComponent } from './commentlist/commentlist.component';
import { CommentComponent } from './comment/comment.component';
import { CommenteditorComponent } from './commenteditor/commenteditor.component';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { Post } from './domain/post';

let postServiceStub: Partial<PostService>;

postServiceStub = {
  getPosts(): Observable<Post[]> { return of([{id:1,userId:2,title:'title',body:'body'}, {id:2,userId:12,title:'title2',body:'body2'}])}
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PostlistComponent,
        PostComponent,
        CommentlistComponent,
        CommentComponent,
        CommenteditorComponent
      ],
      imports: [ BrowserModule, HttpClientModule, FormsModule ],      
      providers: [
        {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
        {provide: PostService, useValue: postServiceStub},
        CommentService
        ],      
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have a Postlist component`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const postlistComponent = fixture.debugElement.query(By.directive(PostlistComponent));

    expect(postlistComponent).toBeTruthy();
  });

  it(`should load posts`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges(); 

    const posts = fixture.debugElement.query(By.css('.posts'));
    expect(posts).toBeTruthy();
    const post = fixture.debugElement.query(By.css('.post'));
    expect(post).toBeTruthy();
  });


});
