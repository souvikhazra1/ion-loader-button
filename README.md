# ion-loader-button

A ionic 2 button which animates itself to a loader and animates back to a button

## Getting Started

Install via NPM
```
npm i ion-loader-button --save
```
Add IonLoaderButtonModule to your app.module.ts
```
import {IonLoaderButtonModule} from 'ion-loader-button';

@NgModule({
    imports: [
        ...,
        IonLoaderButtonModule,
        ...
    ]
})
export class AppModule {
}
```

## Example
```
<button ion-loading-button [loading]="true/false">
```

## Authors

* **Souvik Hazra** (https://github.com/souvikhazra1)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
