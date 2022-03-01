var express = require("express");
var app = express();

app.use(express.static(__dirname + "/views"));
/* Handles the css and js requests */
app.use(express.static('stylesheets'));
app.use('/stylesheets', express.static('stylesheets'));
app.use(express.static('js'));
app.use('/js', express.static('js'));

const server = app.listen(2000, () => {console.log("Port: 2000")});
const io = require('socket.io')(server);

app.get('/', (request, response) => {
    response.render('index');
});

let guess_word = 's _ _ e _';
let word = 'socket';
let game_end = false;

io.on('connection', (socket) => {
    socket.on('connect_to_game', (data) => {
        io.emit('join', {name: data});
        socket.emit('word', {word: guess_word});
    });
    socket.on('answer', (data) => {
        io.emit('chat', {name: data.name, chat: data.chat});
        if(!game_end && data.chat.toLowerCase() === word){
            io.emit('result', {name: data.name});
            game_end = true;
        }
    });
});