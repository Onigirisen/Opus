import React from "react";
import './footer.css'
import giticon from '../../assets/footer/github.png'
import linkedin from '../../assets/footer/linkedin.png'
import angelicon from '../../assets/footer/angellist.png'

const Footer = ()=>{
    return(
        <>
         <div class="footer-navbar-container">
            <div footer-navbar-column>
                <div class="column">
                    devs
                </div>
                <div className="column">
                    <div className="drop-up-content">
                        <div className="link-list-container">
                            <div className="git-list-container">
                                <img className="giticon" src={giticon}/>
                                    <div className="git-text"> 
                                        Github
                                    </div>
                            </div>

                         <div className="linkedin-list-container">
                            <img className="linkedin" src={linkedin}/>
                            <div className="linkedin-text">
                            Linkedin
                            </div>
                        </div>
                         <div className="angel-list-container">
                             <img className="angel" src={angelicon}/>
                             <div className="angel-text">
                             AngelList
                             </div> 
                        </div>
                        </div>
                    </div>
                    david
                </div>

                
                <div className="column">
                    <div className="drop-up-content"><div className="link-list-container">
                            <div className="git-list-container">
                                <img className="giticon" src={giticon}/>
                                    <div className="git-text"> 
                                        Github
                                    </div>
                            </div>

                         <div className="linkedin-list-container">
                            <img className="linkedin" src={linkedin}/>
                            <div className="linkedin-text">
                            Linkedin
                            </div>
                        </div>
                         <div className="angel-list-container">
                             <img className="angel" src={angelicon}/>
                             <div className="angel-text">
                             AngelList
                             </div> 
                        </div>
                        </div>
                    </div>
                    
                    avisek
                </div>
                <div className="column">
                    <div className="drop-up-content"><div className="link-list-container">
                            <div className="git-list-container">
                                <img className="giticon" src={giticon}/>
                                    <div className="git-text"> 
                                        Github
                                    </div>
                            </div>

                         <div className="linkedin-list-container">
                            <img className="linkedin" src={linkedin}/>
                            <div className="linkedin-text">
                            Linkedin
                            </div>
                        </div>
                         <div className="angel-list-container">
                             <img className="angel" src={angelicon}/>
                             <div className="angel-text">
                             AngelList
                             </div> 
                        </div>
                        </div>
                    </div>
                    ryan
                </div>
                <div className="column">
                    <div className="drop-up-content"><div className="link-list-container">
                            <div className="git-list-container">
                                <img className="giticon" src={giticon}/>
                                    <div className="git-text"> 
                                        Github
                                    </div>
                            </div>

                         <div className="linkedin-list-container">
                            <img className="linkedin" src={linkedin}/>
                            <div className="linkedin-text">
                            Linkedin
                            </div>
                        </div>
                         <div className="angel-list-container">
                             <img className="angel" src={angelicon}/>
                             <div className="angel-text">
                             AngelList
                             </div> 
                        </div>
                        </div>
                    </div>
                    darian
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;