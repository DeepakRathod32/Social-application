import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons.flaticon.com/png/128/2202/premium/2202112.png?token=exp=1653646656~hmac=9404007ff3cefa005033475b2ff39efe"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>

                <li>
                  <Link to="/sign_up">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
