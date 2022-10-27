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
                    <div className="developers-container">
                    Developers
                    </div>
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
                    <div className="dev-container">
                        David
                    </div>
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
                    
                    <div className="dev-container">
                      Avisek
                    </div>
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
                    <div className="dev-container">
                        Ryan
                    </div>
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
                   <div className="dev-container">Darian</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;