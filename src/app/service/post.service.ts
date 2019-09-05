import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './configuration';
import { Post } from '../domain/post';
import { Observable } from 'rxjs';


@Injectable()
export class PostService {
    constructor(private http: HttpClient, @Optional() private config: Configuration) {

    }

    getPosts() : Observable<Post[]>  {
        return this.http.get<Post[]>(this.config.serverUrl + '/posts' );
    }
}
