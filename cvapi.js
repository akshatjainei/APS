const express = require('express')
const { spawn } = require('child_process');

const scripter = () => {

    let dataToSend;
    const python = spawn('python', ['script.py', firstNum , secondNum]);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
    });
}

export default scripter