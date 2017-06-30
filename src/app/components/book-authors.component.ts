import { Book } from './../models/book';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-book-authors',
    template: `
        <h5 md-subheader>Written By:</h5>
        <span>{{ authors }}</span>
    `,
    styles: [`
        h5 {
            margin-bottom: 5px;
        }
    `]
})
export class BookAuthorsComponent {
    @Input() book: Book;

    get authors() {
        return this.book.volumeInfo.authors;
    }
}
