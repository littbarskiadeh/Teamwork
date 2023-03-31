import { Link } from 'react-router-dom';
import '../css/home.css';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/signin">Sign In</Link><br/>
      <Link to="/create">Create Account</Link><br/>
      <Link to="/createGIF">Create GIF Post</Link><br/>
      <Link to="/articles">All Articles</Link><br/>
      <Link to="/feed">Posts Feed</Link><br/>
    </div>
  );
}

export default HomePage;