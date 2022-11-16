import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createChapter, fetchChapters } from "../../store/chapters";
import "./CreateChapterPage.css";

const CreateChapterPage = () => {
  const [title, setTitle] = useState();
  const chapters = useSelector(state => state.chapters)
  const dispatch = useDispatch();
  const { bookId } = useParams();

  const chaptersArr = [];
  
  Object.values(chapters).forEach((chapter) => {if (chapter.book === bookId && !chaptersArr.includes(chapter)) chaptersArr.push(chapter)})

  const handleSubmit = (e) => {
    e.preventDefault();
    const chapter = { title: title, chapterNumber: (chaptersArr.length + 1).toString() };
    dispatch(createChapter(bookId, chapter));
  };

  return (
    <form onSubmit={handleSubmit} className="create-chapter-form-container">
          <div className="create-chapter-header-text">Create Chapter</div>
        <label className="create-chapter-title">
          Title:
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
          ></input>
        </label>
      <button type="submit" className="chapter-add-btn">Add Chapter</button>
    </form>
  );
};

export default CreateChapterPage;