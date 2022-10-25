import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from 'react-router-dom';
import { useState } from "react"
import { logout } from "../../store/session";
import { login, clearSessionErrors } from "../../store/session";
import Opus from '../../assets/navbar/Opus.png'
import Modal from "../../Modal/Modal";
import "./navbar.css"
import './loginModal.css'



function NavBar(){
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loggedIn = useSelector(state => !!state.session.user);
  const errors = useSelector(state => state.errors.session);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({email, password}));
  }
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setPassword('')
    setEmail('')
    dispatch(clearSessionErrors());
  }

  return (
    <>
      <div className="topnav">
          <div className="topnav-home-container">
            <NavLink className="nav-homelink"to="/"></NavLink>
            <img className="nav-home-img" src={Opus} alt="" />
          </div>
          <div className="topnav-create-container">
            <NavLink className="nav-navlink" to="/">Create</NavLink>
          </div>
          <div className="topnav-explore-container">
            <NavLink className="nav-navlink" to="/">Explore</NavLink>
          </div>
          <div className="topnav-search-container">
            SEARCHBAAAR
          </div>
          <div className="topnav-login-container">
              <button className="nav-login-button" onClick={e => setModalOpen(true)}>Login</button>
              <Modal modalOpen={modalOpen} modalClose={handleModalClose}>
                <div className="login-Modal">
                  <div className="golden-stripe"></div>
                  <div className="login-Modal-logo"></div>
                  <form className="login-form" onSubmit={handleSubmit}>
                    <label className="login-label">Email
                      <div className="errors">{errors?.email}</div>
                      <input 
                        className="login-input" 
                        type="text" value={email} 
                        onChange={e => setEmail(e.target.value)}>
                      </input>
                    </label>
                    <label className="login-label">Password
                      <div className="errors">{errors?.password}</div>
                      <input className="login-input" type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      ></input>                    
                      </label>
                    <div className="login-register-div">
                      <label className="login-register-txt">Don't have an account?</label>
                      <label className="login-register-btn"> Register</label>
                    </div>
                    <input className="login-submit" type="submit" value="Login"/>
                  </form>
                  <button className="login-demo">Demo User</button>
                </div>
              </Modal>
          </div>
      </div>
    </>
  );
}

export default NavBar;