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

    var targetTime = new Date('2025/01/01 00:00:00').getTime();
    var now = Date.now();
    var remainings = {};
    var remainingSeconds = 0;

    function preciseInterval(callback, interval = 1000) {
        let nextCallTime = Date.now() + interval;
        function loop() {
            const currentTime = Date.now();
            if (currentTime >= nextCallTime) {
                callback();
                nextCallTime += interval;
            }
            const delay = nextCallTime - Date.now();
            setTimeout(loop, delay);
        }
        loop();
    }

    function updateCounter() {
        now = Date.now();
        remainingSeconds = ~~((targetTime - now) / 1000);
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