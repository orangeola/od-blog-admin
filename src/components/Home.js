import React, {useState, useEffect} from 'react';

function Home() {
    let [posts, setPosts] = useState(null);

    function limitLengthText(input){
      let desiredLength = 100;
      if(input.length > desiredLength){
        return input.slice(0, desiredLength-input.length) + "...";
      }
      return input;
    }
  
    function limitLengthTitle(input){
      let desiredLength = 200;
      if(input.length > desiredLength){
        return input.slice(0, desiredLength-input.length) + "...";
      }
      return input;
    }
  
    useEffect(() => {
      fetch('http://localhost:5000/post')
     .then(response => response.json())
     .then(data => {
      setPosts(data.post)})
    }, []);
  
  
    return (
      <div className="DeletePost">
        {posts && posts.map((task) => {
        return <div key={task._id}>
          <a href={'/post/' + task._id}>{limitLengthTitle(task.title)}</a><br></br>
          {limitLengthText(task.text)}<br></br>
          <i>{task.date}</i><br></br>
          <hr></hr>
          </div>;
        })}
        <br></br>
        <a href='/'>New Post</a>
      </div>
    );
  }

export default Home;

/*
<h1>Posts</h1>    
        <a href="/deletepost">Delete posts</a>
        <br></br>
        <a href="/">Update posts</a>
        <br></br>
        <a href="/">New post</a>
        <br></br>
        <h1>Comments</h1>
        <a href="/">Delete comments</a>
        <br></br>
        */