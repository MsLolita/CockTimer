'use strict'

timerCount();

function timerCount() {
    let timer;
    const delayUpdateStripe = 200;

    onmessage = e => timer = e.data;

    setTimeout(function updateStripe() {
        if (!+timer.seconds.toFixed(5)) {
            if (!timer.minutes){
                if(!timer.hours)
                    timer.endTimer = true;
                timer.hours--;
                timer.minutes = 60;
            }
            timer.minutes--;
            timer.seconds = 60;
        }

        timer.seconds = timer.seconds - delayUpdateStripe / 1000;

        postMessage({ ...timer });

        setTimeout (updateStripe, delayUpdateStripe);
    }, delayUpdateStripe);
}