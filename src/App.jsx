import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home'
import Details from "./pages/Details"
import Profil from "./pages/Profil"
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoutes from './components/private'
import Create from "./pages/Create";
import EditEvent from "./pages/EditEvent";
import EditProfil from "./pages/EditProfil";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/profil" element={<Profil />} />
          <Route path="/update" element={<EditEvent />} />
          <Route path="/updateProfil" element={<EditProfil />} />
          <Route path="/create" element={<Create />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;