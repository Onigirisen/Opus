import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createPage } from "../../store/pages";
import './CreatePagesPage.css'

const CreatePagesPage = () => {
    const [pageNumber, setPageNumber] = useState();
    const [content, setContent] = useState();
    const dispatch = useDispatch();
    const { bookId } = useParams();
    const { chapterId} = useParams();

const handleSubmit = (e) => {
    const page = {pageNumber: pageNumber, content: content};
    debugger
    dispatch(createPage(bookId, chapterId, page));
}

    return ( 
        <div className="create-page-div">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Page Number:
                        <input onChange={e => setPageNumber(e.target.value)} placeholder="Enter a page number"></input>
                    </label>


                    <label> Content:
                        <textarea name="content" onChange={e => setContent(e.target.value)}>

                        </textarea>
                    </label>
                </div>
                <button type="submit">Add page</button>
            </form>
        </div>
     );
}

export default CreatePagesPage;