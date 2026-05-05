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

import LoadingSpinner from './components/LoadingSpinner'

import Login from './pages/login/Login'
import Registracija from './pages/registracija/Registracija'
import NadzornaPloca from './pages/NadzornaPloca'
import useAuth from './hooks/useAuth'
import OperaterPregled from './pages/operateri/OperaterPregled'
import OperaterNovi from './pages/operateri/OperaterNovi'
import OperaterPromjena from './pages/operateri/OperaterPromjena'
import OperaterPromjenaLozinke from './pages/operateri/OperaterPromjenaLozinke'


function App() {

  const { isLoggedIn, authUser } = useAuth()


  return (
    <>
      <LoadingSpinner />
      <Container style={{ backgroundColor: window.location.hostname === 'localhost' ? '#ffefea' : 'none' }}>
        <Izbornik />
        <Container className='app'>
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />

          {isLoggedIn ? (
            <>
              <Route path={RouteNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />

              <Route path={RouteNames.USLUGE} element={<UslugePregled />} />
              <Route path={RouteNames.USLUGE_NOVI} element={<UslugeNovi />} />
              <Route path={RouteNames.USLUGE_PROMJENA} element={<UslugePromjena />} />

              <Route path={RouteNames.KORISNICI} element={<KorisnikPregled />} />
              <Route path={RouteNames.KORISNICI_NOVI} element={<KorisnikNovi />} />
              <Route path={RouteNames.KORISNICI_PROMJENA} element={<KorisnikPromjena />} />

              <Route path={RouteNames.GRADOVI} element={<GradPregled />} />
              <Route path={RouteNames.GRADOVI_NOVI} element={<GradNovi />} />
              <Route path={RouteNames.GRADOVI_PROMJENA} element={<GradPromjena />} />

              {authUser.uloga === 'admin' && (
                <>
                  <Route path={RouteNames.OPERATERI} element={<OperaterPregled />} />
                  <Route path={RouteNames.OPERATERI_NOVI} element={<OperaterNovi />} />
                  <Route path={RouteNames.OPERATERI_PROMJENA} element={<OperaterPromjena />} />
                  <Route path={RouteNames.OPERATERI_PROMJENA_LOZINKE} element={<OperaterPromjenaLozinke />} />
                  <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />
                </>
              )}
             
                <Route path={RouteNames.PONUDE} element={<PonudaPregled />} />
                <Route path={RouteNames.PONUDE_NOVI} element={<PonudaNovi />} />
                <Route path={RouteNames.PONUDE_PROMJENA} element={<PonudaPromjena />} />
              
              
              </>
            ) : (
              <>
                <Route path={RouteNames.LOGIN} element={<Login />} />
                <Route path={RouteNames.REGISTRACIJA} element={<Registracija />} />
              </>
            )}


         </Routes>
        </Container>
        <hr />

         &copy; Marija | Edunova | 2026.
      </Container ></>
  )
}

export default App
