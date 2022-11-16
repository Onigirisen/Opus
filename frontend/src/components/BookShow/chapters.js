import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteChapter, fetchChapters, updateChapter } from "../../store/chapters";
import CreateChapterPage from "../CreateChapterPage";
import Modal from "../../Modal/Modal";
import "./ChaptersIndex.css";

const ChaptersIndex = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [updatingCh, setUpdatingCh] = useState(false);
    const chapters = useSelector((state) => state.chapters);
    const { bookId } = useParams();
  
    useEffect(() => {
        dispatch(fetchChapters(bookId)).then(() => setLoaded(true));
    }, []);
    
    const chaptersArr = [];

    Object.values(chapters).forEach((chapter) => {if (chapter.book === bookId && !chaptersArr.includes(chapter)) chaptersArr.push(chapter)})

    const chaptersList = chaptersArr.map((chapter) => (
        <div className="chapter-show-container" key={chapter._id}>
            <div className="chapter-show-number">{chapter.chapterNumber}</div>
            <div className="chapter-show-title">{chapter.title}</div>
            <div className="chapter-show-edit"></div>
            <div className="chapter-show-delete" onClick={() => {
                chaptersArr.forEach((updatedChapter) => {
                    if (updatedChapter.chapterNumber > chapter.chapterNumber) {
                        const newChNum = {title: updatedChapter.title, chapterNumber: (updatedChapter.chapterNumber - 1)}
                        dispatch(updateChapter(bookId, updatedChapter._id, newChNum))
                    }
                })
                dispatch(deleteChapter(bookId, chapter._id))
                setUpdatingCh(!updatingCh);
            }}>X</div>
        </div>
    ))

    useEffect(() => {
        dispatch(fetchChapters(bookId))
    }, [updatingCh])

    return loaded && (
        <>
        <div className="chapters-container">
            <div className="chapters-header">
                <div className="chapters-header-text">Chapters</div>
                <div className="chapters-create" onClick={() => setCreateOpen(true)}>+</div>
                <Modal modalOpen={createOpen} modalClose={() => setCreateOpen(false)}>
                    <div className="chapters-create-modal">
                        <CreateChapterPage></CreateChapterPage>
                    </div>
                </Modal>
            </div>
            <div className="chapters-list-container">
                {chaptersList}
            </div>
        </div>
        </>
    );
};

export default ChaptersIndex;
