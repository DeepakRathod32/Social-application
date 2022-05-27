import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from '../styles/login.module.css';
import {useAuth} from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggingIn(true);

    if(!email || !password){
      return toast.error("Please enter both email and password")
    }

    const response = await auth.login(email, password);

    if(response.success){
       toast.success('SuccessFully logged in')
    }else{
       toast.error(response.message);
    }

    setLoggingIn(false);
    return;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" 
          placeholder="Email"  
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input type="password" 
        placeholder="password"  
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field} >
        <ToastContainer/>
        <button disabled={loggingIn}>{loggingIn ? 'Logging in...' : 'Log In'}</button>
      </div>
    </form>
  );
};

export default Login;
