import { Action } from '@ngrx/store';
import { Profile } from '../app/app.model';

export enum ActionTypes {
    CreateProfile = '[Profile Service] Create profile',
    EditProfile = '[Profile Service] Edit profile'
}

export class CreateProfile implements Action {
    readonly type = ActionTypes.CreateProfile;
    constructor(public payload: Profile) {}
}

export class EditProfile implements Action {
    readonly type = ActionTypes.EditProfile;
    constructor(public payload: Profile) {}
}

export type ActionsUnion = CreateProfile | EditProfile;