/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweets-page',
  templateUrl: './tweets-page.component.html',
  styleUrls: ['./tweets-page.component.scss']
})
export class TweetsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
*/


import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import { DataService } from 'src/app/servicios/data.service';
import {Router} from '@angular/router';

import { from } from 'rxjs';

@Component({
  selector: 'app-tweets-page',
  templateUrl: './tweets-page.component.html',
  styleUrls: ['./tweets-page.component.scss'],
  animations: [
    trigger('tweets',[
      transition('* =>*',[
        query(':enter',style({ opacity: 0  }), {optional: true}),
        query(':enter', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 0, transform:'translateY(-75%)', offset:0 }),
            style({opacity: .5, transform:'translateY(35px)', offset:.3 }),
            style({opacity: 1, transform:'translateY(0)', offset:1 }),
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 1, transform:'translateY(0)', offset:0 }),
            style({opacity: .5, transform:'translateY(35px)', offset:.3 }),
            style({opacity: 0 , transform:'translateY(-75%)', offset:1 }),
          ]))
        ]), {optional: true})


      ])
    ])
  ]
})
export class TweetsPageComponent implements OnInit {
 
  itemCounttweet: number;
  btntxtTweet: string ="SEND TWEET";
  tweetText: string="";;
  urlText: string="";
  
  tweets=[];

  constructor(private _data: DataService,public router: Router) { }

  ngOnInit() {
    this.itemCounttweet = this.tweets.length;
    this._data.tweet.subscribe(res=> this.tweets = res);
    this._data.changeTweet(this.tweets);

    this._data.getTweets()
    .subscribe((data: any) => {
      //alert(JSON.stringify(data.content));

      this.tweets = data.content;
      this._data.changeTweet(this.tweets);

    });
  }

 


  AgregarTweet(){

    var payloadtweet = {
     
      tweetw : this.tweetText,
      urlimage : this.urlText,
      user_id : 1000
      //user_id : this._data.getUsers
      
    }
  

    this._data.newTweet(payloadtweet)
    .subscribe((data: any) => {

      this.tweets.push(payloadtweet);

      this.tweetText='';
      this.urlText='';
      //Nota: Falta el del usuario creo

      this.itemCounttweet=this.tweets.length;
      this._data.changeTweet(this.tweets);
   });
   
  }
  
  

  removeItemTweet(i){
    this.tweets.splice(i,  1);
    this._data.changeTweet(this.tweets);

  }

}