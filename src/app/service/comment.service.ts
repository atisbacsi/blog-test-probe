import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './configuration';
import { Observable } from 'rxjs';
import { Comment } from '../domain/comment';

@Injectable()
export class CommentService {
    constructor(private http: HttpClient, @Optional() private config: Configuration) {

    }

    getCommentsByPost(postId: number) : Observable<Comment[]>  {
        return this.http.get<Comment[]>(this.config.serverUrl + '/comments?postId=' + postId );
    }

    saveComment(comment: Comment) : Observable<Comment> {
        return this.http.put<Comment>(this.config.serverUrl + '/comments/' + comment.id, comment);
    }
} 
