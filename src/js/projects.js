"use strict";

//var projectsUrl = 'http://localhost/webbutv3/Projekt/projektapi/projects.php';
let gridEl = document.getElementById("gridProjects");
// event listener - endast på sidan projects.html
if (window.location.href.match('projects.html') != null) {
    window.onload = getProjects();
}

// hämta tidigare projekt
function getProjects() {
    gridEl.innerHTML = "";

    // skriver ut alla delar med innerHTML
    // hämtar från api projects
    fetch("https://studenter.miun.se/~jeno2011/writeable/DT173G/Projekt/projektapi/projects.php")
    .then(response => response.json())
    .then(data =>{
       data.forEach(project =>{
            gridEl.innerHTML +=
            `<div class="projects">
                <b>${project.title}</b>
                <p><a href="${project.url}" target="_blank">Länk</a></p>
                <p>${project.description}</p>
            </div>`;
       }) 
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}