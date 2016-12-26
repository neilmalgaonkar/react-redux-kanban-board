import React, { Component, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HHTML5Backend from 'react-dnd-html5-backend'

import Board from './Board'

class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Board {...this.props}/>
            </div>
        )
    }
}

export default DragDropContext(HHTML5Backend)(Main)