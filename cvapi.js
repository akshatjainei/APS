const express = require('express')
const axios = require("axios")
const { exec } = require('child_process');
const path = require('path');

// function startFastAPIServer(scriptPath) {
//     const pythonProcess = exec('uvicorn fastApi:app --reload', [scriptPath]);

//     pythonProcess.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//         console.log(`FastAPI server process exited with code ${code}`);
//     });

//     pythonProcess.on('error', (error) => {
//         console.error(`Failed to start FastAPI server: ${error.message}`);
//     });
// }

// const scriptPath = path.join(__dirname, './cv_model','fastApi.py'); 

// startFastAPIServer(scriptPath);

async function callFastAPI() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/output');
        return response.data
    } catch (error) {
        return {msg : error}
    }
}

module.exports = callFastAPI
