const socket = io();
let global_nickname = '';
//Travar div


$(function () {
    $("#input").prop("disabled", true);
});



socket.on('connect', function () {

    let msg = {
        'tipo': 0,
        'nick': global_nickname
    }
    conectou(msg);
});

socket.on('msg', function (msg) {
    msg_dahora(msg, 0);
});

$(function () {
    $("#nickname").keydown(function (key) {
        if (key.keyCode === 13) {

            let nome = $(this).val();
            console.log('Nome: ' + nome);
            if (nome.length > 2) {
                global_nickname = nome;
                $(this).prop("disabled", true);
                $("#input").prop("disabled", false);

                //CONECTAR AQUI
            }//if
        } //if
    });
});


$(function () {
    $("#input").keydown(function (key) {
        if (key.keyCode === 13) {
            let texto = $(this).val();
            let msg = {
                'nick': global_nickname,
                'texto': texto
            }

            texto = sanetize(texto);

            if (texto) {
                socket.emit('msg', msg);
                $(this).val('');
                msg_dahora(msg, 1);
            }
        } //if
    });
});

$(function(){

    console.log('Func');
    $("#input").keydown(function (key) {

        let txt_input = $(this).val();

        if(txt_input.length > 80){
            console.log('Maior')
            txt_input = txt_input.substring(0, 75);
            $(this).val(txt_input);
        }
    });
});

function msg_dahora(msg, tipo) {

    let tipo_msg = '';
    if (tipo == 0) {
        tipo_msg = 'rec';
    } else {
        tipo_msg = 'env';
    }

    let nick = msg.nick;
    let texto = msg.texto;

    let $div_msg = $(`<div class='msg ${tipo_msg}'></div>`);
    let $nome = $(`<p class='nome'>${nick}</p>`);
    let $texto = $(`<p class="texto">${texto}</p>`);

    $div_msg.append($nome);
    $div_msg.append($texto);

    $("#msgs").append($div_msg);


    let global_chat = document.querySelector(".chat");

    let alt = global_chat.scrollHeight;
    global_chat.scrollTo({ top: alt })

    console.log('Altura: ' + alt);

}

function conectou(tipo) {

    let $div_conec = $(`<div class='conectou'></div>`);
    let titulo = '';

    if (tipo == 0) {
        titulo = 'Nome';
    } else {
        titulo = 'Você';
    }

    let $iae_krl = $(`<p class='oi'>${titulo} se conectou</p>`);

    $div_conec.append($iae_krl);
    $("#msgs").append($div_conec);
}


function sanetize(stg) {
    stg = stg.trim();
    return stg;
}