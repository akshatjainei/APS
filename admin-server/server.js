const express = require('express')
const { ApolloServer } = require('@apollo/server')
const bodyParser = require('body-parser')
const {expressMiddleware} = require('@apollo/server/express4')
const cors = require('cors')
const axios = require('axios')

async function startServer() {
    const app = express()
    const server = new ApolloServer({
        typeDefs:`
           type Ticket{
                id : ID!
                parkingSpot : String!
                timestamp : String!
           }
            
           type Query{
                getAllTicket : [Ticket]
           }
        `,
        resolvers : {
            Query : {
              getAllTicket: ({ id }) => {
                return tickets.find(ticket => ticket.id === id);
              },
            }
        },
    })

    app.use(bodyParser.json())
    app.use(cors())

    await server.start()

    app.use('/graphql' , expressMiddleware(server))
    app.listen(8000 , ()=> console.log('Started server'))
}

startServer()