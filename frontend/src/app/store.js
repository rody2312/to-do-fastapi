import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../features/taskSlice'
import thunk from 'redux-thunk'
import subTaskSlice from '../features/subTaskSlice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    subTasks: subTaskSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})