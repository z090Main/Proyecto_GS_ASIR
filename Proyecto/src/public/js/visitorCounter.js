const $form = $('#contador');
const $contador = $('#count');
const $ID = $('#productID');

socket.emit('Ncontador', $contador.val(),$ID.val());