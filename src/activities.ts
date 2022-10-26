import { Expose, Transform, Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { ActivityStreams } from "./activity-streams";
import { ASObjectOrLink } from "./interfaces";

export class Accept extends ActivityStreams.activity('Accept', class {}) {};
export class Add extends ActivityStreams.activity('Add', class {}) {};
export class Announce extends ActivityStreams.activity('Announce', class {}) {};
export class Arrive extends ActivityStreams.intransitiveActivity('Arrive', class {}) {};
export class Ignore extends ActivityStreams.activity('Ignore', class {}) {};
export class Block extends Ignore {};
export class Create extends ActivityStreams.activity('Create', class {}) {};
export class Delete extends ActivityStreams.activity('Delete', class {}) {};
export class Dislike extends ActivityStreams.activity('Dislike', class {}) {};
export class Follow extends ActivityStreams.activity('Follow', class {}) {};
export class Offer extends ActivityStreams.activity('Offer', class {}) {};
export class Invite extends Offer {};
export class Join extends ActivityStreams.activity('Join', class {}) {};
export class Leave extends ActivityStreams.activity('Leave', class {}) {};
export class Like extends ActivityStreams.activity('Like', class {}) {};
export class Listen extends ActivityStreams.activity('Listen', class {}) {};
export class Move extends ActivityStreams.activity('Move', class {}) {};

class QuestionDef {
  @IsOptional()
  oneOf?: ASObjectOrLink | ASObjectOrLink[];

  @IsOptional()
  anyOf?: ASObjectOrLink | ASObjectOrLink[];

  @IsOptional()
  closed?: boolean | string | ASObjectOrLink | ASObjectOrLink[];
}
export class Question extends ActivityStreams.intransitiveActivity('Question', QuestionDef) {};

export class Reject extends ActivityStreams.activity('Reject', class {}) {};

/**
 * Indicates that the actor has read the object.
 */
 export class Read extends ActivityStreams.activity('Read', class {}) {};

/**
 * Indicates that the actor is removing the object. If specified, the origin indicates the context from which the object is being removed.
 */
export class Remove extends ActivityStreams.activity('Remove', class {}) {};

/**
 * A specialization of Reject in which the rejection is considered tentative.
 */
export class TentativeReject extends ActivityStreams.activity('TentativeReject', class {}) {};

/**
 * A specialization of Accept indicating that the acceptance is tentative.
 */
export class TentativeAccept extends ActivityStreams.activity('TentativeAccept', class {}) {};

/**
 * Indicates that the actor is traveling to target from origin. Travel is an IntransitiveObject whose actor specifies the direct object. If the target or origin are not specified, either can be determined by context.
 */
export class Travel extends ActivityStreams.intransitiveActivity('Travel', class {}) {};

/**
 * Indicates that the actor is undoing the object. In most cases, the object will be an Activity describing some previously performed action (for instance, a person may have previously "liked" an article but, for whatever reason, might choose to undo that like at some later point in time).
 *
 * The target and origin typically have no defined meaning.
 */
export class Undo extends ActivityStreams.activity('Undo', class {}) {};

/**
 * Indicates that the actor has updated the object. Note, however, that this vocabulary does not define a mechanism for describing the actual set of modifications made to object.
 *
 * The target and origin typically have no defined meaning.
 */
export class Update extends ActivityStreams.activity('Update', class {}) {};

/**
 * Indicates that the actor has viewed the object.
 */
export class View extends ActivityStreams.activity('View', class {}) {};

// [Accept, Add, Announce, Arrive, Block, Create, Delete, Dislike, Follow, Ignore, Invite, Join, Leave, Like, Listen, Move, Offer, Question, Read, Reject, Remove, TentativeAccept, TentativeReject, Travel, Undo, Update, View]
// .forEach(constructor => ActivityStreams.register(constructor));