import { Button, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import UserPage from "./pages/UserPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import React from "react";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost.jsx";

function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container maxW={"620px"}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/update"
          element={!user ? <Navigate to="/auth" /> : <UpdateProfilePage />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>

      {user && <LogoutButton />}
      {user && <CreatePost />}
    </Container>
  );
}

export default App;
