import React from 'react'
import CreateUser from './Components/CreateUser'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateInstance from './Components/CreateInstance'

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<CreateUser />} />
          <Route path="/addinstance" element={<CreateInstance />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App