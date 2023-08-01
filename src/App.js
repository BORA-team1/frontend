import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import MainPage from "./pages/MainPage";
import AudiobookPage from "./pages/AudiobookPage";
import MyPage from "./pages/Mypage";
import SearchingPage from "./pages/SearchingPage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path={"/home"} element={<MainPage />}></Route>
                    <Route
                        path={"/audiobookpage"}
                        element={<AudiobookPage />}
                    ></Route>
                    <Route path={"/mypage"} element={<MyPage />}></Route>
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
