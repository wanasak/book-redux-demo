import { BookDetailComponent } from './book-detail.component';
import { BookSearchComponent } from './book-search.component';
import { BookAuthorsComponent } from './book-authors.component';
import { BookPreviewComponent } from './book-preview.component';
import { BookPreviewListComponent } from './book-preview-list.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';
import { SidenavComponent } from './sidenav.component';
import { NavItemComponent } from './navitem.component';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';

export const COMPONENTS = [
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    BookPreviewListComponent,
    BookPreviewComponent,
    BookAuthorsComponent,
    BookSearchComponent,
    BookDetailComponent
];

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        RouterModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ComponentsModule { }
