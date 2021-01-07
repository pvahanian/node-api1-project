// 1- DEPENDENCIES
// import express from 'express' // package.json needs a "type" key with a value of "module"
const express = require('express') // commonjs module system that came with Node
// import { generate } from 'shortid' // ES6 modules
const generate = require('shortid').generate

// 2- INSTANTIATE AND CONFIGURE THE SERVER
const app = express() // here is our app (our server)
app.use(express.json()) // plugging in a piece of middleware

// 3- DECIDE A PORT NUMBER
const PORT = 5000

// 4- FAKE DATA
let users = [
  { 
    id:generate(),
    name: 'Pablo',
    bio: 'Lambda sheep'
 },
]

// 5- ENDPOINTS
// [GET] all users in the db
app.get('/users', (req, res) => {
  res.status(200).json(users)
})

//GET user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params
    const user = users.find(user => user.id === id)
try {
    if(!user) {
        res.status(404).json({
            message: `No user with the id: ${id} found!`
        })
    } else {
        res.status(200).json(user.id)
    }
} catch (error) {
    res.status(500).json({
        message: 'Something went wrong'
    })
}
})

app.post('/users', (req, res) => {
    const { name, bio} = req.body

    if(!name || !bio) {
        res.status(400).json({
            message:"Name and bio are missing"
        })
    }
        else{
            const newUser= {
                id: generate(), 
                name,
                bio
            }
            users.push(newUser)
            res.status(201).json(newUser)
        }
    }
)

app.put('/users/:id', (req,res)=>{
    const {id} = req.params

    const {name, bio} = req.body

    const indexOfUser = users.findIndex(user => user.id === id)
    try{
            if(indexOfUser!==-1){
                users[indexOfUser]= {id, name, bio}
                res.status(200).json ({id, name, bio})
            }
            else
            {
                res.status(404).json({
                    message:`no id at ${id}`
                })
            }
    }
    catch (error) {
            res.status(500).json({ message: 'Something went really bad' })
      }
})

app.delete('/users/:id', (req,res)=>{
    const {id} = req.params
    const indexOfUser = users.findIndex(user => user.id === id)
    
    try{
    if(indexOfUser!==-1){
        users = users.filter(user => user.id!==id)
        res.status(200).json ({id,message:"removed"})
    }
    else
    {
        res.status(404).json({
            message:`no id at ${id}`
        })
    }}catch (error) {
        res.status(500).json({ message: 'Something went really bad' })
  }
})

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
  })