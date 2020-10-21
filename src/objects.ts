import { Transform, Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsRFC3339, IsString, Max, Min } from 'class-validator';
import { ActivityStreams } from '.';

export class Actor extends ActivityStreams.StreamObject {
}

export class Article extends ActivityStreams.StreamObject {
}

export class Audio extends ActivityStreams.StreamObject {
}

export class Collection extends ActivityStreams.StreamObject {
	@IsOptional()
	@IsNumber()
	@IsInt()
	@Min(0)
	totalItems?: number;

	@IsOptional()
	// @Type(() => ActivityStreams.Object, {
	// 	discriminator: {
	// 		property: 'type',
	// 		subTypes: [
	// 			{name: 'CollectionPage', value: CollectionPage},
	// 			{name: 'Link', value: ActivityStreams.Link}
	// 		]
	// 	}
	// })
	current?: CollectionPage|ActivityStreams.StreamLink;

	@IsOptional()
	// @Type(() => ActivityStreams.Object, {
	// 	discriminator: {
	// 		property: 'type',
	// 		subTypes: [
	// 			{name: 'CollectionPage', value: CollectionPage},
	// 			{name: 'Link', value: ActivityStreams.Link}
	// 		]
	// 	}
	// })
	first?: CollectionPage|ActivityStreams.StreamLink;

	@IsOptional()
	// @Type(() => ActivityStreams.Object, {
	// 	discriminator: {
	// 		property: 'type',
	// 		subTypes: [
	// 			{name: 'CollectionPage', value: CollectionPage},
	// 			{name: 'Link', value: ActivityStreams.Link}
	// 		]
	// 	}
	// })
	last?: CollectionPage|ActivityStreams.StreamLink;

	@IsOptional()
	// @Type(() => ActivityStreams.Object, {
	// 	discriminator: {
	// 		property: 'type',
	// 		subTypes: ActivityStreams.types
	// 	}
	// })
	items: ActivityStreams.StreamRoot[];

	@IsOptional()
	// @Type(() => ActivityStreams.Object, {
	// 	discriminator: {
	// 		property: 'type',
	// 		subTypes: ActivityStreams.types
	// 	}
	// })
	orderedItems: ActivityStreams.StreamObject[];
}

export class CollectionPage extends Collection {
	@IsOptional()
	@Type(() => ActivityStreams.StreamObject, {
		discriminator: {
			property: 'type',
			subTypes: [
				{name: 'Link', value: ActivityStreams.StreamLink},
				{name: 'Collection', value: Collection}
			]
		}
	})
	partOf?: string|Collection|ActivityStreams.StreamLink;

	@IsOptional()
	@Type(() => ActivityStreams.StreamObject, {
		discriminator: {
			property: 'type',
			subTypes: [
				{name: 'Link', value: ActivityStreams.StreamLink},
				{name: 'CollectionPage', value: CollectionPage}
			]
		}
	})
	next?: string|CollectionPage|ActivityStreams.StreamLink;

	@IsOptional()
	@Type(() => ActivityStreams.StreamRoot, {
		discriminator: {
			property: 'type',
			subTypes: [
				{name: 'Link', value: ActivityStreams.StreamLink},
				{name: 'CollectionPage', value: CollectionPage}
			]
		}
	})
	prev?: string|CollectionPage|ActivityStreams.StreamLink
}

export class Document extends ActivityStreams.StreamObject {
}

export class Event extends ActivityStreams.StreamObject {
}

export class Image extends ActivityStreams.StreamImage {
};

export class Note extends ActivityStreams.StreamObject {
}

export class Page extends ActivityStreams.StreamObject {
}

export class Place extends ActivityStreams.StreamObject {
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(100)
	accuracy?: number;

	@IsOptional()
	@IsNumber()
	altitude?: number;

	@IsOptional()
	@IsNumber()
	@Min(-90)
	@Max(90)
	latitude?: number;

	@IsOptional()
	@IsNumber()
	@Min(-180)
	@Max(180)
	longitude?: number;

	@IsOptional()
	@IsNumber()
	@Min(0)
	radius?: number;
}

export class Profile extends ActivityStreams.StreamObject {
	@Transform(ActivityStreams.transform('Object', {functional: true}))
	@IsOptional()
	describes?: ActivityStreams.StreamRoot
}

export class Relationship extends ActivityStreams.StreamObject {
	@Transform(ActivityStreams.transform('Object', {functional: true}))
	@IsOptional()
	subject?: ActivityStreams.StreamRoot;

	@Transform(ActivityStreams.transform('Object', {functional: true}))
	@IsOptional()
	object?: ActivityStreams.StreamRoot;

	@Transform(ActivityStreams.transform('Object', {functional: true}))
	@IsOptional()
	relationship?: ActivityStreams.StreamRoot;
}

export class Tombstone extends ActivityStreams.StreamObject {
	@IsOptional()
	@IsString()
	formerType?: string;

	@IsOptional()
	@IsString()
	@IsRFC3339()
	deleted?: string;
}

export class Video extends Document {
}

const objects = {Actor, Article, Audio, Collection, CollectionPage, Document, Event, Image, Note, Page, Place, Profile, Relationship, Tombstone, Video};

Object.values(objects).forEach(obj => ActivityStreams.register(obj));