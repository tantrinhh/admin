import { AppDispatch } from ".";
import fetchApi from "../../api/fetchApi";
import { RootState } from "../RootReducer";

export const thunkExtras = {
  api: fetchApi,
};

type ThunkExtras = typeof thunkExtras;

export interface AppThunkConfig {
  extra: ThunkExtras;
  state: RootState;
  dispatch: AppDispatch;
}
