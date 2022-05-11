
// Função para aplicar reuso da navbar e do final
$(document).ready(function () {
    $("#header").load("reuso.html", function () {
        $("#btn").on('click', showmenu);
    });
});
function shownavbar() {
    navigator.classList.toggle('active');
}