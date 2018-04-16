const socket = io();

socket.on('connect', function () {
    $("#msgs").append(socket.id, ' se conectou', '<br>');
    socket.emit('msg', socket.id + ' Me conectei');
});

socket.on('msg', function (msg) {
    msg_dahora(msg, 0);
});


$(function () {
    $("input").keydown(function (key) {
        if (key.keyCode === 13) {
            let msg = $(this).val();
            socket.emit('msg', msg);
            $(this).val('');
            msg_dahora(msg, 1);
        } //if
    });
});


function msg_dahora(msg, tipo) {

    let tipo_msg = '';
    if (tipo == 0) {
        tipo_msg = 'rec';
    } else {
        tipo_msg = 'env';
    }

    let $div_msg = $(`<div class='msg ${tipo_msg}'></div>`);
    let $nome = $(`<p class='nome'>${msg}</p>`);
    let $texto = $(`<p class="texto">${msg}</p>`);

    $div_msg.append($nome);
    $div_msg.append($texto);

    $("#msgs").append($div_msg);
}

function conectou(tipo) {

    let $div_conec = $(`<div class='conectou'></div>`);

    if (tipo == 0) {
        let titulo = 'Nome';
    } else {
        let titulo = 'Você';
    }

    let $iae_krl = $(`<p class='oi'>${titulo} se conectou</p>`);

    $div_conec.append($iae_krl);

    $("#msgs").append($div_msg);
}