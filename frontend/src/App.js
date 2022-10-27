import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage/SplashPage';
import UserProfile from './components/userProfile';
import BookComponent from './components/Book';
import CreateBookPage from './components/CreateBookPage';

import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './store/session';
import { Route } from 'react-router-dom';
import Footer from './components/Footer';
import Carousel from './components/Carousel';

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
        <Route exact path="/book" component={BookComponent} />
        <ProtectedRoute exact path="/book/create" component={CreateBookPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;