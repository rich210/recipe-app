import { ActionReducerMap } from '@ngrx/store';
import * as AuthReducer from '../auth/store/auth.reducers';

export interface AppState {
  auth: AuthReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer
};
