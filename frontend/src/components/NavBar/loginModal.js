import './loginModal.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSessionErrors } from "../../store/session";
import { login } from "../../store/session";
import { SignUpModal } from './signUpModal';


export const LoginModal = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSignUp, setOpenSignUp] = useState(false)
    const errors = useSelector(state => state.errors.session);

    useEffect(() => {
        return () => {
        dispatch(clearSessionErrors());
        };
    }, [dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({email, password}))
    }
    
    const handleDemo = (e) => {
        dispatch(login({email: 'demo@user.io', password: 'password'}))
    }

    if (!openSignUp) {
        return(
                <div className="login-Modal">
                    <div className="golden-stripe"></div>
                    <div className="login-Modal-logo"></div>
                    <form className="login-form" onSubmit={handleSubmit}>
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
                    <div className="login-register-div">
                        <label className="login-register-txt">Don't have an account?</label>
                        <label className="login-register-btn" onClick={() => setOpenSignUp(true)}> Register</label>
                    </div>
                    <input className="login-submit" type="submit" value="Login"/>
                    </form>
                    <button className="login-demo" onClick={handleDemo}>Demo User</button>
                </div>
        );
    } else {
        return (<SignUpModal></SignUpModal>)
    }
}