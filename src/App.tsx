import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      main page
      <Link to={'/list'}>to lists</Link>
    </div>
  )
}

export default App
