const socket = io(); // Connect to server

// Define our sounds using Howler.js
const sounds = {
  sound1: new Howl({ src: ['sounds/sound1.mp3'] }),
  sound2: new Howl({ src: ['sounds/sound2.mp3'] })
};

// Play sound when image is clicked
document.querySelectorAll('.sound-button').forEach(button => {
  button.addEventListener('click', () => {
    const soundName = button.getAttribute('data-sound');
    sounds[soundName].play();
    socket.emit('play-sound', soundName); // Tell others
  });
});

// When someone else clicks a button
socket.on('play-sound', (soundName) => {
  sounds[soundName].play();
});
