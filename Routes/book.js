const express = require('express')
const router = express.Router()
const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    search,
    sortBy
} = require('../controllers/BookController')

//route untuk mendapatkan semua data
router.get('/search', search)

router.get('/sort', sortBy)

router.get('/', getBooks)

router.post('/', addBook)

router.get('/:id', getBook)

router.put('/:id', updateBook)

router.delete('/:id', deleteBook)

// router.get('/:id', (req, res) => {

// })

//route untuk memperbaruhui data
// router.put('/:id', (req, res) => {
//     res.write('PUT book code')
//     res.end()
// })

//route untuk menghapus data
// router.delete('/:id', (req, res) => {
//     res.write('DELETE book code')
//     res.end()
// })

module.exports = router