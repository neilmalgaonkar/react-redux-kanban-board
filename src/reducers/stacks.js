import update from 'react/lib/update';

export default function stacks(state = [], action) {
    switch(action.type) {
        case 'REORDER_STACK':
            let movedStack = state[action.currentIndex]

            let newState = update(state, {
                $splice: [
                    [action.currentIndex, 1],
                    [action.newIndex, 0, movedStack]
                ]
            })
            return update(state, {
                $splice: [
                    [action.currentIndex, 1],
                    [action.newIndex, 0, movedStack]
                ]
            })
        default:
            return state
    }
}