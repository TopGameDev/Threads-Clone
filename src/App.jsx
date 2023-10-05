import { Button, Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import React from 'react'


function App() {
  
  return (
    <Container maxW={'620px'}>
      <Header />
      <Routes>
        <Route path='/:username' element={<UserPage />}/>
        <Route path='/:username/post/:pid' element={<PostPage />}/>
      </Routes>
    </Container>
  );
}

export default App
