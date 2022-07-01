const Web3 = require('web3');

const connect = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.log('ethereum not defined on window')
    }
    console.log('window ethereum: ', window.ethereum, window.web3);
}

const main = async () => {
    const walletButton = document.getElementById('wallet-button');
    walletButton.addEventListener('click', connect);
}

$(function() {
    main();
});