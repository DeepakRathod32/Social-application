import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';

import { useAuth } from '../hooks';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingup, setSigningup] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningup(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill all the details!!');
      error = true;
    }

    if (password !== confirmPassword) {
      toast.warning('Make sure password and confirm password matches');
      error = true;
    }

    if (error) {
      setSigningup(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      navigate('/login');
      setSigningup(false);

      toast.success('User registered successfully, please login now');
    } else {
      toast.error(response.message);
    }

    setSigningup(false);
  };

  if (auth.user) {
    navigate('/login');
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
          required
        />
      </div>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
          required
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingup}>
          {signingup ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
