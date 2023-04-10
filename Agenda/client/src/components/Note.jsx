import React, { memo, useEffect, useState } from 'react'
import { useContext } from 'react'
import { userContext } from './Home'

const Note = () => {
    const { noteUpdate } = useContext(userContext)
    const [dataa, udata] = useState([])
    useEffect(() => {
        fetch('/api/getNote').then(res => res.json()).then(data => { if (data.status) udata(data) })
    }, [noteUpdate])
    return (
        <>
            {dataa === [] ? console.log(dataa) :
                dataa.map(e =>
                    <div className="card mx-3 mt-3" style={{ width: '30%', background: 'rgba(0,0,0,0.4)' }} key={e.note_id}>
                        <div className="card-body">
                            <h5 className="card-title">{e.title}</h5>
                            <span style={{ fontSize: '0.9rem' }} className="card-subtitle mb-2 text-body-secondary">{e.date}</span>
                            <p className="card-text">{e.note}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default memo(Note)