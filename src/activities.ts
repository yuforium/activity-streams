import { Expose, Transform, Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { ActivityStreams } from "./activity-streams";

export class Accept extends ActivityStreams.Activity {
  type = 'Accept';
}

export class Add extends ActivityStreams.Activity {
  type = 'Add';
}

export class Announce extends ActivityStreams.Activity {
  type = 'Announce';
}

export class Arrive extends ActivityStreams.IntransitiveActivity {
  type = 'Arrive';
}

export class Ignore extends ActivityStreams.Activity {
  type = 'Ignore';
}

export class Block extends Ignore {
  type = 'Block';
}

export class Create extends ActivityStreams.Activity {
  type = 'Create';
}

export class Delete extends ActivityStreams.Activity {
  type = 'Delete';
}

export class Dislike extends ActivityStreams.Activity {
  type = 'Dislike';
}

export class Follow extends ActivityStreams.Activity {
  type = 'Follow';
}

export class Offer extends ActivityStreams.Activity {
  type = 'Offer';
}

export class Invite extends Offer {
  type = 'Invite';
}

export class Join extends ActivityStreams.Activity {
  type = 'Join';
}

export class Leave extends ActivityStreams.Activity {
  type = 'Leave';
}

export class Like extends ActivityStreams.Activity {
  type = 'Like';
}

export class Listen extends ActivityStreams.Activity {
  type = 'Listen';
}

export class Move extends ActivityStreams.Activity {
  type = 'Move';
}

export class Question extends ActivityStreams.IntransitiveActivity {
  type = 'Question';

  // @Type(() => ActivityStreams.Root, {
  //   discriminator: {
  //     property: 'type',
  //     subTypes: ActivityStreams.types
  //   }
  // })
  @IsOptional()
  oneOf?: ActivityStreams.StreamRoot|ActivityStreams.StreamRoot[];

  // @Type(() => ActivityStreams.Root, {
  //   discriminator: {
  //     property: 'type',
  //     subTypes: ActivityStreams.types
  //   }
  // })
  @IsOptional()
  anyOf?: ActivityStreams.StreamRoot|ActivityStreams.StreamRoot[];

  // @Type(() => ActivityStreams.Root, {
  //   discriminator: {
  //     property: 'type',
  //     subTypes: ActivityStreams.types
  //   }
  // })
  @IsOptional()
  closed?: boolean|string|ActivityStreams.StreamRoot|ActivityStreams.StreamRoot[];
}

export class Reject extends ActivityStreams.Activity {
  type = 'Reject';
}

/**
 * Indicates that the actor has read the object.
 */
export class Read extends ActivityStreams.Activity {
  type = 'Read';
}

/**
 * Indicates that the actor is removing the object. If specified, the origin indicates the context from which the object is being removed.
 */
export class Remove extends ActivityStreams.Activity {
  type = 'Remove';
}

/**
 * A specialization of Reject in which the rejection is considered tentative.
 */
export class TentativeReject extends ActivityStreams.Activity {
  type = 'TentativeReject';
}

/**
 * A specialization of Accept indicating that the acceptance is tentative.
 */
export class TentativeAccept extends ActivityStreams.Activity {
  type = 'TentativeAccept';
}

/**
 * Indicates that the actor is traveling to target from origin. Travel is an IntransitiveObject whose actor specifies the direct object. If the target or origin are not specified, either can be determined by context.
 */
export class Travel extends ActivityStreams.IntransitiveActivity {
  type = 'Travel';
}

/**
 * Indicates that the actor is undoing the object. In most cases, the object will be an Activity describing some previously performed action (for instance, a person may have previously "liked" an article but, for whatever reason, might choose to undo that like at some later point in time).
 *
 * The target and origin typically have no defined meaning.
 */
export class Undo extends ActivityStreams.Activity {
  type = 'Undo';
}

/**
 * Indicates that the actor has updated the object. Note, however, that this vocabulary does not define a mechanism for describing the actual set of modifications made to object.
 *
 * The target and origin typically have no defined meaning.
 */
export class Update extends ActivityStreams.Activity {
  type = 'Update';
}

/**
 * Indicates that the actor has viewed the object.
 */
export class View extends ActivityStreams.Activity {
  type = 'View';
}

[Accept, Add, Announce, Arrive, Block, Create, Delete, Dislike, Follow, Ignore, Invite, Join, Leave, Like, Listen, Move, Offer, Question, Read, Reject, Remove, TentativeAccept, TentativeReject, Travel, Undo, Update, View]
.forEach(constructor => ActivityStreams.register(constructor));