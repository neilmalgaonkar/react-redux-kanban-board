import { createStore } from 'redux'

import rootReducer from './reducers/index'

// 0 : backlog
// 1 : in progress
// 2 : done

const defaultStore = {
    tasks: [
        {
            id: 1,
            text: 'learn redux',
            status: 0
        },
        {
            id: 2,
            text: 'understand react',
            status: 0
        },
        {
            id: 3,
            text: 'learn es6',
            status: 0
        },
        {
            id: 4,
            text: 'Array operator',
            status: 0
        },
        {
            id: 5,
            text: 'Laravel',
            status: 0
        }
    ]
}

const store = createStore(rootReducer, defaultStore)

export default store