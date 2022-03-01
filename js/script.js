$(document).ready(() => {
    var socket = io();
    var name;

    $('div#game').hide();

    $('#name_form').submit((event) => {
        event.preventDefault();
        if($('#name').val() === ''){
            alert('Please select a name');
        }else{
            socket.emit('connect_to_game', $('#name').val());
            name = $('#name').val();
            $('#name_form').hide();
            $('div#game').show();
        }
    });

    $('#chat_form').submit((event) => {
        event.preventDefault();
        if($('#chat_input').val() !== ''){
            socket.emit('answer', {name: name, chat: $('#chat_input').val()});
        }else{
            alert('Please select a word');
        }
    });

    socket.on('word', (data) => {
        $('h1').text(data.word);
    });

    socket.on('join', (data) => {
        $('#chatbox').append(`<p> user ${data.name} has join </p>`);
    });

    socket.on('chat', (data) => {
        $('#chatbox').append(`<p> ${data.name} : ${data.chat} </p>`);
    });

    socket.on('result', (data) => {
        $('#chatbox').append(`<p><span id="green">${data.name} won! "socket" is the exact word!</span></p>`);
    });

});