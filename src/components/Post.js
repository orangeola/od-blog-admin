import { useParams, } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Comment from "./Comment"

function Post() {
  const {id} = useParams();
  let [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`)
   .then(response => response.json())
   .then(data => {
    console.log(data.post[0])
    setPost(data.post[0]);
    })
  }, []);

  return (
    <div className="Post">
      <button>Delete</button>
      <button>Update</button>
      {post && 
      <div>
        <h1>{post.title}</h1>
        <p>{post.text}</p>
        <i><p>Posted at: {post.date}</p></i>
        <Comment />
      </div>
      }
    </div>
  );
}

export default Post;
