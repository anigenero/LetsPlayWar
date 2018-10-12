import { isArray } from 'lodash';
import { BaseEntity, DeepPartial, ObjectType } from 'typeorm';

/**
 *
 * @param values
 * @param objectType
 */
export const fromDeepPartialArray = <T extends BaseEntity>(values: DeepPartial<T[]>, objectType: ObjectType<T>): T[] => {

	if (!isArray(values)) {
		return [];
	}

	const result: T[] = [];
	const count = values.length;
	for (let i = 0; i < count; i++) {
		result.push(new (objectType as any)((values as any[])[i]));
	}

	return result;

};
