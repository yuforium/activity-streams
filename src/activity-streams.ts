import { Exclude, Expose, plainToClass, Transform, TransformFnParams, Type } from "class-transformer";
import { ArrayMinSize, IsInt, IsMimeType, IsNotEmpty, IsNumber, IsObject, IsPositive, IsRFC3339, IsString, IsUrl, ValidateIf, ValidateNested } from "class-validator";
import { Actor, Collection } from '.';
import { IsOneOfInstanceOrUrl } from "./decorator/is-one-of-instance-or-url";
import { IsOptional } from "./decorator/is-optional";
import { Constructor } from "./util/constructor";

/**
 * Base collection of ActivityStreams objects.
 */
export namespace ActivityStreams {
  export class StreamRoot {
    public static factory<T>(this: Constructor<T>, params: any = {}): T {
      return Object.assign(new this(), params);
    }
  }

  export type ContentMap = {[key: string]: string}[];
  type ConstructorMap = {[key: string]: Constructor<StreamRoot>};

  export const types = {
    all: {} as ConstructorMap,
    'Object': {} as ConstructorMap,
    'Image': {} as ConstructorMap,
    'Link': {} as ConstructorMap,
    'Activity': {} as ConstructorMap
  };

  export const Objects = types.Object;
  export const All = types.all;
  export const Images = types.Image;
  export const Links = types.Link;
  export const Activities = types.Activity;

  let _transform = transformer();
  export const transform = (value: any) => {
    return _transform({value} as TransformFnParams)
  }

  export function transformer(type?: 'Object'|'Link'|'Image'|('Object'|'Link'|'Image')[], options: {functional: boolean} = {functional: false}) {
    let available: ConstructorMap;

    if (Array.isArray(type)) {
      available = type.reduce((previous, current) => {
        const constructors = types[current] || {};
        return {...previous, ...constructors};
      }, {});
    }
    else {
      available = type ? types[type as 'Object'|'Link'|'Image'] : types.all;
    }

    return (params: TransformFnParams) => {
      let cls;

      if (!options.functional && Array.isArray(params.value)) {
        return params.value.map(v => ({...params, value: v}));
      }

      if (typeof params.value === 'object' && (cls = available[params.value.type])) {
        return plainToClass(cls, params.value);
      }

      return params.value;
    }
  }

  export class StreamLink extends StreamRoot {
    @Exclude()
    exportAsString: boolean = false;

    toString() {
      if (this.id) {
        return this.id;
      }
      throw new Error('conversion to string not possible without id');
    }

    @IsString()
    @IsUrl()
    href: string;

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    name?: string|string[];

    @IsString()
    @IsOptional()
    hreflang?: string;

    @IsString()
    @IsOptional()
    @IsMimeType()
    mediaType?: string;

    @IsString()
    @IsOptional()
    rel?: string|string[];

    @IsOptional()
    @IsNumber()
    @IsInt()
    @IsPositive()
    height?: number;

    @IsOptional()
    @IsNumber()
    @IsInt()
    @IsPositive()
    width?: number;
  }

  export class StreamObject extends StreamRoot {
    @IsString()
    @IsUrl()
    @IsOptional()
    @IsNotEmpty()
    @Expose()
    id?: string;

    @IsString({each: true})
    @IsNotEmpty()
    @Expose()
    type: string | string[] = 'Object';

    /**
     * Identifies a resource attached or related to an object that potentially requires special handling. The intent is to provide a model that is at least semantically similar to attachments in email.
     * https://www.w3.org/ns/activitystreams#attachment
     */
    @Transform(transformer())
    @IsOptional()
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    @Expose()
    public attachment?: StreamRoot|string|(StreamRoot|string)[];

    /**
     * Identifies one or more entities to which this object is attributed. The attributed entities might not be Actors. For instance, an object might be attributed to the completion of another activity.
     * https://www.w3.org/ns/activitystreams#attributedTo
     */
    // @Transform(transform())
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    @IsOptional()
    @Expose()
    public attributedTo?: StreamRoot|string|(StreamRoot|string)[];

