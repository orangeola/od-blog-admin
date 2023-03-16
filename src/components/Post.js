import { useParams, } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Comment from "./Comment"

function Post() {
  const {id} = useParams();
  let [post, setPost] = useState(null);

  const handleDelP = async () => {
    try{
      let res = await fetch(`http://localhost:5000/post/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },
      })
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Post deleted", resJson);
        window.location.replace("http://localhost:3000/home");
      } else {
        console.log("Some error occured", resJson);
      }
    }
    catch(err){
      console.log("fetch err: ", err);
    }
  };

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
      {post && 
      <div>
        <button onClick={() => {handleDelP()}}>Delete</button>
        <button>Update</button>
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
