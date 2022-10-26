import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { ActivityStreams, Note } from '../src';

// const toASObject = ActivityStreams.transform("Object");

describe('default object transformations', () => {
  it('should transform a simple object', () => {
    const obj = ActivityStreams.transform({
      type: 'Note'
    });

    expect(obj).toBeInstanceOf(Note);
  });
});

describe('object transformation', () => {
  it('plain object transforms actor', () => {
    let value: any = {
      type: 'Note'
    };

    let obj = ActivityStreams.transform(value);

    expect(obj).toBeInstanceOf(Note);

    // json['attachment'] = [
    //   {
    //     type: 'Actor',
    //     name: 'Test Actor'
    //   },
    //   {
    //     type: 'Actor',
    //     name: 'Another Actor'
    //   }
    // ]

    // obj = ActivityStreams.transform(json);

    // console.log(obj);

    // expect(obj.attachment[0]).toBeInstanceOf(Actor);
    // expect(obj.attachment[1]).toBeInstanceOf(Actor);
  });
});