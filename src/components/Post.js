import { useParams, } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Comment from "./Comment"

function Post() {
  const {id} = useParams();
  let [post, setPost] = useState(null);
  let [update, setUpdate] = useState(false);
  let [title, setTitle] = useState(false);
  let [text, setText] = useState(false);
  let [submitted, setSubmitted] = useState(false);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      let res = await fetch(`http://localhost:5000/post/${id}/update`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title,
          text: text,
       }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },
      })
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Post update", resJson);
        setPost(resJson.update);
        setSubmitted(true);
        prepareForm();
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
    setPost(data.post[0]);
    setTitle(data.post[0].title);
    setText(data.post[0].text);
    })
  }, [submitted]);

  async function prepareForm(){
    await setUpdate(!update);
    if(!update){
      document.getElementsByName('title')[0].value = title;
      document.getElementsByName('text')[0].value = text;
    }
    setSubmitted(false);
  }

  return (
    <div className="Post">
      {post && 
      <div>
        <button onClick={() => {handleDelP()}}>Delete</button>
        <button onClick={() => {prepareForm()}}>Update</button>
        {update &&       
        <form onSubmit={handleUpdate}>
          <br></br>
          <label>
            Title:
            <br></br>
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
          </label>
          <label>
            <br></br>
            Text:
            <br></br>
            <textarea type="text" name="text" onChange={(e) => setText(e.target.value)}/>
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>}
        <br></br>
        {!update && 
          <div>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <i><p>Posted at: {post.date}</p></i>   
          </div> 
        }
        <Comment />
      </div>
      }
    </div>
  );
}

export default Post;
