import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createChapter } from "../../store/chapters";
import './CreateChapterPage.css'


const CreateChapterPage = () => {
    const [title, setTitle] = useState();
    const [chapterNumber, setChapterNumber] = useState();
    const dispatch = useDispatch();
    const { bookId } = useParams();

    const handleSubmit = (e) => {
        debugger
        //e.PreventDefault();
        const chapter = {title: title, chapterNumber: chapterNumber};
        dispatch(createChapter(bookId, chapter));
    }

    return  (
        <div className="create-chapter-div">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:
                        <input onChange={e => setTitle(e.target.value)} placeholder="Enter a title"></input>
                    </label>

                    <label>Chapter Number:
                        <input onChange={e => setChapterNumber(e.target.value)} placeholder="Enter a chapter number"></input>
                    </label>

                </div>
                <button type="submit">Add Chapter</button>
            </form>
        </div>
    )
};

export default CreateChapterPage;