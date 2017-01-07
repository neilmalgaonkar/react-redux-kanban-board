import React, { Component, PropTypes } from 'react'


import CardStack from './CardStack'

class Board extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="main-board">
                {this.props.stacks.map((stack, index) => {
                    return <CardStack key={index} stackIndex={index} stack={stack} {...this.props}/>
                })}
            </div>
        )
    }
}

export default Board