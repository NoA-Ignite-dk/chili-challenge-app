import { POST_IMAGES_BUCKET } from '@src/constants/general';
import { supabase } from '@src/lib/supabase';
import { decode } from 'base64-arraybuffer';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (pickerResult: any) => {
	const imageId = uuidv4();

	const { data, error } = await supabase.storage.from(POST_IMAGES_BUCKET).upload(imageId, decode(pickerResult.base64), {
		contentType: 'image/png',
	});

	if (error) {
		throw error;
	}

	return data.path;
};
