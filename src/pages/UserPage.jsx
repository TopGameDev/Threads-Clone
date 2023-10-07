import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import useShowToast from "../hooks/useShowToast"

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if(data.error){
          showToast("Error", data.error, "error");
          return;
        };
        setUser(data)
      } catch (error) {
        showToast("Error", error, "error")
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user) {
    return null;
  }

  return (
    <>
      <UserHeader user={user}/>
      <UserPost
        likes={1200}
        replies={481}
        postImg={"/post1.png"}
        postTitle={"Let's Talk about Threads"}
      />
      <UserPost
        likes={984}
        replies={354}
        postImg={"/post2.png"}
        postTitle={"Very nice tutorial!"}
      />
      <UserPost
        likes={14870}
        replies={5638}
        postImg={"/post3.png"}
        postTitle={"This guy builds Rockets"}
      />
      <UserPost likes={7563} replies={2539} postTitle={"Meta is the best!"} />
    </>
  );
};

export default UserPage;
