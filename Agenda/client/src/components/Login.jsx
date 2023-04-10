import React from "react"
import { useState } from "react"
import Nav from "./Nav"

const Login = () => {
  const [user, Uuser] = useState('')
  const [pass, Upass] = useState('')
  const [atype, updateType] = useState('danger')
  const [message, umessage] = useState('')
  const [alert, ualert] = useState({ display: 'none' })
  const sendMessage = (text, type = 'danger', time = 5) => {
    updateType(type); umessage(text); ualert({ display: 'block' })
    setTimeout(() => {
      ualert({ display: 'none' })
      if (type === 'success') { document.location.replace('/') }

    }, time * 1000)
  }
  const submit = e => {
    e.preventDefault()
    if (user.length < 3 || pass.length < 3) return sendMessage('Please fill the form correctly!!')
    fetch('/api/login', { method: 'POST', body: JSON.stringify({ user, pass }), headers: { 'Content-Type': 'application/json' } }).then(res => res.json()).then(data => {
      if (data.status) sendMessage(data.message, 'success')
      else sendMessage(data.message)
    })
  }
  return (
    <>
      <Nav />
      <div className="container">
        <div className={`alert alert-${atype}`} role="alert" style={alert}>
          {message}
        </div>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" onChange={e => Uuser(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="Password" onChange={e => Upass(e.target.value)} />
              </div>
              <button onClick={e => submit(e)} className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login 