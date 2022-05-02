const { ContainerBuilder } = require("node-dependency-injection");
const UserRepository = require("../app/repositories/UserRepository.js");
const MatchRepository = require("../app/repositories/MatchRepository.js");
const GroupRepository = require("../app/repositories/GroupRepository.js");
const MessageRepository = require("../app/repositories/MessageRepository.js");
const EventRepository = require("../app/repositories/EventRepository.js")
const GroupService = require("../app/services/GroupService.js");
const UserService = require("../app/services/UserService.js");
const MatchService = require("../app/services/MatchService.js");
const MessageService = require("../app/services/MessageService.js");
const EventService = require("../app/services/EventService");

const container = new ContainerBuilder();

container.register('repository.user', UserRepository);
container.register('repository.match', MatchRepository);
container.register('repository.group', GroupRepository);
container.register('repository.message', MessageRepository);
container.register('repository.event', EventRepository);

container.register('service.group', GroupService)
    .addArgument(container.get('repository.group'))
    .addArgument(container.get('repository.user'));

container.register('service.event', EventService)
    .addArgument(container.get('repository.event'))
    .addArgument(container.get('repository.user'));

container.register('service.user', UserService)
    .addArgument(container.get('repository.user'));

container.register('service.match', MatchService)
    .addArgument(container.get('repository.match'));

container.register('service.message', MessageService)
    .addArgument(container.get('repository.match'))
    .addArgument(container.get('repository.message'));

module.exports = container;
