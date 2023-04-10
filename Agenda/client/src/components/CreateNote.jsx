import React from "react"
import { useContext, useState } from "react"
import { userContext } from "./Home"

const CreateNote = () => {
    const { updateType, umessage, ualert, runNoteUpdate } = useContext(userContext)
    const [title, updateTitle] = useState('')
    const [note, updateNote] = useState('')
    const sendMessage = (text, type = 'danger', time = 5) => {
        updateType(type); umessage(text); ualert({ display: 'block' })
        setTimeout(() => {
            ualert({ display: 'none' })
        }, time * 1000)
    }
    const submit = e => {
        e.preventDefault()
        if (title.length < 3 || note.length < 3) return sendMessage('Please fill all details correctly')
        fetch('/api/createNote', { method: 'POST', body: JSON.stringify({ title, note }), headers: { 'Content-Type': 'application/json' } }).then(
            res => res.json()).then(data => {
                if (data.status) {
                    sendMessage(data.message, 'success'); runNoteUpdate(prev => prev + 1);
                    updateTitle(''); updateNote('')
                }
                else sendMessage(data.message)
            })
    }
    return (
        <div className="card">
            <div className="card-body">
                <h3>Create Note</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={e => updateTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="note" className="form-label">Note</label>
                        <textarea className="form-control" id="note" value={note} onChange={e => updateNote(e.target.value)} rows="3"></textarea>
                    </div>
                    <button onClick={e => submit(e)} className="btn btn-primary">Create Note</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNote