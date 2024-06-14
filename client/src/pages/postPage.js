import React, { useState, useContext, useEffect, useRef } from "react";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = (postId) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setPostInfo(postInfo);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmDeletePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/${postInfo._id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Error deleting post:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  if (!id) {
    return <div>No post selected. Please select a post.</div>;
  }

  if (!postInfo) {
    return <div>Loading...</div>;
  }

  const username = userInfo?.username;

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by {postInfo.author.username}</div>
      {userInfo &&
        userInfo.id === postInfo.author._id &&
        location.pathname !== `/edit/${postInfo._id}` && (
          <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit this post
            </Link>
            <Link className="del-btn" onClick={openModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9l6 6m0-6l-6 6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15l6-6m0 6l-6-6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 21H6a2.25 2.25 0 0 1-2.25-2.25V9a2.25 2.25 0 0 1 2.25-2.25h12a2.25 2.25 0 0 1 2.25 2.25v9.75A2.25 2.25 0 0 1 18 21z"
                />
              </svg>
              Delete this post
            </Link>
          </div>
        )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Post Confirmation"
        className={"modal"}
      >
        <h2 ref={subtitleRef}>Are you sure you want to delete this post?</h2>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={confirmDeletePost}>Confirm</button>
      </Modal>
      <div className="image">
        <img
          src={`${process.env.REACT_APP_API_URL}/${postInfo.cover}`}
          alt="placeholder"
        />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
