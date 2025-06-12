let currentAnswer = 0;
let score = 0;
let timeLeft = 60;
let timer;
let difficulty = 'easy';

function generateQuestion() {
  let a, b, op;
  let ops;

  switch (difficulty) {
    case 'easy':
      a = getRandom(1, 20);
      b = getRandom(1, 20);
      ops = ['+', '-'];
      break;
    case 'medium':
      a = getRandom(1, 50);
      b = getRandom(1, 50);
      ops = ['+', '-', '*'];
      break;
    case 'hard':
      a = getRandom(1, 100);
      b = getRandom(1, 100);
      ops = ['+', '-', '*', '/'];
      break;
  }

  op = ops[Math.floor(Math.random() * ops.length)];

  if (op === '/') {
    a = a * b; // Agar pembagian hasilnya bulat
  }

  let questionText = `${a} ${op} ${b}`;
  currentAnswer = eval(questionText);
  document.getElementById('question').innerText = `Berapa ${questionText}?`;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function submitAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  if (userAnswer === currentAnswer) {
    score += 10;
    document.getElementById('score').innerText = `Skor: ${score}`;
  }
  document.getElementById('answer').value = '';
  generateQuestion();
}

function startGame() {
  difficulty = document.getElementById('difficulty').value;
  score = 0;
  timeLeft = 60;
  document.getElementById('score').innerText = `Skor: 0`;
  document.getElementById('timer').innerText = `Waktu: 60`;

  document.getElementById('level-select').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';

  generateQuestion();

  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = `Waktu: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert(`Waktu habis! Skormu: ${score}`);
      document.getElementById('level-select').style.display = 'block';
      document.getElementById('game-container').style.display = 'none';
    }
  }, 1000);
}
