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

document.getElementById('pdp').src = 'https://avelminou.github.io/webmaster/app/image/default.jpg';

const lessons = [
    "Balises de base",
    "Images et médias",
];

lessons.forEach((title, i) => {

    const recent = document.createElement("div");
    recent.className = "recent";

    recent.innerHTML = `
<img src="./app/image/icons8-historique-100.png" width="30">
<b>&nbsp;&nbsp;${title}</b>
`;

recent.onclick = async () => {

    pro.innerHTML = "Chargement...";

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
</style>
</head>
<body>

<h2>📚 Mes dossiers</h2>
`;

        data.forEach(f => {

            if (f.type == "dir") {

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

let txt = "<h2>📁 " + nom + "</h2>";

files.forEach(function(f){

if(f.name.endsWith('.pdf')){

txt +=
'<div class="box" onclick="window.location.href=\\'https://docs.google.com/gview?embedded=1&url=' + f.download_url + '\\'">' +
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

        pro.innerHTML =
        '<iframe style="width:100%;height:100%;border:0" srcdoc="' +
        html.replace(/"/g, '&quot;') +
        '"></iframe>';

    } catch {

        pro.innerHTML =
        '<iframe src="./app/all.html" frameborder="0"></iframe>';

    }

};

container.appendChild(recent);


});

const chifre = document.querySelectorAll('.recent').length;

nbL.innerText = chifre;

rngColor.style.width = `${ (220 * chifre) / 100 } px`;