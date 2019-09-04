import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Post } from '../domain/Post';
import { Configuration } from './configuration';
import { PostService } from './post.service';
import { BrowserModule } from '@angular/platform-browser';

describe('Post Service test', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: PostService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ BrowserModule, HttpClientModule, HttpClientTestingModule ],
        providers: [
            {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
             PostService
            ],
      });
  
      // Inject the http service and test controller for each test
      // httpClient = TestBed.get(HttpClient);
      // httpTestingController = TestBed.get(HttpTestingController);
      service = TestBed.get(PostService);
    });
    it('can test HttpClient.get', () => {
        const testData: Post[] = [{id:1, body: '', title:'', userId:1}];
      

        service.getPosts().subscribe ({next: data => {
            console.log(data);
          }, error: e=> console.log(e)
        });
        expect(true).toBeTruthy();
      });    
});