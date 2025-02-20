import { Route, Routes, useLocation} from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddPlaces from "./pages/AddPlaces";

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";
  console.log(hideNavbar);
  return (
    <>

{!hideNavbar && <Navbar />}
    <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/gallery/images' element={<Gallery/>}/>
    <Route path='/gallery/contact' element={<Contact/>}/>
    <Route path='/account/login' element={<Login/>}/>
  <Route path='/account/signup' element={<Signup/>}/>
 
  <Route path='/gallery/about' element={<About/>}/>
  <Route path='/post/imagedata' element={<AddPlaces/>}/>
  </Routes>
    <Footer/>
    </>
  )
}

export default App
