var $start = document.querySelector('#start'),
    $stop = document.querySelector('#stop'),
    canvas = document.querySelector('#matrix'),
    ctx = canvas.getContext('2d'),
    particles = [],
    MAX_P = 100,
    animationRunner;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var create = function (options) {

    if (particles.length > MAX_P) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.shift();
    }

    options = options || {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        };

    var r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255),
        p = {
            x: options.x,
            y: options.y,
            xVel: (Math.random() - 0.5),
            yVel: (Math.random() - 0.5),
            radius: Math.random() * 100,
            color: 'rgba(' + r + ',' + g + ',' + b + ',' + Math.random() + ')'
        };
    particles.push(p);
};

var draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) {
        ctx.beginPath();
        p.x += p.xVel;
        p.y += p.yVel;
        p.radius *= 0.99;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();
    });
};

function loop() {
    create();
    draw();
    animationRunner = window.requestAnimationFrame(loop);
};

canvas.addEventListener('click', function (e) {
    for (var i=0; i < 50; i++) {
        create({
            x: e.clientX / Math.random(),
            y: e.clientY /  Math.random()
        });}
    draw();
}, false);

loop();
$start.addEventListener('click', function (e) {
    this.setAttribute('disabled', true);
    loop();
});

$stop.addEventListener('click', function (e) {
    $start.removeAttribute('disabled');
    cancelAnimationFrame(animationRunner);
});
