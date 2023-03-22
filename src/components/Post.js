import { useParams, } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Comment from "./Comment"

function Post() {
  const {id} = useParams();
  let [post, setPost] = useState(null);
  let [update, setUpdate] = useState(false);
  let [title, setTitle] = useState(false);
  let [text, setText] = useState(false);

  const handleDelP = async () => {
    try{
      let res = await fetch(`https://od-blog-api.orangeola.repl.co/post/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },
      })
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Post deleted", resJson);
        window.location.replace("https://od-blog-api.orangeola.repl.co/home");
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
      let res = await fetch(`https://od-blog-api.orangeola.repl.co/post/${id}/update`, {
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
    fetch(`https://od-blog-api.orangeola.repl.co/post/${id}`)
   .then(response => response.json())
   .then(data => {
    setPost(data.post[0]);
    setTitle(data.post[0].title);
    setText(data.post[0].text);
    })
  }, [update]);

  async function prepareForm(){
    await setUpdate(!update);
    if(!update){
      document.getElementsByName('title')[0].value = title;
      document.getElementsByName('text')[0].value = text;
    }
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
