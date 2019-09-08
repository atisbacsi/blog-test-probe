import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CommenteditorComponent } from './commenteditor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Configuration } from '../service/configuration';
import { CommentService } from '../service/comment.service';
import { Observable, of, throwError } from 'rxjs';
import { Comment } from '../domain/comment';
import { By } from '@angular/platform-browser';



/**
 * Create custom DOM event the old fashioned way
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent
 * Although officially deprecated, some browsers (phantom) don't accept the preferred "new Event(eventName)"
 */
export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

describe('CommenteditorComponent', () => {
  let component: CommenteditorComponent;
  let fixture: ComponentFixture<CommenteditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

        CommenteditorComponent
      ],
      imports: [  HttpClientModule, FormsModule ],      
      providers: [
        {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
        CommentService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommenteditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  const exampleComment: Comment = {id: 456, postId: 123, name: 'Name', email: 'TestEmail@istmiregal.de', body: 'Body Text'};
  
  it('should have a Body', () => {
    component.comment = exampleComment;
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.displayedText');    
    expect(text.innerHTML).toEqual('Body Text');
  });

  it('should have a commenteditor_curtain by default', () => {
    const vorhang = fixture.nativeElement.querySelector('.commenteditor_curtain');    
    expect(vorhang).toBeFalsy();
  })

  it('should have a commenteditor_curtain after a click', () => {
    component.comment = exampleComment;
    fixture.detectChanges();
    
    const text = fixture.debugElement.query(By.css('.displayedText'));
    text.triggerEventHandler('click', null);
    fixture.detectChanges();
    const vorhang = fixture.nativeElement.querySelector('.commenteditor_curtain');    
    expect(vorhang).toBeTruthy();
  });

  it('should have a binded Textarea', fakeAsync(() => {
    component.comment = exampleComment;
    fixture.detectChanges();

    const text = fixture.debugElement.query(By.css('.displayedText'));
    text.triggerEventHandler('click', null);
    fixture.detectChanges();

    tick();
    
    const textarea = fixture.nativeElement.querySelector('textarea');    
    expect(textarea.value).toEqual('Body Text');
  }));

  it('should update the text in the component', async(() => {
    component.comment = exampleComment;
    fixture.detectChanges();

    const text = fixture.debugElement.query(By.css('.displayedText'));
    text.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const textarea = fixture.nativeElement.querySelector('textarea');
    
      textarea.value = 'this is the new value';
      textarea.dispatchEvent(newEvent('input'));
      return fixture.whenStable();
    }).then(() => {
      expect(component.editedtext).toEqual('this is the new value');
    });
  
  }));

  it('should not have an error message on the editor popup', () => {
    component.comment = exampleComment;
    component.isEditing = true;
    component.hasNetworkError = false;
    fixture.detectChanges();

    const errormessage = fixture.nativeElement.querySelector('.networkErrorMessage');
    expect(errormessage).toBeFalsy();
  
  });

  it('should have an error message on the editor popup', () => {
    component.comment = exampleComment;
    component.isEditing = true;
    component.hasNetworkError = true;
    fixture.detectChanges();

    const errormessage = fixture.nativeElement.querySelector('.networkErrorMessage');
    expect(errormessage).toBeTruthy();
  
  });

  it('should have a Cancel button that closes popup', () => {
    component.comment = exampleComment;
    component.isEditing = true;
    fixture.detectChanges();

    const cancelbutton = fixture.nativeElement.querySelector('.cancelbutton');
    expect(cancelbutton).toBeTruthy();

    cancelbutton.dispatchEvent(newEvent('click'));

    fixture.detectChanges();

    expect(component.isEditing).toBeFalsy();
    const vorhang = fixture.nativeElement.querySelector('.commenteditor_curtain');      
    expect(vorhang).toBeFalsy();
  
  });

  it('should have a Cancel button that clears up flags', () => {
    component.comment = exampleComment;
    component.isEditing = true;
    fixture.detectChanges();

    const cancelbutton = fixture.nativeElement.querySelector('.cancelbutton');
    expect(cancelbutton).toBeTruthy();

    cancelbutton.dispatchEvent(newEvent('click'));

    fixture.detectChanges();

    expect(component.isEditing).toBeFalsy();
    expect(component.isSaving).toBeFalsy();
    expect(component.hasNetworkError).toBeFalsy();
  
  });


});

