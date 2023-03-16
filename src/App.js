import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className='Hero'>
        <Routes>
          <Route exact path="/" element={<p>hi</p>} />
          <Route path="/post/:id" element={<p>hi</p>} />
          <Route path="*" element={<p>hi</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
