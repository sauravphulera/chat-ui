import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import {BotService} from '../services/bot.service';

type msgModel = Array<{
  user: string,
  contentType: string,
  content?: {
    text?: string,
    url?: string,
  }
  carousel?:Array<any>,
}>;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  botMsg = new Observable<any>();
  carouselIndex = 0;

  messages:msgModel = [
    {
      user: 'bot',
      contentType: 'text',
      content: {
        text: 'How are you today?'
      }
    },
    {
      user: 'user',
      contentType: 'text',
      content: {
        text: 'fine'
      }
    }
  ]

  /**constructor */
  constructor(private botService: BotService,
              private ref: ChangeDetectorRef) {
                this.botMsg = this.botService.botMessage;
              }

  /**on load */
  ngOnInit() {
    this.botMsg.subscribe((data) => {
      console.log(data);
    })
  }
  
  /**on content load */
  ngAfterViewInit() {
    this.ref.detectChanges();
  }

  /**Flag to show chat is opened or not */
  isChatOpened = false;

  /** chat text entered by the user */
  chatText = '';

  /**open chat box */
  openChatBox() {
      this.isChatOpened = !this.isChatOpened;
  }

  /**send chat text to server */
  sendChatMsg() {
    console.log(this.chatText);
    if(this.chatText == '') return;
    const data = { 
      "message": { 
      "content": this.chatText 
      }, 
      "conversation": { 
      "mode": false, 
      "uuid": "2c94cf3a91cef51ca18e9b0990cb1b1e" 
      }, 
      "channel_type": "web" 
     };
     this.messages.push({
        user: 'user',
        contentType: 'text',
        content: {
          text: this.chatText
        }
    })
      this.botService.sendMsg(data).subscribe((data) => {
        console.log(data);
      })
    if(this.chatText == 'carousel') {
      this.setCArouselData();
    } else
    if(this.chatText == 'audio') {
      this.setAudioData();
    }
    if(this.chatText == 'video') {
      this.setVideoData();
    }
    this.chatText = '';
    this.ref.detectChanges();
  }

  private setVideoData() {
    this.messages.push({
      user: 'bot',
      contentType: 'video',
      content: {
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      }
    });
  }

  private setAudioData() {
    this.messages.push({
      user: 'bot',
      contentType: 'audio',
      content: {
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      }
    });
  }

  private setCArouselData() {
    this.messages.push({
      user: 'bot',
      contentType: 'carousel',
      carousel: [{
        text: 'This is a dog',
        url: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
      },
      {
        text: 'This is scond',
        url: 'https://picsum.photos/seed/picsum/200/300'
      },
      {
        text: 'This is only text This is only text This is only text This is only text This is only text This is only text This is only text This is only text This is only text This is only text This is only text',
        url: false
      }
      ]
    });
  }

  plusSlides(counter) {
    this.carouselIndex += counter;
    this.ref.detectChanges();
  }
}
