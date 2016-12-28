import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import ItemTypes from './../Constants'
import { DragSource, DropTarget } from 'react-dnd'

const dragSource = {
    beginDrag: function(props, monitor, component) {
        let dragComponentRect = findDOMNode(component).getBoundingClientRect()
        let dragComponentHeight = dragComponentRect.bottom - dragComponentRect.top

        return {
            task: props.task,
            index: props.index,
            componentHeight: dragComponentHeight
        }
    },
    endDrag: function(props, monitor, component) {
        let draggedItem = monitor.getItem()
        let dropResult = monitor.getDropResult()
        if(dropResult.dropType === 'stack') {
            if(dropResult != null)
                props.moveCardTo(props.index, dropResult.status)
        } else {
            if(dropResult != null) {
                props.reorderCard(dropResult.targetIndex, draggedItem.index)
            }
        }
    },
    isDragging: function(props, monitor) {
        return props.task.id === monitor.getItem().task.id
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
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

class Card extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { connectDragSource, isDragging, connectDropTarget } = this.props
        return connectDropTarget(connectDragSource(
            <div className={`card-container ${(isDragging) ? 'dragging' : ''}`}>
                <div className="card">
                    <p>{this.props.task.text}</p>
                </div>
            </div>
        ))
    }
}

Card.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
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
)(Card)