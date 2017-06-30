import { CollectionComponent } from './containers/collection-page.component';
import { SelectedBookComponent } from './containers/selected-book-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FindBookPageComponent } from './containers/find-book-page.component';
import { ViewBookPageComponent } from './containers/view-book-page.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { routes } from './app-routing.component';
import { schema } from './db';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { ComponentsModule } from './components/index';
import { StoreModule } from '@ngrx/store';
import { BooksEffects } from './effects/collection';
import { BookEffects } from './effects/book';
import { EffectsModule } from '@ngrx/effects';
import { GoogleBooksService } from './services/google-books.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { reducer } from './reducers';
import { DBModule } from '@ngrx/db';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    ViewBookPageComponent,
    FindBookPageComponent,
    SelectedBookComponent,
    CollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    BrowserAnimationsModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(BookEffects),
    EffectsModule.run(BooksEffects),
    MaterialModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    DBModule.provideDB(schema),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    GoogleBooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
