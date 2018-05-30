import * as AuthActions from './auth.actions';
import * as AppReducer from '../../store/app.reducers';

export interface AuthState extends AppReducer.AppState {
  auth: State;
}

export interface State {
  token: string;
  authenticated: boolean;
  errorCode: string;
  errorMessage: string;
  hasError: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false,
  errorCode: null,
  errorMessage: null,
  hasError: false
};


export function authReducer(state = initialState, action: AuthActions.AuthActions) {

  switch (action.type) {
    case (AuthActions.SIGNUP):
    case (AuthActions.LOGIN):
      return {
        ...state,
        authenticated: true,
        hasError: false
      };
    case (AuthActions.AUTH_ERROR):
      console.log('Error: ' + action.payload.code);
      return {
        ...state,
        errorCode: action.payload.code,
        errorMessage: action.payload.message,
        hasError: true
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }

}
