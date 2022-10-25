import { useDispatch, useSelector } from "react-redux";
import "./navbar.css"



function NavBar(){
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch
  
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const getLinks = () => {
      if (loggedIn) {
        return (
          <div className="links-nav">
            <Link to={'/'}>test</Link>
            <Link to={'/'}>test</Link>
            <Link to={'/'}>test</Link>
            <button onClick={logoutUser}>Logout</button>
          </div>
        );
      } else {
        return (
          <div className="links-auth">
            <Link to={'/signup'}>Signup</Link>
            <Link to={'/login'}>Login</Link>
          </div>
        );
      }
    }

    return (
      <>
        <h1>Chirper</h1>
        <h2>hello</h2>
        { getLinks() }
      </>
    );
}

// <div class="topnav">
//     <div class="topnav-home-button">
//         <img src="Opus.png" alt="">
//     </div>
//     <div class="topnav-create-container">
//         create
//     </div>
//     <div class="topnav-explore-container">
//         explore
//     </div>
//     <div class="topnav-search-container">
//         search bar
//     </div>
//     <div class="topnav-login-container">
//         login
//     </div>
// </div>

export default NavBar;