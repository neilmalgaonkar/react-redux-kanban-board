import { createStore } from 'redux'

import rootReducer from './reducers/index'

// 0 : backlog
// 1 : in progress
// 2 : done

const defaultStore = {
    stacks: [
        {
            id: 1,
            title: "Backlog",
            status: 0,
            locked: true

        },
        {
            id: 2,
            title: "In-progress",
            status: 1,
            locked: false
        },
        {
            id: 3,
            title: "Done",
            status: 2,
            locked: false
        }
    ],
    tasks: [
        {
            id: 1,
            text: 'learn redux',
            status: 1
        },
        {
            id: 2,
            text: 'understand react, understand react, understand react',
            status: 0
        },
        {
            id: 3,
            text: 'learn es6, learn es6, learn es6, learn es6, learn es6,learn es6, learn es6, learn es6',
            status: 1
        },
        {
            id: 4,
            text: 'Array operator',
            status: 2
        },
        {
            id: 5,
            text: 'Laravel',
            status: 2
        }
    ]
}

const store = createStore(rootReducer, defaultStore)

export default store