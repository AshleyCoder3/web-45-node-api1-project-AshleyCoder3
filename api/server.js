// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'The users information could not be retrieved' })
        })
})
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The user information could not be retrieved' })
        })
})
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    User.insert({ name, bio })
        .then(user => {
            if (!user.name || !user.bio) {
                res.status(400).json({ message: 'Please provide name and bio for the user' })
            } else {
                res.status(201).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error while saving the user to the database' })
        })
})
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    User.update(id, { name, bio })
        .then(updatedUser => {
            if (!updatedUser.name || !updatedUser.bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } if (!updatedUser.id) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(updatedUser)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The user information could not be modified' })
        })
})
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.remove(id)
        .then(removed => {
            if (!removed) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(removed)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
