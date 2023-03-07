const X_klass = 'x';
const CIRCLE_klass = 'circle';

const VINST_COMBO = [

  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [3, 4, 5],
  [1, 4, 7],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6]]

let bytTur;
const rutor = document.querySelectorAll('[ruta-cell]');
const spelPlan = document.querySelector("#spelplan");
const vinstMeddelandeText = document.querySelector('[ruta-text]')
const vinstMeddelande = document.getElementById('vinstMeddelande')
const restartButton = document.getElementById('restart')


// STARTA SPELET FUNKTION, VÄRDE FÖR ATT BYTA TUR

strataSpelet();


restartButton.addEventListener('click', strataSpelet)

//anropa startaspelet med restartknapp

function strataSpelet() {
  bytTur = false;

  rutor.forEach(ruta => {
    ruta.classList.remove(X_klass)
    ruta.classList.remove(CIRCLE_klass)
    ruta.removeEventListener('click', handleClick)
    ruta.addEventListener("click", handleClick, {once: true})
  })
  setHover();
  vinstMeddelande.classList.remove('visa')
}

function placeMark(ruta, nuvarandeKlass) {
  ruta.classList.add(nuvarandeKlass)
}

function bytaTur() {
  bytTur = !bytTur;
}

function setHover() {

  spelPlan.classList.remove(X_klass)
  spelPlan.classList.remove(CIRCLE_klass)

  if (bytTur) {
    spelPlan.classList.add(CIRCLE_klass)
  } else {
    spelPlan.classList.add(X_klass)
  }
}

function avslutaSpelet(oavgjort) {
  if (oavgjort) {
    vinstMeddelandeText.innerText = 'TIE'
  } else {
    vinstMeddelandeText.innerText = `${bytTur ? 'O' : 'X'} WINS!`
  }

  vinstMeddelande.classList.add('visa')
}

function oavgjortSpel() {
  // Destructuring
  return [...rutor].every(ruta => {
    return ruta.classList.contains(X_klass) || ruta.classList.contains(CIRCLE_klass)
  })
}

function handleClick(e) {

  const ruta = e.target
  const nuvarandeKlass = bytTur ? CIRCLE_klass : X_klass;

  // PLACERA UT X OCH O
  placeMark(ruta, nuvarandeKlass);

  // RÄKNA UT VINNARE
  if (kollaVinst(nuvarandeKlass)) {
    console.log("vinnare!")
    avslutaSpelet(false)
    // avsluta

  } else if (oavgjortSpel()) {
    avslutaSpelet(true)

  } else {
    // BYTATUR
    bytaTur()
    // HOOVER EFFEKT
    setHover()
  }
}

function kollaVinst(nuvarandeKlass) {
  return VINST_COMBO.some(combo => {
    return combo.every(index => {
      return rutor[index].classList.contains(nuvarandeKlass)
    })
  })


}
