import { CollectionComponent } from './containers/collection-page.component';
import { FindBookPageComponent } from './containers/find-book-page.component';
import { ViewBookPageComponent } from './containers/view-book-page.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: CollectionComponent },
    { path: 'book/find', component: FindBookPageComponent },
    { path: 'book/:id', component: ViewBookPageComponent },
    { path: '**', component: NotFoundPageComponent }
];
