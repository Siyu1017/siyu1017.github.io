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

function randomString(length) {
    if (!length) return console.warn('Option Invalid');
    var characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '2', '3', '4', '5', '6', '7', '8', '9'],
        str = '';
    for (let i = 0; i < length; i++) {
        str += characters[Math.floor(Math.random() * characters.length)];
    }
    return str;
}

(() => {
    var canvas = document.getElementById('background');
    var ctx = canvas.getContext('2d', { willReadFrequently: true });

    function uniqueID() {
        var id = randomString(72);
        return id;
    }

    canvasClarifier(canvas, ctx);

    var numStars = Math.ceil(window.innerWidth * window.innerHeight / 1000);
    var radius = 1;
    var focalLength = 1500;
    var stars = [], star;
    var centerX, centerY;
    var pixelX, pixelY, pixelRadius;

    window.onresize = () => {
        numStars = Math.ceil(window.innerWidth * window.innerHeight / 1000);
    }

    initializeStars();

    function render() {
        canvasClarifier(canvas, ctx);
        updateStars();
        drawStars();
        requestAnimationFrame(render);
    }

    function initializeStars() {
        stars = [];
        for (i = 0; i < numStars; i++) {
            star = {
                x: Math.random() * canvas.offsetWidth - canvas.offsetWidth / 2,
                y: Math.random() * canvas.offsetHeight - canvas.offsetHeight / 2,
                z: Math.random() * focalLength,
                t: Date.now()
            };
            stars.push(star);
        }
    }

    function updateStars() {
        for (i = 0; i < (numStars > stars.length ? stars.length : numStars); i++) {
            star = stars[i];
            star.z--;

            if (star.z <= 0) {
                stars[i] = {
                    x: Math.random() * canvas.offsetWidth - canvas.offsetWidth / 2,
                    y: Math.random() * canvas.offsetHeight - canvas.offsetHeight / 2,
                    z: Math.random() * focalLength,
                    t: Date.now()
                };
            }
        }
    }

    function drawStars() {
        centerX = canvas.offsetWidth / 2;
        centerY = canvas.offsetHeight / 2;

        ctx.fillStyle = "rgb(17,17,17)";
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

        for (i = 0; i < (numStars > stars.length ? stars.length : numStars); i++) {
            star = stars[i];

            pixelX = star.x * (focalLength / star.z);
            pixelX += centerX;
            pixelY = star.y * (focalLength / star.z);
            pixelY += centerY;
            pixelRadius = radius * (focalLength / star.z);

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = Date.now() - star.t < 200 ? `rgba(255,255,255,${(Date.now() - star.t) / 200 * .3})` : "rgba(255,255,255,.3)";
            ctx.arc(pixelX, pixelY, pixelRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
    }
    render();
})();

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
            "學校": "高雄中學",
            "電子郵件": "siyu971017@gmail.com"
        }
    },
    "社群媒體": {
        "Line": "siyu.1017",
        "Instagram": "siyu.1017",
        "Discord": "siyu.1017",
        "Github": "Siyu1017",
        "WeChat": "siyu_971017",
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
        return homeSection.scrollHeight - 24;
    } else if (show == 'project') {
        return homeSection.scrollHeight + profileSection.scrollHeight + window.innerHeight * .25 - 60;
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
wechat.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText('siyu_971017');
        notification.innerHTML = '複製成功 : siyu_971017';
        showNotification();
    } catch (err) {
        console.log('Failed to copy: ', err);
        notification.innerHTML = 'WeChat : siyu_971017';
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