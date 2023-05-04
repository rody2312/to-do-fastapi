import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../features/taskSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})