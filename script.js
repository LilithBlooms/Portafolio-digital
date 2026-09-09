const papers = document.querySelectorAll(".paper");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const openBookBtn = document.getElementById("openBook");

const pageIndicator =
  document.getElementById("pageIndicator");

let currentPaper = 0;


/* =========================
   CONFIGURAR LAS HOJAS
========================= */

function setupBook() {

  papers.forEach((paper, index) => {

    paper.style.zIndex =
      papers.length - index;

  });

}


/* =========================
   AVANZAR
========================= */

function nextPage() {

  if (currentPaper < papers.length) {

    const paper =
      papers[currentPaper];

    paper.classList.add("flipped");

    /* La hoja queda detrás */
    paper.style.zIndex =
      currentPaper + 1;

    currentPaper++;

    updateControls();

  }

}


/* =========================
   RETROCEDER
========================= */

function previousPage() {

  if (currentPaper > 0) {

    currentPaper--;

    const paper =
      papers[currentPaper];

    paper.classList.remove("flipped");

    /* La hoja vuelve arriba */
    paper.style.zIndex =
      papers.length - currentPaper;

    updateControls();

  }

}


/* =========================
   CONTROLES
========================= */

function updateControls() {

  prevBtn.disabled =
    currentPaper === 0;

  nextBtn.disabled =
    currentPaper === papers.length;


  if (currentPaper === 0) {

    pageIndicator.textContent =
      "📕 Portada";

  }

  else if (
    currentPaper === papers.length
  ) {

    pageIndicator.textContent =
      "✨ Fin";

  }

  else {

    const page =
      currentPaper * 2;

    pageIndicator.textContent =
      `📖 Página ${page}`;

  }

}


/* =========================
   EVENTOS
========================= */

nextBtn.addEventListener(
  "click",
  nextPage
);

prevBtn.addEventListener(
  "click",
  previousPage
);


openBookBtn.addEventListener(
  "click",
  nextPage
);


/* =========================
   TECLADO
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "ArrowRight") {
      nextPage();
    }

    if (event.key === "ArrowLeft") {
      previousPage();
    }

  }
);


/* =========================
   SWIPE PARA CELULAR
========================= */

let touchStartX = 0;

document.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event.changedTouches[0].screenX;

  }
);


document.addEventListener(
  "touchend",
  (event) => {

    const touchEndX =
      event.changedTouches[0].screenX;

    const difference =
      touchEndX - touchStartX;


    if (difference < -60) {

      nextPage();

    }

    if (difference > 60) {

      previousPage();

    }

  }
);


/* =========================
   INICIAR
========================= */

setupBook();

updateControls();
