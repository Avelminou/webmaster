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

        container.innerHTML = "<h3>📚 Mes dossiers</h3>";

        data.forEach(f => {

            if (f.type === "dir") {

                const div = document.createElement("div");
                div.className = "box";

                div.innerHTML = `📁 ${f.name}`;

                div.onclick = async () => {

                    container.innerHTML = "Chargement...";

                    const rep = await fetch(
                        "https://api.github.com/repos/avelminou/webmaster/contents/app/pdf/" + f.name
                    );

                    const files = await rep.json();

                    container.innerHTML = `<h3>📁 ${f.name}</h3>`;

                    files.forEach(file => {

                        if (file.name.endsWith(".pdf")) {

                            const d = document.createElement("div");
                            d.className = "box";

                            d.innerHTML = "📄 " + file.name;

                            d.onclick = () => {
                                window.location.href =
                                "https://docs.google.com/gview?embedded=1&url=" +
                                file.download_url;
                            };

                            container.appendChild(d);
                        }

                    });

                };

                container.appendChild(div);
            }

        });

    } catch (e) {

        container.innerHTML = "❌ Erreur de chargement";

    }
}

await chargerPDF();