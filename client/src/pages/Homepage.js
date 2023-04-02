import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { Link } from 'react-router-dom';
import '../css/home.css';

function HomePage() {

  const userContext = useContext(UserContext);

  return (
    <div>
      {userContext.user.userType === '1' && (//admin users
        <>
          <Link to="/create">Create Account</Link><br />
          <Link to="/create">Manage User Accounts</Link><br />
          {/* <Link to="/create">Manage User Accounts</Link><br /> */}

        </>
      )}
      {userContext.user && userContext.user.isloggedin === '1' && ( //user needs to be logged in to see links
        <>
          <Link to="/dashboard">View Profile</Link><br />
          <Link to="/createGIF">Create GIF Post</Link><br />
          <Link to="/addArticle">Create an Article</Link><br />

        </>
        )}
        
      <Link to="/articles">Articles</Link><br />
      <Link to="/gifs">GIFS</Link><br />
      <Link to="/feed">Feed</Link><br />
    </div>
  );
}

export default HomePage;