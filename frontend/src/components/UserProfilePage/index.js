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
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(getUser(userId));
    const [bio, setBio] = useState(user ? user.bio : " ");
    const [bookLoaded, setBookLoaded] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const [buttonText, setButtonText] = useState("edit")
    const [editClicked, setEditClick] = useState(false);
    const [text, setText] = useState(user ? user.bio : " ")
    const displayingBio = useRef();

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
        dispatch(fetchBooks()).then(() => setBookLoaded(true));
      }, []);

    useEffect(() => {
        dispatch(fetchUser(userId)).then(() => setUserLoaded(true));
    }, []);


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


    return bookLoaded && userLoaded && (
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
                            
                                <div className="profile-edit-button-container">
                                    <button className="profile-edit-button" onClick={picSubmit}>
                                        {buttonText}
                                    </button>
                                </div>
                            </div>
                        <div className="profile-bio-text-container">
                        { text ? text : "" }

                        { editClicked ? 
                            <form onSubmit={handleSubmit}>
                                <textarea className="profile_edit_textarea" 
                                    // value={bio}
                                    onChange={e => setBio(e.target.value)}>
                                </textarea>
                                <button type="submit">update bio</button>
                            </form> :
                            ''}
                        </div>
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