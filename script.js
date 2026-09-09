/* ==========================================
   ELEMENTOS
========================================== */

const pages = document.querySelectorAll(".book-page");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const currentPageDisplay =
    document.getElementById("currentPage");

const totalPagesDisplay =
    document.getElementById("totalPages");

const thumbnails =
    document.querySelectorAll(".thumbnail");

const menuButton =
    document.getElementById("menuButton");

const closeMenuButton =
    document.getElementById("closeMenu");

const sidebar =
    document.getElementById("sidebar");

const overlay =
    document.getElementById("overlay");

const spainBackground =
    document.getElementById("spainBackground");

const plane =
    document.getElementById("plane");

const flightPath =
    document.getElementById("flightPath");


/* ==========================================
   CONFIGURACIÓN
========================================== */

let currentPage = 0;

let isAnimating = false;

totalPagesDisplay.textContent = pages.length;


/* ==========================================
   EMOJIS DE ESPAÑA CAYENDO
========================================== */

const spanishEmojis = [

    "🇪🇸",
    "🥘",
    "💃",
    "🎸",
    "🏰",
    "☀️",
    "⚽",
    "🪭",
    "🍊",
    "🎨",
    "✈️",
    "🐂",
    "✨"

];


function createFallingEmoji() {

    const emoji =
        document.createElement("span");


    emoji.classList.add("falling-emoji");


    emoji.textContent =
        spanishEmojis[
            Math.floor(
                Math.random() *
                spanishEmojis.length
            )
        ];


    const size =
        Math.random() * 25 + 18;


    const left =
        Math.random() * 100;


    const duration =
        Math.random() * 12 + 10;


    const delay =
        Math.random() * -20;


    emoji.style.left = `${left}%`;

    emoji.style.fontSize = `${size}px`;

    emoji.style.animationDuration =
        `${duration}s`;

    emoji.style.animationDelay =
        `${delay}s`;


    spainBackground.appendChild(emoji);

}


/* CANTIDAD DE EMOJIS */

for (let i = 0; i < 35; i++) {

    createFallingEmoji();

}


/* ==========================================
   MOSTRAR PÁGINA
========================================== */

function showPage(index, direction = "next") {

    if (isAnimating) return;

    if (
        index < 0 ||
        index >= pages.length
    ) return;


    if (index === currentPage) {

        closeSidebar();

        return;

    }


    isAnimating = true;


    const oldPage =
        pages[currentPage];

    const newPage =
        pages[index];


    pages.forEach(page => {

        page.classList.remove(
            "exit-left",
            "exit-right"
        );

    });


    if (direction === "next") {

        oldPage.classList.add(
            "exit-left"
        );

    } else {

        oldPage.classList.add(
            "exit-right"
        );

    }


    oldPage.classList.remove(
        "active"
    );


    newPage.classList.add(
        "active"
    );


    currentPage = index;


    updateInterface();


    if (
        pages[currentPage]
            .classList
            .contains("map-page")
    ) {

        setTimeout(() => {

            animatePlane();

        }, 400);

    }


    setTimeout(() => {

        oldPage.classList.remove(
            "exit-left",
            "exit-right"
        );

        isAnimating = false;

    }, 800);


    closeSidebar();

}


/* ==========================================
   ACTUALIZAR INTERFAZ
========================================== */

function updateInterface() {

    currentPageDisplay.textContent =
        currentPage + 1;


    prevButton.disabled =
        currentPage === 0;


    nextButton.disabled =
        currentPage === pages.length - 1;


    thumbnails.forEach(
        (thumbnail, index) => {

            thumbnail.classList.remove(
                "active"
            );


            if (index === currentPage) {

                thumbnail.classList.add(
                    "active"
                );

            }

        }
    );

}


/* ==========================================
   SIGUIENTE
========================================== */

function nextPage() {

    if (
        currentPage <
        pages.length - 1
    ) {

        showPage(
            currentPage + 1,
            "next"
        );

    }

}


