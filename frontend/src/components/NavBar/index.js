import { useDispatch, useSelector } from "react-redux";
import "./navbar.css"
import { Link } from "react-router-dom";
import { logout } from "../../store/session";



function NavBar(){
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch
  
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
      <>
        <div className="topnav">
            <div className="topnav-home-button">
                <img src="http://localhost:3000/static/media/Opus.a63d74be1b462178414e.png" alt=""/>
            </div>
            <div className="topnav-create-container">
                create
            </div>
            <div className="topnav-explore-container">
                explore
            </div>
            <div className="topnav-search-container">
                search bar
            </div>
            <div className="topnav-login-container">
                login
            </div>
        </div>
      </>
    );
}

export default NavBar;