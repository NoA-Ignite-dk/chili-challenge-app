import { Text, TextInput, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Colors from '@src/config/colors';
import Variables from '@src/config/variables';

interface InputFieldProps {
	label: string;
	errorMessage?: string;
	placeholder: string;
	isValid: boolean;
	setIsValid: Function;
	text?: string;
	setText: Function;
	password?: boolean;
	disabled?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;
}

const styles = StyleSheet.create({
	label: {
		color: Colors.BLACK,
		fontFamily: 'Manrope_400Regular',
		position: 'relative',
		top: 10,
		left: 12,
		backgroundColor: Colors.WHITE,
		borderRadius: Variables.BORDER_RADIUS_LARGE,
		width: 150,
		padding: 2,
		paddingLeft: 10,
		zIndex: 10,
	},
	inputText: {
		color: Colors.BLACK,
		fontFamily: 'Manrope_400Regular',
		borderColor: Colors.LIGHT_GREY,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: Variables.BORDER_RADIUS_LARGE,
	},
	inputField: {
		width: '100%',
	},
	errorMessage: {
		fontFamily: 'Manrope_400Regular',
		color: Colors.ERROR_RED,
		paddingHorizontal: 20,
		paddingTop: 10,
	},
});

export default function InputField({
	label,
	errorMessage,
	placeholder,
	isValid,
	setIsValid,
	text,
	setText,
	password = false,
	disabled = false,
	...props
}: InputFieldProps) {
	const [entered, setEntered] = useState(false);

	useEffect(() => {
		if (text === '') {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	}, []);

	const handleChangeText = (text: string) => {
		setText(text);
		setEntered(true);
		if (text === '') {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	};

	const handleOnBlur = () => {
		setEntered(true);
	};

	return (
		<View style={styles.inputField}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				secureTextEntry={password}
				placeholderTextColor={Colors.GREY}
				style={styles.inputText}
				onBlur={handleOnBlur}
				onChangeText={handleChangeText}
				value={text}
				placeholder={placeholder}
				editable={!disabled}
				selectTextOnFocus={!disabled}
				{...props}
			/>
			{!isValid && entered && <Text style={styles.errorMessage}>{errorMessage}</Text>}
		</View>
	);
}
