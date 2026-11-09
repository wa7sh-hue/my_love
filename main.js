const page = location.pathname.split('/').pop() || 'index.html';
const app = document.getElementById('app');
const rose = `<aside class="rose-art" aria-label="A black rose, a symbol of enduring love"><span class="art-star top" aria-hidden="true">✧</span><span class="art-star left" aria-hidden="true">✧</span><img class="rose-photo" src="assets/black-rose.jpg" alt="A dark, velvety black rose in bloom"><span class="art-star right" aria-hidden="true">✦</span><span class="rose-caption">RARE. IMPERFECT. ETERNALLY YOURS.</span><span class="rose-quote">Even in the dark, I would find you.</span></aside>`;
const chapters = (step) => `<div class="chapter-nav" aria-label="Chapter ${step} of 4">${[1,2,3,4].map(n => `<span class="${n === step ? 'active' : ''}" aria-hidden="true"></span>`).join('')}<small>CHAPTER 0${step} / 04</small></div>`;
const back = (href, label = 'Go back') => `<a class="back" href="${href}"><span aria-hidden="true">←</span> ${label}</a>`;
const screens = {
  'index.html': {
    title: 'Do you love me?',
    body: `<p class="eyebrow">A QUESTION FROM MY HEART</p><h1 class="heading">Do you<br><em>love me?</em></h1><p class="intro">In a world of fleeting things,<br>I hope we are something that stays.</p><div class="buttons"><a class="btn primary" href="why.html">Yes, I do <span class="heart" aria-hidden="true">♡</span></a><button class="btn" id="runaway" type="button">No <span aria-hidden="true">↗</span></button></div><p class="choice-note" id="choice-note" aria-live="polite">Psst… some answers are harder to catch.</p>${chapters(1)}`
  },
  'why.html': {
    title: 'Why do you love me?',
    body: `<p class="eyebrow">LET ME INTO YOUR HEART</p><h1 class="heading form-heading">Why do you<br><em>love me?</em></h1><p class="intro">Give me details.<br>The little things. The everything.</p><form class="answer-form" id="answer-form"><label for="love-answer">YOUR WORDS, IN YOUR OWN TIME</label><textarea id="love-answer" name="answer" required maxlength="10000" placeholder="I love you because…"></textarea><div class="form-bottom"><span class="privacy-note">Just between you and this browser.<br>Your words aren't sent anywhere.</span><button class="btn primary" type="submit">Next <span class="arrow" aria-hidden="true">→</span></button></div></form>${back('index.html')}${chapters(2)}`
  },
  'official.html': {
    title: 'Do you want to make this official?',
    body: `<p class="eyebrow">ONE MORE QUESTION, MY LOVE</p><h1 class="heading form-heading">Do you want<br>to make this<br><em>official?</em></h1><p class="intro">Not just a moment.<br>A story we choose to write together.</p><div class="buttons"><a class="btn primary" href="promises.html">Yes, I do <span class="heart" aria-hidden="true">♡</span></a><a class="btn" href="poem.html">No <span aria-hidden="true">↗</span></a></div><p class="choice-note">This time, both answers will stay right here.</p>${back('why.html')}${chapters(3)}`
  },
  'promises.html': {
    title: 'Some info on me before you do this.',
    className: 'long-page',
    body: `<p class="eyebrow">THE HEART YOU'RE SAYING YES TO</p><h1 class="heading">Some info on me<br><em>before you do this.</em></h1><p class="intro">Not perfect. Just yours, wholeheartedly.</p><ol class="promises"><li><span><strong>I'll be stuck on you.</strong> In the little moments and the ordinary days, I'll keep finding my way back to you.</span></li><li><span><strong>I'll get clingy.</strong> I'll miss you sooner than I should, want one more minute, and always reach for your hand—while respecting the space you need.</span></li><li><span><strong>I'll hold you, no matter what.</strong> On the beautiful days and the difficult ones, whenever you want my arms around you, they'll be there.</span></li><li><span><strong>I'll be there, even when you can't be.</strong> You won't have to earn my care by always having something left to give.</span></li><li><span><strong>Your words, your pain, your love.</strong> Whatever you want to share with me, I'll receive it with appreciation. You don't have to hide the hard parts of your heart.</span></li><li><span><strong>I'll always look at you like you're the most important thing in the world.</strong> Not just when you're shining. Even when you can't see your own light.</span></li></ol><p class="closing">A black rose. A soft heart. All yours.</p>${back('official.html', 'Back to your choice')}${chapters(4)}`
  },
  'poem.html': {
    title: 'My heart will stay bound to you.',
    className: 'long-page poem-page',
    body: `<p class="eyebrow">SOME FEELINGS DON'T NEED A YES</p><span class="sad" role="img" aria-label="Sad face">😔</span><h1 class="heading">A little piece<br><em>of my heart.</em></h1><p class="poem">The night we first met, I was so lost I was desperate,
The night of Halloween were we first hugged, I was so lonely from the loss of your touch,
I hated the moments, where you were mad,
For the hate you had, I was in anguish,
The way looked, with the scraped makeup,
You brought to life, my favorite character,
The gown you wore hid you away, and in my eyes I could feel the pain,
Not matter what you say or do,
My heart will stay bound to you.</p>${back('official.html', 'Back to your choice')}${chapters(4)}`
  }
};
const screen = screens[page] || screens['index.html'];
document.title = `${screen.title} — For You, Always`;
app.innerHTML = `<section class="experience ${screen.className || ''}"><div class="copy">${screen.body}</div>${rose}</section>`;

