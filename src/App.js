import './css/style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/fungsional/navbar';
import Home from './components/fungsional/home';
import About from './components/fungsional/about';
import Products from './components/fungsional/products';
import Detail from './components/fungsional/detail';
import ListComp from './components/class/listComp'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/mahasiswa' element={<ListComp />} />
          {/* <Route exact path='/product/:id' element={<Detail />} /> */}
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
