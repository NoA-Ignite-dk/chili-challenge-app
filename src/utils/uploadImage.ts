import { POST_IMAGES_BUCKET } from '@src/constants/general';
import { supabase } from '@src/lib/supabase';
import { decode } from 'base64-arraybuffer';
import { ImageInfo } from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (pickerResult: ImageInfo) => {
	const imageId = uuidv4();

	const { data, error } = await supabase.storage
		.from(POST_IMAGES_BUCKET)
		.upload(
			imageId,
			decode(pickerResult.base64 as string),
			{
				contentType: 'image/png',
			}
		);

	if (error) {
		throw error;
	}

	return data.path;
};
