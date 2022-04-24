
class MessageService {
    constructor(matchRepository, messageRepository){
        this.matches = matchRepository;
        this.messages = messageRepository;
    }
}

export { MessageService }