const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

const btn = document.getElementById('button');

btn.addEventListener('click', function() {
    if (game.interval) {
        game.stop();
        btn.innerText = "LET'S DO IT!";
        btn.blur();
    } else {
        game.start();
        btn.innerText = "PAUSE";
        btn.blur()
    }
})