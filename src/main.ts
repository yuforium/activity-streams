import 'reflect-metadata';
import { validate } from 'class-validator';

import { Actor, Add } from './';
import { plainToClassFromExist } from 'class-transformer';

setTimeout(() => {
	const actor = new Actor();
	console.log('the actor is', actor);

	actor.audience = [{
		name: 'The Audience Name',
		type: 'Actor'
	}, {name: 'Another audience', type: 'Actor'}];

	let newActor = plainToClassFromExist(Actor, actor);

	console.log('the new actor is ', newActor);
	console.log('existing actor is', actor);
}, 20);