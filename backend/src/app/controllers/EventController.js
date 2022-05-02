const container = require('../../shared/container.js');
const Event = require('../models/Events');
const { AppError } = require('../../errors/AppError.js');
const Yup = require('yup');

const eventService = container.get("service.event");

class EventController {

    async findUserEvents(req, res) {
        const { user_id } = req.params;
        const events = await eventService.getUserEvents(user_id);
        return res.json(events)
    }

    async findAllEventsOpen(req, res) {
        const events = await eventService.getAllOpenEvents();
        return res.status(200).json(events);
    }

    async addUserInEvent(req, res) {
        const { user_id, id } = req.params;

        await eventService.addUserInEvent(user_id, id);
        const event = await eventService.getEventById(id);

        return res.status(200).json(event);
    }

    async createEvent(req, res) {
        const user_id = req.user.id;
        const { name, description, type, address, startDate, endDate, closed } = req.body;

        const event = await eventService.createEvent(user_id, { name, description, type, address, startDate, endDate, closed });
        return res.json(event);
    }

    async getEventById(req, res) {
        const event = await eventService.getEventById(req.params.id);
        return res.status(200).json(event);
    }

    async updateEvent(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            address: Yup.string().required(),
            startDate: Yup.date().required(),
            endDate: Yup.date().required(),
            closed: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('Falha ao validar.');
        }

        const event = await eventService.updateEvent(req.params.id, req.body);
        return res.json(event);
    }

    async removeUser(req, res) {
        const { id, user_id } = req.params;
        await eventService.removeUserFromEvent(user_id, id);
        return res.status(200).json();
    }

    async delete(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);

            await event.destroy();

            return res.status(200).json({ message: `Evento ${req.params.id} foi deletado` });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async addImage(req, res) {
        const eventId = req.user.id;
        const fileName = req.file.filename;
        await eventService.addImage(eventId, fileName);
        return res.status(200).json({ message: "Imagem adicionada ao evento" }).send();
    }
}

module.exports = EventController;
