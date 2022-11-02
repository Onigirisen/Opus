import React from "react";
import './footer.css'
import giticon from '../../assets/footer/github.png'
import linkedin from '../../assets/footer/linkedin.png'
import angelicon from '../../assets/footer/angellist.png'

const Footer = ()=>{
    return(
        <>
         <div className="footer-navbar-container">
            <div className="footer-navbar-column">
                <div className="column">
                    <div className="developers-container">
                    Developers
                    </div>
                </div>
                <div className="column">
                    <div className="drop-up-content">
                        <div className="link-list-container">
                            <div className="git-list-container">
                                <img className="giticon" src={giticon}/>
                                    <a className="git-text" href="https://github.com/dlaucodes"> 
                                        Github
                                    </a>
                            </div>

                         <div className="linkedin-list-container">
                            <img className="linkedin" src={linkedin}/>
                            <a className="linkedin-text" href="https://www.linkedin.com/in/dlaucodes/">
                            Linkedin
                            </a>
                        </div>
                         <div className="angel-list-container">
                             <img className="angel" src={angelicon}/>
                             <a className="angel-text" href="https://angel.co/u/chun-k-lau">
                             AngelList
                             </a> 
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
                                    <a className="git-text" href="https://github.com/Av1sek"> 
                                        Github
                                    </a>
                            </div>

                         <div className="linkedin-list-container">
                            <img className="linkedin" src={linkedin}/>
                            <a className="linkedin-text" href="https://www.linkedin.com/in/avisek-pandit-374096247">
                            Linkedin
                            </a>
                        </div>
                         <div className="angel-list-container">
                             <img className="angel" src={angelicon}/>
                             <a className="angel-text" href="https://angel.co/u/avisek-pandit">
                             AngelList
                             </a> 
                        </div>
                        </div>
                    </div>
                    
                    <div className="dev-container">
                      Avisek
                    </div>
                </div>
                <div className="column">
                    <div className="drop-up-content">
                        <div className="link-list-container">
                            <div className="git-list-container">
                                <img className="giticon" src={giticon}/>
                                    <a className="git-text" href="https://github.com/Onigirisen"> 
                                        Github
                                    </a>
                            </div>

                         <div className="linkedin-list-container">
                            <img className="linkedin" src={linkedin}/>
                            <a className="linkedin-text" href="https://www.linkedin.com/in/ryan-kok-6ab427b6/">
                            Linkedin
                            </a>
                        </div>
                         <div className="angel-list-container">
                             <img className="angel" src={angelicon}/>
                             <a className="angel-text" href="https://angel.co/u/ryan-kok">
                             AngelList
                             </a> 
                        </div>
                        </div>
                    </div>
                    <div className="dev-container">
                        Ryan
                    </div>
                </div>

                <div className="column">
                    <div className="drop-up-content">
                        <div className="link-list-container">
                            <div className="git-list-container">
                                <img className="giticon" src={giticon}/>
                                    <a className="git-text" href="https://github.com/darianchen"> 
                                        Github
                                    </a>
                            </div>

                         <div className="linkedin-list-container">
                             <img className="linkedin" src={linkedin}/>
                            <a className="linkedin-text" href="https://www.linkedin.com/in/darianchen">
                    
                            Linkedin
                            </a>
                        </div>
                         <div className="angel-list-container">
                             <img className="angel" src={angelicon}/>
                             <a className="angel-text" href="https://angel.co/u/darian-chen">
                             AngelList
                             </a> 
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