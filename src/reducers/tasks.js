import _ from 'lodash'
import update from 'react/lib/update';

export default function tasks(state = [], action) {
    let newState = []
    switch(action.type) {
        case 'MOVE_CARD':
            newState = _.map(state, (task, index) => {
                if(index === action.index) {
                    task['status'] = action.status
                    return task
                }
                return task
            })
            return newState
        case 'REORDER_CARD':
            let movedCard = state[action.currentIndex]
            return update(state, {
                $splice: [
                    [action.currentIndex, 1],
                    [action.newIndex, 0, movedCard]
                ]
            })
        default:
            return state
    }
}