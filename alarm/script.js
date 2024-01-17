const insertedTime = document.querySelector('.time');
let currTime = document.querySelector('.currTime');
const setAlarm = document.getElementById('setAlarmBtn');
const deleteAlarm = document.getElementById('deleteAlarmBtn');
const stopAlarm = document.getElementById('stopAlarmBtn');
const displayMsg = document.getElementById('display-msg');
const newAlarm = document.getElementById('newAlarm');
let alarm = false;
let stop = false;
let alarmtime = 0;
let buzzer = new Audio();
buzzer.src = 'Sounds/Alarm.mp3';
buzzer.loop = true;
let click = new Audio();
click.src = 'Sounds/Click.mp3';

/* This `setAlarm.addEventListener('click',() => {...})` function is an event listener that listens for a click event on the "setAlarm" button.
 When the button is clicked, the function is sets an alarm. */
setAlarm.addEventListener('click',() =>
{
    if(insertedTime.value == '')
    {
        alert('Enter a valid Time')
    }
    else
    {
        click.play();
        alarm = true;
        stop = false;
        let hr = insertedTime.value.slice(0,2);
        let min = insertedTime.value.slice(3,5);
        let am_pm = 'AM';
        alarmtime = `${hr}:${min}:00`;
        if (hr >= 12)
        {
            hr = hr%12;
            am_pm = 'PM';
        }
        if (hr == 0)
        {
            hr = 12;
        }
        hr = hr.toString().padStart(2,'0');
        newAlarm.innerText = `Alarm - ${hr}:${min} ${am_pm}`;
        document.getElementById('msgTime').innerHTML = `${hr}:${min} ${am_pm}`;
        newAlarm.classList.remove('noneDisplay');
    }
})

/* This `deleteAlarm.addEventListener('click',() => {...})` function is an event listener that listens
for a click event on the "deleteAlarm" button. When the button is clicked, the function checks if an
alarm has been set. If an alarm has not been set, it displays an alert. If an alarm has been set, it resets the alarm
by setting all values to 0 and false */
deleteAlarm.addEventListener('click',() => 
{
    if(alarmtime == 0){
        alert("Please set an alarm first!");
    }
    else{
        alarm = false;
        stop = false;
        alarmtime = 0;
        insertedTime.value = '';
        newAlarm.innerText = "";
        newAlarm.classList.add('noneDisplay');
        click.play();
    }
})

/* This `stopAlarm.addEventListener('click',() => {...})` function is an event listener that listens for
a click event on the "stopAlarm" button. When the button is clicked, the function sets the `stop`
variable to `true`, which stops the alarm audio. */
stopAlarm.addEventListener('click',() =>
{
    stop = true;
    click.play();
    displayMsg.classList.add('noneDisplay');
})

/**
 * This `clock` function displays the current time in hours, minutes, and seconds, and checks if the
 * current time matches the set alarm time to display a message and play a buzzer sound.
 */
const clock = () =>
{
    let date = new Date();
    let hour = date.getHours().toString().padStart(2,'0');
    let min = date.getMinutes().toString().padStart(2,'0');
    let second = date.getSeconds().toString().padStart(2,'0');
    let am_pm = 'AM';
    let time = `${hour}:${min}:${second}`;
    if (hour>=12)
    {
        hour = (hour%12).toString().padStart(2,'0');
        am_pm = 'PM';
    }
    if (hour == '00')
    {
        hour = 12;
    }
    currTime.innerHTML = `${hour}:${min}:${second} ${am_pm}`;

    if(alarm)
    {
        if(time == alarmtime)
        {
            displayMsg.classList.remove('noneDisplay');
            buzzer.play();
        }
        if(stop)
        {
            buzzer.pause();
        }
    }
}
setInterval(clock,100);