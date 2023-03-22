import React, {useState, useEffect} from 'react';

function New() {
  let [title, setTitle] = useState(false);
  let [text, setText] = useState(false);

  const handleNew = async (e) => {
    e.preventDefault();
    try{
      let res = await fetch(`https://od-blog-api.orangeola.repl.co/post/new`, {
        method: 'POST',
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
      } else {
        console.log("Some error occured", resJson);
      }
    }
    catch(err){
      console.log("fetch err: ", err);
    }
  };

  return (
    <div className="New">
      <form onSubmit={handleNew}>
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
        </form>
    </div>
  );
}

export default New;
