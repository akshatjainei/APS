const express = require('express')
const axios = require("axios")

async function callFastAPI() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/output');
        return response.data
    } catch (error) {
        return {msg : error}
    }
}

module.exports = callFastAPI
