import React, { ReactNode, useState, useMemo } from 'react';

type AppProviderProps = {
	children: ReactNode;
};

type AuthContextType = {
	email: string;
	setEmail: Function;
	password: string;
	setPassword: Function;
	firstName: string;
	setFirstName: Function;
	lastName: string;
	setLastName: Function;
	plantNames: string;
	setPlantNames: Function;
	allUserData: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		plantNames: string;
	};
};

const AuthContext = React.createContext<AuthContextType>({
	email: '',
	setEmail: () => {},
	password: '',
	setPassword: () => {},
	firstName: '',
	setFirstName: () => {},
	lastName: '',
	setLastName: () => {},
	plantNames: '',
	setPlantNames: () => {},
	allUserData: {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		plantNames: '',
	},
});

export function useAuthContext() {
	return React.useContext(AuthContext);
}

export function AppProvider(props: AppProviderProps) {
	const { children } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [plantNames, setPlantNames] = useState('');

	const allUserData = {
		email,
		password,
		firstName,
		lastName,
		plantNames,
	};

	const value = useMemo(
		() => ({
			email,
			setEmail,
			password,
			setPassword,
			firstName,
			setFirstName,
			lastName,
			setLastName,
			plantNames,
			setPlantNames,
			allUserData,
		}),
		[email, firstName, lastName, password, plantNames, allUserData],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
