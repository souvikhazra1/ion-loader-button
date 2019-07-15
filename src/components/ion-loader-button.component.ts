import {AfterViewInit, Attribute, Component, ElementRef, Input, Renderer} from '@angular/core';
import {Button, Config} from "ionic-angular";
import {animate, AnimationBuilder, style} from '@angular/animations';

@Component({
  selector: '[ion-loader-button]',
  template: `
    <span class="button-inner">
      <ion-spinner *ngIf="spinnerVisible" [color]="spinnerColor"></ion-spinner>
      <ng-content *ngIf="contentVisible"></ng-content>
    </span>
    <div class="button-effect"></div>`,
    styles: ['[ion-loader-button] { margin: auto; }']
})
export class IonLoaderButtonComponent extends Button implements AfterViewInit {

  @Input('spinnerColor') spinnerColor: string = 'primary';
  @Input('loading') loading = false;

  spinnerVisible = false;
  contentVisible = true;

  private nativeElement: HTMLElement = null;
  private elHeight: number;
  private mElWidth: number;
  private initialBack;
  private initialBorderRadius;

  private buttonToLoaderAnimation: any = null;
  private loaderToButtonAnimation: any = null;

  private wasLoading = false;

  constructor(@Attribute('ion-loader-button') ionButton: string, private config: Config, private elementRef: ElementRef, private renderer: Renderer, private animationBuilder: AnimationBuilder) {
    super(ionButton, config, elementRef, renderer);
  }

  ngOnChanges(changes: any) {
    this.work()
  }

  work() {
    if (this.nativeElement) {
      if (this.loading) {
        this.nativeElement.setAttribute('disabled', 'disabled');
        this.contentVisible = false;
        this.spinnerVisible = true;
        this.nativeElement.style.setProperty('padding', '0');
        this.nativeElement.style.setProperty('opacity', '1');

        const player = this.buttonToLoaderAnimation.create(this.nativeElement);
        player.play();
        this.wasLoading = true;
      } else {
        if (this.wasLoading) {
          const player = this.loaderToButtonAnimation.create(this.nativeElement);
          player.onDone(() => {
            this.spinnerVisible = false;
            this.contentVisible = true;
            this.nativeElement.removeAttribute('disabled');
            this.nativeElement.style.removeProperty('padding');
            this.nativeElement.style.removeProperty('opacity');
          });
          player.play();
          this.wasLoading = false;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nativeElement = this.getNativeElement();
      this.elHeight = this.nativeElement.clientHeight;
      this.mElWidth = this.nativeElement.clientWidth;
      const elStyle = getComputedStyle(this.nativeElement);
      this.initialBack = elStyle.backgroundColor;
      this.initialBorderRadius = elStyle.borderRadius;

      this.buttonToLoaderAnimation = this.animationBuilder.build([
        style({width: this.mElWidth + 'px', 'background-color': this.initialBack, 'border-radius': this.initialBorderRadius}),
        animate('350ms ease-in', style({width: this.elHeight + 'px', 'background-color': 'white', 'border-radius': (this.elHeight / 2) + 'px'}))
      ]);

      this.loaderToButtonAnimation = this.animationBuilder.build([
        style({width: this.elHeight + 'px', 'background-color': 'white'}),
        animate('350ms ease-in', style({width: this.mElWidth + 'px', 'background-color': this.initialBack, 'border-radius': this.initialBorderRadius}))
      ]);

      this.work();
    }, 500);
  }
}