let commentServiceStub2: Partial<CommentService> = {
  saveComment(comment: Comment) : Observable<Comment> {return of(comment);}
};


describe('CommenteditorComponent with CommentService-Spy', () => {
  let component: CommenteditorComponent;
  let fixture: ComponentFixture<CommenteditorComponent>;
  
  let commentServiceSpy: jasmine.SpyObj<CommentService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CommentService', ['saveComment']);
    // const spy = jasmine.createSpyObj('CommentService', ['saveComment']);

    TestBed.configureTestingModule({
      declarations: [

        CommenteditorComponent
      ],
      imports: [  HttpClientModule, FormsModule ],      
      providers: [
        {provide: Configuration, useValue:{serverUrl: 'http://localhost:3000'}},
        { provide: CommentService, useValue: spy }
        ]
    })
    .compileComponents();

  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(CommenteditorComponent);
    commentServiceSpy = TestBed.get(CommentService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const exampleComment: Comment = {id: 456, postId: 123, name: 'Name', email: 'TestEmail@istmiregal.de', body: 'Body Text'};
  
  it('should save the new body', async(() => {

    let commentOriginal: Comment = {id: 456, postId: 123, name: 'Name', email: 'TestEmail@istmiregal.de', body: 'Body Text'};
    let commentEdited: Comment = {id: 456, postId: 123, name: 'Name', email: 'TestEmail@istmiregal.de', body: 'this is the new value'};

    commentServiceSpy.saveComment.and.returnValue(of(commentEdited));
    component.comment = commentOriginal;

    fixture.detectChanges();

    const text = fixture.debugElement.query(By.css('.displayedText'));
    text.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const textarea = fixture.nativeElement.querySelector('textarea');
    
      textarea.value = 'this is the new value';
      textarea.dispatchEvent(newEvent('input'));

      return fixture.whenStable();
    }).then(() => {
      const savebutton = fixture.nativeElement.querySelector('.savebutton');
      savebutton.dispatchEvent(newEvent('click'));
      return fixture.whenStable();
    }).then(() => {
      expect(commentServiceSpy.saveComment.calls.count()).toBe(1);
      expect(commentServiceSpy.saveComment).toHaveBeenCalledWith(commentEdited);
      expect(component.comment.body).toEqual(commentEdited.body);
      expect(component.isSaving).toBeFalsy();
      expect(component.isEditing).toBeFalsy();
    });
  }));

  it('should show an errormessage when commentservice throws an error', async(() => {

    let commentOriginal: Comment = {id: 456, postId: 123, name: 'Name', email: 'TestEmail@istmiregal.de', body: 'Body Text'};
    let commentEdited: Comment = {id: 456, postId: 123, name: 'Name', email: 'TestEmail@istmiregal.de', body: 'this is the new value'};

    commentServiceSpy.saveComment.and.returnValue(throwError("error on save"));
    component.comment = commentOriginal;

    fixture.detectChanges();

    const text = fixture.debugElement.query(By.css('.displayedText'));
    text.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const textarea = fixture.nativeElement.querySelector('textarea');
    
      textarea.value = 'this is the new value';
      textarea.dispatchEvent(newEvent('input'));

      return fixture.whenStable();
    }).then(() => {
      const savebutton = fixture.nativeElement.querySelector('.savebutton');
      savebutton.dispatchEvent(newEvent('click'));
      return fixture.whenStable();
    }).then(() => {
      expect(commentServiceSpy.saveComment.calls.count()).toBe(1);
      expect(commentServiceSpy.saveComment).toHaveBeenCalledWith(commentEdited);
      expect(component.comment.body).toEqual(commentOriginal.body, 'should not change comments body');
      expect(component.isSaving).toBeFalsy();
      expect(component.isEditing).toBeTruthy();
      expect(component.hasNetworkError).toBeTruthy('should set the NetworkError-Flag');
    });
  }));    

});
