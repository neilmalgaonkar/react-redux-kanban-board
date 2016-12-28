import { combineReducers } from 'redux'

import tasks from './tasks'
import stacks from './stacks'

const rootReducer = combineReducers({
    tasks,
    stacks
})

export default rootReducer