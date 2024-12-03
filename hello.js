const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let particlesArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Create Particle Class
class Particle {
    constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

// Initialize Particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        let size = Math.random() * 5 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        let color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        particlesArray.push(new Particle(x, y, dx, dy, size, color));
    }
}

// Animate Particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => particle.update());
    requestAnimationFrame(animate);
}

initParticles();
animate();
