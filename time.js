
function updateTimer() {
    const dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
}

setInterval(updateTimer, 1000);

updateTimer();