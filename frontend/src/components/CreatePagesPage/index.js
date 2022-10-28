import React, { useState } from "react";
import './CreatePagesPage.css'

const CreatePagesPage = () => {
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label> Content:
                <textarea
                name="content"
                value= {}
                
                ></textarea>

                </label>
                <button type="submit"></button>
            </form>
        </div>
     );
}
 
export default CreatePagesPage;