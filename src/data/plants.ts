import { supabase } from "@src/lib/supabase";
import { normalizeRows } from "@src/utils/normalizeData";
import { useQuery } from "react-query";

export const QUERY_KEY = 'PLANTS';

export interface Plant {
	id: number;
	name: string;
	image_url: string;
	primary: boolean;
}

export async function getPlantsByUserId(user_id: string): Promise<Plant[]> {
	const { data, error } = await supabase
		.from('plant')
		.select(`
			id,
			name,
			image_url,
			primary
		`)
		.eq('user_id', user_id)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find plants for user id: ${user_id}`);
	}

	return normalizeRows(data)
		.filter((e) => !!e?.id)
}

export function usePlantsByUserIdQuery(user_id: string) {
	const hook = useQuery([QUERY_KEY, user_id], {
		queryFn: () => getPlantsByUserId(user_id as string),
	});

	return hook;
}
