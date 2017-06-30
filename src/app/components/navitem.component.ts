import { Component, Input, EventEmitter, Output } from '@angular/core';
@Component({
    selector: 'app-navitem',
    template: `
        <a md-list-item [routerLink]="routerLink" (click)="activate.emit()">
            <md-icon md-list-icon>{{ icon }}</md-icon>
            <span md-line><ng-content></ng-content></span>
            <span md-line class="secondary">{{ hint }}</span>
        </a>
    `
})
export class NavItemComponent {
    @Input() icon = '';
    @Input() hint = '';
    @Input() routerLink: string | any[] = '/';
    @Output() activate = new EventEmitter();
}
