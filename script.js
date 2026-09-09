/* =========================================================
   ELEMENTOS
========================================================= */

const pages = document.querySelectorAll(".book-page");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const currentPageDisplay = document.getElementById("currentPage");
const totalPagesDisplay = document.getElementById("totalPages");

const thumbnails = document.querySelectorAll(".thumbnail");

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const plane = document.getElementById("plane");
const flightPath = document.getElementById("flightPath");


/* =========================================================
   CONFIGURACIÓN
========================================================= */

let currentPage = 0;

let isAnimating = false;

totalPagesDisplay.textContent = pages.length;


/* =========================================================
   MOSTRAR PÁGINA
========================================================= */

function showPage(index, direction = "next") {

    if (isAnimating) return;

    if (index < 0 || index >= pages.length) return;

    if (index === currentPage) {

        closeSidebar();

        return;

    }


    isAnimating = true;


    const oldPage = pages[currentPage];

    const newPage = pages[index];


    /* QUITAR CLASES ANTERIORES */

    pages.forEach(page => {

        page.classList.remove(
            "exit-left",
            "exit-right"
        );

    });


    /* DIRECCIÓN DEL GIRO */

    if (direction === "next") {

        oldPage.classList.add("exit-left");

    } else {

        oldPage.classList.add("exit-right");

    }


    oldPage.classList.remove("active");


    /* ACTIVAR NUEVA PÁGINA */

    newPage.classList.add("active");


    currentPage = index;


    /* ACTUALIZAR INTERFAZ */

    updateInterface();


    /* REINICIAR AVIÓN SI ES LA PÁGINA DEL MAPA */

    if (pages[currentPage].classList.contains("map-page")) {

        setTimeout(() => {

            animatePlane();

        }, 400);

    }


    /* TERMINAR ANIMACIÓN */

    setTimeout(() => {

        oldPage.classList.remove(
            "exit-left",
            "exit-right"
        );

        isAnimating = false;

    }, 800);


    closeSidebar();

}


/* =========================================================
   ACTUALIZAR INTERFAZ
========================================================= */

function updateInterface() {

    currentPageDisplay.textContent = currentPage + 1;


    /* BOTONES */

    prevButton.disabled = currentPage === 0;

    nextButton.disabled =
        currentPage === pages.length - 1;


    /* MINIATURAS */

    thumbnails.forEach((thumbnail, index) => {

        thumbnail.classList.remove("active");

        if (index === currentPage) {

            thumbnail.classList.add("active");

        }

    });

}


/* =========================================================
   SIGUIENTE
========================================================= */

function nextPage() {

    if (currentPage < pages.length - 1) {

        showPage(
            currentPage + 1,
            "next"
        );

    }

}


/* =========================================================
   ANTERIOR
========================================================= */

function previousPage() {

    if (currentPage > 0) {

        showPage(
            currentPage - 1,
            "previous"
        );

    }

}


/* =========================================================
   EVENTOS BOTONES
========================================================= */

nextButton.addEventListener(
    "click",
    nextPage
);


prevButton.addEventListener(
    "click",
    previousPage
);


/* =========================================================
   NAVEGACIÓN CON TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /* SI EL MENÚ ESTÁ ABIERTO */

        if (event.key === "Escape") {

            closeSidebar();

            return;

        }


        if (event.key === "ArrowRight") {

            nextPage();

        }


        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


/* =========================================================
   MINIATURAS DEL ÍNDICE
========================================================= */

thumbnails.forEach(thumbnail => {

    thumbnail.addEventListener(
        "click",
        () => {

            const pageIndex =
                Number(
                    thumbnail.dataset.page
                );


            if (pageIndex > currentPage) {

                showPage(
                    pageIndex,
                    "next"
                );

            } else {

                showPage(
                    pageIndex,
                    "previous"
                );

            }

        }
    );

});


/* =========================================================
   ABRIR SIDEBAR
========================================================= */

menuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.add("open");

        overlay.classList.add("active");

    }
);


/* =========================================================
   CERRAR SIDEBAR
========================================================= */

function closeSidebar() {

    sidebar.classList.remove("open");

    overlay.classList.remove("active");

}


closeMenu.addEventListener(
    "click",
    closeSidebar
);


overlay.addEventListener(
    "click",
    closeSidebar
);


/* =========================================================
   DESLIZAMIENTO TÁCTIL
========================================================= */

let touchStartX = 0;
let touchEndX = 0;

let touchStartY = 0;
let touchEndY = 0;


document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

        touchStartY =
            event.changedTouches[0].screenY;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        touchEndY =
            event.changedTouches[0].screenY;


        handleSwipe();

    },
    { passive: true }
);


/* =========================================================
   DETECTAR DESLIZAMIENTO
========================================================= */

function handleSwipe() {

    const horizontalDistance =
        touchEndX - touchStartX;

    const verticalDistance =
        touchEndY - touchStartY;


    /* EVITAR CONFUNDIR SCROLL VERTICAL */

    if (
        Math.abs(horizontalDistance) <=
        Math.abs(verticalDistance)
    ) {
        return;
    }


    const minimumSwipeDistance = 60;


    /* DESLIZAR HACIA LA IZQUIERDA */

    if (
        horizontalDistance <
        -minimumSwipeDistance
    ) {

        nextPage();

    }


    /* DESLIZAR HACIA LA DERECHA */

    if (
        horizontalDistance >
        minimumSwipeDistance
    ) {

        previousPage();

    }

}


/* =========================================================
   ANIMACIÓN DEL AVIÓN EN EL MAPA
========================================================= */

function animatePlane() {

    if (!plane || !flightPath) return;


    const pathLength =
        flightPath.getTotalLength();


    let startTime = null;

    const duration = 5000;


    function movePlane(timestamp) {

        if (!startTime) {

            startTime = timestamp;

        }


        const progress =
            ((timestamp - startTime) % duration)
            / duration;


        const distance =
            progress * pathLength;


        const point =
            flightPath.getPointAtLength(
                distance
            );


        const nextPoint =
            flightPath.getPointAtLength(
                Math.min(
                    distance + 1,
                    pathLength
                )
            );


        const angle =
            Math.atan2(
                nextPoint.y - point.y,
                nextPoint.x - point.x
            )
            * 180
            / Math.PI;


        plane.setAttribute(
            "transform",

            `
            translate(
                ${point.x},
                ${point.y}
            )
            rotate(${angle})
            `
        );


        if (
            pages[currentPage]
                .classList
                .contains("map-page")
        ) {

            requestAnimationFrame(
                movePlane
            );

        }

    }


    requestAnimationFrame(
        movePlane
    );

}


/* =========================================================
   PREVENIR ARRASTRE DE IMÁGENES
========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

        }
    );

});


/* =========================================================
   INICIALIZACIÓN
========================================================= */

pages[0].classList.add("active");

updateInterface();


/* =========================================================
   EFECTO DE MOVIMIENTO SUAVE DEL LIBRO
========================================================= */

const bookWrapper =
    document.querySelector(".book-wrapper");


bookWrapper.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth <= 650
        ) {
            return;
        }


        const rect =
            bookWrapper.getBoundingClientRect();


        const x =
            event.clientX - rect.left;


        const y =
            event.clientY - rect.top;


        const rotateY =
            (x / rect.width - 0.5) * 1.5;


        const rotateX =
            (y / rect.height - 0.5) * -0.7;


        bookWrapper.style.transform =
            `
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
            `;

    }
);


bookWrapper.addEventListener(
    "mouseleave",
    () => {

        bookWrapper.style.transform =
            "rotateY(0deg) rotateX(0deg)";

    }
);
