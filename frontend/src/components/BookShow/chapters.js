import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteChapter, fetchChapters, updateChapter } from "../../store/chapters";
import { createChapter } from "../../store/chapters";
import Modal from "../../Modal/Modal";
import "./ChaptersIndex.css";
import './ChapterModals.css'
import './Pages.css'
import { createPage, deletePage, fetchPages, updatePage } from "../../store/pages";
import { getCurrentUser } from "../../store/session";

const ChaptersIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [createPageOpen, setCreatePageOpen] = useState(false);
    const [editPageOpen, setEditPageOpen] = useState(false);
    const [pageChId, setPageChId] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [editingChapterId, setEditingChapterId] = useState()
    const [chUpdated, setChUpdated] = useState(false);
    const [pgUpdated, setPgUpdated] = useState(false);
    const [editingPageId, setEditingPageId] = useState(false);
    const [title, setTitle] = useState()
    const [content, setContent] = useState('');
    const chapters = useSelector((state) => state.chapters);
    const pages = useSelector((state) => state.pages);
    const sessionUser = useSelector((state) => state.session.user);
    const books = useSelector((state) => state.books);
    const { bookId } = useParams();
    const book = books[bookId];
    const [isAuthor,setIsAuthor] = useState(false)
    
    useEffect(() => {
        dispatch(fetchChapters(bookId)).then(() => {
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        dispatch(getCurrentUser()).then(() => {
            if (sessionUser) {
                setIsAuthor(sessionUser._id === book.user)
            }
        })
    }, [])

    useEffect(() => {
        dispatch(fetchChapters(bookId));
    }, [chUpdated]);

    useEffect(() => {
        dispatch(fetchPages(bookId, pageChId))
    }, [pageChId, pgUpdated])

    const chaptersArr = [];
    const pagesArr = [];

    Object.values(chapters).forEach((chapter) => {if (chapter.book === bookId && !chaptersArr.includes(chapter)) chaptersArr.push(chapter)})
    Object.values(pages).forEach((page) => {if (page.chapter === pageChId) pagesArr.push(page)})

    const pagesList = pagesArr.map((page) => (
        <div className="chapters-page-container" key={page._id}>
            <div className="chapters-page-show">
                <div className="chapters-page-number" onClick={() => history.push(`/books/${bookId}/chapters/${pageChId}/pages/${page._id}`)}>Read Page {page.pageNumber}</div>
                {isAuthor && <div className="chapters-page-edit" onClick={() => {
                    if (pgUpdated === false) {
                        setPgUpdated(true);
                        setEditingPageId(page._id)
                        setContent(page.content)
                        setEditPageOpen(true);
                    }
                }}>Edit</div>}
                {isAuthor && <div className="chapters-page-delete" onClick={() => {
                    console.log(pgUpdated)
                    if (pgUpdated === false) {
                        setPgUpdated(true);
                        pagesArr.forEach((updatedPage) => {
                            if (updatedPage.pageNumber > page.pageNumber) {
                                const newPageNum = {pageNumber: (updatedPage.pageNumber - 1), content: updatedPage.content};
                                dispatch(updatePage(bookId, pageChId, updatedPage._id, newPageNum))
                            }
                        })
                        setTimeout(() => {
                            setPgUpdated(false)
                        }, 1200)
                        dispatch(deletePage(bookId, pageChId, page._id))
                    }
                }}>X</div>}
            </div>
        </div>
    ))
    
    const chaptersList = chaptersArr.map((chapter) => (
        <>
            <div className="chapter-show-container" key={chapter._id}>
                <div className="chapter-show-number">{chapter.chapterNumber}</div>
                <div className="chapter-show-title" onClick={() => {
                    if (pageChId === chapter._id) {
                        setPageChId();
                    } else {
                        setPageChId(chapter._id) 
                    }
                }}>{chapter.title}</div>
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
                        setTimeout(() => {
                            setChUpdated(false)
                        }, 1200);
                        dispatch(deleteChapter(bookId, chapter._id));
                    }
                }}>X</div>}
            </div>
            {pageChId === chapter._id && 
            <div className="chapters-page-header" key={chapter._id + "header"}>
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

    const handlePageEdit = (e) => {
        e.preventDefault();
        const page = {pageNumber: pages[editingPageId].pageNumber, content: content};
        dispatch(updatePage(bookId, pageChId, editingPageId, page)).then(() => {
            setPgUpdated(false);
            setContent();
            setEditPageOpen(false);
        });
    };


    return loaded && (
        <>
        <Modal modalOpen={createPageOpen} modalClose={() => {setCreatePageOpen(false); setChUpdated(false);}}>
            <div className="chapters-page-modal">
                <form className="chapters-page-form" onSubmit={handlePageCreate}>
                    <div>
                        <label>
                            <textarea className="create-page-content" onChange={e => setContent(e.target.value)}></textarea>
                        </label>
                    </div>
                    <button className="create-page-submit" type="submit">Add page</button>
                </form>
            </div>
        </Modal>
        <Modal modalOpen={editPageOpen} modalClose={() => {setEditPageOpen(false); setPgUpdated(false);}}>
            <div className="chapters-page-modal">
                <form className="chapters-page-form" onSubmit={handlePageEdit}>
                    <div>
                        <label>
                            <textarea className="create-page-content" value={content} onChange={e => {setContent(e.target.value);}}></textarea>
                        </label>
                    </div>
                    <button className="create-page-submit" type="submit">Edit page</button>
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
