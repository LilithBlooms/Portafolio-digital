/* =========================================================
   ESPAÑA 🇪🇸 — PORTAFOLIO DIGITAL
   SCRIPT.JS COMPLETO
========================================================= */


/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const pages = Array.from(
    document.querySelectorAll(".book-page")
);

const thumbnails = Array.from(
    document.querySelectorAll(".thumbnail")
);

const previousButton =
    document.getElementById("prevPage");

const nextButton =
    document.getElementById("nextPage");

const currentPageElement =
    document.getElementById("currentPage");

const totalPagesElement =
    document.getElementById("totalPages");

const menuButton =
    document.getElementById("menuButton");

const closeMenuButton =
    document.getElementById("closeMenu");

const sidebar =
    document.getElementById("sidebar");

const overlay =
    document.getElementById("overlay");


/* =========================================================
   CONFIGURACIÓN INICIAL
========================================================= */

let currentPage = 0;

const totalPages = pages.length;


/* =========================================================
   MOSTRAR TOTAL DE PÁGINAS
========================================================= */

if (totalPagesElement) {
    totalPagesElement.textContent = totalPages;
}


/* =========================================================
   MOSTRAR PÁGINA
========================================================= */

function showPage(index) {

    /* Evitar páginas inexistentes */

    if (index < 0) {
        index = 0;
    }

    if (index >= totalPages) {
        index = totalPages - 1;
    }


    /* Guardar página actual */

    currentPage = index;


    /* Ocultar todas las páginas */

    pages.forEach((page, pageIndex) => {

        page.classList.remove("active");


        /* Resetear animaciones */

        const animatedElements =
            page.querySelectorAll(
                ".page-text, .page-image, .biography-content, .biography-image, .map-container"
            );

        animatedElements.forEach(element => {

            element.style.animation = "none";

        });

    });


    /* Mostrar página seleccionada */

    const activePage = pages[currentPage];

    if (activePage) {

        activePage.classList.add("active");


        /* Reiniciar animaciones */

        setTimeout(() => {

            const animatedElements =
                activePage.querySelectorAll(
                    ".page-text, .page-image, .biography-content, .biography-image, .map-container"
                );

            animatedElements.forEach(element => {

                element.style.animation = "";

            });

        }, 50);

    }


    /* =====================================================
       ACTUALIZAR NÚMERO DE PÁGINA
    ===================================================== */

    if (currentPageElement) {

        currentPageElement.textContent =
            currentPage + 1;

    }


    /* =====================================================
       ACTUALIZAR BOTONES
    ===================================================== */

    if (previousButton) {

        previousButton.disabled =
            currentPage === 0;

    }


    if (nextButton) {

        nextButton.disabled =
            currentPage === totalPages - 1;

    }


    /* =====================================================
       ACTUALIZAR MINIATURAS
    ===================================================== */

    thumbnails.forEach((thumbnail, thumbnailIndex) => {

        thumbnail.classList.remove("active");


        /*
           Si las miniaturas están en el mismo orden
           que las páginas, usamos su posición.
        */

        if (thumbnailIndex === currentPage) {

            thumbnail.classList.add("active");

        }

    });


    /* =====================================================
       SCROLL HACIA ARRIBA
    ===================================================== */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SIGUIENTE PÁGINA
========================================================= */

function nextPage() {

    if (currentPage < totalPages - 1) {

        showPage(currentPage + 1);

    }

}


/* =========================================================
   PÁGINA ANTERIOR
========================================================= */

function previousPage() {

    if (currentPage > 0) {

        showPage(currentPage - 1);

    }

}


/* =========================================================
   BOTONES DE NAVEGACIÓN
========================================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextPage
    );

}


if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousPage
    );

}


/* =========================================================
   NAVEGACIÓN CON TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /* No cambiar página mientras escribes */

        const activeElement =
            document.activeElement;

        const typingElement =
            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA" ||
                activeElement.isContentEditable
            );


        if (typingElement) {
            return;
        }


        if (event.key === "ArrowRight") {

            event.preventDefault();

            nextPage();

        }


        if (event.key === "ArrowLeft") {

            event.preventDefault();

            previousPage();

        }


        /* Escape cierra el menú */

        if (event.key === "Escape") {

            closeSidebar();

        }

    }
);


/* =========================================================
   MINIATURAS DEL MENÚ
========================================================= */

