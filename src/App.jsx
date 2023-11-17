import './App.css'
import LoginForm from '../components/LoginForm/LoginForm'
import { mockFetch } from '../components/LoginForm/MockFetch'

function App() {

  return (
    <>
      <LoginForm fetch={ mockFetch } />
    </>
  )
}

export default App
