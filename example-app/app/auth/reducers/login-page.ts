import { AuthActions } from './../actions/auth';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case 'AUTH_LOGIN': {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case 'AUTH_LOGIN_SUCCESS': {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case 'AUTH_LOGIN_FAILURE': {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
