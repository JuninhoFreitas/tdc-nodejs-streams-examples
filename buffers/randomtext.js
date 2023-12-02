const fs = require('fs');

const generateRandomText = (sizeInBytes) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';

    for (let i = 0; i < sizeInBytes; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
    }

    return randomText;
};

const fileSizeInBytes = 10 * 1024 * 1024; // 10MB
const randomText = generateRandomText(fileSizeInBytes);

fs.writeFileSync('randomtext.txt', randomText);
console.log('Random text file generated successfully!');
