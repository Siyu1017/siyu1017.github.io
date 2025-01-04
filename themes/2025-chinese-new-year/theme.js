; (async () => {
    function canvasClarifier(canvas, ctx, width, height) {
        const originalSize = {
            width: (width ? width : canvas.offsetWidth),
            height: (height ? height : canvas.offsetHeight)
        }
        var ratio = window.devicePixelRatio || 1;
        canvas.width = originalSize.width * ratio;
        canvas.height = originalSize.height * ratio;
        ctx.scale(ratio, ratio);
        if (originalSize.width != canvas.offsetWidth || originalSize.height != canvas.offsetHeight) {
            canvas.style.width = originalSize.width + 'px';
            canvas.style.height = originalSize.height + 'px';
        }
    }

    function getPosition(element) {
        function offset(el) {
            var rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        return { x: offset(element).left, y: offset(element).top };
    }

    function random(min, max, f = false) {
        if (!max) {
            max = min;
            min = 0;
        }
        if (f == false) {
            return Math.random() * (max - min) + min;
        } else {
            min = Math.ceil(min);
            max = Math.floor(max);
            return ~~(Math.random() * (max - min + 1)) + min;
        }
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.className = 'theme-canvas';
    document.body.appendChild(canvas);

    var coins = [];
    var paused = false;
    var lantern = (ctx, size) => {
        ctx.strokeStyle = '#EBCD08';
        ctx.beginPath();
        ctx.moveTo(size / 2, size * 0.075);
        ctx.lineTo(size / 2, size * -0.375);
        ctx.stroke();
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(size / 2 + (i - 2) * size * 0.05, size * 0.925);
            ctx.lineTo(size / 2 + (i - 2) * size * 0.05, size * 1.375);
            ctx.stroke();
        }
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#EBCD08';
        ctx.fillRect(size / 3, size * 0.075, size / 3, size * 0.85);
        ctx.strokeRect(size / 3, size * 0.075, size / 3, size * 0.85);
        ctx.save();
        ctx.fillStyle = '#BF1629';
        ctx.beginPath();
        ctx.ellipse(size / 2, size / 2, size / 2, size / 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(size / 2, size / 2);
        ctx.beginPath();
        ctx.ellipse(size / 2, size / 2, size / 4, size / 3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(size / 2, size / 6);
        ctx.lineTo(size / 2, size / 6 * 5);
        ctx.stroke();
    }

    class Coin {
        constructor(init = false) {
            this.size = random(10, 20);
            this.x = random(window.innerWidth);
            this.y = init == true ? random(window.innerHeight) : -this.size * 2;
            this.speed = random(0.4, 0.8);
            coins.push(this);
        }
        draw(ctx) {
            this.y += this.speed;
            if (this.y > window.innerHeight + this.size * 2) {
                this.size = random(10, 20);
                this.x = random(window.innerWidth);
                this.y = -this.size * 2;
                this.speed = random(0.4, 0.8);
            }
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(
                this.x - this.size,
                this.y - this.size,
                this.x + this.size,
                this.y + this.size
            );
            gradient.addColorStop(0, '#b8860b');
            gradient.addColorStop(0.5, '#daa520');
            gradient.addColorStop(1, '#b8860b');
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        coins.length = 0;
        var performance = navigator.hardwareConcurrency > 10 ? 1 : 1.5;
        var max = navigator.hardwareConcurrency > 10 ? 144 : 48;
        for (let i = 0; i < Math.ceil(window.innerWidth / 80 / performance) * Math.ceil(window.innerHeight / 80 / performance) && i < max; i++) {
            new Coin(true);
        }
    }

    window.addEventListener('resize', init);
    window.addEventListener('pointermove', (e) => {
        if (e.type.startsWith('touch')) {
            var touch = e.touches[0] || e.changedTouches[0];
            e.pageX = touch.pageX;
            e.pageY = touch.pageY;
        }
    })

    var fpsEl = document.createElement('div');
    fpsEl.style.position = 'fixed';
    fpsEl.style.left = '1rem';
    fpsEl.style.bottom = '1rem';
    fpsEl.style.color = '#fff';
    document.body.appendChild(fpsEl);
    var fps = 0;
    var last = Date.now();

    function render() {
        canvasClarifier(canvas, ctx);

        /*
        for (let i = 0; i < coins.length; i++) {
            coins[i].draw(ctx);
        }   
        */

        var navbar = document.querySelector('.navbar')
        var navbarPostion = getPosition(navbar);
        ctx.translate(navbarPostion.x + 32, navbarPostion.y + navbar.offsetHeight + 100 * 0.375);
        //ctx.strokeStyle = '#fff';
        //ctx.strokeRect(0, 100 * -0.375, 100, 100 * 1.75);
        lantern(ctx, 100);
        ctx.translate(-(navbarPostion.x + 32), -(navbarPostion.y + navbar.offsetHeight + 100 * 0.375))
        ctx.translate(navbarPostion.x + navbar.offsetWidth - 32 - 100, navbarPostion.y + navbar.offsetHeight + 100 * 0.375);
        //ctx.strokeStyle = '#fff';
        //ctx.strokeRect(0, 100 * -0.375, 100, 100 * 1.75);
        lantern(ctx, 100);

        var now = Date.now();
        fps++;
        if (now - last > 1000) {
            //fpsEl.innerHTML = fps;
            fps = 0;
            last = now;
        }

        if (paused == false) {
            requestAnimationFrame(render);
        }
    }

    init();
    render();

    window.xmas2024 = {
        pause: function () {
            paused = true;
        },
        play: function () {
            paused = false;
            render();
        }
    }
})();