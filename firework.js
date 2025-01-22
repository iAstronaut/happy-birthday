const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createFirework(x, y) {
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 4 + 1,
            radius: Math.random() * 3 + 2,
        });
    }
    return particles;
}

function renderFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
            ctx.fill();
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            particle.speed *= 0.95;
            particle.radius *= 0.95;
        });
        fireworks[index] = firework.filter((p) => p.radius > 0.5);
        if (fireworks[index].length === 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(renderFireworks);
}

let fireworks = [];
canvas.addEventListener('click', (e) => {
    fireworks.push(createFirework(e.clientX, e.clientY));
});
renderFireworks();
