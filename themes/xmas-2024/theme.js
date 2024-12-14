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

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
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

    var dx = 0;
    var entities = [];
    var paused = false;
    var types = {
        0: (ctx, cp) => {
            for (let i = 0; i < 6; i++) {
                // Default line
                ctx.moveTo(0, 0);
                ctx.lineTo(cp * Math.cos(i * Math.PI / 3), cp * Math.sin(i * Math.PI / 3));
                ctx.closePath();
                // 1/3
                var onethirdPoint = [cp * 1 / 3 * Math.cos(i * Math.PI / 3), cp * 1 / 3 * Math.sin(i * Math.PI / 3)];
                ctx.moveTo(onethirdPoint[0], onethirdPoint[1]);
                ctx.lineTo(onethirdPoint[0] + Math.cos((i - 1) * Math.PI / 3) / 3 * cp, onethirdPoint[1] + Math.sin((i - 1) * Math.PI / 3) / 3 * cp);
                ctx.closePath();
                ctx.moveTo(onethirdPoint[0], onethirdPoint[1]);
                ctx.lineTo(onethirdPoint[0] + Math.cos((i + 1) * Math.PI / 3) / 3 * cp, onethirdPoint[1] + Math.sin((i + 1) * Math.PI / 3) / 3 * cp);
                ctx.closePath();
                // 2/3
                var twothirdsPoint = [cp * 2 / 3 * Math.cos(i * Math.PI / 3), cp * 2 / 3 * Math.sin(i * Math.PI / 3)];
                ctx.moveTo(twothirdsPoint[0], twothirdsPoint[1]);
                ctx.lineTo(twothirdsPoint[0] + Math.cos((i - 1) * Math.PI / 3) / 3 * cp, twothirdsPoint[1] + Math.sin((i - 1) * Math.PI / 3) / 3 * cp);
                ctx.closePath();
                ctx.moveTo(twothirdsPoint[0], twothirdsPoint[1]);
                ctx.lineTo(twothirdsPoint[0] + Math.cos((i + 1) * Math.PI / 3) / 3 * cp, twothirdsPoint[1] + Math.sin((i + 1) * Math.PI / 3) / 3 * cp);
                ctx.closePath();
            }
        },
        1: (ctx, cp) => {
            for (let i = 0; i < 6; i++) {
                // Default line
                ctx.moveTo(0, 0);
                ctx.lineTo(cp * Math.cos(i * Math.PI / 3), cp * Math.sin(i * Math.PI / 3));
                ctx.closePath();
                // Short line ( 1/2 length )
                ctx.moveTo(0, 0);
                ctx.lineTo(cp * .5 * Math.cos((i + .5) * Math.PI / 3), cp * .5 * Math.sin((i + .5) * Math.PI / 3));
                ctx.closePath();
                // 1/2
                var onehalfPoint = [cp * Math.cos(i * Math.PI / 3) / 2, cp * Math.sin(i * Math.PI / 3) / 2];
                ctx.moveTo(onehalfPoint[0], onehalfPoint[1]);
                ctx.lineTo(onehalfPoint[0] + Math.cos((i - .75) * Math.PI / 3) / 3 * cp, onehalfPoint[1] + Math.sin((i - .75) * Math.PI / 3) / 3 * cp);
                ctx.closePath();
                ctx.moveTo(onehalfPoint[0], onehalfPoint[1]);
                ctx.lineTo(onehalfPoint[0] + Math.cos((i + .75) * Math.PI / 3) / 3 * cp, onehalfPoint[1] + Math.sin((i + .75) * Math.PI / 3) / 3 * cp);
                ctx.closePath();
                // 3/4
                var threequartersPoint = [cp * 3 / 4 * Math.cos(i * Math.PI / 3), cp * 3 / 4 * Math.sin(i * Math.PI / 3)];
                ctx.moveTo(threequartersPoint[0], threequartersPoint[1]);
                ctx.lineTo(threequartersPoint[0] + Math.cos((i - .75) * Math.PI / 3) / 4 * cp, threequartersPoint[1] + Math.sin((i - .75) * Math.PI / 3) / 4 * cp);
                ctx.closePath();
                ctx.moveTo(threequartersPoint[0], threequartersPoint[1]);
                ctx.lineTo(threequartersPoint[0] + Math.cos((i + .75) * Math.PI / 3) / 4 * cp, threequartersPoint[1] + Math.sin((i + .75) * Math.PI / 3) / 4 * cp);
                ctx.closePath();
            }
        },
        2: (ctx, cp) => {
            for (let i = 0; i < 6; i++) {
                // Default line
                ctx.moveTo(0, 0);
                ctx.lineTo(cp * Math.cos(i * Math.PI / 3), cp * Math.sin(i * Math.PI / 3));
                ctx.closePath();
                // 3/5
                var threefifthsPoint = [cp * Math.cos(i * Math.PI / 3) * 3 / 5, cp * Math.sin(i * Math.PI / 3) * 3 / 5];
                ctx.moveTo(threefifthsPoint[0], threefifthsPoint[1]);
                ctx.lineTo(threefifthsPoint[0] + Math.cos((i - .75) * Math.PI / 3) / 3 * cp, threefifthsPoint[1] + Math.sin((i - .75) * Math.PI / 3) / 3 * cp);
                ctx.closePath();
                ctx.moveTo(threefifthsPoint[0], threefifthsPoint[1]);
                ctx.lineTo(threefifthsPoint[0] + Math.cos((i + .75) * Math.PI / 3) / 3 * cp, threefifthsPoint[1] + Math.sin((i + .75) * Math.PI / 3) / 3 * cp);
                ctx.closePath();
            }
            ctx.stroke();
        }
    }

    function createEntity(initial = false) {
        var size = random(12, 24);
        var y = initial == true ? random(window.innerHeight) : -size * 4
        entities.push({
            x: random(window.innerWidth),
            y: y,
            size: size,
            angle: random(360) * Math.PI / 2,
            spawn: Date.now(),
            speed: random(.4, .8),
            type: random(0, Object.keys(types).length - 1, true),
            spinSpeed: random(-48, 48)
        })
    }

    function init() {
        entities.length = 0;
        var performance = navigator.hardwareConcurrency > 10 ? 1 : 2;
        for (let i = 0; i < Math.ceil(window.innerWidth / 80 / performance) * Math.ceil(window.innerHeight / 80 / performance); i++) {
            createEntity(true);
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

    function render() {
        canvasClarifier(canvas, ctx);

        entities.forEach((entity, i) => {
            var cp = entity.size / 2;
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,.2)`;
            ctx.translate(entity.x, entity.y);
            ctx.rotate(entity.angle); types[entity.type](ctx, cp);
            // ctx.arc(entity.x, entity.y, entity.size, 0, Math.PI * 2, false);
            // ctx.closePath();
            ctx.stroke();
            ctx.restore();
            entity.y += entity.speed;
            entity.angle = (Date.now() - entity.spawn) / 1000 * entity.spinSpeed * Math.PI / 180;

            if (entity.y - entity.size * 2 > window.innerHeight) {
                entity.y = -entity.size * 4;
                entity.x = random(0, window.innerWidth);
                entity.speed = random(0.4, 0.8);
                entity.angle = random(0, 2 * Math.PI);
                entity.spinSpeed = random(4, 12);
            }
        })

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