

class Chatroom{
    constructor(room,username){
        this.room=room;
        this.username=username;
        this.chats=db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        const now = new Date();
        const chat ={
            message,
            room:this.room,
            username:this.username,
            created_at:firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat)
        return response;
    }
    getChats(callback){
       this.unsub= this.chats
        .orderBy('created_at')
        .where('room','==',this.room)
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type==='added'){
                    callback(change.doc.data())
                }
            })
        })
    }
    nameUpdated(username){
        this.username=username;
        localStorage.setItem('username',username)
    }
    roomUpdated(room){
        this.room=room;
        console.log('room updated');
         if(this.unsub){
             this.unsub();
         }
    }
}



 