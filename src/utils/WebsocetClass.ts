class WebSocketWithChatId extends WebSocket {
    public chatId:string
    constructor(url:string, chatId:string) {
      super(url);
      this.chatId = chatId;
    }
}
export {WebSocketWithChatId};