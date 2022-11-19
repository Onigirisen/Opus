import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './UserProfile.css'
import profilePic from '../../assets/profile/goat.jpeg'
import editCamera from '../../assets/profile/cameratrans.png'
import { fetchUser, getUser, updateBio } from "../../store/users";
import { useParams } from "react-router-dom";
import { uploadPic } from "../../store/pics";
import { fetchBooks } from "../../store/books";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));
    const [booksLoaded, setBooksLoaded] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const [buttonText, setButtonText] = useState("edit");
    const [bio, setBio] = useState(user ? user.bio : "");
    const [editBioText, setEditBioText] = useState(user ? user.bio : "");

    const books = useSelector(({books}) => books ? () => {
        let allBooks = [];
        for (const id in books) {
            if(books[id].user === userId){
                allBooks.push(books[id]);
            }
          }
          return allBooks;
    } : [])()

    useEffect(() => {
        dispatch(fetchBooks()).then(() => setBooksLoaded(true));
        dispatch(fetchUser(userId)).then(() => setUserLoaded(true));
    }, []);

    useEffect(() => {
        if(user){
            setBio(user.bio);
            setEditBioText(user.bio)
        }
    }, [user]);

    const handleClick = () => {
        if (buttonText === "edit"){
            setButtonText("cancel");
            document.querySelector(".bio").style.display = "none";
            document.querySelector(".profile_edit_textarea").style.display = "block";
            document.querySelector(".bio-submit-button").style.display = "block";
        } else{
            setButtonText("edit");
            setEditBioText(bio);
            document.querySelector(".bio").style.display = "block";
            document.querySelector(".profile_edit_textarea").style.display = "none";
            document.querySelector(".bio-submit-button").style.display = "none";
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBio(editBioText);
        document.querySelector(".bio").innerHTML = editBioText;
        dispatch(updateBio(userId, editBioText));
        setButtonText("edit");
        document.querySelector(".profile_edit_textarea").style.display = "none";
        document.querySelector(".bio-submit-button").style.display = "none";
        setTimeout(delay, 100);
    }

    const delay = () => {
        document.querySelector(".bio").innerHTML = editBioText;
        setBio(editBioText);
        document.querySelector(".bio").style.display = "block";
    }

    const cameraClick = (e) => {
        document.querySelector(".cameraInput").click();
    }

    const picSubmit = async (e) => {
        await dispatch(uploadPic({
            pic: e.currentTarget.files[0],
            uploaderId: user._id
        }))
        setTimeout(refresh, 1000);
    }

    const refresh = () => {
        window.location.reload();
    }

    return booksLoaded && userLoaded && (
        <>
            <div className="body-container">
                <div className="spacing-top"></div>
                    <div className="profile-body-container">
                        <div className="profile-picture-wrapper">
                            <div className="profile-picture-container">
                                {/* <img src={user.profilePictureUrl} alt="profile picture" /> */}
                            </div>
                            <div className="profile-picture-edit-container">
                                <img src={editCamera} className="camera" alt="camera" onClick={cameraClick}/>
                                <input className="cameraInput" type="file" onChange={picSubmit}/>
                            </div>
                        </div>
                        <div className="profile-bio-wrapper">
                            <div className="profile-bio-container">
                                <div className="profile-bio-heading-container">  
                                    <div>{user.username}</div>   
                                    <div className="profile-edit-button-container">
                                        <button className="profile-edit-button" onClick={handleClick}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="profile-bio-text-container"><div className="bio">{bio}</div><textarea className="profile_edit_textarea" value={editBioText} onChange={e => {setEditBioText(e.target.value)}}></textarea></div>
                                        <button className="bio-submit-button">update bio</button>
                                    </form>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="user-profile-books">
                <div className="books-content">
                    <div className="user-profile-select-books">All | Public | Private </div>
                    <div className="books">
                        {books[0].title}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;