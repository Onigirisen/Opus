import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage/SplashPage';
import UserProfile from './components/UserProfile';
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
      </Switch>
      <Footer />
    </>
  );
}

export default App;