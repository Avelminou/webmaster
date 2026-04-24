let btnU = document.getElementById("btnU");
let btnD = document.getElementById("btnD");
let btnT = document.getElementById("btnT");
let btnQ = document.getElementById("btnQ");

const pro = document.getElementById("pro");
const nbL = document.getElementById("nbL");
const rngColor = document.getElementById("rngColor");
const container = document.getElementById("histo");

let title = document.title || "Historique";

document.getElementById("pdp").src =
    "https://avelminou.github.io/webmaster/app/image/default.jpg";



// ------------------ boutons outils ------------------

const bouton = [btnT, btnQ];

bouton.forEach((btn, i) => {

    btn.onclick = () => {

        btnU.style.background = "white";

        const url =
            `https://avelminou.github.io/webmaster/app/outils/app${i}.html`;

        pro.innerHTML = "Chargement...";

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

    };

});



// ------------------ accueil ------------------

btnU.style.background = "rgb(221,225,250)";

btnU.onclick = () => location.reload();

btnD.onclick = () => {
    window.location.href = "./app/outils/server.html";
};



// ------------------ historique ------------------


const chiffre = document.querySelectorAll(".recent").length;

nbL.innerText = chiffre;

rngColor.style.width = `${(220 * chiffre) / 100}px`;



// ------------------ chargement dossiers PDF ------------------

async function chargerPDF() {

    container.innerHTML = "Chargement...";

    try {

        const res = await fetch(
            "https://api.github.com/repos/avelminou/webmaster/contents/app/pdf"
        );

        const data = await res.json();

        let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>

body{
margin:0;
padding:15px;
font-family:Arial;
background:#eef2f7;
}

.box{
background:white;
padding:15px;
margin:10px 0;
border-radius:12px;
cursor:pointer;
box-shadow:0 3px 8px rgba(0,0,0,.1);
}

h2{
color:#333;
}

</style>
</head>
<body>

<h2>📚 Mes dossiers</h2>
`;

        data.forEach(f => {

            if (f.type === "dir") {

                html += `
<div class="box" onclick="ouvrirDossier('${f.name}')">
📁 ${f.name}
</div>
`;

            }

        });

        html += `

<script>

async function ouvrirDossier(nom){

document.body.innerHTML = "<h3>Chargement...</h3>";

const rep = await fetch(
'https://api.github.com/repos/avelminou/webmaster/contents/app/pdf/' + nom
);

const files = await rep.json();

let txt = '<h2>📁 ' + nom + '</h2>';

files.forEach(function(f){

if(f.name.endsWith('.pdf')){

txt +=
'<div class="box" onclick="window.location.href=\\\\'https://docs.google.com/gview?embedded=1&url=' + f.download_url + '\\\\'">' +
'📄 ' + f.name +
'</div>';

}

});

document.body.innerHTML = txt;

}

</script>

</body>
</html>
`;

        container.innerHTML =
            `<iframe
        style="width:100%;height:100%;border:0"
        srcdoc="${html.replace(/"/g, "&quot;")}">
        </iframe>`;

    }

    catch {

        container.innerHTML =
            `<iframe src="./app/all.html" frameborder="0"></iframe>`;

    }

}

await chargerPDF();