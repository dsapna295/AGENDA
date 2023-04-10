import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    const [logged, status] = useState(false)
    const [user, Uuser] = useState('')
    useEffect(() => {
        fetch('/api/isLogged').then(res => res.json()).then(data => {
            if (data.status) { status(true); Uuser(data.user) }
            else status(false)
        })
    }, [])
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> Agenda </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        {logged ? (<>
                            <li className="nav-item">
                                <span className="nav-link">{user}</span>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='#' onClick={() => ('/api/logout').then(res => res.text()).then(data =>
                                    document.location.replace('/login'))}>Logout</Link>
                            </li>
                        </>) :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/register'>
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/login'>
                                        Login
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
