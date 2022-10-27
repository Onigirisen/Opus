import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import createChapter from "../../store/chapters/createChapter"


const CreateChapterPage = () => {
    const [title, setTitle] = useState();
    const [chapterNumber, setChapterNumber] = useState();
    const dispatch = useDispatch();
    const { bookId } = useParams();

    const handleSubmit = (e) => {
        e.PreventDefault();
        const chapter = {title: title, chapterNumber: chapterNumber};
        dispatch(createChapter(bookId, chapter));
    }

    return  (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:
                        <input onChange={e => setTitle(e.target.value)} placeholder="Enter a title"></input>
                    </label>

                    <label>Chapter Number:
                        <input onChange={e => setChapterNumber(e.target.value)} placeholder="Enter a chapter number"></input>
                    </label>

                    <button type="submit">Add Chapter</button>
                </div>
            </form>
        </div>
    )
};

export default CreateChapterPage;