require('dotenv').config()
import Express from 'express'
import Cors from 'cors'
import { router } from '~/routes/'

import fs from 'fs'
import https from 'https'

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}

const App = Express()

App.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Methods',
      'DELETE, POST, PUT, GET, OPTIONS'
    )
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
  }

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Credentials', 'true')

  App.use(Cors())
  next()
})

App.use(router)

// App.listen(process.env.SERVER_PORT, () => {
//   console.log(
//     `${process.env.SERVER_NAME} is running on ${process.env.SERVER_PORT}`
//     )
//   })

https.createServer(options, App).listen(443)
