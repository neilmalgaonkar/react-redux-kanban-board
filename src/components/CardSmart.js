import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import ItemTypes from './../Constants'
import { DragSource, DropTarget } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import CardDumb from './CardDumb'


const dragSource = {
    beginDrag: function(props, monitor, component) {
        let dragComponentRect = findDOMNode(component).getBoundingClientRect()
        let dragComponentHeight = dragComponentRect.bottom - dragComponentRect.top
        let dragComponentWidth = dragComponentRect.right - dragComponentRect.left

        return {
            task: props.task,
            index: props.index,
            componentHeight: dragComponentHeight,
            componentWidth: dragComponentWidth
        }
    },
    endDrag: function(props, monitor, component) {
        let draggedItem = monitor.getItem()
        let dropResult = monitor.getDropResult()
        if(dropResult !== null) {
            if(dropResult.dropType === 'stack') {
                if(dropResult != null)
                    props.moveCardTo(props.index, dropResult.status)
            } else {
                if(dropResult != null) {
                    props.reorderCard(dropResult.targetIndex, draggedItem.index)
                }
            }
        }
    },
    canDrag: function(props, monitor) {
        if(props.stack.locked) {
            return false
        }
        return true
    },
    isDragging: function(props, monitor) {
        return props.task.id === monitor.getItem().task.id
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

const dropTarget = {
    drop(props, monitor, component) {
        return {
            dropType: 'reorder', 
            targetIndex: props.index
        }
    },
    hover(props, monitor, component) {
        let dragItem = monitor.getItem()
        let dragItemIndex = dragItem.index
        let dropItemIndex = props.index

        if(dropItemIndex === dragItemIndex) {
            return
        }

        let hoverComponent = findDOMNode(component)
        let hoverComponentRect = hoverComponent.getBoundingClientRect()
        let dragItemClientOffset = monitor.getClientOffset()
        let hoverComponentHeight = hoverComponentRect.bottom - hoverComponentRect.top
        let hoverComponentMiddle = hoverComponentHeight / 2
        let hoverClientY = dragItemClientOffset.y - hoverComponentRect.top

        if(dragItemIndex < dropItemIndex && hoverClientY < hoverComponentMiddle) {
            return
        }

        if(dragItemIndex > dropItemIndex && hoverClientY > hoverComponentMiddle) {
            return
        }

        props.reorderCard(dropItemIndex, dragItemIndex)
        monitor.getItem().index = dropItemIndex
    }
}

function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class CardSmart extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.connectDragPreview(getEmptyImage(), {
        //     captureDraggingState: true
        // })
    }

    render() {
        const { connectDragSource, isDragging, connectDropTarget } = this.props
        return connectDropTarget(connectDragSource(
            <div><CardDumb isDragging={isDragging} task={this.props.task}/></div>
        ))
    }
}

CardSmart.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveCardTo: PropTypes.func.isRequired
}

// export default DragSource(ItemTypes.CARD, dragSource, collect)(Card)
export default _.flow(
    DropTarget(ItemTypes.CARD, dropTarget, dropCollect),
    DragSource(ItemTypes.CARD, dragSource, collect)
)(CardSmart)