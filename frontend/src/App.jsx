import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { LanguageContextProvider } from './context/LanguageContext'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import ListeRecettes from './pages/listeRecettes/ListeRecettes'
import AjouterRecette from './pages/ajouterRecette/AjouterRecette'
import EditRecette from './pages/editRecette/EditRecette'
import Login from './pages/login/login'
import Inscription from './pages/inscription/Inscription'
import NotFound from './pages/404/NotFound'

import './App.css'

function App() {
  return (
    <AuthContextProvider>
      <LanguageContextProvider>
        <BrowserRouter>
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<ListeRecettes />} />
              <Route path="/ajouter" element={<AjouterRecette />} />
              <Route path="/modifier/:rid" element={<EditRecette />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </LanguageContextProvider>
    </AuthContextProvider>
  )
}

export default App