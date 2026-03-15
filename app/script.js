let btnU = document.getElementById("btnU");
let btnD = document.getElementById("btnD");
let btnT = document.getElementById("btnT");
let btnQ = document.getElementById("btnQ");

const pro = document.getElementById('pro');
const nbL = document.getElementById('nbL');

const bouton = [btnT, btnQ]

bouton.forEach(function (coloBtn, i) {

    coloBtn.onclick = () => {

        btnU.style.background = 'white';

        const url = `https://avelminou.github.io/webmaster/app/outils/app${i}.html`;

        fetch(url)
            .then(() => {
                pro.innerHTML = `
            <iframe src="${url}" frameborder="0"></iframe>
            `;
            })
            .catch(() => {
                pro.innerHTML = `
            <iframe src="./app/all.html" frameborder="0"></iframe>
            `;
            });

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


const lessons = [
    "Balises de base",
    "Les titres HTML",
    "Les paragraphes",
    "Les liens",
    "Les images"
];

lessons.forEach((title, i) => {

    const recent = document.createElement("div");
    recent.className = "recent";

    recent.innerHTML = `
<img src="./app/image/icons8-historique-100.png" width="30">
<b>&nbsp;&nbsp;${title}</b>
`;

    recent.onclick = async () => {

        const url = `https://avelminou.github.io/webmaster/app/off/lesson${i}.html`;

        pro.innerHTML = "Chargement...";

        try {

            const res = await fetch(url);

            if (!res.ok) throw new Error();

            pro.innerHTML = `
<iframe src="${url}" frameborder="0"></iframe>
`;

        } catch {

            pro.innerHTML = `
<iframe src="./app/all.html" frameborder="0"></iframe>
`;

        }

    };

    container.appendChild(recent);

});

const chifre = document.querySelectorAll('.recent').length;

nbL.innerText = chifre;