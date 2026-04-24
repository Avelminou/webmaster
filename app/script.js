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

        const res = await fetch(
        "https://api.github.com/repos/avelminou/webmaster/contents/app/pdf"
        );

        const data = await res.json();

        container.innerHTML = "<h3>📚 Cours récents</h3>";

        let count = 0;

        data.forEach(folder => {

            if (folder.type === "dir") {

                count++;

                let div = document.createElement("div");
                div.className = "box";
                div.innerText = "📁 " + folder.name;

                div.onclick = () => openFolder(folder.name);

                container.appendChild(div);
            }

        });

        if (count === 0) {
            container.innerHTML += "<p>📭 Aucun cours disponible</p>";
        }

        nbL.innerText = count;
        rngColor.style.width = `${count * 20}px`;

    } catch (e) {

        container.innerHTML = "❌ Erreur chargement";

        console.log(e);

    }
}

async function openFolder(name) {

    container.innerHTML = "Chargement...";

    try {

        const url =
        "https://api.github.com/repos/avelminou/webmaster/contents/app/pdf/" + name;

        const res = await fetch(url);
        const files = await res.json();

        container.innerHTML = `<h3>📁 ${name}</h3>`;

        if (!files || files.length === 0) {

            container.innerHTML += `
                <p style="color:red">📭 Dossier vide</p>
                <button onclick="chargerPDF()">⬅ Retour</button>
            `;

            return;
        }

        let found = false;

        files.forEach(file => {

            let n = file.name.toLowerCase();

            if (n.endsWith(".pdf") || n.endsWith(".docx")) {

                found = true;

                let div = document.createElement("div");
                div.className = "box";

                div.innerText =
                    n.endsWith(".pdf") ? "📄 " : "📝 " + file.name;

                div.onclick = () => openFile(file.download_url);

                container.appendChild(div);
            }

        });

        if (!found) {

            container.innerHTML += `
                <p style="color:orange">⚠ Aucun PDF ou DOCX</p>
            `;
        }

    } catch (e) {

        log("ERROR OPEN FOLDER");
        log(e);

        container.innerHTML = "❌ Erreur dossier";

    }
}

function openFile(url) {

    let viewer =
    "https://docs.google.com/gview?embedded=1&url=" + url;

    pro.innerHTML = `
        <iframe 
        src="${viewer}" 
        style="width:100%;height:100%;border:0">
        </iframe>
    `;
}

chargerPDF();
