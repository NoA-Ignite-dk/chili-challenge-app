import Colors from '@src/config/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export enum IconType {
	FEED = 'feed',
	SCOREBOARD = 'scoreboard',
	POST = 'post',
	INFORMATION = 'information',
	PROFILE = 'profile',
	LOADING = 'loading',
	PLUS = 'plus',
}

const IconConfig = {
	[IconType.FEED]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					d="M9 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30887 3.73061 8.01175 4.92679 7.28679L9.92679 4.25649C11.2011 3.48421 12.7989 3.48421 14.0732 4.25649L19.0732 7.28679C20.2694 8.01175 21 9.30887 21 10.7076V17C21 19.2091 19.2091 21 17 21H15M9 21V17C9 15.3431 10.3431 14 12 14V14C13.6569 14 15 15.3431 15 17V21M9 21H15"
					stroke="#36354A"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</>
		),
	},
	[IconType.SCOREBOARD]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					d="M6.74531 4H17.3132C17.3132 4 16.4326 17.2571 12.0293 17.2571C9.87824 17.2571 8.56784 14.0935 7.79008 10.8571C6.97572 7.46844 6.74531 4 6.74531 4Z"
					stroke="#36354A"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M17.3132 3.99985C17.3132 3.99985 18.2344 3.01718 19 2.99984C20.5 2.96588 20.7773 3.99985 20.7773 3.99985C21.0709 4.60938 21.3057 6.19414 19.8967 7.65699C18.4876 9.11985 16.9103 10.3999 16.2684 10.857"
					stroke="#36354A"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M6.74527 4.0001C6.74527 4.0001 5.78547 3.00623 4.99995 3.0001C3.49995 2.98839 3.22264 4.0001 3.22264 4.0001C2.92908 4.60962 2.69424 6.19439 4.1033 7.65724C5.51235 9.1201 7.14823 10.4001 7.79004 10.8572"
					stroke="#36354A"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M8.50662 20.0002C8.50662 18.1716 12.0292 17.2573 12.0292 17.2573C12.0292 17.2573 15.5519 18.1716 15.5519 20.0002H8.50662Z"
					stroke="#36354A"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</>
		),
	},

	[IconType.POST]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					d="M4 12.25H12.25M20.5 12.25H12.25M12.25 12.25V4M12.25 12.25V20.5"
					stroke="#36354A"
					stroke-width="2.0625"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</>
		),
	},
	[IconType.INFORMATION]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path d="M21 2L20 3" stroke="#36354A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M3 2L4 3" stroke="#36354A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M21 16L20 15" stroke="#36354A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M3 16L4 15" stroke="#36354A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M9 18H15" stroke="#36354A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M10 21H14" stroke="#36354A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<Path
					d="M11.9998 3C7.9997 3 5.95186 4.95029 5.99985 8C6.02324 9.48689 6.4997 10.5 7.49985 11.5C8.5 12.5 9 13 8.99985 15H14.9998C15 13.0001 15.5 12.5 16.4997 11.5001L16.4998 11.5C17.4997 10.5 17.9765 9.48689 17.9998 8C18.0478 4.95029 16 3 11.9998 3Z"
					stroke="#36354A"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</>
		),
	},
	[IconType.PROFILE]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20"
					stroke="#36354A"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
					stroke="#36354A"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</>
		),
	},
	[IconType.LOADING]: {
		viewBox: '100 100',
		definition: (
			<Path fill="#fff" d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50">
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					dur="1s"
					from="0 50 50"
					repeatCount="indefinite"
					to="360 50 50"
					type="rotate"
				></animateTransform>
			</Path>
		),
	},
	[IconType.PLUS]: {
		viewBox: '20 20',
		definition: <Path stroke="#01CC8F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 3.333v13.334M16.667 10H3.333" />,
	},
};

export default function Icon({
	type,
	width = 26,
	height = 26,
	fill = 'none',
	stroke = Colors.BLACK,
	strokeWidth = 1.5,
}: {
	type: IconType;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
	width?: number;
	height?: number;
}) {
	const config = IconConfig[type];

	return (
		<Svg fill={fill} width={width} height={height} stroke={stroke} strokeWidth={strokeWidth} viewBox={`0 0 ${config.viewBox}`}>
			{config.definition}
		</Svg>
	);
}
