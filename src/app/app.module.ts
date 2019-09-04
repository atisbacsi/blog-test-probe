import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Configuration } from './service/configuration';
import { PostService } from './service/post.service';
import { CommentService } from './service/comment.service';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './comment/comment.component';
import { PostComponent } from './post/post.component';
import { CommentlistComponent } from './commentlist/commentlist.component';
import { PostlistComponent } from './postlist/postlist.component';


@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    PostComponent,
    CommentlistComponent,
    PostlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
    PostService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
