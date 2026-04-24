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

                pro.innerHTML =
                    `<iframe src="${url}" frameborder="0"></iframe>`;

            })
            .catch(() => {

                pro.innerHTML =
                    `<iframe src="./app/all.html" frameborder="0"></iframe>`;

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

nbL.innerText = "0";
rngColor.style.width = "0px";



// ------------------ chargement dossiers PDF ------------------

async function chargerPDF() {

    container.innerHTML = "Chargement...";

    try {

        const baseURL =
        "https://api.github.com/repos/avelminou/webmaster/contents/app/pdf";

        const res = await fetch(baseURL);
        const folders = await res.json();

        container.innerHTML = "<h3>📚 Mes dossiers</h3>";

        folders.forEach(folder => {

            if (folder.type === "dir") {

                const div = document.createElement("div");
                div.className = "box";
                div.innerHTML = "📁 " + folder.name;

                div.onclick = () => openFolder(folder.name);

                container.appendChild(div);
            }

        });

    } catch (e) {

        container.innerHTML = "❌ Erreur chargement";

    }
}



async function openFolder(folderName) {

    container.innerHTML = "Chargement...";

    try {

        const url =
        "https://api.github.com/repos/avelminou/webmaster/contents/app/pdf/" + folderName;

        const res = await fetch(url);
        const files = await res.json();

        container.innerHTML = `
            <h3>📁 ${folderName}</h3>
            <button onclick="chargerPDF()">⬅ Retour</button>
            <br><br>
        `;

        files.forEach(file => {

            const name = file.name.toLowerCase();

            // PDF + DOCX uniquement
            if (name.endsWith(".pdf") || name.endsWith(".docx")) {

                const div = document.createElement("div");
                div.className = "box";

                div.innerHTML = (name.endsWith(".pdf") ? "📄 " : "📝 ") + file.name;

                div.onclick = () => openFile(file.download_url);

                container.appendChild(div);
            }

        });

    } catch (e) {

        container.innerHTML = "❌ Erreur dossier";

    }
}



function openFile(url) {

    const googleViewer =
    "https://docs.google.com/gview?embedded=1&url=" + url;

    pro.innerHTML = `
        <iframe 
            src="${googleViewer}" 
            style="width:100%;height:100%;border:0">
        </iframe>
    `;
}


await chargerPDF();
