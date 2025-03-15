
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <>
    <ToastContainer /> 

<Header/>

<main className=' min-h-[calc(100vh-120px)] pt-16'>
  <Outlet/>
</main>  
    
      <Footer />
    
</>
  );
}

export default App;