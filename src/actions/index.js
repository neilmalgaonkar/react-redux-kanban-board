export function moveCard(index, status) {
    return {
        type: 'MOVE_CARD',
        status,
        index
    }
}

export function reorderCard(newIndex, currentIndex) {
    return {
        type: 'REORDER_CARD',
        newIndex,
        currentIndex
    }
}

export function reorderStack(newIndex, currentIndex) {
    return {
        type: 'REORDER_STACK',
        newIndex,
        currentIndex
    }
}