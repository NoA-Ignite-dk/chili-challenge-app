export function normalizeRows<T>(input: T | T[]): T[] {
	return Array.isArray(input) ? input : [input];
}

export function takeFirstRow<T>(input: T | T[]): T {
	return Array.isArray(input) ? input[0] : input;
}
