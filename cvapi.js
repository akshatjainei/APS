const { spawn } = require('child_process');

function runPythonScript(scriptPath, args) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [scriptPath, ...args]);

        let output = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(new Error(`Python script execution failed with code ${code}. Error: ${error}`));
            }
        })
    })
}

const scriptPath = 'path/to/your/python_script.py';
const scriptArgs = ['arg1', 'arg2'];

runPythonScript(scriptPath, scriptArgs)
    .then((output) => {
        console.log('Output from Python script:', output);
    })
    .catch((error) => {
        console.error('Error running Python script:', error);
    })

module.exports = runPythonScript()