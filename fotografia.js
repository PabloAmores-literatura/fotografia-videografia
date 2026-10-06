const projects = document.querySelectorAll(".project");

const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const currentNumber = document.getElementById("current");
const totalNumber = document.getElementById("total");

let currentProject = 0;


/* =========================================
   INICIO
========================================= */

/*
   Nos aseguramos de que solamente
   un proyecto esté activo.
*/

projects.forEach((project) => {
    project.classList.remove("active");
});


if (projects.length > 0) {

    projects[0].classList.add("active");

    currentNumber.textContent = "01";

    totalNumber.textContent =
        String(projects.length).padStart(2, "0");
}


/* =========================================
   CAMBIAR PROYECTO
========================================= */

function showProject(index) {

    projects.forEach((project) => {
        project.classList.remove("active");
    });


    currentProject = index;


    projects[currentProject].classList.add("active");


    currentNumber.textContent =
        String(currentProject + 1).padStart(2, "0");
}


/* =========================================
   SIGUIENTE
========================================= */

function nextProject() {

    const next =
        (currentProject + 1) % projects.length;

    showProject(next);
}


/* =========================================
   ANTERIOR
========================================= */

function previousProject() {

    const previous =
        (currentProject - 1 + projects.length)
        % projects.length;

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
