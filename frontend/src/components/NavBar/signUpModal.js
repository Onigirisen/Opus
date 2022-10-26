import './signupModal.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSessionErrors } from "../../store/session";
import { signup } from '../../store/session';
import { login } from "../../store/session";
import { logout } from "../../store/session";

export const SignUpModal = () => {
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false);
    const [username, setUsername] = useState('');
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
        dispatch(signup({username, email, password}));
    }

    const handleDemo = (e) => {
        dispatch(login({email: 'demo@user.io', password: 'password'}))
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
    return(
            <div className="signUp-Modal">
                <div className="golden-stripe"></div>
                <div className="login-Modal-logo"></div>
                <form className="login-form" onSubmit={handleSubmit}>
                <label className="login-label">
                    <div className="errors">{errors?.username}</div>
                    <input
                    className="login-input"
                    type="text" value={username}
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    ></input>
                </label>
                <label className="login-label">
                    <div className="errors">{errors?.email}</div>
                    <input 
                    className="login-input" 
                    type="text" value={email} 
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}>
                    </input>
                </label>
                <label className="login-label">
                    <div className="errors">{errors?.password}</div>
                    <input className="login-input" type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    ></input>                    
                    </label>
                <input className="login-submit" type="submit" value="Sign Up"/>
                </form>
                <button className="login-demo" onClick={handleDemo}>Demo User</button>
            </div>
    );

}