const axios = require("axios")

async function callFastAPI() {
    try {
        const response = await axios.get('http://localhost/output');
        return response.data
    } catch (error) {
        return {msg : error}
    }
}

module.exports = callFastAPI
