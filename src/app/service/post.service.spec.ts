import { TestBed } from '@angular/core/testing';
import { Post } from '../domain/post';
import { Configuration } from './configuration';
import { PostService } from './post.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('Post Service', () => {


    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let httpClientService: HttpClient;

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

      TestBed.configureTestingModule({
        providers: [
            {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
            {provide: HttpClient, useValue: httpClientSpy},
            PostService
            ],
      });

      httpClientService = TestBed.get(HttpClient);
      
    });
    it('should load posts with the method "getPosts()"', () => {
      const examplePost: Post = {id: 1, userId: 12, title: 'Title', body: 'Body Text'};
      const ret: Observable<Post[]>  = of([examplePost]);
      httpClientSpy.get.and.returnValue(ret);

      const retvalue :  Observable<Post[]> = TestBed.get(PostService).getPosts();

      retvalue.subscribe(v => {
        expect(v.length).toEqual(1);
        expect(v).toEqual([examplePost]);
      });
      expect(httpClientService.get).toHaveBeenCalledTimes(1);
      expect(httpClientService.get).toHaveBeenCalledWith('http://localhost:3000/posts');
    });    
});