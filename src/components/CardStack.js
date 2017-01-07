import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'

import ItemTypes from './../Constants'
import { DragSource, DropTarget } from 'react-dnd'

import Card from './Card'

let dir = "default"

const dropTarget = {
    drop(props, monitor, component) {
        if(!monitor.didDrop()) {
            return {
                dropType: 'stack',
                status: props.status
            }
        } else {
            return monitor.getDropResult()
        }
    },
    hover(props, monitor, component) {
        let dragItem = monitor.getItem()
        let containerStatus = props.status

        if(containerStatus != dragItem.task.status) {
            props.moveCard(dragItem.index, containerStatus)
        }   
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

const stackDragSource = {
    beginDrag: function(props, monitor, component) {
        let stack = props.stacks[props.stackIndex]
        return {
            stackIndex: props.stackIndex,
            stack
        }
    },
    endDrag: function(props, monitor, component) {
        if(monitor.didDrop()) {
            let result = monitor.getDropResult()
            let item = monitor.getItem()
            props.reorderStack(result.stackIndex, item.stackIndex)
        }
    },
    isDragging: function(props, monitor) {
        return props.stack.id == monitor.getItem().stack.id
    }
}

function stackDragCollect(connect, monitor) {
    return {
        connectStackDragSource: connect.dragSource(),
        isStackDragging: monitor.isDragging()
    }
}

const stackDropTarget = {
    drop(props, monitor, component) {
        return {
            stackIndex: props.stackIndex,
            status: props.status
        }
    },
    hover(props, monitor, component) {
        let dragItem = monitor.getItem()
        let dragItemIndex = dragItem.stackIndex
        let dropItemIndex = props.stackIndex
        if(dragItemIndex == dropItemIndex) {
            return
        }

        let hoverComponent = findDOMNode(component)
        let hoverComponentRect = hoverComponent.getBoundingClientRect()
        let dragItemClientOffset = monitor.getClientOffset()
        let hoverComponentWidth = hoverComponentRect.right - hoverComponentRect.left
        let hoverComponentMiddle = hoverComponentWidth / 2
        let hoverClientX = dragItemClientOffset.x - hoverComponentRect.left

        if(dragItemIndex < dropItemIndex && hoverClientX < hoverComponentMiddle) {
            return
        }

        if(dragItemIndex > dropItemIndex && hoverClientX > hoverComponentMiddle) {
            return
        }

        props.reorderStack(dropItemIndex, dragItemIndex)
        monitor.getItem().stackIndex = dropItemIndex
    }
}

function stackDropCollect(connect, monitor) {
    return {
        connectStackDropSource: connect.dropTarget(),
        isStackDropOver: monitor.isOver()
    }
}

class CardStack extends Component {
    constructor(props) {
        super(props)
    }

    _renderCards() {
        return this.props.tasks.map((task, index) => {
            if(task.status == this.props.status)
                return <Card task={task} key={task.id} index={index} moveCardTo={this.moveCardTo.bind(this)} {...this.props}/>
        })
    }

    moveCardTo(id, status) {
        this.props.moveCard(id, status)
    }

    render() {
        const { connectDropTarget, isOver, connectStackDragSource, connectStackDropSource, isStackDragging } = this.props
        return connectStackDropSource(connectStackDragSource(connectDropTarget(
            <div className={`card-stack-container ${(isStackDragging) ? 'dragging' : ''}`}>
                <div className="card-stack">
                    <h1 className="stack-header">{this.props.title}</h1>
                    {this._renderCards()}
                </div>
            </div>
        )))
    }
}

CardStack.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectStackDragSource: PropTypes.func.isRequired,
    connectStackDropSource: PropTypes.func.isRequired,
    isStackDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    isStackDropOver: PropTypes.bool.isRequired,
    tasks: PropTypes.array.isRequired
}

export default _.flow(
    DragSource(ItemTypes.STACK, stackDragSource, stackDragCollect),
    DropTarget(ItemTypes.STACK, stackDropTarget, stackDropCollect),
    DropTarget(ItemTypes.CARD, dropTarget, collect)
)(CardStack)