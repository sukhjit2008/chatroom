

class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML=''
    }
    render(data){
    const now=dateFns.distanceInWordsToNow(
        data.created_at.toDate(),{
            addSuffix:true
        }
    )
    const username = data.username[0].toUpperCase()+data.username.slice(1);
    const html=`
    <li class="list-group-item">
    <span class="username">${username}</span>:
    <span class="message">${data.message}</span>
    <div class="time">${now}</div>
    </li>
    `
    this.list.innerHTML+= html;
    }
    
}