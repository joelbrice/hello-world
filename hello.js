const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.radius = Math.random() * 2 + 1;
    }

    draw() {
        const sx = (this.x - canvas.width / 2) * (canvas.width / this.z);
        const sy = (this.y - canvas.height / 2) * (canvas.height / this.z);
        const size = canvas.width / this.z;

        ctx.beginPath();
        ctx.arc(sx + canvas.width / 2, sy + canvas.height / 2, size * this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    update() {
        this.z -= 2;
        if (this.z <= 0) {
            this.z = canvas.width;
        }
        this.draw();
    }
}

function init() {
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => star.update());
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0;
    init();
});

init();
animate();
