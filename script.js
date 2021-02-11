'use strict'
// 1 minutes 12 seconds
class Timer {
    btnStart = document.querySelector('.btnStart');
    screenSettings = document.querySelector('.main__screen');
    screenTimer = document.querySelector('.timer__screen');
    spanMinutes = document.querySelector('.minutes');
    spanSeconds = document.querySelector('.seconds');
    progressBar = document.querySelector('.time__outer');
    progressBarTitle = document.querySelector('.title')

    checkValidation() {
        let inputDate = document.querySelector('.inputTime').value;

        const regexTimer = new RegExp(/^\s*(?:(\d+)(?:\s*(\d+))?|(\d+)(?:\s+s(?:ec(?:onds?)?)?)?(?:\s+(\d+)(?:\s+m(?:in(?:utes?)?)?)?)?|(\d+)(?:\s+m(?:in(?:utes?)?)?)?)?(?:\s+(\d+)(?:\s+s(?:ec(?:onds?)?)?)??)?\s*$/);

        const checkRightTime = inputDate.match(regexTimer);

        if (checkRightTime) {
            if (checkRightTime[1] !== undefined) this.startTimer(checkRightTime[1], checkRightTime[2]);
            if (checkRightTime[3] !== undefined) this.startTimer(checkRightTime[4], checkRightTime[3]);
            if (checkRightTime[5] !== undefined) this.startTimer(checkRightTime[5], checkRightTime[6]);
        }
    }

    startTimer(minutes = 0, seconds = 0) {
        this.progressBar.style.width = '0%';
        this.screenSettings.style.display = 'none';
        this.screenTimer.style.display = 'block';

        const newMinute = (mainTimer) => {
            if (!seconds) {
                if (!minutes)
                    this.endTimer(mainTimer, timerProgressBar);
                minutes--;
                seconds = 60;
            }
        };

        const newSecond = (mainTimer, timerProgressBar) => {
            seconds = Math.round(seconds);
            minutes = minutes > 9 ? minutes : '0' + minutes;
            seconds = seconds > 9 ? seconds : '0' + seconds;

            this.spanMinutes.innerText = minutes;
            this.spanSeconds.innerHTML = seconds;
            this.progressBarTitle.innerHTML = `${minutes}:${seconds}`

            minutes = +minutes;
            seconds = +seconds;

            newMinute(mainTimer, timerProgressBar)
        }

        const timerProgressBar = setInterval(() => {
            this.progressBar.style.width = (countSeconds - (minutes * 60 + seconds)) / countSeconds * 100 + '%';
            seconds = seconds - 0.05;
        }, 50);

        const mainTimer = setInterval(() => {

            newSecond(mainTimer, timerProgressBar);

        },1000)

        const countSeconds = minutes * 60 + +seconds;

        newSecond();
    }

    endTimer(mainTimer, timerProgressBar) {
        this.screenSettings.style.display = 'block';
        this.screenTimer.style.display = 'none';
        this.progressBarTitle.innerText = 'CockTimer';

        clearInterval(mainTimer);
        clearInterval(timerProgressBar);
    }
}

const timeLapse = new Timer();

timeLapse.btnStart.onclick = () => timeLapse.checkValidation();

// 'use strict'
//
// class Timer {
//     btnStart = document.querySelector('.btnStart');
//     screenSettings = document.querySelector('.main__screen');
//     screenTimer = document.querySelector('.timer__screen');
//     spanMinutes = document.querySelector('.minutes');
//     spanSeconds = document.querySelector('.seconds');
//     progressBar = document.querySelector('.time__outer');
//
//     checkValidation() {
//         let inputDate = document.querySelector('.inputTime').value;
//
//         const regexTimer = new RegExp(/minutes?|seconds?|\s/, 'g')
//
//         this.startTimer(...inputDate.split(regexTimer).filter(e => e).map(e => e.replace(/\s/g, '')));
//     }
//
//     startTimer(minutes = 0, seconds = 0) {
//         this.progressBar.style.width = '0%';
//         this.screenSettings.style.display = 'none';
//         this.screenTimer.style.display = 'block';
//
//         const newMinute = (mainTimer) => {
//             if (!seconds) {
//                 if (!minutes)
//                     this.endTimer(mainTimer, timerProgressBar);
//                 minutes--;
//                 seconds = 60;
//             }
//         };
//
//         const newSecond = (mainTimer, timerProgressBar) => {
//             seconds = Math.round(seconds);
//
//             this.spanMinutes.innerText = minutes;
//             this.spanSeconds.innerHTML = seconds;
//
//             newMinute(mainTimer, timerProgressBar)
//         }
//
//         const timerProgressBar = setInterval(() => {
//             this.progressBar.style.width = (countSeconds - (minutes * 60 + seconds)) / countSeconds * 100 + '%';
//             seconds = seconds - 0.05;
//         }, 50);
//
//         const mainTimer = setInterval(() => {
//
//             newSecond(mainTimer, timerProgressBar);
//
//         },1000)
//
//         const countSeconds = minutes * 60 + +seconds;
//
//         newSecond();
//     }
//
//     endTimer(mainTimer, timerProgressBar) {
//         this.screenSettings.style.display = 'block';
//         this.screenTimer.style.display = 'none';
//         clearInterval(mainTimer);
//         clearInterval(timerProgressBar);
//     }
// }
//
// const timeLapse = new Timer();
//
// timeLapse.btnStart.onclick = () => timeLapse.checkValidation();