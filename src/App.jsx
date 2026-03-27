import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import UslugePregled from './pages/usluge/UslugePregled'
import Home from './pages/Home'
import UslugeNovi from './pages/usluge/UslugeNovi'
import UslugePromjena from './pages/usluge/UslugePromjena'

import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function App() {

  return (
    <Container>
      <Izbornik />
      <Routes>
          <Route path={RouteNames.HOME} element={<Home/>}  />
          <Route path={RouteNames.USLUGE} element={<UslugePregled />}  />
          <Route path={RouteNames.USLUGE_NOVI} element={<UslugeNovi />}  />
          <Route path={RouteNames.USLUGE_PROMJENA} element={<UslugePromjena />}  />


      </Routes>
      <DotLottieReact
      src="https://lottie.host/671c63f5-ebe2-4a63-a4ba-11e54b67d00e/8hocp9zpl8.lottie"
      loop
      autoplay
    />
      <hr />

      &copy; Marija | Edunova | 2026.
    </Container>
  )
}

export default App
