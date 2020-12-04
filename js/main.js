// Pontos dátum visszaadása.
const getCurrentTime = (startTime) => {   //Adhatok neki startTime paramétert, ha nem adok, akkor az aktuális időponttól indul
    // 1. Létrehozok egy dátum típusú objektumot.
    const currentDate = startTime ? new Date(startTime) : new Date(); // Ha a startTime definiálva van, a new Date-et elindítom a startTime-mal, ha nem, akkor sima new Date

    // 2. Kiolvasom a szükséges részeket a dátum objektumból.
    console.log(currentDate);
    const year = currentDate.getFullYear();
    const month = padNumbers(currentDate.getMonth() + 1);
    const day = padNumbers(currentDate.getDate());
    const hours = padNumbers(currentDate.getHours());
    const minutes = padNumbers(currentDate.getMinutes());
    const seconds = padNumbers(currentDate.getSeconds());

    // Visszaadom a formázott időpontot.
    return `${[year, month, day].join('-')} ${[hours, minutes, seconds].join(':')}`;

};

// Tíznél kisebb számok kiegészítése 0-val.
const padNumbers = (num) => {
    return num < 10 ? `0${num}` : `${num}`; //Ternary operator: Ha a feltétel igaz, akkor a ? utáni értéket adja vissza, ha nem igaz, akkor a : utáni (else rész) Template literal -> stringgé alakít
}    
    //A fenti sor ugyanez, csak leegyszerűsítve:
    // if (num < 10) {
    //     return '0' + num;  // Ha kisebb a szám, mint 10, kell elé 0, stringben akarom megkapni (szám + string = stringben a szám) 
    // } else {               // Ha nem igaz a feltétel, akkor sima számmal térek vissza (üres string + szán = stringben a szám)       
    //     return '' + num;
    // }

// Meghívom a getCurrentTime függvényt másodpercenként.

setInterval(() => { // Így érem el, hogy számoljon is az óra. Ennyi időközönként frissítse a fv-t.
    const time = getCurrentTime();
    console.log(time);
    const clockFace = document.querySelector('.clock-face'); // Kiválasztjuk a .clock-face osztályú html elemet
    clockFace.textContent = time; // A ClockFace változóba lementett elem tartalma a time változó lesz    
}, 1000 ); // A setInterval első paramétere egy fv., a második, h milyen időközönként fusson le. 1000 = 1000 ezredmp. = 1 mp -> 1 mp-enként lefut ez a fv.

// Stopperóra

let stopperTime = 0;
let stoperIsRunning = false;
setInterval( () => {
    if (!stopperIsRunning) {
        return; // Ha a stopper nem fut, akkor ne csináljon semmit
    }

    stopperTime++;
    const seconds = padNumbers(stopperTime % 60);
    const minutes = padNumbers(Math.floor(stopperTime / 60) % 60); // Math.floor: Lekerekítés, hogy a tizedesjegy ne legyen benne (a Math.ceiling felfele kerekít)
    const hours = padNumbers(Math.floor(stopperTime / 3600));
    const time = `${[hours, minutes, seconds].join(':')}`;
    const stopperFace = document.querySelector('.stopper-face');
    stopperFace.textContent = time;
}, 1000)

// pair game-hez segítség
// 0-ról induljon az időzítő, ami számlálja a játék menetét, ha véget ér a játék, le kell nullázni.
// változó, amibe számoljuk a mp-eket, mindig növelünk rajta
// let gameTime = 0;
// setInterval( () => {
//    gameTime++;
//}, 1000);

document.querySelector('.start-stop-btn').addEventListener('click', () => {
    if (stopperIsRunning) {
        stopperIsRunning = false; // Ha fut, akkor ne fusson
        stopperTime = 0; // Gomb lenullázza az órát
    } else {    // Ellenkező esetben (ha nem fut)
        stopperIsRunning = true; // Induljon el a stopper
    }
})