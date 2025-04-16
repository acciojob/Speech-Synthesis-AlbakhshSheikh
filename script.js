// Your script here.
const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Populate voices list
  function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      voicesDropdown.innerHTML = '<option value="">No voices available</option>';
      return;
    }

    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Set the voice for the utterance
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === voicesDropdown.value);
    restart();
  }

  // Set other speech options (rate, pitch, text)
  function setOption() {
    msg[this.name] = this.value;
    restart();
  }

  // Speak the message
  function speak() {
    if (!msg.text.trim()) {
      alert('Please enter some text to speak.');
      return;
    }
    window.speechSynthesis.speak(msg);
  }

  // Stop the message
  function stop() {
    window.speechSynthesis.cancel();
  }

  // Restart speech if settings change during playback
  function restart() {
    stop();
    speak();
  }

  // Initialize
  msg.text = document.querySelector('[name="text"]').value;

  // Event listeners
  window.speechSynthesis.onvoiceschanged = populateVoices;
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);