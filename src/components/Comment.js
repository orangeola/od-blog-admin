import { useParams, } from "react-router-dom";
import React, {useState, useEffect} from 'react';

function Comment() {
  const {id} = useParams();
  let [comments, setComments] = useState(null);
  let [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}/comment`)
   .then(response => response.json())
   .then(data => {
    console.log(data.comment)
    setComments(data.comment);
    })
  }, [success]);

  return (
    <div className="Comment">
      <div>
        {comments && comments.map((task) => {
          return <div key={task._id}>
            <i>{task.author}</i><br></br>
            <i>{task.date}</i><br></br>
            {task.text}<br></br>
            <button>Delete</button>
            <hr></hr>
            </div>;
        })}
    </div>
    </div>
  );
}

export default Comment;
