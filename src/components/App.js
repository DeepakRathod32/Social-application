import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../hooks';
import { Navigate } from "react-router-dom";
import { Home, Login, Signup, Settings } from '../pages';
import { Loader, Navbar} from './';

const PrivateRoute = ({ children, redirectPath = '/login' }) => {
  const auth = useAuth();
      
      if(auth.user){
        return children;
      }

      return  <Navigate to={redirectPath} replace />;
  
}

const Page404 = () => {
  return <h1>404</h1>
}

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home posts={[]} />}/>

        <Route exact path='/login' element={<Login />}/>

        <Route exact path='/sign_up' element={<Signup />}/>

        <Route exact path='/settings' element={
          <PrivateRoute>
          <Settings />
        </PrivateRoute>
        }/>

        <Route path='*' element={<Page404/>}/>
      </Routes>
      <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
