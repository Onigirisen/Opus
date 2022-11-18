import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchPages } from "../../store/pages";
import ChaptersIndexPage from "../ChaptersIndex";
import './book.css'

const BookComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {bookId, chapterId, pageId} = useParams();
    const [flip, setFlip] = useState(false)
    const [flipDir, setFlipDir] = useState("right")
    const [loaded, setLoaded] = useState(false);    
    const [pageContent, setPageContent] = useState();
    const [nextPageUrl, setNextPageUrl] = useState();
    const pages = useSelector((state) => state.pages);
    
    useEffect(() => {
        dispatch(fetchPages(bookId, chapterId)).then(() => {
            setLoaded(true);
        })
    }, [])

    useEffect(() => {
        setPageContent()
    }, [pageId])

    const page = pages[pageId];
    const pagesArr = [];
    Object.values(pages).forEach((page) => {if (page.chapter === chapterId) pagesArr.push(page)})

    const findNextPage = () => {
        let returnPage;
        pagesArr.forEach((nextPage) => {
            if (nextPage.pageNumber === (page.pageNumber + 1)) {
                returnPage = nextPage;
            }
        })
        return returnPage;
    }

    const findPrevPage = () => {
        let returnPage;
        pagesArr.forEach((prevPage) => {
            if (prevPage.pageNumber === (page.pageNumber - 1)) {
                returnPage = prevPage;
            }
        })
        return returnPage;
    }

    const nextPage = () => {
        if (!flip) {
            setFlip(true);
            setTimeout(() => {
                setFlip(false);
            }, 900)
        }
    }
    
    return loaded && (
        <>
            {!pageContent ? setPageContent(page.content) : null}
            <ChaptersIndexPage></ChaptersIndexPage>
            <div className="book-container">
                <div className="book-cover">
                    <div className="left-page">

                    </div>
                    <div className="spine">

                    </div>
                    {flipDir === "right" ?  
                    <div className="right-page">
                        <div className="book-page-content" spellCheck='false' >{pageContent}</div>
                        <div className="book-page-number">{page.pageNumber}</div>
                            {page.pageNumber !== 1 && <div className="prev-page" onClick={() => 
                                {
                                    nextPage(); 
                                    setFlipDir("left");
                                    setTimeout(() => {
                                        history.push(`/books/${bookId}/chapters/${chapterId}/pages/${findPrevPage()._id}`);
                                    }, 900)
                                }}>{"<"}</div>}
                            {page.pageNumber !== pagesArr.length && <div className="next-page" onClick={() => 
                                {
                                    nextPage(); 
                                    setFlipDir("right"); 
                                    setPageContent(findNextPage().content);
                                    setTimeout(() => {
                                        history.push(`/books/${bookId}/chapters/${chapterId}/pages/${findNextPage()._id}`);
                                    }, 900)
                                }}>{">"}</div>}
                    </div> : 
                    <div className="right-page">
                        <textarea className="book-page-content" spellCheck='false' readOnly defaultValue={pageContent}></textarea>
                        <div className="book-page-number">{page.pageNumber}</div>
                            {page.pageNumber !== 1 &&<div className="prev-page" onClick={() => 
                                {
                                    nextPage(); 
                                    setFlipDir("left");
                                    setTimeout(() => {
                                        history.push(`/books/${bookId}/chapters/${chapterId}/pages/${findPrevPage()._id}`);
                                    }, 900)
                                }}>{"<"}</div>}
                            {page.pageNumber !== pagesArr.length &&<div className="next-page" onClick={() => 
                                {
                                    nextPage(); 
                                    setFlipDir("right"); 
                                    setPageContent(findNextPage().content);
                                    setTimeout(() => {
                                        history.push(`/books/${bookId}/chapters/${chapterId}/pages/${findNextPage()._id}`);
                                    }, 900)
                                }}>{">"}</div>}
                    </div>
                }
                </div>
                {flip ? 
                    flipDir === "right" ? 
                        <>
                            <div className="fake-right-back-page"></div> 
                            <div className="fake-right-page">
                                <textarea className="book-page-content" defaultValue={page.content}></textarea>
                                <div className="book-page-number">{page.pageNumber + 1}</div>
                                <div className="prev-page">{"<"}</div>
                                <div className="next-page">{">"}</div>
                            </div>
                        </> :  
                        <>
                        <div className="fake-left-back-page"></div> 
                        <div className="fake-left-page">
                            <textarea className="book-page-content" defaultValue={findPrevPage().content}></textarea>
                            <div className="book-page-number">{page.pageNumber - 1}</div>
                            <div className="prev-page">{"<"}</div>
                            <div className="next-page">{">"}</div>
                        </div>
                        </>  : 
                    <></>
                }
            </div>
        </>
    );
}

export default BookComponent;