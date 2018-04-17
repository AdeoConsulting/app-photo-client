
import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ToastController, } from 'ionic-angular';

// Native Plugin 
import { Camera, CameraOptions } from '@ionic-native/camera'; 

import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage{

  
  // For image Ops
  imageURI:any;

  constructor(public navCtrl: NavController, 
              public camera: Camera,
              public toastCtrl: ToastController,
              // Service
              public http: Http
              ) 
  { }


  uploadImage(){
    let url = "https://localhost:8000/api/image/";
    let postData = new FormData();
    
    postData.append('photo', this.imageURI);

    let data: Observable<any> = this.http.post(url, postData);
    
    data.subscribe((result) => {
      alert('Image publiee avec succes');
    }, err => {alert(err)});
    
  }


  getAppPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {
        this.imageURI = 'data:image/jpeg;base64,' + imageData;
      }, 
      (err) => {
        console.log(err);
        this.presentToast(err);
      }
    ); 

  }


  getGalPicture(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.imageURI = 'data:image/jpeg;base64,' + imageData;
      }, 
      (err) => {
        console.log(err);
        this.presentToast(err);
      }
    ); 

  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
                
            