const mysql = require("mysql2")
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponsive');
const { connect } = require("../Routes/book");
const pool = mysql.createPool(dbConfig);

const search = (req, res) => {
    const keyword = req.query.keyword
    
    const query = `SELECT * FROM books WHERE nama LIKE '%${keyword}%'`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.length == 0){
                return res.json({
                    message: 'Data tidak ditemukan'
                })
            }
            responseSuccess(res, results, 'Book successfully fetchehd')
        })

        connection.release()
    })
}

const sortBy = (req, res) => {
    const orderBy = req.query.orderBy

    const query = `SELECT * FROM books ORDER BY nama ${orderBy}` 

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.length == 0){
                responseNotFound(res)
                return
                }

                responseSuccess(res, results, 'Book Successfully Fetched')
            })
            connection.release()
        })
    }


const getBooks = (req, res) => {
    const query = "SELECT * FROM books"

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Books Successfully Fetched')
        })

        connection.release()
    })
}

const getBook = (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM books WHERE id=${id}`  

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.length == 0) {
                responseNotFound(res)
                return
            }
            responseSuccess(res, results, 'Book Successfully Fetched')
        })
        connection.release()
    })
}

const addBook = (req, res) => {
    const data = {
        nama: req.body.nama,
        author: req.body.author,
        year: req.body.year,
        page_count: req.body.page_count,
        publisher: req.body.publisher
    }

    const query = 'INSERT INTO books SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Book Successfully Added')
        })
        connection.release()
    })
}

const updateBook = (req, res) => {
    const id = req.params.id

    const data = {
        nama: req.body.nama,
        author: req.body.author,
        year: req.body.year,
        page_count: req.body.page_count,
        publisher: req.body.publisher
    }

    const query = `UPDATE books SET ? WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Book Successfully Updated')
        })
        connection.release()
    })
}

const deleteBook = (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM books WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.affectedRows == 0) {
                responseNotFound(res)
                return
            }
            responseSuccess(res, results, 'Book Successfully Deleted')
        })
        connection.release()
    })
}

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    search,
    sortBy
}