const runaway = document.getElementById('runaway');
if (runaway) {
  let moves = 0;
  runaway.addEventListener('click', () => {
    const old = runaway.getBoundingClientRect();
    const margin = 18;
    const maxX = Math.max(margin, window.innerWidth - old.width - margin);
    const maxY = Math.max(margin, window.innerHeight - old.height - margin);
    let x, y;
    // Choose a new visible position, away from its previous location and the Yes button.
    const yes = document.querySelector('.btn.primary').getBoundingClientRect();
    for (let attempt = 0; attempt < 60; attempt++) {
      x = margin + Math.random() * (maxX - margin);
      y = margin + Math.random() * (maxY - margin);
      const away = Math.hypot(x - old.left, y - old.top) > 110;
      const overlapsYes = x < yes.right + 15 && x + old.width > yes.left - 15 && y < yes.bottom + 15 && y + old.height > yes.top - 15;
      if (away && !overlapsYes) break;
    }
    // Keep the roaming button outside animated ancestors so fixed coordinates
    // always refer to the viewport, including during the entrance animation.
    if (runaway.parentElement !== document.body) document.body.appendChild(runaway);
    runaway.style.width = `${old.width}px`;
    runaway.style.height = `${old.height}px`;
    runaway.style.position = 'fixed';
    runaway.style.left = `${x}px`;
    runaway.style.top = `${y}px`;
    runaway.style.zIndex = '10';
    moves++;
    const notes = ['Not so fast, my love…', 'That answer has a mind of its own.', 'Still playing hard to get?', 'The heart wants what it wants.'];
    document.getElementById('choice-note').textContent = notes[(moves - 1) % notes.length];
  });
  window.addEventListener('resize', () => {
    if (!moves) return;
    const rect = runaway.getBoundingClientRect();
    runaway.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - rect.width - 12))}px`;
    runaway.style.top = `${Math.max(12, Math.min(rect.top, window.innerHeight - rect.height - 12))}px`;
  });
}

const form = document.getElementById('answer-form');
if (form) {
  const answer = document.getElementById('love-answer');
  try { answer.value = sessionStorage.getItem('blackRose.loveAnswer') || ''; } catch (_) { /* The form still works if browser storage is unavailable. */ }
  answer.addEventListener('input', () => {
    answer.setCustomValidity('');
    try { sessionStorage.setItem('blackRose.loveAnswer', answer.value); } catch (_) { /* No network or alternate storage fallback. */ }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!answer.value.trim()) {
      answer.setCustomValidity('Leave a few words from your heart before continuing.');
      answer.reportValidity();
      return;
    }
    window.location.href = 'official.html';
  });
}
