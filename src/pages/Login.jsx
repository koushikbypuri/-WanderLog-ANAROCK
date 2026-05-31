import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    if (email && password) {
      localStorage.setItem('token', 'dummy-token')
      navigate('/explore')
    } else {
      alert('Enter email and password')
    }
  }

  return (
    <div className="login-container">
      <h1>🌍 WanderLog Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login