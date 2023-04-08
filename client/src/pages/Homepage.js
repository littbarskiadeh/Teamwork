import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { Link, NavLink } from 'react-router-dom';
import '../css/home.css';

function HomePage() {

  const userContext = useContext(UserContext);

  return (
    <>
      <h2>teamWork&reg; </h2>

      <div className='home-nav-container'>
        <ul className='home-nav-list'>
          {userContext.user && userContext.user.usertype === '1' && (//admin users
            <>
              <li className='home-nav-item'><Link className='home-link' to="/create">Create Account</Link></li><br />
              <li className='home-nav-item'><Link className='home-link' to="/create">Manage Users</Link></li><br />
              <li className='home-nav-item'><Link className='home-link' to="/create">Manage Posts</Link></li><br />
            </>

          )}

          {userContext.user && userContext.user.isloggedin === '1' && ( //user needs to be logged in to see links

            <>
              <li className='home-nav-item'><Link className='home-link' to="/dashboard">View Profile</Link></li>
              <li className='home-nav-item'><Link className='home-link' to="/createGIF">Add GIF</Link></li>
              <li className='home-nav-item'><Link className='home-link' to="/articles">Articles</Link></li>
              <li className='home-nav-item'><Link className='home-link' to="/gifs">GIFS</Link></li>
              <li className='home-nav-item'><Link className='home-link' to="/addArticle">Add Article</Link></li>
              <li className='home-nav-item'><Link className='home-link' to="/feed">Feed</Link></li>

            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default HomePage;