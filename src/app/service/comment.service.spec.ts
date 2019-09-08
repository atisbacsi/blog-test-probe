import { TestBed } from '@angular/core/testing';
import { Configuration } from './configuration';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommentService } from './comment.service';
import { Comment } from '../domain/comment';

describe('Comment Service', () => {


    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let httpClientService: HttpClient;

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);

      TestBed.configureTestingModule({
        providers: [
            {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
            {provide: HttpClient, useValue: httpClientSpy},
            CommentService
            ],
      });
  
      httpClientService = TestBed.get(HttpClient);
      
    });
    it('should load comments with the method "getCommentsByPost(postId: number)"', () => {
      const exampleComment: Comment = {id: 1, postId: 123654, name: 'Name', email: 'etwas@istmireg.al', body: 'Body Text'};
      const ret: Observable<Comment[]>  = of([exampleComment]);
      httpClientSpy.get.and.returnValue(ret);

      const retvalue :  Observable<Comment[]> = TestBed.get(CommentService).getCommentsByPost(123);

      retvalue.subscribe(v => {
        expect(v.length).toEqual(1);
        expect(v).toEqual([exampleComment]);
      });
      expect(httpClientService.get).toHaveBeenCalledTimes(1);
      expect(httpClientService.get).toHaveBeenCalledWith('http://localhost:3000/comments?postId=123');
    });    

    it('should save comment the method "saveComment(comment: Comment)"', () => {
      const exampleComment: Comment = {id: 1, postId: 123654, name: 'Name', email: 'etwas@istmireg.al', body: 'Body Text'};
      const ret: Observable<Comment[]>  = of([exampleComment]);
      httpClientSpy.put.and.returnValue(ret);

      const retvalue :  Observable<Comment[]> = TestBed.get(CommentService).saveComment(exampleComment);

      retvalue.subscribe(v => {
        expect(v.length).toEqual(1);
        expect(v).toEqual([exampleComment]);
      });
      expect(httpClientService.put).toHaveBeenCalledTimes(1);
      expect(httpClientService.put).toHaveBeenCalledWith('http://localhost:3000/comments/1', exampleComment);
    });  
});