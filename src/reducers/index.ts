import {
    ActionReducerMap,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import * as fromProfile from '../reducers/profile.reducer';
  
  export interface AppState {
    profile: fromProfile.ProfileState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    profile: fromProfile.reducer,
  };
  
  export const metaReducers: MetaReducer<AppState>[] = [];

  
  export const getProfileState = (state: AppState) => state.profile;
  
  export const getProfile = createSelector(
    getProfileState,
    fromProfile.getProfile
  );