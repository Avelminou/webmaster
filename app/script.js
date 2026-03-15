let btnU = document.getElementById("btnU");
let btnD = document.getElementById("btnD");
let btnT = document.getElementById("btnT");
let btnQ = document.getElementById("btnQ");

const pro = document.getElementById('pro');

const bouton = [btnT,btnQ]

bouton.forEach(function(coloBtn, i) {
    coloBtn.onclick = () => {
        btnU.style.background = 'white';
        pro.innerHTML = `
        <iframe src="./app/outils/app${i}.html" frameborder="0"></iframe>
        `;

    }
})

btnU.onclick = () => {
    btnU.style.background = 'rgb(221, 225, 250)';
    location.reload();
}

btnD.onclick = () =>{
    window.location.href = './app/outils/server.html'
}

const btnLesson = document.querySelectorAll('.recent');

btnLesson.forEach(function(lesson, i) {
    lesson.onclick = () => {
        pro.innerHTML = `
            <iframe src="https://avelminou.github.io/webmaster/app/off/lesson${i}.html" frameborder="0"></iframe>
            `;
        }
})