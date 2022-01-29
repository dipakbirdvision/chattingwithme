const socket = io('http://localhost:8000')
let name;
do{
    name = prompt("Enter Your name...")
}while(!name)

socket.emit('new-user-joined',name)

socket.on('user-joined',name=>{
    appendMessage(`${name} joined the chat`, 'incoming')
})

socket.on('recieve',data=>{
    appendMessage(`${data.name}: ${data.message}`, 'incoming')
})

socket.on('left',name=>{
    appendMessage(`${name} left the chat`, 'incoming')
})

let input_box = document.querySelector('#input-box')
let messageArea = document.querySelector('.message__area')
const form = document.getElementById('form')
var audio = new Audio('Notification.mp3')

function appendMessage(msg, type) {
    console.log(type);
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup = `<p>${msg}</p>`
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    if(type=='incoming'){
        audio.play()
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg = input_box.value;
    appendMessage(`You: ${msg}`, 'outgoing')
    socket.emit('send',msg);
    input_box.value='';
})