const mysql = require("mysql2")
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponsive')
const pool = mysql.createPool(dbConfig);

const getAuthors = (req, res) => {
    const query = "SELECT * FROM author"

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Authors Successfully Fetched')
        })

        connection.release()
    })
}

const getAuthor = (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM author WHERE id=${id}`  

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.length == 0) {
                responseNotFound(res)
                return
            }
            responseSuccess(res, results, 'Authors Successfully Fetched')
        })
        connection.release()
    })
}

const addAuthor = (req, res) => {
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query = 'INSERT INTO author SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Authors Successfully Added')
        })
        connection.release()
    })
}

const updateAuthor = (req, res) => {
    const id = req.params.id

    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query = `UPDATE author SET ? WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Authors Successfully Updated')
        })
        connection.release()
    })
}

const deleteAuthor = (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM author WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.affectedRows == 0) {
                responseNotFound(res)
                return
            }
            responseSuccess(res, results, 'Authors Successfully Deleted')
        })
        connection.release()
    })
}

module.exports = {
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}
