import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators'; 
const apiUrl = 'https://c6.avaamo.com/web_channel/channel/0bb27887-9589-45b2-bdf2-c6f5ad41ebe5/messages.json'

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http: HttpClient) { }
  handleError(err) {
    console.log(err);
  }

  sendMsg(msg) {
    const httpOptions = {
      headers: new HttpHeaders({
        "se-t": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYXllcl9pZCI6ImYwNGUzMTM1LTYwOWMtNGQ 3YS05NzJhLWRmMTFjZDU3ZGY5YyIsImFjY2Vzc190b2tlbiI6IkxzaURGd0h5OWJ1VS1JLTY1RGtG cTJEUFFVWmdDcjVvIiwiaWQiOjEyMDQ3NDEsImV4cGlyZV9hdCI6MTY0NDA1OTQ3Ni45NDI2NzYzf Q.wKfcPOr5ULsCnFLH6K8BWFMjo1sDfuVIV3FvfKet758', 
         "Access-Control-Allow-Origin": '*',
         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
         'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      })
    }
    return this.http.post(apiUrl, msg, httpOptions)
  }
}
 