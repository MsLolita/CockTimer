'use strict'

const showTimerTitle = document.querySelector('.title'),
    mainScreen = document.querySelector('.main__screen'),
    timerScreen = document.querySelector('.timer__screen'),
    spanSeconds = document.querySelector('.seconds'),
    spanMinutes = document.querySelector('.minutes'),
    spanHours = document.querySelector('.hours'),
    inputDate = document.querySelector('.inputTime'),
    btnStart = document.querySelector('.btnStart'),
    btnMainScreen = document.querySelectorAll('.btnHelp'),
    progressBar = document.querySelector('.progress__bar'),
    btnTimerScreen = document.querySelector('.btnReturn__menu'),
    typeTime = document.querySelector('.type__time__text'),
    timerScreenUpContent = document.querySelector('.up__describe');

export { spanSeconds, spanMinutes, spanHours, btnStart, btnMainScreen, btnTimerScreen, mainScreen, timerScreen, progressBar, showTimerTitle, inputDate, typeTime, timerScreenUpContent };