import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChapters } from "../../store/chapters";
import { fetchPages } from "../../store/pages";
import BookComponent from "../Book";
import './Page.css'

const PageShow = () => {
    const dispatch = useDispatch();
    const chapters = useSelector((state) => state.chapters)
    const pages = useSelector((state) => state.pages)
    const [loaded, setLoaded] = useState(false);
    const { bookId, chapterId, pageId } = useParams();

    useEffect(() => {
        dispatch(fetchChapters(bookId)).then(() => setLoaded(true))
        dispatch(fetchPages(chapterId))
    }, [])

    const chaptersArr = [];
    const pagesArr = [];

    Object.values(chapters).forEach((chapter) => {if (chapter.book === bookId && !chaptersArr.includes(chapter)) chaptersArr.push(chapter)})
    Object.values(pages).forEach((page) => {if (page.chapter === chapterId) pagesArr.push(page)})

    const chaptersList = chaptersArr.map((chapter) => (
        <div className="page-show-chapters-container">
            <div className="page-show-chapter-number">{chapter.chapterNumber}</div>
            <div className="page-show-chapter-title">{chapter.title}</div>
        </div>
    ))

    return (
        <>
        <div className="chapters-index-container">
            <div className="chapters-index-header">Chapters</div>
            {chaptersList}
        </div>
        <BookComponent></BookComponent>
        </>
    );
}

export default PageShow;