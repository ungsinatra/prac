

export type membersChatType = {
    userId:string,
    name:string,
}

export type chatMessageType = {
    _id:string,
    text: string,
    senderId: string,
    timestamp: string,
}



export type ChatsType = {
    _id:string,
    type:'group'| 'private' | 'channel',
    members:membersChatType[],
    messages:chatMessageType[],
    created:string,
    updated:string,
    lastMessage:string,
    unreadCount:null | number,
}