    /**
     * Identifies one or more entities that represent the total population of entities for which the object can considered to be relevant.
     *
     * https://www.w3.org/ns/activitystreams#audience
     */
    // @Transform(transform())
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    @IsOptional()
    @Expose()
    audience?: StreamRoot|string|(StreamRoot|string)[];

    /**
     * The content or textual representation of the Object encoded as a JSON string. By default, the value of content is HTML. The mediaType property can be used in the object to indicate a different content type.
     *
     * The content may be expressed using multiple language-tagged values.
     *
     * https://www.w3.org/ns/activitystreams#content
     */
    @IsString()
    @Expose()
    @IsOptional()
    // @IsNotFunctional();
    // @ValidateIf((o: StreamObject) => {
    //   console.log("metadata key", Reflect.getMetadata(isRequiredMetadataKey, o, 'content'));
    //   console.log('this is the first decorator');
    //   return true;
    // })
    // @ValidateIf((o: StreamObject) => {
    //   console.log('this is the second decorator');
    //   return true;
    // })
    content?: string | string[];

    /**
     * Identifies the context within which the object exists or an activity was performed.
     *
     * The notion of "context" used is intentionally vague. The intended function is to serve as a means of grouping objects and activities that share a common originating context or purpose. An example could be all activities relating to a common project or event.
     *
     * https://www.w3.org/ns/activitystreams#context
     */
    // @Transform(transform())
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    @IsOptional()
    @Expose()
    context?: StreamRoot|StreamRoot[];

    /**
     * The content or textual representation of the Object encoded as a JSON string. By default, the value of content is HTML. The mediaType property can be used in the object to indicate a different content type.
     *
     * The content may be expressed using multiple language-tagged values.
     *
     * https://www.w3.org/ns/activitystreams#content
     */
    @IsObject()
    @IsOptional()
    @Expose()
    contentMap?: ContentMap;

    /**
     * A simple, human-readable, plain-text name for the object. HTML markup must not be included. The name may be expressed using multiple language-tagged values.
     *
     * https://www.w3.org/ns/activitystreams#name
     */
    @IsString()
    @IsOptional()
    @Expose()
    name?: string|string[];

    /**
     * A simple, human-readable, plain-text name for the object. HTML markup must not be included. The name may be expressed using multiple language-tagged values.
     *
     * https://www.w3.org/ns/activitystreams#name
     */
    @IsObject()
    @IsOptional()
    @Expose()
    nameMap?: ContentMap|ContentMap[];

    @IsOptional()
    @IsString()
    @IsRFC3339()
    @Expose()
    endTime?: string;

    @IsOptional()
    // @Transform(transform())
    @Expose()
    generator?: string|StreamRoot|(string|StreamRoot)[];

    @IsOptional()
    // @Transform(transform(['Image', 'Link']))
    @Expose()
    icon?: string|StreamLink|StreamImage|(string|StreamLink|StreamImage)[];

    @IsOptional()
    @Expose()
    // @Transform(transform(['Image', 'Link']))
    image?: string|StreamLink|StreamImage|(string|StreamLink|StreamImage)[];

    @IsOptional()
    // @Transform(transform())
    @Expose()
    inReplyTo?: string|StreamRoot|(string|StreamRoot)[];

    @IsOptional()
    // @Transform(transform())
    @Expose()
    location?: string|StreamRoot|(string|StreamRoot)[];

    @IsOptional()
    // @Transform(transform())
    @Expose()
    preview?: string|StreamRoot|(string|StreamRoot)[];

    /**
     * The date and time at which the object was published
     *
     * ```json
     * {
     *   "@context": "https://www.w3.org/ns/activitystreams",
     *   "summary": "A simple note",
     *   "type": "Note",
     *   "content": "Fish swim.",
     *   "published": "2014-12-12T12:12:12Z"
     * }
     * ```
     *
     * https://www.w3.org/ns/activitystreams#published
     */
    @IsOptional()
    @IsString()
    @IsRFC3339()
    @Expose()
    published?: string;

