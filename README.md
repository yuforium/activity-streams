# @yuforium/activity-streams
_Activity Streams Validator and Transformer_

## Getting Started
```sh
npm i --save \
  @yuforium/activity-streams \
  class-validator class-transformer \
  reflect-metadata
```

## Using Built-In Classes
Use built in classes to do validation using class-validator:

```typescript
import 'reflect-metadata';
import { Note } from '@yuforium/activity-streams';
import { validate } from 'class-validator';

const note = new Note();

async function validateNote() {
  let errors = await validate(note);

  if (errors.length > 0) {
    console.log('the note is invalid');
  }
  else {
    console.log('the note is valid');
  }
}

note.id = 'https://yuforium.com/users/chris/note-123';

validateNote(); // the note is valid

note.id = 'invalid, id must be a valid URL';

validateNote(); // the note is invalid
```

## Defining Custom Validation Rules
You can define your own validation rules by extending the built in classes or initializing your own using one of several methods using a base type (such as a link, object, activity, or collection):

```typescript
import { Expose } from 'class-transformer';
import { IsString, validate } from 'class-validator';
import { ActivityStreams } from '@yuforium/activity-streams';
import 'reflect-metadata';


// Creates a CustomNote type class as an Activity Streams Object
class CustomNote extends ActivityStreams.object('CustomNote') {
  @Expose()
  @IsString({each: true})
  public customField: string | string[];
};

// Add this to the built-in transformer
ActivityStreams.transformer.add(CustomNote);

// new instance of CustomNote
const custom: CustomNote = ActivityStreams.transform({
  type: 'CustomNote',
  customField: 5 // invalid, must be a string
});

// will get error "each value in customField must be a string"
validate(custom).then(errors => {
  errors.forEach(error => { console.log(error) });
});
```

## Composite Transformation
In addition to supporting custom classes, multiple types may be defined and interpolated from the `transform()` method.

```typescript
import { Expose } from 'class-transformer';
import { IsString, validate } from 'class-validator';
import { ActivityStreams } from '@yuforium/activity-streams';
import 'reflect-metadata';


// Creates CustomNote class as an Activity Streams Object
class CustomNote extends ActivityStreams.object('CustomNote') {
  @Expose()
  @IsString({each: true})
  public customField: string | string[];
};

// Add this to the built in transformer
ActivityStreams.transformer.add(CustomNote);

// new instance of CustomNote
const custom = ActivityStreams.transform({
  type: 'CustomNote',
  customField: 5 // invalid, must be a string
});

// will get error "each value in customField must be a string"
validate(custom).then(errors => {
  errors.forEach(error => { console.log(error) });
});
```

## Requiring Optional Fields
Many fields in the Activity Streams specification are optional, but you may want to make them required your own validation purposes.

Extend the classes you need and then use the `@IsRequired()` decorator for these fields.

_my-note.ts_
```typescript
import { Note, IsRequired } from '@yuforium/activity-streams';

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