const projects = document.querySelectorAll(".project");

const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const currentNumber = document.getElementById("current");

let currentProject = 0;


/* =========================================
   CAMBIAR PROYECTO
========================================= */

function showProject(index) {

    projects[currentProject].classList.remove("active");

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
