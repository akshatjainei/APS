const callFastAPI = require("./cvapi");

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
        let data = response.data
        console.log(data)
        return console.log('posted')
    } catch(err) {
        console.log("err->", err.response)
        return res.status(500).send({ret_code: ReturnCodes.SOMETHING_WENT_WRONG});
    }
  }

module.exports = generateTicket