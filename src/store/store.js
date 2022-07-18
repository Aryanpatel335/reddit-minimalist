import { combineReducers, configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subRedditReducer from './subRedditSlice';




export const store = configureStore({
  reducer: combineReducers({
    reddit: redditReducer,
    subreddits: subRedditReducer  
  }),
});
