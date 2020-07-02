import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livestream } from '../models/livestream';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivestreamService {

  constructor(private http: HttpClient) { }

  private API = "https://us-central1-coza-cdd96.cloudfunctions.net/app" // streams | new | delete | update
  private _liveStreams: any = [];


 public fetchLivestreams() {
    return this.http.get<Livestream>(`${this.API}/streams`)
      .pipe(retry(3), catchError(this.handleError))
  }

  public newLiveStream(livestream: Livestream): Observable<Livestream> {
    return this.http.post<Livestream>(`${this.API}/new`, livestream, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  public updateLiveStream(livestream: Livestream): Observable<Livestream> {
    return this.http.post<Livestream>(`${this.API}/update/${livestream.id}`, livestream, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  public deleteLiveStream(id: string): Observable<{}> {
    const url = `${this.API + '/delete'}/${id}`;
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
}
