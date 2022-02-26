import Movies from "./Components/Movies";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/movie" element={<Movies />}></Route>
        <Route path="/about" element={<About isAuth={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
