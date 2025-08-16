const sampleCorpus = {
  "love": [
    "Hearts collide in silent verse",
    "Whispers tangle in the moon's embrace",
    "Eyes speak stories of forever"
  ],
  "anger": [
    "Flames lick the edge of reason",
    "Voices thunder through clenched teeth",
    "Wrath carves paths in stone"
  ],
  "joy": [
    "Laughter rises like morning sun",
    "Steps bounce in rhythm with the wind",
    "Hope blooms from fingertips"
  ],
  "sad": [
    "Tears trail the edges of a poem",
    "Clouds curl around tired shoulders",
    "Goodbyes hum in the background"
  ]
};

let currentPoem = [];

const themeInput = document.getElementById('themeInput');
const generateBtn = document.getElementById('generateBtn');
const poemOutput = document.getElementById('poemOutput');
const stitchInput = document.getElementById('stitchInput');
const stitchBtn = document.getElementById('stitchBtn');
const speakBtn = document.getElementById('speakBtn');
const stopBtn = document.getElementById('stopBtn');

const synth = window.speechSynthesis;
let utterance = null;

function generatePoem(theme) {
  const lines = sampleCorpus[theme.toLowerCase()];
  if (!lines) {
    return [`Hmm... I haven’t found a poem for "${theme}" yet.`];
  }

  let poem = [];
  for (let i = 0; i < 3; i++) {
    const line = lines[Math.floor(Math.random() * lines.length)];
    poem.push(line);
  }
  return poem;
}

function renderPoem() {
  poemOutput.textContent = currentPoem.join('\n');
}

generateBtn.addEventListener('click', () => {
  const theme = themeInput.value.trim();
  if (!theme) {
    alert("Please enter a theme or emotion.");
    return;
  }

  currentPoem = generatePoem(theme);
  renderPoem();
});

stitchBtn.addEventListener('click', () => {
  const line = stitchInput.value.trim();
  if (!line) {
    alert("Please enter a line to stitch.");
    return;
  }

  currentPoem.push(line);
  renderPoem();
  stitchInput.value = '';
});

speakBtn.addEventListener('click', () => {
  if (!currentPoem.length) {
    alert("No poem to speak. Generate one first.");
    return;
  }

  if (synth.speaking) synth.cancel();

  utterance = new SpeechSynthesisUtterance(currentPoem.join('. '));
  utterance.rate = 1;
  utterance.pitch = 1;
  synth.speak(utterance);
});

stopBtn.addEventListener('click', () => {
  if (synth.speaking) {
    synth.cancel();
  }
});
