import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchChapters } from "../../store/chapters";
import { fetchPage, fetchPages } from "../../store/pages";
import './Page.css'

const PageShow = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const chapters = useSelector((state) => state.chapters)
    const pages = useSelector((state) => state.pages)
    const [loaded, setLoaded] = useState(false);
    const [chapterShowing, setChapterShowing] = useState();
    const { bookId, chapterId, pageId } = useParams();

    useEffect(() => {
        dispatch(fetchChapters(bookId)).then(() => setLoaded(true))
        if (chapterShowing) {
            dispatch(fetchPages(bookId, chapterShowing));
        } else {
            dispatch(fetchPages(bookId, chapterId));
        }
    }, [chapterShowing])

    const chaptersArr = [];
    const pagesArr = [];

    Object.values(chapters).forEach((chapter) => {if (chapter.book === bookId && !chaptersArr.includes(chapter)) chaptersArr.push(chapter)})
    Object.values(pages).forEach((page) => {if (page.chapter === chapterShowing) pagesArr.push(page)})

    const pagesList = pagesArr.map((page) => (
        <div className="page-show-container" onClick={() => {history.push(`/books/${bookId}/chapters/${chapterShowing}/pages/${page._id}`)}}>
            Read Page {page.pageNumber}
        </div>
    ))

    const chaptersList = chaptersArr.map((chapter) => (
        <>
        <div className="page-show-chapter-container" key={chapter._id + "page"} onClick={() => {
            chapterShowing === chapter._id ? setChapterShowing() : setChapterShowing(chapter._id)
        }}>
            <div className="page-show-chapter-number">{chapter.chapterNumber}</div>
            <div className="page-show-chapter-title">{chapter.title}</div>
        </div>
        {chapterShowing === chapter._id && <div>
            {pagesList}
        </div>} 
        </>
    ))

    return loaded && (
        <>
        <div className="chapters-index-container">
            <div className="chapters-index-header">Chapters</div>
            {chaptersList}
        </div>
        </>
    );
}

export default PageShow;