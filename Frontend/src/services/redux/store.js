import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import reportReducers from './reducers/reportReducers'

const store = configureStore({
    reducer: { rootReducer ,report :reportReducers},
})

export {store}