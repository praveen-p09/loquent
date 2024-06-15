import React, { useEffect, useState } from "react";
import Post from "../Post";
import CircularProgress from "@mui/material/CircularProgress";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/`)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {posts.length > 0 ? (
            posts.map((post) => <Post {...post} />)
          ) : (
            <p>No posts found</p>
          )}
        </>
      )}
    </>
  );
}
