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
   CREAR URL DEL VÍDEO
========================================= */

function getVideoUrl(iframe) {

    const baseUrl = iframe.dataset.video;

    return `${baseUrl}?autoplay=1&mute=1&rel=0&enablejsapi=1`;
}


/* =========================================
   REPRODUCIR PROYECTO
========================================= */

function playProject(project) {

    const iframe =
        project.querySelector("iframe");

    if (!iframe) return;


    /*
       Si todavía no tiene vídeo cargado,
       lo cargamos ahora.
    */

    if (!iframe.src) {

        iframe.src = getVideoUrl(iframe);

        return;

    }


    /*
       Si ya está cargado, le decimos
       a YouTube que reproduzca.
    */

    iframe.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func: "playVideo"
        }),
        "*"
    );

}


/* =========================================
   PAUSAR PROYECTO
========================================= */

function pauseProject(project) {

    const iframe =
        project.querySelector("iframe");

    if (!iframe || !iframe.src) return;


    iframe.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func: "pauseVideo"
        }),
        "*"
    );

}


/* =========================================
   CAMBIAR PROYECTO
========================================= */

function showProject(index) {


    /*
       Pausar todos los proyectos
       antes de cambiar.
    */

    projects.forEach((project) => {

        pauseProject(project);

        project.classList.remove("active");

    });


    currentProject = index;


    const activeProject =
        projects[currentProject];


    activeProject.classList.add("active");


    currentNumber.textContent =
        String(currentProject + 1).padStart(2, "0");


    /*
       Esperamos un poco para que la
       transición visual termine y
       entonces iniciamos el vídeo.
    */

    setTimeout(() => {

        playProject(activeProject);

    }, 300);

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
        (currentProject - 1 + totalProjects)
        % totalProjects;

    showProject(previous);

}


/* =========================================
   BOTONES
========================================= */

nextButton.addEventListener(
    "click",
    nextProject
);


previousButton.addEventListener(
    "click",
    previousProject
);


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {

            nextProject();

        }


        if (event.key === "ArrowLeft") {

            previousProject();

        }

    }
);


/* =========================================
   INICIAR PRIMER PROYECTO
========================================= */

showProject(0);
