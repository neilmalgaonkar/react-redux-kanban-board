import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import ItemTypes from './../Constants'
import { DropTarget } from 'react-dnd'

import Card from './Card'

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
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
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
        const { connectDropTarget, isOver } = this.props
        return connectDropTarget(
            <div className="card-stack">
                <h1 className="stack-header">{this.props.title}</h1>
                {this._renderCards()}
            </div>
        )
    }
}

CardStack.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    tasks: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired
}

export default DropTarget(ItemTypes.CARD, dropTarget, collect)(CardStack)