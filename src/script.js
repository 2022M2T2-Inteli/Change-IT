



// Função para aplicar reuso da navbar e do final
$(document).ready(function () {
    $("#navbar").load("menu.html", function () {
        $("#btn").on('click', showmenu);
    });
});

function showmenu() {
    navigator.classList.toggle('active');
}