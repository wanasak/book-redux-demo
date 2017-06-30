import { Action } from '@ngrx/store';

export const OPEN_SIDENAV = '[LAYOUT] OPEN_SIDENAV';
export const CLOSE_SIDENAV = '[LAYOUT] CLOSE_SIDENAV';

export class OpenSidenavAction implements Action {
    readonly type = OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
    readonly type = CLOSE_SIDENAV;
}

export type Actions = OpenSidenavAction | CloseSidenavAction;

