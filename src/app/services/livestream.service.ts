import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livestream, postStream } from '../models/livestream';
import { catchError, retry, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivestreamService {

  constructor(private http: HttpClient) {
    this.fetchLivestreams(); // fetch streams
  }

  private API = "https://us-central1-coza-cdd96.cloudfunctions.net/app" // streams | new | delete | update
  private _liveStreams: any = [];
  streamChanged = new Subject();

  public fetchLivestreams() {
    this.http.get<Livestream>(`${this.API}/streams`)
      .pipe(retry(3), catchError(this.handleError)).subscribe(data => {
        this._liveStreams = data;
        this.streamChanged.next(this._liveStreams)
      })
  }

  get LiveStreams() {
    this.fetchLivestreams();
    return this.streamChanged.next([...this._liveStreams])
  }

  public newLiveStream(livestream: postStream): Observable<postStream> {
    return this.http.post<postStream>(`${this.API}/new`, livestream, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  public updateLiveStream(livestream: postStream, streamKey): Observable<postStream> {
    return this.http.put<postStream>(`${this.API}/update/${streamKey}`, livestream, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  public deleteLiveStream(id: string): Observable<{}> {
    const url = `${this.API}/remove/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  // handle error
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }


  // subscribe to fcm
  FCMSubscription() {

  }
}
