import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }
  private API_KEY = "AIzaSyCQH4xqKXKFN6WJOJ2Uw9FS_fd4dDVG-EU";
  private API_URL = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails"
  private CHANNEL_ID = "UCrsnAHn3coN8gZD8WkJ66gg";
  private CHANNEL = "COZANigeria";
  private CHANNEL_UPLOADS = "UUrsnAHn3coN8gZD8WkJ66gg";


  public getChannelVideo(): Observable<any> {
    return this.httpClient.get<any>(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${this.CHANNEL_ID}&maxResults=50&key=${this.API_KEY}`)
  }

  
}
