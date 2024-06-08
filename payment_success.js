const callFastAPI = require('./cvapi')

const test = async()=>{
    const response = await callFastAPI()
    return response.count
}


document.addEventListener('DOMContentLoaded', function() {
    // Predefined token value
    const token = test();
    
    // Generate the QR code
    const qrcodeContainer = document.getElementById('qrcode');
    new QRCode(qrcodeContainer, token);
});
