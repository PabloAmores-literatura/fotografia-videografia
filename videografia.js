
const projects = document.querySelectorAll(".project");

const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const currentNumber = document.getElementById("current");
const totalNumber = document.getElementById("total");

let currentProject = 0;


/* =========================================
   CONFIGURACIÓN
========================================= */

const totalProjects = projects.length;

totalNumber.textContent =
    String(totalProjects).padStart(2, "0");


/* =========================================
   CARGAR MINIATURA Y VÍDEO
========================================= */

function loadProject(project) {

    const iframe = project.querySelector("iframe");

    if (!iframe) return;

    const baseUrl = iframe.dataset.video;

    /*
       Cargamos YouTube sin autoplay.
       La miniatura y el botón Play
       los proporciona YouTube.
    */

    if (!iframe.dataset.loaded) {

        iframe.src = `${baseUrl}?rel=0&playsinline=1&enablejsapi=1`;

        iframe.dataset.loaded = "true";

    }

}


/* =========================================
   PAUSAR VÍDEO
========================================= */

function pauseProject(project) {

    const iframe = project.querySelector("iframe");

    if (!iframe || !iframe.dataset.loaded) return;

    iframe.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func: "pauseVideo",
            args: []
        }),
        "*"
    );

}


/* =========================================
   CAMBIAR PROYECTO
========================================= */

function showProject(index) {

    projects.forEach((project) => {

        pauseProject(project);

        project.classList.remove("active");

    });

    currentProject = index;

    const activeProject = projects[currentProject];

    activeProject.classList.add("active");

    currentNumber.textContent =
        String(currentProject + 1).padStart(2, "0");

    /*
       Cargamos el vídeo del proyecto activo,
       pero no lo reproducimos.
    */

    loadProject(activeProject);

}


/* =========================================
   SIGUIENTE
========================================= */

function nextProject() {

    const next =
        (currentProject + 1) % totalProjects;

    showProject(next);

}


/* =========================================
   ANTERIOR
========================================= */

function previousProject() {

    const previous =
        (currentProject - 1 + totalProjects) % totalProjects;

    showProject(previous);

}


/* =========================================
   BOTONES
========================================= */

nextButton.addEventListener("click", nextProject);

previousButton.addEventListener("click", previousProject);


/* =========================================
   TECLADO
========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") nextProject();

    if (event.key === "ArrowLeft") previousProject();

});


/* =========================================
   INICIAR PRIMER PROYECTO
========================================= */

showProject(0);
