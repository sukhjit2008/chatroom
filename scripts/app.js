
const chatList = document.querySelector('.chat-list');
const newChatForm=document.querySelector('.new-chat');
const newChatName=document.querySelector('.new-name');
const nameUpdateMsg=document.querySelector('.update-mssg');
const chatRooms = document.querySelector('.chat-rooms');


newChatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    chatroom.addChat(newChatForm.message.value.trim()).then(()=>{
        newChatForm.reset()
    })
    .catch(error=>{
        console.log(error);
    })
})

//update the username
newChatName.addEventListener('submit',(e)=>{
    e.preventDefault();
    const newName=newChatName.name.value.trim();
    chatroom.nameUpdated(newName);
    newChatName.reset();
    nameUpdateMsg.innerText=`Your name was updated to ${newName}`
     setTimeout(()=>{
        nameUpdateMsg.innerText=''
     },3000)
})

//update the room
chatRooms.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
        chatUi.clear()
        chatroom.roomUpdated(e.target.getAttribute('id'))
        chatroom.getChats((data)=>{
            chatUi.render(data)
            
            })
    }
});

const username= localStorage.username?localStorage.username:'No name'
const chatUi= new ChatUI(chatList)
const chatroom = new Chatroom('general',username)
chatroom.getChats((data)=>{
    chatUi.render(data)
    
    })