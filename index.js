const express = require('express')
const mysql = require('mysql2')
const bookRoute = require('./Routes/book')
const authorRoute = require('./Routes/author')
const authRoute = require('./Routes/auth')
const dbConfig = require('./config/database')
const pool = mysql.createPool(dbConfig)
const authenticateJWT = require('./middleware/auth')
const cors = require('cors')

pool.on('error', (err) => {
    console.log(err)
})

const app = express()
const port = 3005

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))   

//membuat parameter diawali dengan : dan diikuti dengan nama parameter
app.get('/contohparameter/:username/:jurusan/:kelas', (req, res) => {
    res.json(req.params)
})

app.get('/contohparam', (req, res) => {
    res.json(req.query)
})

app.get('/', (req, res) => {
  res.write('Hello world')
  res.end()

  // koneksi.query('select * from books', (err, result) => {
  //     if(err){
  //         console.log('error')
  //     }else{
          
  //     }
  // })
})

app.use('/book', bookRoute)
app.use('/author', authenticateJWT, authorRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})