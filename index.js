if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(
            () => console.log('register success'),
            (err) => console.log('register fail:', err)
        )
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

'click effect' == true ? (() => {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var entities = [];
    var colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
    var animateFunction = x => { return x === 1 ? 1 : 1 - Math.pow(2, -10 * x) }
    canvas.className = "click-respond-canvas";
    document.body.appendChild(canvas);

    canvasClarifier(canvas, ctx);

    window.addEventListener("mousedown", (e) => {
        var duration = 1200 + ~~(Math.random() * 600)
        var circleSize = ~~(Math.random() * 40) + 40;
        var now = Date.now();
        entities.push({
            x: e.pageX,
            y: e.pageY,
            time: now,
            type: 'outline',
            size: [circleSize, circleSize + 20 + ~~(Math.random() * 40)],
            color: (p) => {
                var a = 1;
                return `rgba(214,0,0,${a*(1-p)})`;
            },  
            direction: 0,
            distance: 0,
            duration
        });
        for (let i = 0; i < 30; i++) {
            entities.push({
                x: e.pageX,
                y: e.pageY,
                time: now,
                type: 'solid',
                size: [~~(Math.random() * 16) + 16, 0],
                color: colors[~~(Math.random() * colors.length)],
                direction: ~~(Math.random() * 360) * Math.PI / 180,
                distance: ~~(Math.random() * 130) + 50,
                duration
            });
        }
    })

    function getDiff(entity) {
        var distance = entity.distance;
        var x = Math.cos(entity.direction) * distance;
        var y = Math.sin(entity.direction) * distance;
        return { x, y };
    }

    function render() {
        canvasClarifier(canvas, ctx);

        entities.forEach((entity, i) => {
            var past = Date.now() - entity.time;
            var percent = animateFunction(past / entity.duration);
            var diff = getDiff(entity);
            var color = typeof entity.color == 'string' ? entity.color : entity.color(percent);
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.arc(entity.x + diff.x * percent, entity.y + diff.y * percent, (entity.size[0] + (entity.size[1] - entity.size[0]) * percent), 0, Math.PI * 2, false);
            ctx.closePath();
            if (entity.type == 'solid') {
                ctx.fill();
            } else if (entity.type == 'outline') {
                ctx.stroke();
            }
            ctx.restore();
            if (past >= entity.duration) {
                entities.splice(i, 1);
            }
        })

        requestAnimationFrame(render);
    }

    render();
})() : void undefined;

function getAge() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var passed = false;
    if (month == 10) {
        if (day >= 17) {
            passed = true;
        }
    } else if (month > 10) {
        passed = true;
    }
    if (passed == true) {
        return year - 2008;
    } else {
        return year - 2008 - 1;
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

var container = document.getElementById("container");
var content = document.querySelector('[data-element="content"]');
var toggleMenu = document.getElementById("toggleMenu");
var notification = document.querySelector('[data-element="notification"]');
var theme = 'modern';
var toggleThemes = document.querySelectorAll('[data-element="toggleTheme"]');
var homeSection = document.querySelector('[data-section="home"]');
var profileSection = document.querySelector('[data-section="profile"]');
var projectSection = document.querySelector('[data-section="project"]');
var discord = document.querySelector('[social-type="discord"]');
var wechat = document.querySelector('[social-type="wechat"]');
var ages = document.querySelectorAll('[data-element="age"]');
var currentShow = 'home';
var profile = {
    "基本資料": {
        "概括": {
            "頭像": "./icons/original.png",
            "暱稱": "Siyu1017"
        },
        "詳細": {
            "性別": "男性",
            "年齡": getAge(),
            "生日": "2008/10/17",
            "電子郵件": "siyu971017@gmail.com"
        }
    },
    "社群媒體": {
        "Instagram": "siyu.1017",
        "Discord": "siyu.1017",
        "Github": "Siyu1017",
        "Threads": "siyu.1017"
    },
    "這是什麼?": "這是 JSON Viewer ( https://github.com/Siyu1017/json-viewer/ )"
}

var viewer = new Viewer(profile);
document.querySelector('[data-theme="code"] .profile-mask').appendChild(viewer.container);


ages.forEach(age => {
    age.innerHTML = getAge();
})

toggleMenu.addEventListener('click', () => {
    container.classList.toggle('show-menu');
})

toggleThemes.forEach(toggleTheme => {
    toggleTheme.addEventListener('click', () => {
        toggleTheme.classList.remove('highlight')
        if (theme == 'modern') {
            theme = 'code';
            document.querySelector('[data-theme="modern"]').style.display = 'none';
            document.querySelector('[data-theme="code"]').style.display = 'flex';
            profileSection.classList.remove('modern');
            profileSection.classList.add('code');
        } else {
            theme = 'modern';
            document.querySelector('[data-theme="modern"]').style = 'revert-layer';
            document.querySelector('[data-theme="code"]').style = 'none';
            profileSection.classList.remove('code');
            profileSection.classList.add('modern');
        }
    })
})

var times = 0;

function showNotification() {
    times++;
    notification.classList.add('show');
    setTimeout(() => {
        if (times <= 1) {
            notification.classList.remove('show');
        }
        times--;
    }, 5000);
}

function getScroll(show) {
    if (show == 'profile') {
        return homeSection.scrollHeight - 180;
    } else if (show == 'project') {
        return homeSection.scrollHeight + profileSection.scrollHeight + window.innerHeight * .25 - 144;
    } else {
        return 0;
    }
}

function setItem() {
    document.querySelectorAll('[data-item].active').forEach(item => {
        item.classList.remove('active');
    })

    document.querySelectorAll(`[data-item="${currentShow}"]`).forEach(item => {
        item.classList.add('active');
    })
}

discord.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText('siyu.1017');
        notification.innerHTML = '複製成功 : siyu.1017';
        showNotification();
    } catch (err) {
        console.log('Failed to copy: ', err);
        notification.innerHTML = 'Discord : siyu.1017';
        showNotification();
    }
})
document.querySelectorAll('[data-item]').forEach(item => {
    item.addEventListener('click', () => {
        currentShow = item.getAttribute('data-item');
        container.classList.remove('show-menu');
        content.scrollTo({ top: getScroll(currentShow), behavior: 'smooth' });
        currentShow = item.getAttribute('data-item');
        setItem();
    })
})

content.addEventListener('scroll', () => {
    var scrollTop = content.scrollTop;

    if (scrollTop > homeSection.scrollHeight + profileSection.scrollHeight) {
        currentShow = 'project';
    } else if (scrollTop > homeSection.scrollHeight * .7) {
        currentShow = 'profile';
    } else {
        currentShow = 'home';
    }
    setItem();
})

window.onload = () => {
    var scrollTop = content.scrollTop;

    if (scrollTop > homeSection.scrollHeight + profileSection.scrollHeight) {
        currentShow = 'project';
    } else if (scrollTop > homeSection.scrollHeight * .7) {
        currentShow = 'profile';
    } else {
        currentShow = 'home';
    }
    var hash = location.hash.replace("#", "");
    if (hash != currentShow && ['project', 'profile', 'home'].indexOf(hash) > -1) {
        currentShow = hash;
    }
    content.scrollTo({ top: getScroll(currentShow), behavior: 'smooth' });
    location.hash = "#" + currentShow;
    setItem();
}

window.addEventListener('popstate', () => {
    var hash = location.hash.replace("#", "");
    if (hash == currentShow || ['project', 'profile', 'home'].indexOf(hash) == -1) {
        return;
    } else {
        currentShow = hash;
        content.scrollTo({ top: getScroll(currentShow), behavior: 'smooth' });
        setItem();
    }
});