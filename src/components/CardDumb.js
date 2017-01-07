import React from 'react'

export default function CardDumb(props) {
    return (
        <div className={`card-container ${(props.isDragging) ? 'dragging' : ''}`}>
            <div className="card">
                <p>{props.task.text}</p>
            </div>
        </div>
    )
}