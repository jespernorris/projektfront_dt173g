"use strict";

//var workUrl = 'http://localhost/webbutv3/Projekt/projektapi/work.php';
let workEl = document.getElementById("work");
// event listeners
window.onload = getWork();

// hämta tidigare arbeten
function getWork() {
    workEl.innerHTML = "<h2>Arbetserfarenhet</h2>";

    // skriver ut alla delar med innerHTML
    // hämtar från api work
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/work.php")
    .then(response => response.json())
    .then(data =>{
       data.forEach(work =>{
            workEl.innerHTML +=
            `<div class="workexperience">
                <b>${work.workplace}</b>
                <p>${work.title}</p>
                <p>${work.startDate} - ${work.endDate}</p>
            </div>`;
       }) 
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}