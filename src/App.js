import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import ArticlePage from './pages/ArticlePage';
import DebatePage from './pages/DebatePage';
import AllContentsPage from './pages/AllContentsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/article/:id' element={<ArticlePage />}></Route>
          <Route path='/article/:id/debate' element={<DebatePage />}></Route>
          <Route
            path='article/:id/allcontents'
            element={<AllContentsPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
