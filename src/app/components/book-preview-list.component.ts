import { Book } from './../models/book';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-book-preview-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-book-preview *ngFor="let book of books" [book]="book"></app-book-preview>
    `,
    styles: [`
        :host {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    `]
})
export class BookPreviewListComponent {
    @Input() books: Book[];
}
