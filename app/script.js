let btnU = document.getElementById("btnU");
let btnD = document.getElementById("btnD");
let btnT = document.getElementById("btnT");
let btnQ = document.getElementById("btnQ");

const pro = document.getElementById('pro');

const bouton = [btnD,btnT,btnQ]

bouton.forEach(function(coloBtn, i) {
    coloBtn.onclick = () => {
        btnU.style.background = 'white';
        pro.innerHTML = `
        <iframe src="./app/off/app${i}.html" frameborder="0"></iframe>
        `;

    }
})

btnU.onclick = () => {
    btnU.style.background = 'rgb(221, 225, 250)';
    location.reload();
}