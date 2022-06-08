$(document).ready(function () {

    // Código para adicionar uma campanha ao site de doações
    var campanha = "campaign";

    function adicionarCampanha() {
        document.getElementById(campanha).innerHTML += `<div class="row" style="background-color: #FEEF10;"><div class="col-sm-3 col-ms-12"><img src="img/youtube.png"></div><div class="col-sm-9 col-ms-12 text-black"><h1> Título da campanha </h1><p> descrição da campanha </p></div></div>`;
    };


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

    function scrollDoacoes() {
        element = document.getElementsById("linhaDoacoes")[0];
        element.scrollIntoView();
    }
})

api = 'http://127.0.0.1:3022'


$(document).ready(() => {
    users.list();
});


var users = {

    list() {
        $.ajax({
            url: api + '/readColaborador',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="insert" onclick="user.insert()">Inserir</div>';
                data.forEach(element => {
                    tx += '<div class="user">';
                    tx += '<div style="display: inline-block;">' + element.Nome + '</div>';
                    tx += '<div class="actions">';
                    tx += '<div class="action" onclick="user.update(' + element.CPF + ',\'' + element.Nome + '\')">Editar</div>';
                    tx += '<div class="action" onclick="user.delete(' + element.CPF + ')">Excluir</div>';
                    tx += '</div>';
                    tx += '</div>';
                });
                $('#main').html(tx);
            }
        });

    }

};

var user = {

    insert() {
        var NomeColab = prompt('Digite o nome:');
        var CPFColab = prompt('Digite o CPF:');
        var TipoColab = 'fodido';
        if (CPFColab) {
            $.ajax({
                type: 'POST',
                url: api + '/register',
                data: {
                    Nome: `${NomeColab}`,
                    CPF: `${CPFColab}`,
                    Tipo: `${TipoColab}`,
                }
            }).done(function () {
                users.list();
                console.log("Chamei o user.list dps do insert");
            });
        }
    },

    update(userId, oldTitle) {

        var title = prompt('Digite o novo nome:', oldTitle);
        if (title) {
            if (title.trim() != '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/updateColaborador',
                    data: { title: title, userId: userId },
                }).done(function () {
                    users.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },

    delete(userId) {

        if (confirm('Confirma a exclusão?')) {
            $.ajax({
                type: 'POST',
                url: api + '/deleteColaborador',
                data: { userId: userId },
            }).done(function () {
                users.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
        }
    },

}