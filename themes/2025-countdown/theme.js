; (() => {
    var countdownContainer = document.createElement('div');
    var countdownContent = document.createElement('div');
    var countdownTitle = document.createElement('div');
    var countdownCounters = document.createElement('div');
    var countdownDays = document.createElement('div');
    var countdownDaysNumber = document.createElement('div');
    var countdownDaysUnit = document.createElement('div');
    var countdownHours = document.createElement('div');
    var countdownHoursNumber = document.createElement('div');
    var countdownHoursUnit = document.createElement('div');
    var countdownMinutes = document.createElement('div');
    var countdownMinutesNumber = document.createElement('div');
    var countdownMinutesUnit = document.createElement('div');
    var countdownSeconds = document.createElement('div');
    var countdownSecondsNumber = document.createElement('div');
    var countdownSecondsUnit = document.createElement('div');

    countdownContainer.className = 'countdown-container';
    countdownContent.className = 'countdown-content';
    countdownTitle.className = 'countdown-title';
    countdownCounters.className = 'countdown-counters';
    countdownDays.className = 'days countdown-counter';
    countdownDaysNumber.className = 'countdown-counter-number';
    countdownDaysUnit.className = 'countdown-counter-unit';
    countdownHours.className = 'hours countdown-counter';
    countdownHoursNumber.className = 'countdown-counter-number';
    countdownHoursUnit.className = 'countdown-counter-unit';
    countdownMinutes.className = 'minutes countdown-counter';
    countdownMinutesNumber.className = 'countdown-counter-number';
    countdownMinutesUnit.className = 'countdown-counter-unit';
    countdownSeconds.className = 'seconds countdown-counter';
    countdownSecondsNumber.className = 'countdown-counter-number';
    countdownSecondsUnit.className = 'countdown-counter-unit';

    document.body.appendChild(countdownContainer);
    countdownContainer.appendChild(countdownContent);
    countdownContent.appendChild(countdownTitle);
    countdownContent.appendChild(countdownCounters);
    // Days
    countdownCounters.appendChild(countdownDays);
    countdownDays.appendChild(countdownDaysNumber);
    countdownDays.appendChild(countdownDaysUnit);
    // Hours
    countdownCounters.appendChild(countdownHours);
    countdownHours.appendChild(countdownHoursNumber);
    countdownHours.appendChild(countdownHoursUnit);
    // Minutes
    countdownCounters.appendChild(countdownMinutes);
    countdownMinutes.appendChild(countdownMinutesNumber);
    countdownMinutes.appendChild(countdownMinutesUnit);
    // Seconds
    countdownCounters.appendChild(countdownSeconds);
    countdownSeconds.appendChild(countdownSecondsNumber);
    countdownSeconds.appendChild(countdownSecondsUnit);

    countdownTitle.innerHTML = '2025 倒數計時';
    countdownDaysUnit.innerHTML = '天';
    countdownHoursUnit.innerHTML = '時';
    countdownMinutesUnit.innerHTML = '分';
    countdownSecondsUnit.innerHTML = '秒';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'countdown-firework-canvas';
    document.body.appendChild(canvas);

    var particles = [], probability = 0.04,
        xPoint, yPoint;

    class Particle {
        constructor() {
            this.w = this.h = Math.random() * 4 + 1;
            this.x = xPoint - this.w / 2;
            this.y = yPoint - this.h / 2;
            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10;
            this.alpha = Math.random() * .5 + .5;
            this.color;
        }
        gravity = 0.05
        move() {
            this.x += this.vx;
            this.vy += this.gravity;
            this.y += this.vy;
            this.alpha -= 0.01;
            if (this.x <= -this.w || this.x >= screen.width ||
                this.y >= screen.height ||
                this.alpha <= 0) {
                return false;
            }
            return true;
        }
        draw(c) {
            c.save();
            c.beginPath();
            c.translate(this.x + this.w / 2, this.y + this.h / 2);
            c.arc(0, 0, this.w, 0, Math.PI * 2);
            c.fillStyle = this.color;
            c.globalAlpha = this.alpha;
            c.closePath();
            c.fill();
            c.restore();
        }
    }

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

    window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    function updateWorld() {
        canvasClarifier(canvas, ctx);
        update();
        paint();
        window.requestAnimationFrame(updateWorld);
    }

    function update() {
        if (particles.length < 500 && Math.random() < probability) {
            createFirework();
        }
        var alive = [];
        for (var i = 0; i < particles.length; i++) {
            if (particles[i].move()) {
                alive.push(particles[i]);
            }
        }
        particles = alive;
    }

    function paint() {
        // ctx.globalCompositeOperation = 'source-over';
        // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        // ctx.globalCompositeOperation = 'lighter';
        for (var i = 0; i < particles.length; i++) {
            particles[i].draw(ctx);
        }
    }

    function createFirework() {
        xPoint = Math.random() * (window.innerWidth - 200) + 100;
        yPoint = Math.random() * (window.innerHeight - 200) + 100;
        var nFire = Math.random() * 50 + 100;
        var c = "rgb(" + (~~(Math.random() * 200 + 55)) + ","
            + (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + ")";
        for (var i = 0; i < nFire; i++) {
            var particle = new Particle();
            particle.color = c;
            var vy = Math.sqrt(25 - particle.vx * particle.vx);
            if (Math.abs(particle.vy) > vy) {
                particle.vy = particle.vy > 0 ? vy : -vy;
            }
            particles.push(particle);
        }
    }

    var targetTime = new Date('2025/01/01 00:00:00').getTime();
    var now = Date.now();
    var remainings = {};
    var remainingSeconds = 0;
    var keepCount = true;

    function preciseInterval(callback, interval = 1000) {
        let nextCallTime = Date.now() + interval;
        function loop() {
            const currentTime = Date.now();
            if (currentTime >= nextCallTime) {
                callback();
                nextCallTime += interval;
            }
            if (keepCount == true) {
                const delay = nextCallTime - Date.now();
                setTimeout(loop, delay);
            }
        }
        loop();
    }

    function updateCounter() {
        now = Date.now();
        remainingSeconds = ~~((targetTime - now) / 1000);
        if (remainingSeconds <= 0) {
            keepCount = false;
            updateWorld();
            return countdownContainer.classList.contains('explode') || countdownContainer.classList.add('explode');
        }
        currentRemainings = {
            days: ~~(remainingSeconds / 86400),
            hours: ~~(remainingSeconds / 3600 % 24),
            minutes: ~~(remainingSeconds / 60 % 60),
            seconds: ~~(remainingSeconds % 60)
        }
        if (currentRemainings.days != remainings.days) {
            remainings.days = currentRemainings.days;
            countdownDaysNumber.innerHTML = remainings.days.toString().padStart(2, '0');
        }
        if (currentRemainings.hours != remainings.hours) {
            remainings.hours = currentRemainings.hours;
            countdownHoursNumber.innerHTML = remainings.hours.toString().padStart(2, '0');
        }
        if (currentRemainings.minutes != remainings.minutes) {
            remainings.minutes = currentRemainings.minutes;
            countdownMinutesNumber.innerHTML = remainings.minutes.toString().padStart(2, '0');
        }
        if (currentRemainings.seconds != remainings.seconds) {
            remainings.seconds = currentRemainings.seconds;
            countdownSecondsNumber.innerHTML = remainings.seconds.toString().padStart(2, '0');
        }
    }

    updateCounter();

    preciseInterval(updateCounter, 1000);
})();