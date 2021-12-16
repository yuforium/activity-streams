import { plainToClass, Transform, Type } from "class-transformer";
import { isArray, IsInstance, IsInt, IsMimeType, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsRFC3339, IsString, IsUrl } from "class-validator";
import { Actor, Collection } from '.';
import { IsOneOfInstanceOrUrl } from "./decorator/is-one-of-instance-or-url";
import { Constructor } from "./util/constructor";

export namespace ActivityStreams {
  export class StreamRoot {
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

  export function transform(type?: 'Object'|'Link'|'Image'|('Object'|'Link'|'Image')[], options: {functional: boolean} = {functional: false}) {
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

    return (value: any, obj: any, type: any): any => {
      let cls;

      if (!options.functional && Array.isArray(value)) {
        return value.map(v => transform(type)(v, obj, type));
      }

      if (typeof value === 'object' && (cls = available[value.type])) {
        return plainToClass(cls, value);
      }

      return value;
    }
  }

  export class StreamLink extends StreamRoot {
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
    id?: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    /**
     * Identifies a resource attached or related to an object that potentially requires special handling. The intent is to provide a model that is at least semantically similar to attachments in email.
     * https://www.w3.org/ns/activitystreams#attachment
     */
    @Transform(transform())
    @IsOptional()
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    public attachment?: StreamRoot|string|(StreamRoot|string)[];

    /**
     * Identifies one or more entities to which this object is attributed. The attributed entities might not be Actors. For instance, an object might be attributed to the completion of another activity.
     * https://www.w3.org/ns/activitystreams#attributedTo
     */
    @Transform(transform())
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    @IsOptional()
    public attributedTo?: StreamRoot|string|(StreamRoot|string)[];

    /**
     * Identifies one or more entities that represent the total population of entities for which the object can considered to be relevant.
     *
     * https://www.w3.org/ns/activitystreams#audience
     */
    @Transform(transform())
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    @IsOptional()
    audience?: StreamRoot|string|(StreamRoot|string)[];

    /**
     * The content or textual representation of the Object encoded as a JSON string. By default, the value of content is HTML. The mediaType property can be used in the object to indicate a different content type.
     *
     * The content may be expressed using multiple language-tagged values.
     *
     * https://www.w3.org/ns/activitystreams#content
     */
    @IsString()
    //@IsOptional()
    content?: string;

    /**
     * Identifies the context within which the object exists or an activity was performed.
     *
     * The notion of "context" used is intentionally vague. The intended function is to serve as a means of grouping objects and activities that share a common originating context or purpose. An example could be all activities relating to a common project or event.
     *
     * https://www.w3.org/ns/activitystreams#context
     */
    @Transform(transform())
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    //@IsOptional()
    context?: StreamRoot|StreamRoot[];

    @IsObject()
    @IsOptional()
    contentMap?: ContentMap;

    @IsString()
    //@IsOptional()
    name?: string|string[];

    @IsObject()
    @IsOptional()
    nameMap?: ContentMap|ContentMap[];

    @IsOptional()
    @IsString()
    @IsRFC3339()
    endTime?: string;

    @IsOptional()
    @Transform(transform())
    generator?: string|StreamRoot|(string|StreamRoot)[];

    @IsOptional()
    @Transform(transform(['Image', 'Link']))
    icon?: string|StreamLink|StreamImage|(string|StreamLink|StreamImage)[];

    @IsOptional()
    @Transform(transform(['Image', 'Link']))
    image?: string|StreamLink|StreamImage|(string|StreamLink|StreamImage)[];

    @IsOptional()
    @Transform(transform())
    inReplyTo?: string|StreamRoot|(string|StreamRoot)[];

    @IsOptional()
    @Transform(transform())
    location?: string|StreamRoot|(string|StreamRoot)[];

    @IsOptional()
    @Transform(transform())
    preview?: string|StreamRoot|(string|StreamRoot)[];

    @IsOptional()
    @IsString()
    @IsRFC3339()
    published?: string;

    @IsOptional()
    @Type(() => Collection)
    replies?: Collection;

    @IsOptional()
    @IsString()
    @IsRFC3339()
    startTime?: string;

    @IsOptional()
    summary?: string|string[];

    @IsObject()
    @IsOptional()
    summaryMap?: ContentMap|ContentMap[];

    /**
     * One or more "tags" that have been associated with an objects. A tag can be any kind of Object. The key difference between attachment and tag is that the former implies association by inclusion, while the latter implies associated by reference.
     *
     * https://www.w3.org/ns/activitystreams#tag
     */
    @IsOptional()
    @Transform(transform())
    @IsOneOfInstanceOrUrl([StreamObject, StreamLink])
    tag?: StreamRoot|string|(StreamRoot|string)[];

    @IsOptional()
    @IsString()
    @IsRFC3339()
    updated?: string;

    @IsOptional()
    @Type(() => StreamLink)
    url?: string|StreamLink|(string|StreamLink)[];

    // @IsOptional()
    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    to?: string|StreamLink|StreamObject|(string|StreamLink|StreamObject)[];

    @IsOptional()
    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    bto?: string|StreamLink|StreamObject|(string|StreamLink|StreamObject)[];

    @IsOptional()
    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    cc?: string|StreamLink|StreamObject|(string|StreamLink|StreamObject)[];

    @IsOptional()
    // @Type(() => Root, {
    //   discriminator: {
    //     property: 'type',
    //     subTypes: types
    //   }
    // })
    bcc?: string|StreamLink|StreamObject|(string|StreamLink|StreamObject)[];

    @IsOptional()
    @IsString()
    @IsMimeType()
    mediaType?: string;

    @IsOptional()
    @IsString()
    duration?: string;
  }

  export abstract class StreamActivity extends StreamObject {
    @Type(() => Actor)
    @IsOptional()
    actor?: Actor;

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

  export abstract class Activity extends StreamActivity {
    @IsOptional()
    @Transform(transform('Object'))
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
}