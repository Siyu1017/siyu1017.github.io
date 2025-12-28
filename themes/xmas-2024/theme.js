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
    var objects = [];
    var paused = false;
    var types = {
        0: (ctx, cp) => {
            var ctx = new Path2D();
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
            return ctx;
        },
        1: (ctx, cp) => {
            var ctx = new Path2D();
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
            return ctx;
        },
        2: (ctx, cp) => {
            var ctx = new Path2D();
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
            return ctx;
        }
    }

    const typeConfigs = {
        0: {
            points: [1 / 3, 2 / 3],
            branchAngles: [-1, 1],
            branchScale: 1 / 3
        },
        1: {
            points: [0.5, 0.75],
            branchAngles: [-0.75, 0.75],
            branchScale: [0.33, 0.25]
        },
        2: {
            points: [3 / 5],
            branchAngles: [-0.75, 0.75],
            branchScale: 1 / 3
        },
        3: {
            points: [0.25, 0.5, 0.75],
            branchAngles: [-0.75, 0.75],
            branchScale: [0.2, 0.3, 0.1]
        }
    };
    function createSnowflake(type, cp) {
        const ctx = new Path2D();
        const angles = Array.from({ length: 6 }, (_, i) => i * Math.PI / 3);
        const config = typeConfigs[type];
        if (!config) return ctx;

        angles.forEach(angle => {
            const endX = cp * Math.cos(angle);
            const endY = cp * Math.sin(angle);
            ctx.moveTo(0, 0);
            ctx.lineTo(endX, endY);

            config.points.forEach((ratio, index) => {
                const branchX = endX * ratio;
                const branchY = endY * ratio;

                config.branchAngles.forEach((branchAngle, bIndex) => {
                    const scale = Array.isArray(config.branchScale) ? config.branchScale[index] : config.branchScale;
                    const bx = branchX + scale * cp * Math.cos(angle + branchAngle * Math.PI / 3);
                    const by = branchY + scale * cp * Math.sin(angle + branchAngle * Math.PI / 3);
                    ctx.moveTo(branchX, branchY);
                    ctx.lineTo(bx, by);
                });
            });
        });

        return ctx;
    }

    function createobject(initial = false) {
        var size = random(18, 24);
        var y = initial == true ? random(window.innerHeight) : -size * 4;
        var type = random(0, Object.keys(typeConfigs).length - 1, true);
        objects.push({
            x: random(window.innerWidth),
            y: y,
            size: size,
            angle: random(360) * Math.PI / 2,
            spawn: Date.now(),
            speed: random(.4, .8),
            type: type,
            spinSpeed: random(-24, 24),
            path: createSnowflake(type, size / 2)// types[type]('', size / 2)
        })
    }

    function init() {
        objects.length = 0;
        var performance = navigator.hardwareConcurrency > 10 ? 1 : 1.5;
        var max = navigator.hardwareConcurrency > 10 ? 108 : 48;
        for (let i = 0; i < Math.ceil(window.innerWidth / 80 / performance) * Math.ceil(window.innerHeight / 80 / performance) && i < max; i++) {
            createobject(true);
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

    // var fpsEl = document.createElement('div');
    // fpsEl.style.position = 'fixed';
    // fpsEl.style.left = '1rem';
    // fpsEl.style.bottom = '1rem';
    // fpsEl.style.color = '#fff';
    // document.body.appendChild(fpsEl);
    var fps = 0;
    var last = Date.now();

    function render() {
        canvasClarifier(canvas, ctx, window.innerWidth, window.innerHeight);

        ctx.strokeStyle = `rgba(255,255,255,.2)`;
        objects.forEach((object, i) => {
            var cp = object.size / 2;
            ctx.save();
            ctx.beginPath();

            ctx.translate(object.x, object.y);
            ctx.rotate(object.angle); // types[object.type](ctx, cp);
            // ctx.arc(object.x, object.y, object.size, 0, Math.PI * 2, false);
            // ctx.closePath();
            ctx.stroke(object.path);
            ctx.restore();
            object.y += object.speed;
            object.angle = (Date.now() - object.spawn) / 1000 * object.spinSpeed * Math.PI / 180;

            if (object.y - object.size * 2 > window.innerHeight) {
                // Respawn
                var size = random(12, 24);
                object.y = -size * 4;
                object.x = random(0, window.innerWidth);
                object.speed = random(0.4, 0.8);
                object.angle = random(0, 2 * Math.PI);
                object.spinSpeed = random(-24, 24);
                object.size = size;
                object.spawn = Date.now();
                object.type = random(0, Object.keys(typeConfigs).length - 1, true);
                object.path = createSnowflake(object.type, size / 2);
            }
        })

        var now = Date.now();
        fps++;
        if (now - last > 1000) {
            // fpsEl.innerHTML = fps;
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