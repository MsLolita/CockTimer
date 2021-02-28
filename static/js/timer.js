'use strict'

import * as html from './elements.js'

class Timer {
    constructor() {
        this.clickHelpsBtn();
    }

    checkValidation(inputTime) {
        const regexTimer = new RegExp(/\b(\d+)\s*(?:s|sec|seconds?)\b|\b(\d+)\s*(?:m|min|minutes?)\b|^\s*(\d+)\s*$|\b(\d+)\s*(?:h|hours?)\b|^\s*(pomodoro|tabata|morning)\s*$/g);

        let timeFilter = inputTime.toLowerCase().replace(regexTimer, '{"seconds":"$1", "minutes":"$2$3", "hours":"$4", "helpBtn":"$5"}.').split('.');

        try {
            timeFilter = timeFilter.filter(e => ~e.search(/{.*}/)).map(strObj => JSON.parse(strObj));

            for (const obj of timeFilter)
                for(const prop in obj)
                    obj[prop] || delete obj[prop];

            timeFilter = Object.assign({}, ...timeFilter);
        } catch (e) {
            if (e instanceof SyntaxError) return;
        }

        return timeFilter;
    }

    startTimer({seconds = 0, minutes = 0, hours = 0, helpBtn} = {}, res) {
        if (helpBtn)
            return this[helpBtn + 'Btn'](helpBtn);

        [seconds, minutes, hours] = [+seconds, +minutes, +hours];

        const allTimeInSeconds = (hours * 60 + minutes) * 60 + seconds;
        let worker = null;

        html.progressBar.style.width = '0%';
        html.mainScreen.style.display = 'none';
        html.timerScreen.style.display = 'block';

        html.typeTime.style.display = hours ? 'block' : 'none';

        html.btnTimerScreen.onclick = () => this.returnMenu(worker);

        const newSecond = () => {
            const secondsToShow = seconds > 9 ? Math.round(seconds) : '0' + Math.round(seconds);
            const minutesToShow = minutes > 9 ? minutes : '0' + minutes;
            const hoursToShow = hours > 9 ? hours : '0' + hours;

            html.spanHours.innerText = hoursToShow;
            html.spanMinutes.innerText = minutesToShow;
            html.spanSeconds.innerText = secondsToShow;

            html.showTimerTitle.innerHTML = `${hoursToShow}:${minutesToShow}:${secondsToShow}`;
        }

        (function callWorker() {
            worker = new Worker("workerTimer.js");

            worker.postMessage({
                seconds,
                minutes,
                hours
            });

            newSecond();

            worker.onmessage = e => {
                const newTime = e.data;

                if (newTime.endTimer)
                    return this.endTimer(worker, res);

                ({seconds, minutes, hours} = newTime);
                seconds = +seconds.toFixed(5);

                html.progressBar.style.width = (allTimeInSeconds - ((hours * 60 + minutes) * 60 + seconds)) / allTimeInSeconds * 100 + '%';

                if (Number.isInteger(seconds)) newSecond()
            };
        }).bind(this)();
    }

    endTimer(worker, res) {
        worker.terminate();

        html.showTimerTitle.innerText = 'CockTimer';
        html.timerScreenUpContent.textContent = 'Time Expired!';
        const audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_bells_small_hand_bell_ring_in_water_weird_cartoon_tone_001_61906.mp3?_=1');
        audio.play()
             .then(res);
    }

    showIfRightInput(inputText) {
        const inputTime = this.checkValidation(inputText);
        const isEmptyInputTime = inputTime && !!Object.keys(inputTime).filter(e => e).length;

        if (isEmptyInputTime) {
            html.btnStart.style.backgroundPosition = 'right center';
            html.btnStart.style.cursor = 'pointer';
            html.btnStart.disabled = false;
            html.btnStart.onclick = () => timeLapse.startTimer(inputTime);
        } else {
            html.btnStart.style.backgroundPosition = '';
            html.btnStart.style.cursor = '';
            html.btnStart.disabled = true;
        }
    }

    clickHelpsBtn() {
        for (let i = 0; i < html.btnMainScreen.length; i++)
            html.btnMainScreen[i].onclick = () =>
                this.startTimer(
                    this.checkValidation(html.btnMainScreen[i].innerText)
                );
    }

    returnMenu(worker) {
        worker.terminate();

        html.btnStart.disabled = true;
        html.inputDate.value = '';
        html.btnStart.style.backgroundPosition = '';
        html.showTimerTitle.innerText = 'CockTimer';
        html.timerScreenUpContent.innerText = 'Time is going...';
        html.timerScreen.style.display = 'none';
        html.mainScreen.style.display = 'block';
    }

    async pomodoroBtn() {
        await this.buttonTimer('Work', 0, 25);
        await this.buttonTimer('Rest', 0, 10);
    }

    async tabataBtn() {
        for (let i = 0; i < 8; i++) {
            await this.buttonTimer('Push it', 20);
            await this.buttonTimer('Rest', 10);
        }
    }

    async morningBtn() {
        await this.buttonTimer('Morning warm up, let\'s go!', 6);
        await this.buttonTimer('Get ready to run in place...', 12);
        await this.buttonTimer('Run in place!', 0, 1);
    }

    buttonTimer(upContent, seconds, minutes, hours) {
        return new Promise(res => {
            html.timerScreenUpContent.innerText = upContent;
            this.startTimer({seconds, minutes, hours}, res);
        });
    }
}

const timeLapse = new Timer();

html.inputDate.onkeyup = () => timeLapse.showIfRightInput(html.inputDate.value);