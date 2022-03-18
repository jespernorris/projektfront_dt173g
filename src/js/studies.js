"use strict";

//var studiesUrl = 'http://localhost/webbutv3/Projekt/projektapi/studies.php';
let studiesEl = document.getElementById("studies");
// event listeners
window.onload = getStudies();

// hämta tidigare studier
function getStudies() {
    studiesEl.innerHTML = "<h2>Utbildning</h2>";

    // skriver ut alla delar med innerHTML
    // hämtar från api studies
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/studies.php")
    .then(response => response.json())
    .then(data =>{
       data.forEach(study =>{
            studiesEl.innerHTML +=
            `<div class="studyexperience">
                <b>${study.location}</b>
                <p>${study.name}</p>
                <p>${study.startDate} - ${study.endDate}</p>
            </div>`;
       }) 
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}