import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import React from 'react'

const UserPage = () => {
  return (
    <>
        <UserHeader />
        <UserPost likes={1200} replies={481} postImg={"/post1.png"} postTitle={"Let's Talk about Threads"}/>
        <UserPost likes={984} replies={354} postImg={"/post2.png"} postTitle={"Very nice tutorial!"}/>
        <UserPost likes={14870} replies={5638} postImg={"/post3.png"} postTitle={"This guy builds Rockets"}/>
        <UserPost likes={7563} replies={2539} postTitle={"Meta is the best!"}/>
    </>
  )
}

export default UserPage