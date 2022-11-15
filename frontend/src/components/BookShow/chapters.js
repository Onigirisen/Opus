import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchChapters } from "../../store/chapters";
import "./ChaptersIndex.css";

const ChaptersIndex = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const chapters = useSelector((state) => state.chapters);
  const { bookId } = useParams();

  useEffect(() => {
    dispatch(fetchChapters(bookId)).then(() => setLoaded(true));
  }, []);

  const chaptersList = Object.values(chapters).map((chapter) => (
    <div key={chapter._id}>
        {chapter._id}
    </div>
  ))
  

  return loaded && (
    <div className="chapters-container">
        <div className="chapters-header">
            <div className="chapters-header-text">Chapters</div>
            <div className="chapters-create">+</div>
        </div>
            {chaptersList}
    </div>
  );
};

export default ChaptersIndex;
