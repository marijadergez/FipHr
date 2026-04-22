import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames, IME_APLIKACIJE } from './constants'


import Home from './pages/Home'
import UslugeNovi from './pages/usluge/UslugeNovi'
import UslugePromjena from './pages/usluge/UslugePromjena'
import UslugePregled from './pages/usluge/UslugePregled'


import './App.css'

import KorisnikPregled from './pages/korisnici/KorisnikPregled'
import KorisnikPromjena from './pages/korisnici/KorisnikPromjena'
import KorisnikNovi from './pages/korisnici/KorisnikNovi'

import GradPromjena from './pages/gradovi/GradPromjena'
import GradNovi from './pages/gradovi/GradNovi'
import GradPregled from './pages/gradovi/GradPregled'

import GeneriranjePodataka from './pages/GeneriranjePodataka'

import PonudaPregled from './pages/ponude/PonudaPregled'
import PonudaNovi from './pages/ponude/PonudaNovi'
import PonudaPromjena from './pages/ponude/PonudaPromjena'



function App() {

  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.USLUGE} element={<UslugePregled />} />
        <Route path={RouteNames.USLUGE_NOVI} element={<UslugeNovi />} />
        <Route path={RouteNames.USLUGE_PROMJENA} element={<UslugePromjena />} />

        <Route path={RouteNames.KORISNICI} element={<KorisnikPregled />} />
        <Route path={RouteNames.KORISNICI_NOVI} element={<KorisnikNovi />} />
        <Route path={RouteNames.KORISNICI_PROMJENA} element={<KorisnikPromjena />} />

        <Route path={RouteNames.GRADOVI} element={<GradPregled />} />
        <Route path={RouteNames.GRADOVI_NOVI} element={<GradNovi />} />
        <Route path={RouteNames.GRADOVI_PROMJENA} element={<GradPromjena />} />

        <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />

        <Route path={RouteNames.PONUDE} element={<PonudaPregled />} />
        <Route path={RouteNames.PONUDE_NOVI} element={<PonudaNovi />} />
        <Route path={RouteNames.PONUDE_PROMJENA} element={<PonudaPromjena />} />

       


      </Routes>


   


  
      

      &copy; Marija | Edunova | 2026.
    </Container>
  )
}

export default App
