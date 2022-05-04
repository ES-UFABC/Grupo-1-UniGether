const Event = require("../models/Events.js");

class EventRepository {
    async insert(event) {
        return await Event.create(event);
    }

    async findById(id) {
        const event = await Event.findByPk(id);
        return event;
    }

    async findAll() {
        return Event.findAll();
    }

    async findAllOpen() {
        return Event.findAll({where:{closed: false}});
    }

    async findAllUserEvents(user_id){
        await Event.findAll({where: {user_id: user_id}});
    }

    async update(id, newEvent) {
        await Event.update(newEvent, { where: { id: id } });
        return await Event.findByPk(id);
    }

    async delete(id) {
        const event = await Event.findByPk(id);
        const eventIsDeleted = event.destroy().then(_ => true).catch(_ => false);
        return eventIsDeleted;
    }
}

module.exports = EventRepository;
