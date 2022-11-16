import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchChapters } from "../../store/chapters";
import Modal from "../../Modal/Modal";
import "./ChaptersIndex.css";

const ChaptersIndex = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const chapters = useSelector((state) => state.chapters);
  const { bookId } = useParams();

  useEffect(() => {
    dispatch(fetchChapters(bookId)).then(() => setLoaded(true));
  }, []);

  const chaptersList = Object.values(chapters).map((chapter) => (
    <div className="chapter-show-container" key={chapter._id}>
        <div className="chapter-show-number">{chapter.chapterNumber}</div>
        <div className="chapter-show-title">{chapter.title}</div>
        <div className="chapter-show-edit"></div>
    </div>
  ))
  

  return loaded && (
    <>
    <Modal modalOpen={createOpen} modalClose={() => setCreateOpen(false)}>
        
    </Modal>
    <div className="chapters-container">
        <div className="chapters-header">
            <div className="chapters-header-text">Chapters</div>
            <div className="chapters-create" onClick={() => setCreateOpen(true)}>+</div>
        </div>
        <div className="chapters-list-container">
            {chaptersList}
        </div>
    </div>
    </>
  );
};

export default ChaptersIndex;
