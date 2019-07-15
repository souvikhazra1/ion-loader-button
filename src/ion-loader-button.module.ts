import { NgModule } from '@angular/core';
import { IonLoaderButtonComponent } from './components/ion-loader-button.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicModule} from 'ionic-angular';

@NgModule({
  declarations: [
    IonLoaderButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(IonLoaderButtonComponent)
  ],
  exports: [
    IonLoaderButtonComponent
  ]
})
export class IonLoaderButtonModule {
}