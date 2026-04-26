let btnU = document.getElementById("btnU");
let btnD = document.getElementById("btnD");
let btnT = document.getElementById("btnT");
let btnQ = document.getElementById("btnQ");

const pro = document.getElementById('pro');
const nbL = document.getElementById('nbL');

let rngColor = document.getElementById('rngColor');

const bouton = [btnT, btnQ]


bouton.forEach(function (coloBtn, i) {
    coloBtn.onclick = () => {
        btnU.style.background = 'white';
        const url = `https://avelminou.github.io/webmaster/app/outils/app${i}.html`;

        // Création du lien de téléchargement
        const link = document.createElement('a');
        link.href = url;
        link.download = `app${i}.html`; // Nom du fichier lors du téléchargement
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});


btnU.style.background = 'rgb(221, 225, 250)';
btnU.onclick = () => {
    btnU.style.background = 'rgb(221, 225, 250)';
    location.reload();
}

btnD.onclick = () => {
    window.location.href = './app/outils/server.html'
}

const container = document.getElementById("histo");

document.getElementById('pdp').src = 'https://avelminou.github.io/webmaster/app/image/default.jpg';

const lessons = [
    "Balises de base HTML",
    "Documents",
];

lessons.forEach((title, i) => {
    const recent = document.createElement("div");
    recent.className = "recent";
    recent.innerHTML = `
        <img src="./app/image/icons8-historique-100.png" width="30">
        <b>&nbsp;&nbsp;${title}</b>
    `;

    recent.onclick = () => {
        const url = `https://avelminou.github.io/webmaster/app/off/lesson${i}.html`;
        
        const link = document.createElement('a');
        link.href = url;
        // On utilise le titre de la leçon pour nommer le fichier téléchargé
        link.download = `${title.replace(/\s+/g, '_')}.html`; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    container.appendChild(recent);
});

const chifre = document.querySelectorAll('.recent').length;

nbL.innerText = chifre;

rngColor.style.width = `${(220 * chifre) / 100}px`;
