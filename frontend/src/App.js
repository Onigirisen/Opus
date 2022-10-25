import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar';

import SplashPage from './components/SplashPage/SplashPage';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={SplashPage} />
      </Switch>
    </>
  );
}

export default App;