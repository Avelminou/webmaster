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

        files.forEach(file => {

            // 🔥 afficher TOUS les fichiers
            let div = document.createElement("div");
            div.className = "box";

            let ext = file.name.split(".").pop().toLowerCase();

            div.innerText =
                (ext === "pdf" ? "📄 " :
                ext === "docx" ? "📝 " :
                "📦 ") + file.name;

            div.onclick = () => openFile(file);

            container.appendChild(div);
        });

    } catch (e) {
        console.log(e);
        container.innerHTML = "❌ Erreur dossier";
    }
}

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.2;

function openFile(file) {

    const url = file.download_url;
    const ext = file.name.split(".").pop().toLowerCase();

    // 🔥 PDF Viewer page par page
    if (ext === "pdf") {

        pro.innerHTML = `
            <div style="text-align:center">
                <canvas id="pdf-canvas"></canvas>

                <div style="margin-top:10px">
                    <button onclick="prevPage()">⬅</button>
                    <span id="page-num"></span>
                    <button onclick="nextPage()">➡</button>
                </div>
            </div>
        `;

        loadPDF(url);
    }

    else {
        pro.innerHTML = `
            <div style="padding:20px">
                <a href="${url}" target="_blank">📥 Ouvrir / Télécharger</a>
            </div>
        `;
    }
            }


function loadPDF(url) {

    const canvas = document.getElementById("pdf-canvas");
    const ctx = canvas.getContext("2d");

    pdfjsLib.getDocument(url).promise.then(pdf => {

        pdfDoc = pdf;
        pageNum = 1;

        renderPage(pageNum);
    });

    function renderPage(num) {

        pageRendering = true;

        pdfDoc.getPage(num).then(page => {

            const viewport = page.getViewport({ scale: scale });

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            const renderTask = page.render(renderContext);

            renderTask.promise.then(() => {
                pageRendering = false;

                document.getElementById("page-num").textContent =
                    `Page ${pageNum} / ${pdfDoc.numPages}`;

                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });
    }

    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    window.nextPage = function () {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        queueRenderPage(pageNum);
    };

    window.prevPage = function () {
        if (pageNum <= 1) return;
        pageNum--;
        queueRenderPage(pageNum);
    };
                }



chargerPDF();
