import { POST_IMAGES_BUCKET } from '@src/constants/general';
import { supabase } from '@src/lib/supabase';

export const getImageUrl = async (path: string) => {
	const { data } = supabase.storage.from(POST_IMAGES_BUCKET).getPublicUrl(path);

	console.log(data, 'data!!');

	return data.publicUrl;
};
