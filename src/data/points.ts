import { supabase } from "@src/lib/supabase";
import { normalizeRows, takeFirstRow } from "@src/utils/normalizeData";
import { useQuery } from "react-query";
import { PointToClaim } from "./point-to-claim";

export const QUERY_KEY = 'POINTS';

export interface Point {
	id: number;
	claimed_at: string;
	user_id: string;
	post_id: number;
	point_to_claim: PointToClaim | null;
}

export async function getPointsByUserId(user_id: string): Promise<Point[]> {
	const { data, error } = await supabase
		.from('point')
		.select(`
			id,
			claimed_at,
			user_id,
			post_id,
			point_to_claim (
				id,
				title,
				type,
				amount
			)
		`)
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

export function usePointsByUserIdQuery(user_id: string) {
	const hook = useQuery([QUERY_KEY, user_id], {
		queryFn: () => getPointsByUserId(user_id),
	});

	return hook;
}
