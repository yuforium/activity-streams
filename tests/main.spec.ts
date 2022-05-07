import { validate } from 'class-validator';
import 'reflect-metadata';
import { ActivityStreams, Note } from "../src";
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

  // Check that all exported object types are StreamObjects
  Object.values(ActivityStreams.Objects).forEach((constructor: Constructor<ActivityStreams.StreamRoot>) => {
    it(`${constructor.name} instance of StreamObject`, () => {
      const obj = new constructor();
      expect(obj).toBeInstanceOf(ActivityStreams.StreamObject);
    });
  });

  // Check that all exported activity types are StreamActivity
  Object.values(ActivityStreams.Activities).forEach((constructor: Constructor<ActivityStreams.StreamRoot>) => {
    it(`${constructor.name} instance of StreamActivity`, () => {
      const activity = new constructor();
      expect(activity).toBeInstanceOf(ActivityStreams.StreamActivity);
    });
  });

  // check that all exported link types are StreamLink
  Object.values(ActivityStreams.Links).forEach((constructor: Constructor<ActivityStreams.StreamRoot>) => {
    it(`${constructor.name} instance of StreamLink`, () => {
      const link = new constructor();
      expect(link).toBeInstanceOf(ActivityStreams.StreamLink);
    });
  })
});

describe('basic id validation', () => {
  it('should pass basic validation', async () => {
    let errs: any[];

    // a new note should be valid
    const obj = new ActivityStreams.StreamObject();
    // const expectErrors = async () => expect((await validate(obj)).length).toBeGreaterThan(0);
    const expectErrors = async (count: number) => expect(await validate(obj)).toHaveLength(count);
    expectErrors(0);

    // obj with ID should be valid
    obj.id = "https://yuforium.com/users/chris/note-123";
    expectErrors(0);

    // obj with invalid URL should fail
    obj.id = 'some-id';
    expectErrors(1);

    // @ts-ignore a new note with invalid id
    obj.id = 5;
    expectErrors(1);

    // @ts-ignore a new note with invalid id
    obj.id = ["https://yuforium.com/users/chris/note-123"];
    expectErrors(1);
  });
});

describe('basic type validation', () => {
  it('should pass basic validation', async () => {
    let errs: any[];

    const obj = new ActivityStreams.StreamObject();
    const expectErrors = async (count: number) => expect(await validate(obj)).toHaveLength(count);

    obj.type = "Object";
    expectErrors(0);

    obj.type = ["Object", "test:Object"];
    expectErrors(0);

    obj.type = [];
    expectErrors(1);
  });
});