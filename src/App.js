import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home"
import Post from "./components/Post"

function App() {
  return (
    <div className="App">
      <div className='Hero'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;