    @IsOptional()
    @Type(() => Collection)
    @Expose()
    replies?: Collection;

    @IsOptional()
    @IsString()
    @IsRFC3339()
    @Expose()
    startTime?: string;

    @IsOptional()
    @Expose()
    summary?: string|string[];

    @IsObject()
    @IsOptional()
    @Expose()
    summaryMap?: ContentMap|ContentMap[];

    /**
     * One or more "tags" that have been associated with an objects. A tag can be any kind of Object. The key difference between attachment and tag is that the former implies association by inclusion, while the latter implies associated by reference.
     *
     * https://www.w3.org/ns/activitystreams#tag
     */
    @IsOptional()
    // @Transform(transform())
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    @Expose()
    tag?: StreamRoot|string|(StreamRoot|string)[];

    @IsOptional()
    @IsString()
    @IsRFC3339()
    @Expose()
    updated?: string;

    @IsOptional()
    @Type(() => StreamLink)
    @Expose()
    url?: string|StreamLink|(string|StreamLink)[];

    @IsOptional()
    @IsString({each: true})
    // @IsUrl()
    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    @Expose()
    to?: string|StreamLink|StreamObject|(string|StreamLink|StreamObject)[];

    @IsOptional()
    @IsString({each: true})
    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    @Expose()
    bto?: string|StreamLink|StreamObject|(string|StreamLink|StreamObject)[];

    @IsOptional()
    @IsString({each: true})
    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    @Expose()
    cc?: string|StreamLink|StreamObject|(string|StreamLink|StreamObject)[];

    @IsOptional()
    @IsString({each: true})
    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    @Expose()
    bcc?: string|StreamLink|StreamObject|(string|StreamLink|StreamObject)[];

    @IsOptional()
    @IsString()
    @IsMimeType()
    @Expose()
    mediaType?: string;

    @IsOptional()
    @IsString()
    @Expose()
    duration?: string;
  }

  export abstract class StreamActivity extends StreamObject {
    @Type(() => Actor)
    @IsOptional()
    actor?: string | Actor;

    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    @IsOptional()
    target?: StreamLink|StreamObject

    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    @IsOptional()
    result?: StreamLink|StreamObject

    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    @IsOptional()
    origin?: StreamLink|StreamObject

    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    @IsOptional()
    instrument?: StreamLink|StreamObject
  }


  export class Activity extends StreamActivity {
    @Expose()
    id: string;

    @Expose()
    @Transform(({value}: any) => {
      if (typeof value === 'string') {
        return value;
      }
      else if (typeof value === 'object' && !(value instanceof StreamObject) && types.Object[value.type]) {
        return plainToClass(types.Object[value.type], value, {excludeExtraneousValues: true});
      }
      return value;
    })
    object?: StreamObject;
  }

  export abstract class StreamImage extends StreamObject { }

  export abstract class IntransitiveActivity extends StreamActivity { }

  export function register<T extends StreamRoot>(constructor: Constructor<T>, asType?: string, debug?: boolean): void {
    if (!StreamRoot.isPrototypeOf(constructor)) {
      throw new Error('Constructor must extend an ActivityStream class');
    }

    const type = asType || constructor.name;

    if (debug) {
      console.log('Registering ' + type);
    }

    types.all[type] = constructor;

    if (ActivityStreams.StreamObject.isPrototypeOf(constructor)) {
      types.Object[type] = constructor;
    }

    if (StreamLink.isPrototypeOf(constructor)) {
      types.Link[type] = constructor;
    }

    if (StreamImage.isPrototypeOf(constructor)) {
      types.Image[type] = constructor;
    }

    if (StreamActivity.isPrototypeOf(constructor)) {
      types.Activity[type] = constructor;
    }
  }

  register(StreamObject, 'Object');
  register(StreamLink, 'Link');
  // register(StreamActivity, 'Activity');
}