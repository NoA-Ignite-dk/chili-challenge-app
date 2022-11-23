import { Text, TextInput, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Colors from '@src/config/colors';

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
}

const styles = StyleSheet.create({
	label: {
		//   fontFamily: variables.fonts.openSans.bold,
		//   fontSize: variables.fontSizes.xsmall,
		color: Colors.BLACK,
		textTransform: 'uppercase',
	},
	inputText: {
		//   fontFamily: variables.fonts.openSans.regular,
		//   fontSize: variables.fontSizes.normal,
		color: Colors.BLACK,
	},
	inputField: {
		borderColor: Colors.BLACK,
		padding: 10,
		borderStyle: 'solid',
		width: '100%',
		borderBottomWidth: 1,
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
			/>
			{!isValid && entered && <Text>{errorMessage}</Text>}
		</View>
	);
}
