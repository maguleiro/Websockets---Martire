//const socket = io();

socket.on('from-server-mensajes', data => {
    render(data.DB_MENSAJES);
});

function render(mensajes){
    const bodyMensajesHTML = mensajes.map((msj)=>{
        return `<span><b>${msj.author}: </b><span>${msj.text}</span></span>`
    }).join('<br>');

    document.querySelector('#historial').innerHTML = bodyMensajesHTML;
}

function enviarMensaje(){
    const inputUser = document.querySelector('#user');
    const inpuContenido = document.querySelector('#contenidoMensaje');

    const mensaje = {
        author: inputUser.value,
        text: inpuContenido.value
    };

    socket.emit('from-client-mensaje', mensaje);
};