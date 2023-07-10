import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App1() {
  return (
    <div>
        <div>
            <BrowserRouter>
            <Routes>
                
                <Route path="/dashboard" element={<Dashboard />} />

            </Routes>
        </BrowserRouter>

      </div>
    </div>
  )
}

export default App1
