import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './UserProfile.css'
import profilePic from '../../assets/profile/goat.jpeg'
import editCamera from '../../assets/profile/cameratrans.png'
import { fetchUser, getUser, updateBio } from "../../store/users";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(getUser(userId));
    const [bio, setBio] = useState(user ? user.bio : " ");
    const [loaded, setLoaded] = useState(false);
    const [buttonText, setButtonText] = useState("edit")
    const [editClicked, setEditClick] = useState(false);
    const [text, setText] = useState(user ? user.bio : " ")
    const displayingBio = useRef();

    useEffect(() => {
        dispatch(fetchUser(userId)).then(() => {
            setLoaded(true);
            displayingBio.current = true;
        });
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchUser(userId))
        if (displayingBio.current === true) {
            setBio(user.bio);
            setText(user.bio);
        }
    }, [displayingBio.current])


    const handleClick = (e) => {
        if (buttonText === "edit"){
            setButtonText("cancel");
            setText("");
        } else {
            setButtonText("edit");
            setText(user.bio);
        }
        setEditClick(!editClicked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditClick(false);
        setButtonText("edit");
        dispatch(updateBio(userId, bio));
        setText(bio)
        //dispatch(getCurrentUser)
    }

    return loaded && (
        <>
        <div className="body-container">
        <div className="spacing-top">
        </div>
    <div className="profile-body-container">
        <div className="profile-picture-wrapper">
            <div className="profile-picture-container">
                <img src={profilePic} alt="" />
            </div>
            <div className="profile-picture-edit-container">
                <img src={editCamera} alt=""/>
            </div>
        </div>
            <div className="profile-bio-wrapper">
                <div className="profile-bio-container">
                    <div className="profile-bio-heading-container">
                        <h2>{user.username}</h2>
                            <div className="profile-edit-button-container">
                                <button className="profile-edit-button" onClick={handleClick}>
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    <div className="profile-bio-text-container">
                    { text ? text : "" }

                    { editClicked ? 
                        <form onSubmit={handleSubmit}>
                            <textarea className="profile_edit_textarea" 
                                value={bio}
                                onChange={e => setBio(e.target.value)}>
                            </textarea>
                            <button type="submit">update bio</button>
                        </form> :
                         ''}
                    </div>
                </div>
            </div>
 
        </div>
            <div className="spacing-top"></div>
        </div>
        <div className="user-profile-books">
            <div className="user-profile-select-books">All | Public | Private </div>
        </div>
    </>
    )
}

export default UserProfile;