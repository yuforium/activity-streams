import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { ActivityStreams, Actor } from '../src';

const toASObject = ActivityStreams.transform("Object");

describe('object transformation', () => {
  it('plain object transforms actor', () => {
    let json: any = {
      type: 'Object',
      attachment: {
        type: 'Actor',
        name: 'Test Actor'
      }
    };

    let obj = ActivityStreams.transform(json);

    console.log('the obje is', obj);

    expect(obj.attachment).toBeInstanceOf(Actor);

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