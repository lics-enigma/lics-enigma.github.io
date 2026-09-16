/* ==========================================================================
   LICS ENIGMA / interações da landing

   Este arquivo é público. Não coloque data, contagem nem descrição
   de nada aqui, vira spoiler na hora.
   Os blocos abaixo geram ruído. Parecem vivos e não dizem nada.
   ========================================================================== */

const GLYPHS = 'ABCDEF0123456789/+=%$#@&*!';
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const noise = n => Array.from({ length: n }, rand).join('');

/* --- título cifrado: glifos que nunca assentam ---------------------------- */

(function scramble() {
  const words = [...document.querySelectorAll('.scramble')];
  if (!words.length) return;

  words.forEach(w => { w.textContent = noise(+w.dataset.len || 4); });
  if (REDUCED) return;

  // cada palavra troca um caractere por vez, em ritmo próprio
  words.forEach((w, i) => {
    const len = +w.dataset.len || 4;
    setInterval(() => {
      const chars = w.textContent.split('');
      chars[Math.floor(Math.random() * len)] = rand();
      w.textContent = chars.join('');
    }, 110 + i * 70);
  });
})();

/* --- fluxo cifrado: o "contador" que não conta nada ----------------------- */

(function stream() {
  const cells = [...document.querySelectorAll('[data-cell]')];
  if (!cells.length) return;

  cells.forEach(c => { c.textContent = noise(2); });
  if (REDUCED) return;

  cells.forEach((c, i) => {
    setInterval(() => { c.textContent = noise(2); }, 260 + i * 130);
  });
})();

/* --- terminal: comandos digitando sozinhos -------------------------------- */

(function typewriter() {
  const target = document.getElementById('typed');
  if (!target) return;

  const commands = [
    'whoami',
    'ls -la ./segredo',
    'dig +short lics-enigma.github.io',
    'echo $ORGANIZACAO',
    'base64 -d < ????.txt'
  ];

  if (REDUCED) { target.textContent = commands[0]; return; }

  let i = 0, j = 0, erasing = false;

  (function loop() {
    const cmd = commands[i];
    target.textContent = cmd.slice(0, j);

    if (!erasing && j === cmd.length) {
      erasing = true;
      return setTimeout(loop, 1700);
    }
    if (erasing && j === 0) {
      erasing = false;
      i = (i + 1) % commands.length;
      return setTimeout(loop, 420);
    }

    j += erasing ? -1 : 1;
    setTimeout(loop, erasing ? 26 : 62);
  })();
})();

/* --- pistas progressivas -------------------------------------------------- */

(function hints() {
  const btn = document.getElementById('hintBtn');
  const box = document.getElementById('hints');
  if (!btn || !box) return;

  const items = [...box.querySelectorAll('.hint')];
  let shown = 0;

  btn.addEventListener('click', () => {
    if (shown >= items.length) return;

    box.hidden = false;
    items[shown].classList.add('is-on');
    shown++;

    if (shown === items.length) {
      btn.disabled = true;
      btn.textContent = 'Acabaram as pistas';
    } else {
      btn.textContent = `Liberar próxima pista (${shown}/${items.length})`;
    }
  });
})();

/* --- pista no console ----------------------------------------------------- */

(function consoleHint() {
  const pink = 'color:#f3b5d4;font-weight:700;font-size:13px';
  const dim  = 'color:#8ea6bd';

  console.log('%c LICS ENIGMA ', 'background:#f3b5d4;color:#071727;font-weight:700;padding:4px 10px');
  console.log('%cVocê abriu o console. Bom sinal.', pink);
  console.log('%cNão tem nada em claro nesta página.', dim);
  console.log('%cA mensagem está num repositório. O domínio diz de quem.', dim);
  console.log('%cb2xoZSBvcyByZXBvc2l0b3Jpb3MgZGEgb3JnYW5pemFjYW8=', 'color:#6f63ff');
})();
