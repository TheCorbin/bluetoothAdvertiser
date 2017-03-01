import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
declare var bluetoothle: any;
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public platform: Platform) {

    const initializeParams = {
      "request": true,
      "statusReciever": false,
      "restoreKey": "blueToothAdvertiser"
    }

    const peripheralParams = {
      "request": true,
      "restoreKey": "blueToothAdvertiser"
    }

    const initializePeripheralParams = {
      "request": true,
      // "restoreKey": "bluetoothadvertiser"
    }

    this.platform.ready().then(() =>{
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        console.log("It's IOS!");
        bluetoothle.initialize();
        bluetoothle.initializePeripheral(this.success, this.error, initializePeripheralParams);
      }
      else if (this.platform.is('android')) {
        bluetoothle.initialize();
        bluetoothle.initializePeripheral();
      }
      else {
        return false;
      }

    })


  }

  result(result){
    console.log(result);

  }

  success(result){
    console.log(result);
    console.log("success!");
  }

  error(){
    // console.log(result);
    console.log("error!");
  }

  addService(){
    console.log("Trying to add!");

    const initializePeripheralParams = {
    service: "1234",
    characteristics: [
        {
          uuid: "ABCD",
          permissions: {
            read: true,
            write: true,
            //readEncryptionRequired: true,
            //writeEncryptionRequired: true,
          },
          properties : {
            read: true,
            writeWithoutResponse: true,
            write: true,
            notify: true,
            indicate: true,
            //authenticatedSignedWrites: true,
            //notifyEncryptionRequired: true,
            //indicateEncryptionRequired: true,
          }
        }
      ]
    };

    bluetoothle.addService(this.success, this.error, initializePeripheralParams);
  }


  startAdvertising(){

    var params = {
      "services":["1234"],
      "service": "1234",
      "name": "Bendytooth Mouse"
    }

    bluetoothle.startAdvertising(this.success, this.error, params);
  }

  stopAdvertising(){
    bluetoothle.stopAdvertising(this.success, this.error);
  }

}
