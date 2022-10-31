import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage/SplashPage';
import UserProfile from './components/UserProfilePage/index';
import BookComponent from './components/Book';
import CreateBookPage from './components/CreateBookPage';
// import CreateChapterPage from './components/CreateChapterPage';
import BooksIndex from './components/BookIndex';
import BookShow from './components/BookShow';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './store/session';
import { Route } from 'react-router-dom';
import Footer from './components/Footer';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={SplashPage} />
        <ProtectedRoute exact path="/profile" component={UserProfile} />
        <Route exact path="/books" component={BooksIndex} />
        <Route exact path="/books/read" component={BookComponent}></Route>
        <Route exact path="/books/:bookId" component={BookShow} />
        <ProtectedRoute exact path="/book/create" component={CreateBookPage} />
      </Switch>
      <Footer />
    </>
  )
}

export default App;
