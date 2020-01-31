import * as fromProfile from '../actions/profile.actions';
import { Profile } from '../app/app.model';


export interface ProfileState {
  data: Profile;
}

export const initialState: ProfileState = {
  data: {
   email:"",
   jobTitle:"",
   name:"",
   photoBase64:"",
   uid:"",
  }
};

export function reducer(
  state = initialState,
  action: fromProfile.ActionsUnion
): ProfileState {
  switch (action.type) {
    case fromProfile.ActionTypes.CreateProfile: {
      return {
        ...state,
        data: action.payload
      };
    }

    case fromProfile.ActionTypes.EditProfile: {
      return {
        ...state,
        data: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getProfile = (state: ProfileState) => state.data;