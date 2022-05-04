const { AppError } = require("../../errors/AppError.js");

class OutputEvent {
    constructor(event) {
        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.type = event.type;
        this.address = event.address;
        this.start_date = event.start_date;
        this.end_date = event.end_date;
        this.closed = event.closed
    }
}

class EventService {
    constructor(eventRepository, userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    async getEventById(event_id) {
        var event = await this.eventRepository.findById(event_id);
        if (!event) throw new AppError("O evento não existe");
        return new OutputEvent(event);
    }

    async addUserInEvent(user_id, event_id) {
        var user = await this.userRepository.findById(user_id);
        if (!user) throw new AppError("O usuario não existe");

        var event = await this.eventRepository.findById(event_id);
        if (!event) throw new AppError("O evento não existe");

        await user.setEvents(event);
        return new OutputEvent(event);
    }

    async removeUserFromEvent(user_id, event_id) {
        var user = await this.userRepository.findById(user_id);
        if (!user) throw new AppError("O usuario não existe");

        var event = await this.eventRepository.findById(event_id);
        if (!event) throw new AppError("O evento não existe");

        await user.removeEvent(event);
    }

    async getUserEvents(user_id) {
        const user = await this.userRepository.findById(user_id);
        if (!user) throw new AppError("O usuario não existe");
        const events = await user.getEvents()
        return events.map(g => new OutputEvent(e));
    }

    async getAllOpenEvents() {
        var events = await this.eventRepository.findAllOpen();
        if (events.length < 1) {
            throw new AppError("Nenhum evento foi encontrado");
        }
        return events.map(e => new OutputEvent(e));
    }

    async createEvent(user_id, inputEvent) {
        const user = await this.userRepository.findById(user_id);
        if (!user) throw new AppError("O usuario não existe");

        const event = await this.eventRepository.insert(inputEvent);
        if (!event) throw new AppError("Não foi possível criar evento");

        await user.addEvent(event);
        return new OutputEvent(event);
    }

    async updateEvent(event_id, inputEvent) {
        const event = await this.eventRepository.update(event_id, inputEvent);
        if (!event) throw new AppError("O evento não foi atualizado");
        return new OutputEvent(event);
    }

    async deleteEvent(user_id) {
        const deleted = await this.eventRepository.delete(user_id);
        if (!deleted) throw new AppError("O evento não foi deletado");
    }

    async addImage(eventId, path) {
        var event = await this.repository.findById(eventId);
        if (!event) throw new AppError("Evento não existe");
        if (event.image_url) {
            await deleteFile("./tmp/image/" + path);
        }

        await this.repository.update(userId, { image_url: path });
    }
}

module.exports = EventService;
