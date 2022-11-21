import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import './UserProfile.css'
import profilePic from '../../assets/profile/goat.jpeg'
import editCamera from '../../assets/profile/cameratrans.png'
import { fetchUser, getUser, updateBio } from "../../store/users";
import { useHistory, useParams } from "react-router-dom";
import { uploadPic } from "../../store/pics";
import { fetchBooks } from "../../store/books";

const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session.user);
    const [booksLoaded, setBooksLoaded] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const [buttonText, setButtonText] = useState("edit");
    const [bio, setBio] = useState(user ? user.bio : "");
    const [editBioText, setEditBioText] = useState(user ? user.bio : "");
    let profileOwner = true;

    const books = useSelector(({books}) => books ? () => {
        let allBooks = [];
        for (const id in books) {
            if(books[id].user === userId){
                allBooks.push(books[id]);
            }
          }
          return allBooks;
    } : [])()


    let privateBooksArr = [];
    let publicBooksArr = [];

    Object.values(books).forEach((book) => {
        if (!book.public) {
          privateBooksArr.push(book);
        } else{
            publicBooksArr.push(book);
        }
    })

    const privateBooks = privateBooksArr.map((book) => (
        <div className="books-index-div-user private-books" key={book._id}>
            <div className="books-index-cover-user" onClick={() => history.push(`/books/${book._id}`)} style={{ backgroundColor: book.coverColor }}>
                <div className="books-index-spine-user"></div>
                <div className="books-index-text-container-user">
                    <div className="books-index-title-user">{book.title}</div>
                    <div className="books-index-genre-user">genre: {book.genre}</div>
                    {/* {Object.keys(users).forEach((user) => {if (book.user === users[user]._id) {authorName = users[user].username}})} */}
                    <div className="books-index-author-user">Author: "blah"</div>
                </div>
            </div>
        </div>
    ));

    const publicBooks = publicBooksArr.map((book) => (
        <div className="books-index-div-user public-books" key={book._id}>
            <div className="books-index-cover-user" onClick={() => history.push(`/books/${book._id}`)} style={{ backgroundColor: book.coverColor}}>
                <div className="books-index-spine-user"></div>
                <div className="books-index-text-container-user">
                    <div className="books-index-title-user">{book.title}</div>
                    <div className="books-index-genre-user">genre: {book.genre}</div>
                    {/* {Object.keys(users).forEach((user) => {if (book.user === users[user]._id) {authorName = users[user].username}})} */}
                    <div className="books-index-author-user">Author: "blah"</div>
                </div>
            </div>
        </div>
    ));

    const allBooks = books.map((book) => (
        <div className="books-index-div-user all-books" key={book._id}>
            <div className="books-index-cover-user" onClick={() => history.push(`/books/${book._id}`)} style={{ backgroundColor: book.coverColor }}>
                <div className="books-index-spine-user"></div>
                <div className="books-index-text-container-user">
                    <div className="books-index-title-user">{book.title}</div>
                    <div className="books-index-genre-user">genre: {book.genre}</div>
                    {/* {Object.keys(users).forEach((user) => {if (book.user === users[user]._id) {authorName = users[user].username}})} */}
                    <div className="books-index-author-user">Author: "blah"</div>
                </div>
            </div>
        </div>
    ));

    const handleAll = () => {
        document.querySelector(".all").style.color = "blue";
        document.querySelector(".public").style.color = "black";
        document.querySelector(".private").style.color = "black";
        document.querySelector(".all-container").style.display = "grid";
        document.querySelector(".private-container").style.display = "none";
        document.querySelector(".public-container").style.display = "none";
    }

    const handlePublic = () => {
        document.querySelector(".public").style.color = "blue";
        document.querySelector(".all").style.color = "black";
        document.querySelector(".private").style.color = "black";
        document.querySelector(".public-container").style.display = "grid";
        document.querySelector(".private-container").style.display = "none";
        document.querySelector(".all-container").style.display = "none";
    }

    const handlePrivate = () => {
        document.querySelector(".private").style.color = "blue";
        document.querySelector(".public").style.color = "black";
        document.querySelector(".all").style.color = "black";
        document.querySelector(".private-container").style.display = "grid";
        document.querySelector(".public-container").style.display = "none";
        document.querySelector(".all-container").style.display = "none";
    }

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

    if (!sessionUser || sessionUser._id !== userId){
        profileOwner = false;
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
                            {profileOwner ? <div className="profile-picture-edit-container">
                                <img src={editCamera} className="camera" alt="camera" onClick={cameraClick}/>
                                <input className="cameraInput" type="file" onChange={picSubmit}/>
                            </div> : ""}
                        </div>
                        <div className="profile-bio-wrapper">
                            <div className="profile-bio-container">
                                <div className="profile-bio-heading-container">  
                                    <div className="username">{user.username}</div>   
                                    {profileOwner ?
                                    <div className="profile-edit-button-container">
                                        <button className="profile-edit-button" onClick={handleClick}>
                                            {buttonText}
                                        </button>
                                    </div> : ""}
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
                {profileOwner ? 
                    <div className="books-content">
                        <div className="user-profile-select-books"><div className="choice all" onClick={handleAll}>All</div> | <div className="choicepublic" onClick={handlePublic}>Public</div> | <div className="choice private" onClick={handlePrivate}>Private</div></div>
                        <div className="books all-container">
                            {allBooks}
                        </div>
                        <div className="books public-container">
                            {publicBooks}
                        </div>
                        <div className="books private-container">
                            {privateBooks === [] ? privateBooks : <div className="not-found">no books found</div>}
                        </div>
                    </div> 
                    :   
                    <div className="books-content">
                        <div className="user-profile-select-books"><div className="only-books">Books</div></div>
                        <div className="books all-container">
                            {publicBooks}
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default UserProfile;