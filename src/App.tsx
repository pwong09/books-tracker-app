import React from 'react'
import * as express from 'express'
import SearchBar from './components/search-bar/SearchBar'

class App {
  public express

  constructor() {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes(): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    )
  }
}

export default new App().express