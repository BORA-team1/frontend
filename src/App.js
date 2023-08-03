import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import MainPage from "./pages/MainPage";
import AudiobookPage from "./pages/AudiobookPage";
import GuidebookPage from "./pages/GuidebookPage";
import MyPage from "./pages/Mypage";
import DetailBookmarkPage from "./pages/DetailBookmarkPage";
import DetailEditorPage from "./pages/DetailEditorPage";
import DetailPlaylistPage from "./pages/DetailPlaylistPage";
import SearchingPage from "./pages/SearchingPage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path={"/"} element={<MainPage />}></Route>
                    <Route
                        path={"/audiobookpage"}
                        element={<AudiobookPage />}
                    ></Route>
                    <Route
                        path={"/guidebookpage"}
                        element={<GuidebookPage />}
                    ></Route>
                    {/* 마이페이지 관련 페이지 */}
                    <Route path={"/mypage"} element={<MyPage />}></Route>
                    <Route
                        path={"/detailbookmarkpage"}
                        element={<DetailBookmarkPage />}
                    ></Route>
                    <Route
                        path={"/detaileditorpage"}
                        element={<DetailEditorPage />}
                    ></Route>
                    <Route
                        path={"/detailplaylistpage"}
                        element={<DetailPlaylistPage />}
                    ></Route>
                    <Route
                        path={"/searchingpage"}
                        element={<SearchingPage />}
                    ></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
