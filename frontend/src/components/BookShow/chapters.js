import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteChapter, fetchChapters, updateChapter } from "../../store/chapters";
import { createChapter } from "../../store/chapters";
import Modal from "../../Modal/Modal";
import "./ChaptersIndex.css";
import './ChapterModals.css'
import './Pages.css'
import { createPage, fetchPages } from "../../store/pages";

const ChaptersIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [createPageOpen, setCreatePageOpen] = useState(false);
    const [pageChId, setPageChId] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [editingChapterId, setEditingChapterId] = useState()
    const [chUpdated, setChUpdated] = useState(false);
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const chapters = useSelector((state) => state.chapters);
    const pages = useSelector((state) => state.pages);
    const sessionUser = useSelector((state) => state.session.user);
    const books = useSelector((state) => state.books);
    const { bookId } = useParams();
    const book = books[bookId];
    const isAuthor = sessionUser._id === book.user
    
    useEffect(() => {
        dispatch(fetchChapters(bookId)).then(() => setLoaded(true));
    }, []);

    useEffect(() => {
        dispatch(fetchChapters(bookId));
    }, [chUpdated]);

    useEffect(() => {
        dispatch(fetchPages(bookId, pageChId))
    }, [pageChId, dispatch])

    const chaptersArr = [];
    const pagesArr = [];

    Object.values(chapters).forEach((chapter) => {if (chapter.book === bookId && !chaptersArr.includes(chapter)) chaptersArr.push(chapter)})
    Object.values(pages).forEach((page) => {if (page.chapter === pageChId) pagesArr.push(page)})

    const pagesList = pagesArr.map((page) => (
        <div className="chapters-page-show">
            {page.pageNumber}
        </div>
    ))
    
    const chaptersList = chaptersArr.map((chapter) => (
        <>
            <div className="chapter-show-container" key={chapter._id}>
                <div className="chapter-show-number">{chapter.chapterNumber}</div>
                <div className="chapter-show-title" onClick={() => setPageChId(chapter._id)}>{chapter.title}</div>
                {isAuthor && <div className="chapter-show-edit" onClick={() => {
                    if (chUpdated === false) {
                        setChUpdated(true);
                        setEditOpen(true); 
                        setEditingChapterId(chapter._id);
                    }
                }}>Edit</div>}
                {isAuthor && <div className="chapter-show-delete" onClick={() => {
                    if (chUpdated === false) {
                        setChUpdated(true);
                        chaptersArr.forEach((updatedChapter) => {
                            if (updatedChapter.chapterNumber > chapter.chapterNumber) {
                                const newChNum = {title: updatedChapter.title, chapterNumber: (updatedChapter.chapterNumber - 1)}
                                dispatch(updateChapter(bookId, updatedChapter._id, newChNum));
                            }
                        })
                        dispatch(deleteChapter(bookId, chapter._id)).then(() => setChUpdated(false));
                    }
                }}>X</div>}
            </div>
            {pageChId === chapter._id && 
            <div className="chapters-page-header">
                <div className="chapters-page-header-text">Pages</div>
                {isAuthor && <div className="chapters-page-create" onClick={() => {
                    if (chUpdated === false) {
                        setChUpdated(true); 
                        setCreatePageOpen(true);
                    }
                }}>Add Page</div>}
            </div>}
            {pageChId === chapter._id && pagesList}
        </>
    ))


    const handleChapterCreate = (e) => {
        e.preventDefault();
        const chapter = { title: title, chapterNumber: (chaptersArr.length + 1).toString() };
        dispatch(createChapter(bookId, chapter));
        setTitle();
        setCreateOpen(false);
    };

    const handlePageCreate = (e) => {
        e.preventDefault();
        console.log(pagesArr.length)
        console.log(pagesArr)
        const page = {pageNumber: (pagesArr.length + 1).toString(), content: content};
        dispatch(createPage(bookId, pageChId, page)).then(() => {
            setChUpdated(false);
        });
        setContent();
        setCreatePageOpen(false);
    };

    const handleChapterEdit = (e) => {
        e.preventDefault();
        const chapter = { title: title, chapterNumber: chapters[editingChapterId].chapterNumber };
        dispatch(updateChapter(bookId, editingChapterId, chapter)).then(() => {
            setChUpdated(false);
        });
        setTitle();
        setEditOpen(false);
    };

    return loaded && (
        <>
        <Modal modalOpen={createPageOpen} modalClose={() => {setCreatePageOpen(false); setChUpdated(false);}}>
            <div className="chapters-page-modal">
                <form className="chapters-page-form" onSubmit={handlePageCreate}>
                    <div>
                        <label> Content:
                            <textarea name="content" onChange={e => setContent(e.target.value)}></textarea>
                        </label>
                    </div>
                    <button type="submit">Add page</button>
                </form>
            </div>
        </Modal>
        <div className="chapters-container">
            <div className="chapters-header">
                <div className="chapters-header-text">Chapters</div>
                {isAuthor && <div className="chapters-create" onClick={() => setCreateOpen(true)}>+</div>}
                <Modal modalOpen={createOpen} modalClose={() => setCreateOpen(false)}>
                    <div className="chapters-create-modal">
                        <form onSubmit={handleChapterCreate} className="create-chapter-form-container">
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
                        </div>
                </Modal>
                <Modal modalOpen={editOpen} modalClose={() => {setEditOpen(false); setChUpdated(false)}}>
                    <div className="chapters-edit-modal">
                        <form onSubmit={handleChapterEdit} className="edit-chapter-form-container">
                            <div className="edit-chapter-header-text">Edit Chapter</div>
                            <label className="edit-chapter-title">
                                Title:
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter a title"
                                ></input>
                            </label>
                            <button type="submit" className="chapter-add-btn">Edit Chapter</button>
                        </form>
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
