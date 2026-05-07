import { useContext, useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { LanguageContext } from '../../context/LanguageContext'
import './Login.css'
import API_URL from '../../config';

export default function Login() {
  const auth = useContext(AuthContext)
  const languageContext = useContext(LanguageContext)
  const t = languageContext.translations

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')

  if (auth.isLoggedIn) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }

      auth.login(responseData.userId, responseData.token)
      navigate('/')
    } catch (err) {
      setErreur(err.message)
    }
  }

  return (
    <div className="login-page">
      <h1>{t.login}</h1>

      {erreur && <p>{erreur}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">{t.email}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">{t.password}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">{t.login}</button>
      </form>

      <Link to="/inscription">{t.noAccount}</Link>
    </div>
  )
}