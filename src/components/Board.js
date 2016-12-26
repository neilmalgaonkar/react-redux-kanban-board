import React, { Component, PropTypes } from 'react'


import CardStack from './CardStack'

class Board extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="main-board">
                <CardStack title="Backlog" status="0" {...this.props}/>
                <CardStack title="In-progress" status="1" {...this.props}/>
                <CardStack title="Done" status="2" {...this.props}/>
            </div>
        )
    }
}

export default Board