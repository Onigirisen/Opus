import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from 'react-router-dom';
import { useState } from "react"
import { logout } from "../../store/session";
import Opus from '../../assets/navbar/Opus.png'
import { LoginModal } from "./loginModal";
import Modal from "../../Modal/Modal";
import "./navbar.css"

function NavBar(){
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false);
  const loggedIn = useSelector(state => !!state.session.user);

  const logoutUser = e => {
      e.preventDefault();
      setModalOpen(false);
      dispatch(logout());
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

  return (
    <>
      <div className="topnav">
          <div className="topnav-home-container">
            <NavLink className="nav-homelink"to="/"></NavLink>
            <img className="nav-home-img" src={Opus} alt="" />
          </div>
          <div className="topnav-create-container">
            <NavLink className="nav-navlink" to="/book/create">Create</NavLink>
          </div>
          <div className="topnav-explore-container">
            <NavLink className="nav-navlink" to="/book">Explore</NavLink>
          </div>
          <div className="topnav-profile-container">
            {loggedIn ? 
            <NavLink className="nav-navlink" to="/profile">Profile</NavLink> : 
            <div className="nav-navlink" onClick={e => setModalOpen(true)}>Profile</div>
            }
          </div>
          <div className="topnav-login-container">
            {loggedIn ? 
              <button className="nav-login-button" onClick={logoutUser}>Logout</button> : 
              <button className="nav-login-button" onClick={e => setModalOpen(true)}>Login</button> }
              <Modal modalOpen={modalOpen && !loggedIn} modalClose={handleModalClose}>
                <LoginModal></LoginModal>
              </Modal>
          </div>
      </div>
    </>
  );
}

export default NavBar;