import Link from 'next/link';
import React from 'react';
const Navbar = ({ userSessionState, onLogout }) => {

  const handleClick = () => {
    onLogout("Olá, Pai! Esta é uma mensagem do filho para deslogar");
  };

  return (
    <nav className="navbar" aria-label="First navbar example">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">GrafMusic</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample01">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <a  className="nav-link" href="/about">About</a>
            </li>
            {userSessionState.status === 'authenticated' ? (
              <li className="nav-item">
                <a onClick={handleClick} className="nav-link" type='button'>Logout</a>
              </li>
            ) : null} 

          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
