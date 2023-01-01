import { supabase } from '@src/lib/supabase';
import { normalizeRows, takeFirstRow } from '@src/utils/normalizeData';
import { useQuery } from 'react-query';
import { PointToClaim } from './point-to-claim';

export const QUERY_KEY = 'POINTS';

export interface Point {
	id: number;
	claimed_at: string;
	point_to_claim: PointToClaim | null;
	post_id: number;
}

export async function getPoints(user_id: string): Promise<Point[]> {
	const { data, error } = await supabase
		.from('point')
		.select(
			`
			id,
			claimed_at,
			post_id,
			point_to_claim (
				id,
				title,
				type,
				amount
			)
		`,
		)
		.eq('user_id', user_id)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find points for user id: ${user_id}`);
	}

	return normalizeRows(data)
		.filter((e) => !!e?.id)
		.map((e) => {
			e.point_to_claim = takeFirstRow(e.point_to_claim);

			return e;
		}) as Point[];
}

export function usePointsQuery(user_id: string | undefined) {
	const hook = useQuery(QUERY_KEY, {
		queryFn: () => getPoints(user_id as string),
		enabled: !!user_id,
	});

	return hook;
}
