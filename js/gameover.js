const buttonElm = document.getElementById('playAgainBtn');

buttonElm.addEventListener('click', () => {
    window.location.href = './battle.html';
})

const audioElm = document.getElementById('audioTrack');

document.addEventListener('click', function() {
    audioElm.volume = 0.1;
    audioElm.play();
})



// Restart the audio when it finishes.
audioElm.addEventListener('ended', function() {
    audioElm.currentTime = 0;
    audioElm.play();
});