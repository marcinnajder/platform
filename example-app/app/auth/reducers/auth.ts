import { AuthActions } from './../actions/auth';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS': {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    }

    case 'AUTH_LOGOUT': {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
