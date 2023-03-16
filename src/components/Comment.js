import { useParams, } from "react-router-dom";
import React, {useState, useEffect} from 'react';

function Comment() {
  const {id} = useParams();
  let [comments, setComments] = useState(null);
  let [success, setSuccess] = useState(false);
  let [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    const handleDel = async () => {
      try{
        let res = await fetch(`http://localhost:5000/comment/${toDelete}`, {
          method: 'DELETE',
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
        })
        let resJson = await res.json();
        if (res.status === 200) {
          console.log("Comment deleted", resJson);
        } else {
          console.log("Some error occured", resJson);
        }
      }
      catch(err){
        console.log("fetch err: ", err);
      }
    };
    if(toDelete !== null){
      handleDel();
      setToDelete(null);
      setSuccess(true);
    }
  }, [toDelete]);

  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}/comment`)
   .then(response => response.json())
   .then(data => {
    console.log(data.comment)
    setComments(data.comment);
    })
    setSuccess(false);
  }, [success]);

  return (
    <div className="Comment">
      <div>
        {comments && comments.map((task) => {
          return <div key={task._id}>
            <i>{task.author}</i><br></br>
            <i>{task.date}</i><br></br>
            {task.text}<br></br>
            <button onClick={() => {setToDelete(task._id)}}>Delete</button>
            <hr></hr>
            </div>;
        })}
    </div>
    </div>
  );
}

export default Comment;
