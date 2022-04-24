import {ContainerBuilder} from "node-dependency-injection";
import { UserRepository } from "../app/repositories/UserRepository";
import { MatchRepository } from "../app/repositories/MatchRepository";
import { GroupRepository } from "../app/repositories/GroupRepository";
import { MessageRepository } from "../app/repositories/MessageRepository";
import { GroupService } from "../app/services/GroupService";
import { UserService } from "../app/services/UserService";
import { MatchService } from "../app/services/MatchService";
import { MessageService } from "../app/services/MessageService"

let container = new ContainerBuilder();

container.register('repository.user', UserRepository);
container.register('repository.match', MatchRepository);
container.register('repository.group', GroupRepository);
container.register('repository.message', MessageRepository);

container.register('service.group', GroupService)
    .addArgument(container.get('repository.group'))
    .addArgument(container.get('repository.user'));

container.register('service.user', UserService)
    .addArgument(container.get('repository.user'));

container.register('service.match', MatchService)
    .addArgument(container.get('repository.match'));

container.register('service.message', MessageService)
    .addArgument(container.get('repository.match'))
    .addArgument(container.get('repository.message'));

export default container;
