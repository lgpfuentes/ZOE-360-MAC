const QRCode = require('qrcode');
const speakeasy = require('speakeasy');

const secret = speakeasy.generateSecret({
    name: 'Zoé 360 user'
});
const otpauth_url = secret.otpauth_url;

QRCode.toDataURL(otpauth_url, (err, data_url) => {
    if (err) {
    console.error(err);
    } else {
    document.getElementById('qrcode').innerHTML = `<img src="${data_url}" alt="Código QR">`;
    }
});

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();

    const token = document.getElementById('token').value;
    const verified = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: token,
        window: 6
    });

    if (verified) {
    window.location.href = 'menu.html';
    } else {
    alert('Código de autenticación incorrecto');
    }
});