/* ==========================================
   ANTERIOR
========================================== */

function previousPage() {

    if (currentPage > 0) {

        showPage(
            currentPage - 1,
            "previous"
        );

    }

}


/* ==========================================
   BOTONES
========================================== */

nextButton.addEventListener(
    "click",
    nextPage
);


prevButton.addEventListener(
    "click",
    previousPage
);


/* ==========================================
   TECLADO
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSidebar();

            return;

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextPage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousPage();

        }

    }
);


/* ==========================================
   MINIATURAS
========================================== */

thumbnails.forEach(thumbnail => {

    thumbnail.addEventListener(
        "click",
        () => {

            const pageIndex =
                Number(
                    thumbnail.dataset.page
                );


            if (
                pageIndex > currentPage
            ) {

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


/* ==========================================
   SIDEBAR
========================================== */

menuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.add(
            "open"
        );

        overlay.classList.add(
            "active"
        );

    }
);


function closeSidebar() {

    sidebar.classList.remove(
        "open"
    );

    overlay.classList.remove(
        "active"
    );

}


closeMenuButton.addEventListener(
    "click",
    closeSidebar
);


overlay.addEventListener(
    "click",
    closeSidebar
);


/* ==========================================
   DESLIZAMIENTO TÁCTIL
========================================== */

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
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


function handleSwipe() {

    const horizontalDistance =
        touchEndX - touchStartX;


    const verticalDistance =
        touchEndY - touchStartY;


    if (
        Math.abs(horizontalDistance) <=
        Math.abs(verticalDistance)
    ) {

        return;

    }


    const minimumSwipeDistance = 60;


    if (
        horizontalDistance <
        -minimumSwipeDistance
    ) {

        nextPage();

    }


    if (
        horizontalDistance >
        minimumSwipeDistance
    ) {

        previousPage();

    }

}


/* ==========================================
   AVIÓN ANIMADO
========================================== */

let planeAnimationRunning = false;


function animatePlane() {

    if (
        !plane ||
        !flightPath ||
        planeAnimationRunning
    ) return;


    planeAnimationRunning = true;


    const pathLength =
        flightPath.getTotalLength();


    let startTime = null;

    const duration = 5000;


    function movePlane(timestamp) {

        if (!startTime) {

            startTime = timestamp;

        }


        if (
            !pages[currentPage]
                .classList
                .contains("map-page")
        ) {

            planeAnimationRunning = false;

            return;

        }


        const progress =
            (
                (timestamp - startTime) %
                duration
            ) / duration;


        const distance =
            progress * pathLength;


        const point =
            flightPath.getPointAtLength(
                distance
            );


        const nextPoint =
            flightPath.getPointAtLength(
                Math.min(
                    distance + 2,
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

            `translate(${point.x}, ${point.y})
             rotate(${angle})`
        );


        requestAnimationFrame(
            movePlane
        );

    }


    requestAnimationFrame(
        movePlane
    );

}


/* ==========================================
   EVITAR ARRASTRAR IMÁGENES
========================================== */

document.querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    });


/* ==========================================
   EFECTO 3D CON EL MOUSE
========================================== */

const bookWrapper =
    document.querySelector(
        ".book-wrapper"
    );


bookWrapper.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth <= 650
        ) return;


        const rect =
            bookWrapper.getBoundingClientRect();


        const x =
            event.clientX - rect.left;


        const y =
            event.clientY - rect.top;


        const rotateY =
            (x / rect.width - 0.5) *
            1.5;


        const rotateX =
            (y / rect.height - 0.5) *
            -0.7;


        bookWrapper.style.transform =
            `rotateY(${rotateY}deg)
             rotateX(${rotateX}deg)`;

    }
);


bookWrapper.addEventListener(
    "mouseleave",
    () => {

        bookWrapper.style.transform =
            "rotateY(0deg) rotateX(0deg)";

    }
);


/* ==========================================
   INICIALIZACIÓN
========================================== */

pages[0].classList.add("active");

updateInterface();
