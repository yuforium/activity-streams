import 'reflect-metadata';
import { ActivityStreams } from "../src";
import { Constructor } from '../src/util/constructor';

describe('inheritance', () => {
	it('StreamObject instance of StreamRoot', () => {
		const obj = new ActivityStreams.StreamObject();
		expect(obj).toBeInstanceOf(ActivityStreams.StreamRoot);
	});

	it('StreamLink instance of StreamRoot', () => {
		const link = new ActivityStreams.StreamLink();
		expect(link).toBeInstanceOf(ActivityStreams.StreamRoot);
	});

	Object.values(ActivityStreams.Objects).forEach((constructor: Constructor) => {
		it(`${constructor.name} instance of StreamObject`, () => {
			const obj = new constructor();
			expect(obj).toBeInstanceOf(ActivityStreams.StreamObject);
		});
	});

	Object.values(ActivityStreams.Activities).forEach((constructor: Constructor) => {
		it(`${constructor.name} instance of StreamActivity`, () => {
			const activity = new constructor();
			expect(activity).toBeInstanceOf(ActivityStreams.StreamActivity);
		});
	});

	Object.values(ActivityStreams.Links).forEach((constructor: Constructor) => {
		it(`${constructor.name} instance of StreamActivity`, () => {
			const link = new constructor();
			expect(link).toBeInstanceOf(ActivityStreams.StreamLink);
		});
	})
});

