import { useDispatch, useSelector } from "react-redux";
import './UserProfile.css'
import profilePic from '../../assets/profile/goat.jpeg'
import editCamera from '../../assets/profile/cameratrans.png'
import { uploadProfilePicture } from "../../store/users";

const UserProfile = ()=>{
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const handleCameraClick = () => {
        document.querySelector(".profile-picture-input").click();
    };

    // const convertPicToFormData = () => {
    //     debugger
    //     dispatch(
    //         uploadProfilePicture({
    //             pic,
    //             uploaderId: currentUser._id
    //     }))
    // }

    const handleClick = (e) => {
        debugger
        //(e.currentTarget.files[0]);

        dispatch(
            uploadProfilePicture({
                pic: (e.currentTarget.files[0]),
                uploaderId: currentUser._id
        }))
    }


    return(
    <>
        <div className="spacing-top">
        </div>
    <div className="profile-body-container">``
        <div className="profile-picture-wrapper">
            <div className="profile-picture-container">
                <img src={profilePic} alt="" />
            </div>
            <form className="profile-picture-edit-container">
                 <img className="profile-picture-camera-pic" src={editCamera} onClick={handleCameraClick} alt="camera"/>
                 <input className="profile-picture-input" type="file" onChange={handleClick}/>
            </form>
        </div>
            <div className="profile-bio-wrapper">
                <div className="profile-bio-container">
                    <div className="profile-bio-heading-container">
                        <h2>{currentUser.username}</h2>
                            <div className="profile-edit-button-container">
                                <button className="profile-edit-button">
                                    edit
                                </button>
                            </div>
                        </div>
                    <div className="profile-bio-text-container">
                      {currentUser.bio}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default UserProfile;