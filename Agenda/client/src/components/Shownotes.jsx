import React from 'react'
import Note from './Note'
const Shownotes = () => {
    return (
        <div className="card mt-5 mb-5">
            <div className="card-body">
                <h3>Notes</h3>
                <div className="d-flex" style={{ flexWrap: 'wrap' }}>
                    <Note />
                </div>

            </div>
        </div>

    )
}

export default Shownotes