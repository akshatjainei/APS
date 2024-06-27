const express = require('express')
const axios = require("axios")
const { spawn } = require('child_process');
const path = require('path');

// const fastapiAppDir = './cv_model'

// const startFastAPIServer = () => {
//     return spawn('uvicorn', ['fastApi:app', '--reload'], {
//         cwd: fastapiAppDir,
//     });
// };

// const fastAPIServer = startFastAPIServer();

// fastAPIServer.stdout.on('data', (data) => {
//     console.log(`FastAPI: ${data}`);
// });

// fastAPIServer.stderr.on('data', (data) => {
//     console.error(`FastAPI Error: ${data}`);
// });

// fastAPIServer.on('close', (code) => {
//     console.log(`FastAPI server exited with code ${code}`);
// });



async function callFastAPI() {
    try {
        const response = await axios.get('http://localhost/output');
        return response.data
    } catch (error) {
        return {msg : error}
    }
}

module.exports = callFastAPI
