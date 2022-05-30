import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from './posts/postsSlice';
import usersReducer from './users/userSlice';
import notificationsReducer from './notifications/notificationsSlice';
const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;