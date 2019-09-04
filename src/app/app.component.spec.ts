import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Configuration } from './service/configuration';
import { PostService } from './service/post.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentService } from './service/comment.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ BrowserModule, HttpClientModule, HttpClientTestingModule ],      
      providers: [
        {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
         PostService,
         CommentService
        ],      
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'jjj'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('jjj');
  });


});
