import './App.css'
import {Routes, Route } from "react-router-dom";
import Hero  from './components/Hero'
import About from './components/About'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Testimonial from './components/Testimonial'
import Navbar from './components/Navbar'
import KnowMore from './components/Knowmore';
import Doctors from './components/Doctotrs';
import Contact from './components/Contact';
import Cure from './components/Cure';
import Appointment from './components/Appointment';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import DiseaseForm from './components/DiseaseForm';
function App() {
 

  return (
    <>
    <Navbar/>
<Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/cure" element={<Cure/>} />
        <Route path="/appointment" element={<Appointment/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/knowmore" element={<KnowMore/>} />
        <Route path="/doctor" element={<Doctors/>} />
        <Route path="/testimonial" element={<Testimonial/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/add-blog" element={<BlogForm/>} />
       
        <Route path="/add" element={<DiseaseForm />} />
        <Route path="/update/:id" element={<DiseaseForm />} />
        
        <Route path="/update-blog/:id" element={<BlogForm />} />
      </Routes>

  {/* <Testimonial/> */}
  <Footer/>
    </>
  )
}

export default App
