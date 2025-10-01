import { combineReducers, configureStore } from '@reduxjs/toolkit';
import matchReducer from './slices/matchSlice';

const reducers = combineReducers({
  match: matchReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
