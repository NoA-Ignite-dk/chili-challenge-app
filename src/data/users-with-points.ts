import { supabase } from "@src/lib/supabase";
import { normalizeRows, takeFirstRow } from "@src/utils/normalizeData";
import { useQuery } from "react-query";
import { PointToClaim } from "./point-to-claim";

export const QUERY_KEY = 'USERS_WITH_POINTS';

export interface UserWithPoints {
	id: string;
	fullName: string;
	profilePicture: string;
	point: {
		point_to_claim: PointToClaim | null;
	}[];
}

export async function getUsersWithPoints(): Promise<UserWithPoints[]> {
	const { data, error } = await supabase
		.from('profiles')
		.select(`
			id,
			fullName: full_name,
			profilePicture: avatar_url,
			point (
				point_to_claim (
					id,
					title,
					type,
					amount
				)
			)
		`)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find profiles`);
	}

	return normalizeRows(data)
		.filter((e) => !!e?.id)
		.map((e) => {
			if (e.point) {
				e.point = normalizeRows(e.point)
					.map((point) => {
						return {
							...point,
							point_to_claim: takeFirstRow(point.point_to_claim),
						};
					});
			}

			return e;
		}) as UserWithPoints[];
}

export function useUsersWithPointsQuery() {
	return useQuery(QUERY_KEY, () => getUsersWithPoints());
}
