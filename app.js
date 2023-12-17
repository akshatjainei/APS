const express = require('express')
const app = express()

const PORT = 3300

app.get('/' , (req , res)=>{
    res.send('Hello bhai')
})

app.listen(PORT , (req , res)=>{
    console.log(`Server running at ${PORT}`)
})