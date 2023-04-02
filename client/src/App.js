import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import CreateGIF from './components/CreateGIF';
import PostList from './components/PostsList';
import ArticlesList from './components/ArticlesList';
import ArticlePage from './pages/ArticlePage';
import EditArticle from './pages/EditArticle';
import DeleteArticle from './pages/DeleteArticle';
import AddArticlePage from './pages/AddArticlePage';
import GifsList from './components/GifsList';
import GifPage from './pages/GifPage';
import DeleteGif from './pages/DeleteGif';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Navbar />
        <div style={{ flex: 1, padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/create" element={<CreateAccount />} />
            <Route path="/createGIF" element={<CreateGIF />} />
            <Route path="/feed" element={<PostList />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/editArticle/:id" element={<EditArticle />} />
            <Route path="/deleteArticle/:id" element={<DeleteArticle />} />
            <Route path="/deleteGif/:id" element={<DeleteGif />} />
            <Route path="/addArticle" element={<AddArticlePage />} />
            <Route path="/gifs" element={<GifsList />} />
            <Route path="/gifs/:id" element={<GifPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 
