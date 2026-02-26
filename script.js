const genSingle = document.getElementById('gen-single');
const gen10 = document.getElementById('gen-10');
const gen50 = document.getElementById('gen-50');
const gen100 = document.getElementById('gen-100');
const output = document.getElementById('output');
const uuidList = document.getElementById('uuid-list');
const copyAll = document.getElementById('copy-all');

let currentUuids = [];

function generateUUID() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function generate(count) {
  currentUuids = [];
  for (let i = 0; i < count; i++) {
    currentUuids.push(generateUUID());
  }
  renderUuids();
  output.classList.remove('hidden');
}

function renderUuids() {
  uuidList.innerHTML = currentUuids
    .map(uuid => `<div class="uuid-line">${uuid}</div>`)
    .join('');
}

genSingle.addEventListener('click', () => generate(1));
gen10.addEventListener('click', () => generate(10));
gen50.addEventListener('click', () => generate(50));
gen100.addEventListener('click', () => generate(100));

copyAll.addEventListener('click', () => {
  if (currentUuids.length > 0) {
    const text = currentUuids.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      copyAll.textContent = 'Copied!';
      setTimeout(() => { copyAll.textContent = 'Copy all'; }, 2000);
    });
  }
});