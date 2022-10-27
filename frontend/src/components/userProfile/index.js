import React from "react"
import './UserProfile.css'
import profilePic from '../../assets/profile/goat.jpeg'
import editCamera from '../../assets/profile/cameratrans.png'


const UserProfile = ()=>{
    return(
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
                        <h2>Av1sek</h2>
                            <div className="profile-edit-button-container">
                                <button className="profile-edit-button">
                                    edit
                                </button>
                            </div>
                        </div>
                    <div className="profile-bio-text-container">
                      hello the text goes here
                    </div>
                </div>
            </div>
        </div>
        <div className="spacing-top"></div>
        </div>
    </>
    )
}

export default UserProfile;