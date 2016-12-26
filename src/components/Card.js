import React, { Component, PropTypes } from 'react'
import ItemTypes from './../Constants'
import { DragSource, DropTarget } from 'react-dnd'

const dragSource = {
    beginDrag: function(props, monitor, component) {
        return {
            task: props.task,
            index: props.index
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
        // console.log(monitor)
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
        // console.log(monitor)
    }
}

function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Card extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { connectDragSource, isDragging, connectDropTarget } = this.props
        return connectDropTarget(connectDragSource(
            <div className="card">
                <p>{this.props.task.text}</p>
                {/*<div className="btn-cont">
                    <button onClick={(e) => this.props.moveCardTo(this.props.index, 0)}>Backlog</button>
                    <button onClick={(e) => this.props.moveCardTo(this.props.index, 1)}>In-progress</button>
                    <button onClick={(e) => this.props.moveCardTo(this.props.index, 2)}>Done</button>
                </div>*/}
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