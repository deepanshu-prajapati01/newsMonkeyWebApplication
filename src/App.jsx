import React, {useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const pageSize = 9

const [progress, setProgress] = useState(0)

  return (
    <>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar />

        <Routes>
          <Route path="/" element={<News setProgress={setProgress} key="Home" apiKey={api_key} pageSize={pageSize} category="general" />} />

          <Route path="/business" element={<News setProgress={setProgress} key="business" apiKey={api_key} pageSize={pageSize} category="business" />} />

          <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" apiKey={api_key} pageSize={pageSize} category="entertainment" />} />

          <Route path="/health" element={<News setProgress={setProgress} key="health" apiKey={api_key} pageSize={pageSize} category="health" />} />

          <Route path="/science" element={<News setProgress={setProgress} key="science" apiKey={api_key} pageSize={pageSize} category="science" />} />

          <Route path="/sports" element={<News setProgress={setProgress} key="sports" apiKey={api_key} pageSize={pageSize} category="sports" />} />

          <Route path="/technology" element={<News setProgress={setProgress} key="technology" apiKey={api_key} pageSize={pageSize} category="technology" />} />

        </Routes>
      </Router>

    </>
  )
}


export default App