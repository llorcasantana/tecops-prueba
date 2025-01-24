
import './App.css'
import {useProducts} from "./hooks";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {CartView, ConfirmationView, DetailView, HomeView} from "./views";
import {ProductProvider} from "./store/ProductProvider.tsx";
import {Navbar} from "./components";
import { PrimeReactProvider } from 'primereact/api';

function App() {
  const {data} = useProducts()
  if(data.status === 'LOADING'){
    return (
        <>
          <Navbar/>
          <p>CARGANDO...</p>
        </>
    )
  }
    if(data.status === 'ERROR'){
      return (
          <>
            <Navbar/>
            <p>ERROR...</p>
          </>
      )
    }

  return (
    <>
      <ProductProvider>
          <PrimeReactProvider>
              <Navbar/>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<HomeView />} />
                      <Route path="detail" element={<DetailView />}/>
                      <Route path="cart" element={<CartView />}/>
                      <Route path="confirmation" element={<ConfirmationView />}/>
                      <Route path="*" element={<Navigate to={'/'}/>}/>
                  </Routes>
              </BrowserRouter>
          </PrimeReactProvider>
      </ProductProvider>


    </>
  )
}

export default App
