import { ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type DismissKeyboardProps = {
	children: ReactNode;
};

export const DismissKeyboard = ({ children }: DismissKeyboardProps) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
