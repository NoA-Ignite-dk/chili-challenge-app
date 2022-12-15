import React, { ReactNode, useState, useMemo } from 'react';

type AuthContextType = {
	email: string;
	setEmail: Function;
	password: string;
	setPassword: Function;
	firstName: string;
	setFirstName: Function;
	lastName: string;
	setLastName: Function;
	allUserData: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
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
	allUserData: {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	},
});

export function useAuthContext() {
	return React.useContext(AuthContext);
}

type AuthProviderProps = {
	children: ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
	const { children } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const allUserData = {
		email,
		password,
		firstName,
		lastName,
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
			allUserData,
		}),
		[email, firstName, lastName, password, allUserData],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
