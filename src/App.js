import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

//pages
import MainPage from './pages/MainPage';
import GuidebookPage from './pages/GuidebookPage';
import EntirePage from './pages/EntirePage';
import MyPage from './pages/Mypage';
import DetailBookmarkPage from './pages/DetailBookmarkPage';
import DetailEditorPage from './pages/DetailEditorPage';
import DetailPlaylistPage from './pages/DetailPlaylistPage';
import SearchingPage from './pages/SearchingPage';

import ArticlePage from './pages/ArticlePage';
import AudiobookPage from './pages/AudiobookPage';
import DebatePage from './pages/DebatePage';
import AllContentsPage from './pages/AllContentsPage';
import PostViewer from './components/BottomSheet/PostViewer';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<MainPage />}></Route>
          <Route path={'/guidebookpage'} element={<GuidebookPage />}></Route>
          <Route path={'/entirepage'} element={<EntirePage />}></Route>
          {/* 마이페이지 관련 페이지 */}
          <Route path={'/mypage'} element={<MyPage />}></Route>
          <Route
            path={'/detailbookmarkpage'}
            element={<DetailBookmarkPage />}
          ></Route>
          <Route
            path={'/detaileditorpage'}
            element={<DetailEditorPage />}
          ></Route>
          <Route
            path={'/detailplaylistpage'}
            element={<DetailPlaylistPage />}
          ></Route>
          <Route path={'/searchingpage'} element={<SearchingPage />}></Route>
          {/* 세부 페이지 */}
          <Route path='/article/:id' element={<ArticlePage />}></Route>
          <Route
            path={'/article/:id/audio'}
            element={<AudiobookPage />}
          ></Route>
          <Route path='/article/:id/debate' element={<DebatePage />}></Route>
          <Route
            path='article/:id/allcontents'
            element={<AllContentsPage />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
