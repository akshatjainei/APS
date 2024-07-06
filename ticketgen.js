const callFastAPI = require("./cvapi");
const axios = require("axios")
async function generateTicket(){
    try{
        let space = await callFastAPI()
        let headers = {
          'Content-Type': 'application/json'
        }
        let url =  `http://localhost:3300/api/v1/ticket`
        let body = {
            "parkingSpot" : space.list[0]
        }
        data = await axios.post(url, body, {headers});
        return data
    } catch(err) {
        console.log("err->", err)
    }
  }

module.exports = generateTicket