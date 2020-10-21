import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { ActivityStreams, Actor } from '../src';

describe('object transformation', () => {
	it('plain object transforms actor', () => {
		const json = {
			attachment: {
				type: 'Actor',
				name: 'Test Actor'
			}
		};

		const obj = plainToClass(ActivityStreams.StreamObject, json);

		expect(obj.attachment).toBeInstanceOf(Actor);
	});
});