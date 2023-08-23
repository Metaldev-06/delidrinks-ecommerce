import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import localeEsAR from '@angular/common/locales/es-AR';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

registerLocaleData(localeEsAR);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    FormsModule,
    NgOptimizedImage,
  ],
  providers: [
    CookieService,
    {
      provide: LOCALE_ID,
      useValue: 'es-AR',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
