//client

    const socket = io();

    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');
    
    const $userEmail = $('#email');

    //capture events
    $messageForm.submit( event => {
        event.preventDefault();
        socket.emit('send message', $messageBox.val(),$userEmail.val());
        $messageBox.val('');
    });

    //Listen events send from the server
    socket.on('new message', function (data,username) {
        $chat.append(username + ': ' + data + '<br/>');
    });