thumbnails.forEach(
    function (thumbnail, index) {

        thumbnail.addEventListener(
            "click",
            function () {

                showPage(index);

                closeSidebar();

            }
        );

    }
);


/* =========================================================
   ABRIR MENÚ
========================================================= */

function openSidebar() {

    if (!sidebar || !overlay) {
        return;
    }


    sidebar.classList.add("open");

    overlay.classList.add("show");


    /* Evita que el fondo se mueva */

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CERRAR MENÚ
========================================================= */

function closeSidebar() {

    if (!sidebar || !overlay) {
        return;
    }


    sidebar.classList.remove("open");

    overlay.classList.remove("show");


    document.body.style.overflow =
        "";

}


/* =========================================================
   EVENTOS DEL MENÚ
========================================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        openSidebar
    );

}


if (closeMenuButton) {

    closeMenuButton.addEventListener(
        "click",
        closeSidebar
    );

}


if (overlay) {

    overlay.addEventListener(
        "click",
        closeSidebar
    );

}


/* =========================================================
   EMOJIS CAYENDO 🇪🇸
========================================================= */

const background =
    document.querySelector(".spain-background");


/*
   Emojis relacionados con España.
*/

const spanishEmojis = [

    "🇪🇸",
    "🌹",
    "💃",
    "🪭",
    "🎸",
    "🏰",
    "☀️",
    "🥘",
    "⚽",
    "🎨",
    "🍊",
    "✨"

];


/* =========================================================
   CREAR EMOJI
========================================================= */

function createFloatingEmoji() {

    if (!background) {
        return;
    }


    const emoji =
        document.createElement("span");


    emoji.classList.add(
        "floating-emoji"
    );


    /* Emoji aleatorio */

    emoji.textContent =
        spanishEmojis[
            Math.floor(
                Math.random() *
                spanishEmojis.length
            )
        ];


    /* Posición horizontal */

    emoji.style.left =
        Math.random() * 100 + "%";


    /* Tamaño */

    const size =
        Math.random() * 22 + 18;

    emoji.style.fontSize =
        size + "px";


    /* Duración de caída */

    const duration =
        Math.random() * 8 + 8;

    emoji.style.animationDuration =
        duration + "s, " +
        (Math.random() * 2 + 2) +
        "s";


    /* Retraso */

    emoji.style.animationDelay =
        "0s, 0s";


    background.appendChild(
        emoji
    );


    /* Eliminar cuando termine */

    setTimeout(
        function () {

            emoji.remove();

        },
        duration * 1000 + 500
    );

}


/* =========================================================
   CREAR EMOJIS INICIALES
========================================================= */

function startFloatingEmojis() {

    if (!background) {
        return;
    }


    /*
       Crear algunos emojis inmediatamente
       para que el fondo no empiece vacío.
    */

    for (let i = 0; i < 14; i++) {

        setTimeout(
            createFloatingEmoji,
            i * 350
        );

    }


    /*
       Seguir creando emojis constantemente.
    */

    setInterval(
        createFloatingEmoji,
        850
    );

}


/* =========================================================
   SOPORTE PARA DESLIZAR EN MÓVIL
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    function (event) {

        /*
           No activar swipe si el menú está abierto.
        */

        if (
            sidebar &&
            sidebar.classList.contains("open")
        ) {
            return;
        }


        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function (event) {

        if (
            sidebar &&
            sidebar.classList.contains("open")
        ) {
            return;
        }


        touchEndX =
            event.changedTouches[0].screenX;


        handleSwipe();

    },
    {
        passive: true
    }
);


/* =========================================================
   DETECTAR DIRECCIÓN DEL SWIPE
========================================================= */

function handleSwipe() {

    const minimumSwipeDistance = 70;

    const distance =
        touchEndX -
        touchStartX;


    /*
       Swipe hacia la izquierda
       → siguiente página
    */

    if (
        distance <
        -minimumSwipeDistance
    ) {

        nextPage();

    }


    /*
       Swipe hacia la derecha
       → página anterior
    */

    if (
        distance >
        minimumSwipeDistance
    ) {

        previousPage();

    }

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Mostrar la primera página.
        */

        if (pages.length > 0) {

            showPage(0);

        }


        /*
           Iniciar emojis.
        */

        startFloatingEmojis();

    }
);
