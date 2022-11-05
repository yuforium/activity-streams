# @yuforium/activity-streams
_activity streams validator and transformer_

## Getting Started
```sh
npm install @yuforium/activity-streams-validator class-validator class-transformer reflect-metadata
```

## Using Built-In Classes
Use built in classes to do validation using class-validator:

```typescript
import 'reflect-metadata';
import { Note } from '@yuforium/activity-streams-validator';
import { validate } from 'class-validator';

const note = new Note();
note.id = 'https://yuforium.com/users/chris/note-123';

(async () => {
  let errors = await validate(note);

  if (errors.length > 0) {
    console.log('validation failed');
  }
  else {
    console.log('validation ok');
  }
})();
```

## Creating Your Own Classes
Create your own classes by extending the built in classes or by initializing your own:

```typescript
// Creates CustomNote class as an Activity Streams Object
class CustomNote extends ActivityStreams.object('CustomNote') {
  @Expose()
  public customField: string | string[];
};

// Add this to the built in transformer
ActivityStreams.transformer.add(CustomNote);

// new instance of CustomNote
const custom = ActivityStreams.transform({
  type: 'CustomNote',
  customField: 'someValue'
});
```

## Composite Transformation
In addition to supporting custom classes, multiple types may be defined an interpolated from the `transform()` method.

```typescript
import { ActivityStreams } from "@yuforium/activity-streams";
import 'reflect-metadata';

class Duck extends ActivityStreams.object('Duck') {
  public quack() {
    console.log('quack!');
  }
}

class Yeti extends ActivityStreams.object('Yeti') {
  public roar() {
    console.log('roar!');
  }
}

ActivityStreams.transformer.add(Duck, Yeti);

const duckYeti = ActivityStreams.transform({
  type: ['Duck', 'Yeti'],
  id: 'https://yuforium.com/the-infamous-duck-yeti'
});

duckYeti.quack(); // quack!
duckYeti.roar(); // roar!
```

## Requiring Optional Fields
Many fields in the Activity Streams specification are optional, but you may want to make them required your own validation purposes.

Extend the classes you need and then use the `@IsRequired()` decorator for these fields.

_my-note.ts_
```typescript
import { Note, IsRequired } from '@yuforium/activity-streams-validator';

export class MyNote extends Note {
  // content field is now required
  @IsRequired()
  public content;
}
```
_validate.ts_
```typescript
import { MyNote } from './my-note';

const note = new MyNote();

validate(note); // fails

note.content = "If you can dodge a wrench, you can dodge a ball.";

validate(note); // works
```