import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Details from "./pages/Details";
import NotFound from './pages/NotFound'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;