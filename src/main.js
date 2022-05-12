// Sticky Navigation

let navbar = $(".navbar");

$(window).scroll(function () {
    let oTop = $(".section-2").offset().top - window.innerHeight;
    if ($(window).scrollTop() > oTop) {
        navbar.addClass("sticky");
    } else {
        navbar.removeClass("sticky");
    }
});

// Animação Contagem

let nCount = function (selector) {
    $(selector).each(function () {
        $(this).animate({
            Counter: $(this).text()
        }, {

            duration: 4000,
            easing: "swing",
            step: function (value) {
                $(this).text(Math.cell(value));
            }

        })
    });
}

let a = 0;
$(window).scroll(function () {
    let oTop = $(".numbers").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() >= oTop) {
        a++;
        nCount(".rect > h1");
    }
});




// Função para aplicar reuso da navbar e do final
$(document).ready(function () {
    $("#header").load("reuso.html", function () {
        $("#btn").on('click', showmenu);
    });
});
function shownavbar() {
    navigator.classList.toggle('active');
}