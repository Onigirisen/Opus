import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createChapter } from "../../store/chapters";
import "./CreateChapterPage.css";

const CreateChapterPage = () => {
  const [title, setTitle] = useState();
  const [chapterNumber, setChapterNumber] = useState();
  const dispatch = useDispatch();
  const { bookId } = useParams();

  const handleSubmit = (e) => {
    debugger;
    //e.PreventDefault();
    const chapter = { title: title, chapterNumber: chapterNumber };
    dispatch(createChapter(bookId, chapter));
  };

  return (
    <div className="create-chapter-div">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
            ></input>
          </label>

          <label>
            Chapter Number:
            <input
              onChange={(e) => setChapterNumber(e.target.value)}
              placeholder="Enter a chapter number"
            ></input>
          </label>
        </div>
        <button type="submit">Add Chapter</button>
      </form>
    </div>
  );
};

export default CreateChapterPage;

// return loaded && (
//     <>
//       <NavBar />
//       <Switch>
//         <Route exact path="/" component={SplashPage} />
//         <ProtectedRoute exact path="/profile" component={UserProfile} />
//         <Route exact path="/books" component={BooksIndex} />
//         <Route exact path="/books/read" component={BookComponent}></Route>
//         <Route exact path="/books/:bookId" component={BookShow} />
//         <ProtectedRoute exact path="/book/create" component={CreateBookPage} />
//       </Switch>
//       <Footer />
//     </>
