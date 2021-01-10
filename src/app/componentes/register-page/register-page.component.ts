/*
import { Component, OnInit } from '@angular/core';
//import { AuthService} from '../../servicios/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
 // public email: string;
  //public password: string;
  constructor(
    
    //public authService:AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  /*
  onSubmitAddUser(){
   this.authService.registerUser(this.email,this.password)
    .then( (res) => {
      console.log("Registrado correctamente !!");
      console.log(res);
        this.router.navigate(['/tweets']);
    }).catch((err)=>{
      console.log("Ocurrio un error ");
    })
  }
  

}
*/
import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import { DataService } from 'src/app/servicios/data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],

})
export class RegisterPageComponent implements OnInit {
 
  btntxtregister: string ="REGISTER";

  nameText: string;
  surnameText: string;
  secondsurnameText: string;
  usernameText: string;
  emailText: string;
 passwordText: string;
 cellphonenumberText: string;
  users=[];

  constructor(private _data: DataService,public router: Router) { }

  ngOnInit() {
   
    this._data.user.subscribe(res=> this.users = res);
    this._data.changeUser(this.users);

    this._data.getUsers()
     .subscribe((data: any) => {
      //alert(JSON.stringify(data.content));

      this.users = data.content;
      this._data.changeUser(this.users);

    });
  }

 


  AgregarUsuario(){

    var payload = {
     
      cellphonenumber: this.cellphonenumberText,
      email: this.emailText,
      name: this.nameText,
      password: this.passwordText,
      secondsurname: this.secondsurnameText,
      surname: this.surnameText,
      usern: this.usernameText
      
    }
  

    this._data.newUser(payload)
    .subscribe((data: any) => {

      this.users.push(payload);

      this.cellphonenumberText='';
      this.emailText='';
      this.nameText='';
      this.passwordText='';
      this.secondsurnameText='';
      this.surnameText='';
      this.usernameText='';

     
      this._data.changeUser(this.users);
      this.router.navigate(['/tweets']);
      
   });
   
  }
  
  

  removeItem(i){
    this.users.splice(i,  1);
    this._data.changeUser(this.users);

  }

}

