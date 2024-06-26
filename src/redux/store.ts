import { configureStore, combineReducers, Tuple } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import mainReducer from './reducer'

const rootReducer = combineReducers({ state: mainReducer })

const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(thunk),
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store
