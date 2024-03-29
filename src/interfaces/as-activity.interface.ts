import { ASObject, ASObjectOrLink } from "./as-object.interface";

export interface ASActivity extends ASObject {
  /**
   * Describes one or more entities that either performed or are expected to perform the activity. Any single activity can have multiple actors. The actor may be specified using an indirect {@link Link}.
   */
  actor?: ASObjectOrLink;

  /**
   * Describes an object of any kind. The Object type serves as the base type for most of the other kinds of objects defined in the Activity Vocabulary, including other Core types such as {@link Activity}, {@link IntransitiveActivity}, {@link Collection} and {@link OrderedCollection}.
   */
  object?: ASObjectOrLink;

  /**
   * Describes the indirect object, or target, of the activity. The precise meaning of the target is largely dependent on the type of action being described but will often be the object of the English preposition "to". For instance, in the activity "John added a movie to his wishlist", the target of the activity is John's wishlist. An activity can have more than one target.
   */
  target?: ASObjectOrLink;

  /**
   * Describes the result of the activity. For instance, if a particular action results in the creation of a new resource, the result property can be used to describe that new resource.
   */
  result?: ASObjectOrLink;

  /**
   * Describes an indirect object of the activity from which the activity is directed. The precise meaning of the origin is the object of the English preposition "from". For instance, in the activity "John moved an item to List B from List A", the origin of the activity is "List A".
   */
  origin?: ASObjectOrLink;

  /**
   * Identifies one or more objects used (or to be used) in the completion of an {@link Activity}.
   */
  instrument?: ASObjectOrLink;
}