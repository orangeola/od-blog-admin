import React, {useState, useEffect} from 'react';

function Login() {  
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
    let res = await fetch(`https://od-blog-api.orangeola.repl.co/login`, {
       method: 'POST',
       body: JSON.stringify({
          username: username,
          password: password,
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    })
    let resJson = await res.json();
    if (res.status === 200) {
      console.log("Logged in", resJson);
      setError([{msg: "Logged in", param: "Success"}]);
      setSuccess(true);
      localStorage.setItem('token', JSON.stringify(resJson.token));
      console.log(JSON.parse(localStorage.getItem('token')));
    } else {
      console.log("Some error occured", resJson.errors);
      setError(resJson.errors);
    }
  }
  catch(err){
    console.log("err: ", err);
  }
  };

  return (
    <div className="Login">
      <form onSubmit={handleLogin}>
      <p><b>Login:</b></p>
      <label>
        Username:
        <br></br>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <label>
        <br></br>
        Password:
        <br></br>
        <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <br></br><br></br>
      <input type="submit" value="Submit" />
      <div>
        {error && error.map((err) => {
          return <div key={err.param}>
            <li>{err.msg}</li>
          </div>
        })}
      </div>
    </form>
    </div>
  );
}

export default Login;
