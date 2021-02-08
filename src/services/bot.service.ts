import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as socketIo from 'socket.io-client';
import { Subject } from 'rxjs';
const apiUrl = 'https://c6.avaamo.com/web_channel/channel/0bb27887-9589-45b2-bdf2-c6f5ad41ebe5/messages.json';
const SOCKET_URL = 'wss://c6.avaamo.com/socket/websocket'
@Injectable({
  providedIn: 'root'
})
export class BotService {
  private socket;
  botMessage = new Subject<any>();


  constructor(private http: HttpClient) { 
    this.initSocket();
    this.socket.on('messages.f04e3135-609c-4d7a-972a-df11cd57df9c', (res) => {
      console.log(res);
      this.botMessage.next(res);
    });
  }
  handleError(err) {
    console.log(err);
  }

  /**init socket event */
  public initSocket(): void {
      this.socket = socketIo(SOCKET_URL,{
        query:{
          web_channel_id:'undefined',
          "_se_t": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYXllcl9pZCI6ImYwNGUzMTM1LTYwOWMtNGQ3YS05NzJhLWRmMTFjZDU3ZGY5YyIsImFjY2Vzc190b2tlbiI6IkxzaURGd0h5OWJ1VS1JLTY1RGtGcTJEUFFVWmdDcjVvIiwiaWQiOjEyMDQ3NDEsImV4cGlyZV9hdCI6MTY0NDA1OTQ3Ni45NDI2NzYzfQ.wKfcPOr5ULsCnFLH6K8BWFMjo1sDfuVIV3FvfKet758', 
          'vsn':'1.0.0'
        },
        withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Origin": 'http://localhost:4200',
        }
      });
  }

  sendMsg(msg) {
    const httpOptions = {
      headers: new HttpHeaders({
        "se-t": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYXllcl9pZCI6ImYwNGUzMTM1LTYwOWMtNGQ3YS05NzJhLWRmMTFjZDU3ZGY5YyIsImFjY2Vzc190b2tlbiI6IkxzaURGd0h5OWJ1VS1JLTY1RGtGcTJEUFFVWmdDcjVvIiwiaWQiOjEyMDQ3NDEsImV4cGlyZV9hdCI6MTY0NDA1OTQ3Ni45NDI2NzYzfQ.wKfcPOr5ULsCnFLH6K8BWFMjo1sDfuVIV3FvfKet758', 
         "Access-Control-Allow-Origin": 'localhost:4200',
         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
         'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      })
    }
    return this.http.post(apiUrl, msg, httpOptions)
  }
}
 