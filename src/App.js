import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  // api_key = "4a5a1f9b3d58406eb2a23b80341cb696"
  api_key = "a054b87ae3fe4832809ca2631c121a84"
  pageSize = 9

  state = { progress: 0 }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />

          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="Home" apiKey={this.api_key} pageSize={this.pageSize} category="general" />} />

            <Route path="/business" element={<News setProgress={this.setProgress} key="business" apiKey={this.api_key} pageSize={this.pageSize} category="business" />} />

            <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" apiKey={this.api_key} pageSize={this.pageSize} category="entertainment" />} />

            <Route path="/health" element={<News setProgress={this.setProgress} key="health" apiKey={this.api_key} pageSize={this.pageSize} category="health" />} />

            <Route path="/science" element={<News setProgress={this.setProgress} key="science" apiKey={this.api_key} pageSize={this.pageSize} category="science" />} />

            <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" apiKey={this.api_key} pageSize={this.pageSize} category="sports" />} />

            <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" apiKey={this.api_key} pageSize={this.pageSize} category="technology" />} />

          </Routes>
        </Router>

      </>
    )
  }
}
