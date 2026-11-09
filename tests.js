(async () => {
  const frame = document.getElementById('test-frame');
  const results = document.getElementById('results');
  const lines = [];
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  function check(condition, name) {
    if (!condition) throw new Error(name);
    lines.push(`PASS: ${name}`);
    console.log(`PASS: ${name}`);
    results.textContent = lines.join('\n');
  }
  async function load(path) {
    await new Promise(resolve => { frame.onload = resolve; frame.src = path; });
    await pause(1000);
    return frame.contentDocument;
  }
  async function navigate(action) {
    await new Promise(resolve => { frame.onload = resolve; action(); });
    await pause(200);
    return frame.contentDocument;
  }
  try {
    let doc = await load('index.html');
    check(doc.querySelector('h1').textContent.includes('love me?'), 'Landing question renders');
    const no = doc.getElementById('runaway');
    for (let i = 0; i < 12; i++) {
      const before = no.getBoundingClientRect();
      no.click();
      const after = no.getBoundingClientRect();
      check(Math.hypot(after.left - before.left, after.top - before.top) > 50, `No moves on click ${i + 1}`);
      check(after.left >= 0 && after.top >= 0 && after.right <= frame.contentWindow.innerWidth + 1 && after.bottom <= frame.contentWindow.innerHeight + 1, `No stays in viewport on click ${i + 1}`);
    }
    doc = await navigate(() => doc.querySelector('.btn.primary').click());
    check(frame.contentWindow.location.pathname.endsWith('why.html'), 'Yes opens writing page');
    const text = doc.getElementById('love-answer');
    const form = doc.getElementById('answer-form');
    const original = text.value;
    text.value = '';
    check(!form.checkValidity(), 'Empty answer is rejected');
    text.value = '   ';
    form.requestSubmit();
    check(!text.validity.valid, 'Whitespace-only answer is rejected');
    text.setCustomValidity('');
    text.value = 'Your kindness, your laugh, and all the little things.';
    doc = await navigate(() => form.requestSubmit());
    check(frame.contentWindow.location.pathname.endsWith('official.html'), 'Next opens official question');
    check(doc.querySelector('.btn.primary').getAttribute('href') === 'promises.html', 'Official Yes links to promises');
    check(doc.querySelectorAll('.buttons .btn')[1].getAttribute('href') === 'poem.html', 'Official No links to poem');
    doc = await navigate(() => doc.querySelector('.btn.primary').click());
    check(doc.querySelectorAll('ol.promises li').length === 6, 'Yes displays all six ordered promises');
    doc = await load('official.html');
    doc = await navigate(() => doc.querySelectorAll('.buttons .btn')[1].click());
    check(!!doc.querySelector('.sad'), 'No displays sad emoji');
    check(doc.querySelector('.poem').textContent.includes('My heart will stay bound to you.'), 'Original poem renders');
    check(doc.querySelector('.poem').textContent.trim().split('\n').length === 9, 'All nine poem lines present');
    console.log('ALL TESTS PASSED');
    results.textContent += '\nALL TESTS PASSED';
    results.id = 'tests-passed';
  } catch (error) {
    console.error(`TEST FAILED: ${error.message}`);
    results.textContent += `\nFAIL: ${error.message}`;
  }
})();
