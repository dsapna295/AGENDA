import React from 'react'
import { createContext, useState } from 'react'
import CreateNote from './CreateNote'
import Nav from './Nav'
import Shownotes from './Shownotes'

export const userContext = createContext()
const Home = () => {
  const [atype, updateType] = useState('danger')
  const [message, umessage] = useState('')
  const [alert, ualert] = useState({ display: 'none' })
  const [noteUpdate, runNoteUpdate] = useState(0)
  return (
    <div className="container">
      <userContext.Provider value={{ updateType, umessage, ualert, runNoteUpdate, noteUpdate }}>
        <Nav />
        <div className={`alert alert-${atype}`} role="alert" style={alert}>
          {message}
        </div>
        <CreateNote />
        <Shownotes />
      </userContext.Provider>
    </div>
  )
}

export default Home