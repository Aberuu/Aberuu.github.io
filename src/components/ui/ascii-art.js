// ASCII art background data & builder for Hero layer 2.
// Token colors: n=neon(green), m=mint, b=blue, o=orange, w=white, d=dim.

const WALL_POOL =
  "01#@$%&*+=<>?/\\|:;'\"`~^()[]{}!-_.,aoAGPHE" +
  '01abcdefghijklmnopqrstuvwxyz,.;:!?+-*=#$%&/_\\<>()[]{}';

const WALL_DECO = ['█', '▓', '▒', '░', '▄', '▀', '▌', '▐', '▲', '●', '◆', '◀', '▶', '░'];

export function buildAsciiWall(cols, rows) {
  let seed = 20240501;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const wall = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      const v = rnd();
      if (v < 0.014) {
        line += WALL_DECO[Math.floor(rnd() * WALL_DECO.length)];
      } else if (v < 0.03) {
        line += ' ';
      } else {
        line += WALL_POOL[Math.floor(rnd() * WALL_POOL.length)];
      }
    }
    wall.push(line);
  }
  return wall;
}

export const ASCII_TITLE = [
  "   █████╗   ██████╗  █████╗ ██████╗ ██╗  ██╗███████╗",
  "  ██╔══██╗ ██╔════╝ ██╔══██╗██╔══██╗██║  ██║██╔════╝",
  "  ███████║ ██║  ███╗███████║██████╔╝███████║█████╗  ",
  "  ██╔══██║ ██║   ██║██╔══██║██╔═══╝ ██╔══██║██╔══╝  ",
  "  ██║  ██║ ╚██████╔╝██║  ██║██║     ██║  ██║███████╗",
  "  ╚═╝  ╚═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝",
];

// ── top-left status bar ────────────────────────────────────────
export const ASCII_TL = [
  [{ c: 'd', t: '╭─ ' }, { c: 'n', t: '▌render' }, { c: 'd', t: ' · ' }, { c: 'w', t: 'AGAPHE::LIVE' }, { c: 'o', t: ' ▞' }],
];

// ── top-right terminal chips ───────────────────────────────────
export const ASCII_TR = [
  [{ c: 'o', t: '▓▓' }, { c: 'b', t: ' npm run vision' }, { c: 'n', t: ' ✓' }],
];

// ── mid-left code panel ────────────────────────────────────────
export const ASCII_LEFT = [
  [{ c: 'b', t: 'fn ' }, { c: 'w', t: 'main' }, { c: 'w', t: '() {' }],
  [{ c: 'd', t: '  let ' }, { c: 'n', t: 'vision' }, { c: 'w', t: ' = ' }, { c: 'n', t: 'ASCII' }, { c: 'w', t: '::from("AGAPHE");' }],
  [{ c: 'd', t: '  ' }, { c: 'n', t: 'vision' }, { c: 'b', t: '.render' }, { c: 'w', t: '();' }],
  [{ c: 'd', t: '  ' }, { c: 'b', t: 'while ' }, { c: 'w', t: '(' }, { c: 'n', t: 'true' }, { c: 'w', t: ') {' }],
  [{ c: 'd', t: '    ' }, { c: 'n', t: 'create' }, { c: 'b', t: '.mind' }, { c: 'w', t: '();' }],
  [{ c: 'd', t: '  }' }],
  [{ c: 'w', t: '}' }],
];

// ── mid-right code panel ───────────────────────────────────────
export const ASCII_RIGHT = [
  [{ c: 'd', t: '/* stack */' }],
  [{ c: 'b', t: 'const ' }, { c: 'w', t: 'stack' }, { c: 'w', t: ' = [' }],
  [{ c: 'd', t: '  ' }, { c: 'o', t: '"video"' }, { c: 'w', t: ',' }],
  [{ c: 'd', t: '  ' }, { c: 'o', t: '"photo"' }, { c: 'w', t: ',' }],
  [{ c: 'd', t: '  ' }, { c: 'o', t: '"code"' }, { c: 'w', t: ',' }],
  [{ c: 'w', t: '];' }],
  [{ c: 'm', t: '// working tree clean' }],
];

// ── bottom-left stats ──────────────────────────────────────────
export const ASCII_BL = [
  [{ c: 'n', t: '●' }, { c: 'd', t: ' FPS ' }, { c: 'w', t: '60' }],
  [{ c: 'b', t: '▲' }, { c: 'd', t: ' VIS ' }, { c: 'w', t: '100%' }],
  [{ c: 'o', t: '▣' }, { c: 'd', t: ' BUILD ' }, { c: 'n', t: 'OK' }],
  [{ c: 'd', t: 'git ' }, { c: 'n', t: '✓' }, { c: 'd', t: ' main' }],
];

// ── bottom-right hex dump ──────────────────────────────────────
export const ASCII_BR = [
  [{ c: 'b', t: '0x0000' }, { c: 'd', t: '  41 47 41 50 48 45 ' }, { c: 'm', t: 'AGAPHE' }],
  [{ c: 'b', t: '0x0010' }, { c: 'd', t: '  43 52 45 41 54 49 ' }, { c: 'n', t: 'CREATI' }],
  [{ c: 'b', t: '0x0020' }, { c: 'd', t: '  56 45 5F 44 49 52 ' }, { c: 'n', t: 'VE_DIR' }],
];

// ── vertical binary strip ──────────────────────────────────────
export const ASCII_BITS = [
  '01101000',
  '01100101',
  '01101111',
  '00100000',
  '01101110',
  '01100101',
  '01101111',
  '01101110',
  '11100001',
  '00001010',
  '10000000',
  '00011110',
  '01000000',
  '00000111',
];