import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { SplashScreenService } from '../@fury/services/splash-screen.service';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private sidenavService: SidenavService,
              private iconRegistry: MatIconRegistry,
              private renderer: Renderer2,
              private themeService: ThemeService,
              @Inject(DOCUMENT) private document: Document,
              private platform: Platform,
              private route: ActivatedRoute,
              private splashScreenService: SplashScreenService) {
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.themeService.setStyle(queryParamMap.get('style')));

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe(theme => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.sidenavService.addItems([
      {
        name: 'Inicio',
        routeOrFunction: '/',
        icon: 'dashboard',
        position: 5,
        pathMatchExact: true
      },
      {
        name: 'ADMINISTRAR',
        position: 10,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Mis productos',
        routeOrFunction: '/products',
        icon: 'assignment',
        badgeColor: '#2196F3',
        position: 15,
      },
      {
        name: 'Mis ventas',
        routeOrFunction: '/sells',
        icon: 'date_range',
        position: 20
      },
      // {
      //   name: 'MI CUENTA',
      //   type: 'subheading',
      //   position: 35
      // },
      // {
      //   name: 'Mis datos',
      //   routeOrFunction: '/myProfile',
      //   icon: 'layers',
      //   position: 40
      // },
    ]);
  }
}
