import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  api_key = "4a5a1f9b3d58406eb2a23b80341cb696"
  pageSize = 9
  render() {
    return (
      <>
        <Router>
          <Navbar />


          <Routes>
            <Route path="/" element={<News key="Home" apiKey={this.api_key} pageSize={this.pageSize} category="general" />} />

            <Route path="/business" element={<News key="business" apiKey={this.api_key} pageSize={this.pageSize} category="business" />} />

            <Route path="/entertainment" element={<News key="entertainment" apiKey={this.api_key} pageSize={this.pageSize} category="entertainment" />} />

            <Route path="/health" element={<News key="health" apiKey={this.api_key} pageSize={this.pageSize} category="health" />} />

            <Route path="/science" element={<News key="science" apiKey={this.api_key} pageSize={this.pageSize} category="science" />} />

            <Route path="/sports" element={<News key="sports" apiKey={this.api_key} pageSize={this.pageSize} category="sports" />} />

            <Route path="/technology" element={<News key="technology" apiKey={this.api_key} pageSize={this.pageSize} category="technology" />} />

          </Routes>
        </Router>

      </>
    )
  }
}
