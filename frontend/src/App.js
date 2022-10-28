
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage/SplashPage';
import UserProfile from './components/UserProfile';
import BookComponent from './components/Book';
import CreateBookPage from './components/CreateBookPage';
import CreateChapterPage from './components/CreateChapterPage'
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
  
  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={SplashPage} />
          <ProtectedRoute exact path="/profile" component={UserProfile} />
          <Route exact path="/book" component={BookComponent} />
          <Route exact path="/book/create" component={CreateBookPage} />
          <Route exact path="/books/:bookId/chapters/create" component={CreateChapterPage}/>
          <Route exact path="/books/:book_id/chapters/:chapter_id"/>
        </Switch>
        <Footer />
      </>
    )

  );
}

export default App;