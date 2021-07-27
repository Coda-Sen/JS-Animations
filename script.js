const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 500;

let titleElement = document.getElementById('title');
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10,
}


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 2;
        this.weight = this.size / 3;
        this.directionX = (Math.random() - 0.5) * 10;
    }
    update(){
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = this.size;
            this.x = Math.random() * canvas.width * 2;
        }
        this.weight += 0.1;
        this.y += this.weight;
        this.x += this.directionX;

        // check for collision between particles and title
        if (
            this.x < title.x + title.width && 
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
            this.y -= 3;
            this.weight *= -0.5;
        }
    }
    draw(){
        ctx.fillStyle = 'teal';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill()
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y))
    }
}

init();

function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    ctx.fillRect(title.x, title.y, title.width, title.height);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 10,
    }
    init();
})