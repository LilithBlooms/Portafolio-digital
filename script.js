/* ==========================================
   PORTAFOLIO DIGITAL DE ESPAÑA
   JAVASCRIPT COMPLETO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTOS PRINCIPALES
    ========================================== */

    const pages = Array.from(
        document.querySelectorAll(".book-page")
    );

    const thumbnails = Array.from(
        document.querySelectorAll(".thumbnail")
    );

    const previousButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");

    const currentPageElement =
        document.getElementById("currentPage");

    const totalPagesElement =
        document.getElementById("totalPages");

    const menuButton =
        document.querySelector(".menu-button");

    const closeMenuButton =
        document.getElementById("closeMenu");

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.querySelector(".overlay");

    const bookWrapper =
        document.querySelector(".book-wrapper");

    const book =
        document.querySelector(".book");


    /* ==========================================
       CONFIGURACIÓN INICIAL
    ========================================== */

    let currentPage = 0;

    const totalPages = pages.length;

    if (totalPagesElement) {
        totalPagesElement.textContent = totalPages;
    }


    /* ==========================================
       MOSTRAR UNA PÁGINA
    ========================================== */

    function showPage(index, direction = "next") {

        /* Evitar índices inválidos */

        if (index < 0 || index >= totalPages) {
            return;
        }


        /* Página anterior */

        const oldPage = pages[currentPage];

        /* Nueva página */

        const newPage = pages[index];


        /* Si es la misma página, no hacer nada */

        if (oldPage === newPage) {
            return;
        }


        /* ==========================================
           ANIMACIÓN DE SALIDA
        ========================================== */

        if (oldPage) {

            oldPage.classList.remove(
                "exit-left",
                "exit-right"
            );

            if (direction === "next") {

                oldPage.classList.add("exit-left");

            } else {

                oldPage.classList.add("exit-right");

            }

            setTimeout(() => {

                oldPage.classList.remove(
                    "active",
                    "exit-left",
                    "exit-right"
                );

            }, 700);

        }


        /* ==========================================
           PREPARAR NUEVA PÁGINA
        ========================================== */

        pages.forEach((page, pageIndex) => {

            if (pageIndex !== index &&
                pageIndex !== currentPage) {

                page.classList.remove(
                    "active",
                    "exit-left",
                    "exit-right"
                );

            }

        });


        /* Activar nueva página */

        newPage.classList.remove(
            "exit-left",
            "exit-right"
        );

        newPage.classList.add("active");


        /* Actualizar número */

        currentPage = index;

        updateInterface();


        /* Pequeño efecto de profundidad */

        if (bookWrapper) {

            bookWrapper.style.transform =
                "scale(0.985)";

            setTimeout(() => {

                bookWrapper.style.transform =
                    "scale(1)";

            }, 180);

        }

    }


    /* ==========================================
       ACTUALIZAR INTERFAZ
    ========================================== */

    function updateInterface() {

        /* Número actual */

        if (currentPageElement) {

            currentPageElement.textContent =
                currentPage + 1;

        }


        /* Botón anterior */

        if (previousButton) {

            previousButton.disabled =
                currentPage === 0;

        }


        /* Botón siguiente */

        if (nextButton) {

            nextButton.disabled =
                currentPage === totalPages - 1;

        }


        /* ==========================================
           ACTUALIZAR ÍNDICE
        ========================================== */

        thumbnails.forEach((thumbnail, index) => {

            thumbnail.classList.remove("active");

            const targetPage =
                Number(thumbnail.dataset.page);

            if (!Number.isNaN(targetPage)) {

                if (targetPage === currentPage) {

                    thumbnail.classList.add("active");

                }

            } else if (index === currentPage) {

                thumbnail.classList.add("active");

            }

        });

    }


    /* ==========================================
       PÁGINA SIGUIENTE
    ========================================== */

    function nextPage() {

        if (currentPage < totalPages - 1) {

            showPage(
                currentPage + 1,
                "next"
            );

        }

    }


    /* ==========================================
       PÁGINA ANTERIOR
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
       BOTONES DE NAVEGACIÓN
    ========================================== */

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


    /* ==========================================
       NAVEGACIÓN CON TECLADO
    ========================================== */

    document.addEventListener("keydown", (event) => {

        /* No interferir con inputs */

        const tagName =
            document.activeElement.tagName;

        if (
            tagName === "INPUT" ||
            tagName === "TEXTAREA" ||
            tagName === "SELECT"
        ) {
            return;
        }


        /* Flecha derecha */

        if (
            event.key === "ArrowRight" ||
            event.key === "d" ||
            event.key === "D"
        ) {

            nextPage();

        }


        /* Flecha izquierda */

        if (
            event.key === "ArrowLeft" ||
            event.key === "a" ||
            event.key === "A"
        ) {

            previousPage();

        }


        /* Escape cierra el menú */

        if (event.key === "Escape") {

            closeSidebar();

        }

    });


    /* ==========================================
       SIDEBAR / MENÚ
    ========================================== */

    function openSidebar() {

        if (!sidebar || !overlay) {
            return;
        }

        sidebar.classList.add("open");

        overlay.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeSidebar() {

        if (!sidebar || !overlay) {
            return;
        }

        sidebar.classList.remove("open");

        overlay.classList.remove("active");

        document.body.style.overflow = "";

    }


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


    /* ==========================================
       NAVEGACIÓN DESDE EL ÍNDICE
    ========================================== */

    thumbnails.forEach((thumbnail, index) => {

        thumbnail.addEventListener("click", () => {

            let targetPage =
                Number(thumbnail.dataset.page);


            /* Si no existe data-page */

            if (Number.isNaN(targetPage)) {

                targetPage = index;

            }


            /* Dirección automática */

            const direction =
                targetPage > currentPage
                    ? "next"
                    : "previous";


            showPage(
                targetPage,
                direction
            );


            closeSidebar();


            /* Volver arriba */

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });


    /* ==========================================
       DESLIZAMIENTO TÁCTIL
    ========================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    const minimumSwipeDistance = 60;


    if (book) {

        book.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        book.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleSwipe();

            },
            {
                passive: true
            }
        );

    }


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;


        /* Deslizar hacia la izquierda */

        if (
            swipeDistance <
            -minimumSwipeDistance
        ) {

            nextPage();

        }


        /* Deslizar hacia la derecha */

        if (
            swipeDistance >
            minimumSwipeDistance
        ) {

            previousPage();

        }

    }


    /* ==========================================
       FONDO DE EMOJIS CAYENDO
    ========================================== */

    const emojiBackground =
        document.querySelector(".spain-background");


    const spainEmojis = [

        "🇪🇸",
        "🌞",
        "🎸",
        "💃",
        "🪭",
        "🥘",
        "🏰",
        "🏛️",
        "⚽",
        "🎨",
        "🍊",
        "🌹",
        "👑",
        "✨"

    ];


    function createFallingEmoji() {

        if (!emojiBackground) {
            return;
        }


        const emoji =
            document.createElement("span");


        emoji.classList.add(
            "falling-emoji"
        );


        /* Emoji aleatorio */

        emoji.textContent =
            spainEmojis[
                Math.floor(
                    Math.random() *
                    spainEmojis.length
                )
            ];


        /* Posición horizontal */

        emoji.style.left =
            Math.random() * 100 + "%";


        /* Tamaño */

        const size =
            Math.random() * 1.4 + 0.8;

        emoji.style.fontSize =
            size + "rem";


        /* Duración */

        const duration =
            Math.random() * 8 + 8;

        emoji.style.animationDuration =
            duration + "s";


        /* Retraso */

        emoji.style.animationDelay =
            Math.random() * -10 + "s";


        emojiBackground.appendChild(emoji);


        /* Eliminar después */

        setTimeout(() => {

            emoji.remove();

        }, duration * 1000);

    }


    /* Crear emojis iniciales */

    for (let i = 0; i < 20; i++) {

        createFallingEmoji();

    }


    /* Crear nuevos continuamente */

    setInterval(
        createFallingEmoji,
        1500
    );


    /* ==========================================
       EFECTO DE PARALLAX SUAVE
    ========================================== */

    window.addEventListener(
        "mousemove",
        (event) => {

            /* Solo computadoras */

            if (window.innerWidth < 850) {
                return;
            }


            if (!bookWrapper) {
                return;
            }


            const x =
                event.clientX /
                window.innerWidth -
                0.5;


            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            bookWrapper.style.transform =
                `rotateY(${x * 2}deg)
                 rotateX(${y * -1.5}deg)`;

        }
    );


    /* Restaurar posición */

    if (bookWrapper) {

        bookWrapper.addEventListener(
            "mouseleave",
            () => {

                bookWrapper.style.transform =
                    "rotateY(0deg) rotateX(0deg)";

            }
        );

    }


    /* ==========================================
       EFECTO DE CLIC EN EL LIBRO
    ========================================== */

    if (bookWrapper) {

        bookWrapper.addEventListener(
            "mousedown",
            () => {

                if (window.innerWidth > 850) {

                    bookWrapper.style.transform +=
                        " scale(0.99)";

                }

            }
        );


        bookWrapper.addEventListener(
            "mouseup",
            () => {

                if (window.innerWidth > 850) {

                    setTimeout(() => {

                        bookWrapper.style.transform =
                            "rotateY(0deg) rotateX(0deg)";

                    }, 100);

                }

            }
        );

    }


    /* ==========================================
       INICIALIZACIÓN
    ========================================== */

    pages.forEach((page, index) => {

        page.classList.remove(
            "active",
            "exit-left",
            "exit-right"
        );


        if (index === 0) {

            page.classList.add("active");

        }

    });


    currentPage = 0;

    updateInterface();


    /* ==========================================
       MENSAJE DE DEPURACIÓN
    ========================================== */

    console.log(
        "🇪🇸 Portafolio Digital de España cargado correctamente."
    );

    console.log(
        "📖 Total de páginas:",
        totalPages
    );

});
