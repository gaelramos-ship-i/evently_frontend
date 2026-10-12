import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home'
import Details from "./pages/Details"
import Profil from "./pages/Profil"
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoutes from './components/private'
import Update from "./pages/Update";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/profil" element={<Profil />} />
          <Route path="/update" element={<Update />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;