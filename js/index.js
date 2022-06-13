const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.classList.add("hidden");
const instructions = document.querySelector(".cover");

const game = new Game(ctx);

const btn = document.getElementById("button");

const reload = document.getElementById("restart");
reload.classList.add("hidden");

btn.addEventListener("click", function () {
  if (!game.interval) {
    canvas.classList.remove("hidden");
    instructions.classList.add("hidden");
    game.start();
    btn.classList.add("hidden");
    reload.classList.remove("hidden");
  }
});

reload.addEventListener("click", function () {
  window.location.reload();
});
