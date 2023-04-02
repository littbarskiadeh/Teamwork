import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { Link } from 'react-router-dom';
import '../css/home.css';

function HomePage() {

  const userContext = useContext(UserContext);

  return (
    <div>
      {userContext.user.userType === '1' && (
        <>
          <Link to="/create">Create Account</Link><br />
        </>
      )}
      <Link to="/createGIF">Create GIF Post</Link><br />
      <Link to="/articles">All Articles</Link><br />
      <Link to="/feed">Posts Feed</Link><br />
    </div>
  );
}

export default HomePage;