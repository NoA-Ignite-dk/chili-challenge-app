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
	CAMERA = 'camera',
	UPLOAD = 'upload',
	CLOSE = 'close',
	PROFILE_POSTS = 'profile_posts',
	PROFILE_PLANTS = 'profile_plants',
	PROFILE_CLAIMED_POINTS = 'profile_claimed_points',
	EDIT = 'edit',
}

const IconConfig = {
	[IconType.FEED]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					d="M9 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30887 3.73061 8.01175 4.92679 7.28679L9.92679 4.25649C11.2011 3.48421 12.7989 3.48421 14.0732 4.25649L19.0732 7.28679C20.2694 8.01175 21 9.30887 21 10.7076V17C21 19.2091 19.2091 21 17 21H15M9 21V17C9 15.3431 10.3431 14 12 14V14C13.6569 14 15 15.3431 15 17V21M9 21H15"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</>
		),
	},
	[IconType.PROFILE_PLANTS]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path d="M13.8761 5.50996C15.7249 3.72254 20.5361 4.00571 20.5361 4.00571C20.5361 4.00571 20.871 9.71324 18.7601 11.5271C16.8282 13.1871 14.3767 13.5323 12.9881 11.5271C11.6886 9.65053 11.9902 7.33331 13.8761 5.50996Z" stroke-width="1.3" stroke-linejoin="round" />
				<Path d="M7.76314 3.66187C5.79831 2.04007 1.02048 2.73969 1.02048 2.73969C1.02048 2.73969 1.07475 8.45941 3.30273 10.0848C5.3418 11.5723 7.80955 11.7039 9.0577 9.58418C10.2257 7.60049 9.76748 5.31627 7.76314 3.66187Z" stroke-width="1.3" stroke-linejoin="round" />
				<Path d="M5 6C5 6 7.7007 8.35903 8.80769 10.3333C10.4859 13.3264 10.5 19 10.5 19C10.5 19 10.6622 13.4222 12.6154 10.7667C13.6722 9.32985 16 7.73333 16 7.73333" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
			</>
		),
	},
	[IconType.SCOREBOARD]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					d="M6.74531 4H17.3132C17.3132 4 16.4326 17.2571 12.0293 17.2571C9.87824 17.2571 8.56784 14.0935 7.79008 10.8571C6.97572 7.46844 6.74531 4 6.74531 4Z"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M17.3132 3.99985C17.3132 3.99985 18.2344 3.01718 19 2.99984C20.5 2.96588 20.7773 3.99985 20.7773 3.99985C21.0709 4.60938 21.3057 6.19414 19.8967 7.65699C18.4876 9.11985 16.9103 10.3999 16.2684 10.857"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M6.74527 4.0001C6.74527 4.0001 5.78547 3.00623 4.99995 3.0001C3.49995 2.98839 3.22264 4.0001 3.22264 4.0001C2.92908 4.60962 2.69424 6.19439 4.1033 7.65724C5.51235 9.1201 7.14823 10.4001 7.79004 10.8572"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M8.50662 20.0002C8.50662 18.1716 12.0292 17.2573 12.0292 17.2573C12.0292 17.2573 15.5519 18.1716 15.5519 20.0002H8.50662Z"
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
				<Path d="M21 2L20 3" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M3 2L4 3" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M21 16L20 15" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M3 16L4 15" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M9 18H15" stroke-linecap="round" stroke-linejoin="round" />
				<Path d="M10 21H14" stroke-linecap="round" stroke-linejoin="round" />
				<Path
					d="M11.9998 3C7.9997 3 5.95186 4.95029 5.99985 8C6.02324 9.48689 6.4997 10.5 7.49985 11.5C8.5 12.5 9 13 8.99985 15H14.9998C15 13.0001 15.5 12.5 16.4997 11.5001L16.4998 11.5C17.4997 10.5 17.9765 9.48689 17.9998 8C18.0478 4.95029 16 3 11.9998 3Z"
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
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
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
		definition: <Path strokeLinecap="round" strokeLinejoin="round" d="M10 3.333v13.334M16.667 10H3.333" />,
	},
	[IconType.CAMERA]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M2 19V9a2 2 0 012-2h.5a2 2 0 001.6-.8l2.22-2.96A.6.6 0 018.8 3h6.4a.6.6 0 01.48.24L17.9 6.2a2 2 0 001.6.8h.5a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z"
				/>
				<Path strokeLinecap="round" strokeLinejoin="round" d="M12 17a4 4 0 100-8 4 4 0 000 8z" />
			</>
		),
	},
	[IconType.UPLOAD]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path d="M3 20.4V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6z" />
				<Path strokeLinecap="round" strokeLinejoin="round" d="M6 18h12M12 14V6m0 0l3.5 3.5M12 6L8.5 9.5" />
			</>
		),
	},
	[IconType.CLOSE]: {
		viewBox: '24 24',
		definition: (
			<Path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6.757 17.243L12 12m5.243-5.243L12 12m0 0L6.757 6.757M12 12l5.243 5.243"
			/>
		),
	},
	[IconType.PROFILE_CLAIMED_POINTS]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					d="M6.74531 4H17.3132C17.3132 4 16.4325 17.2571 12.0293 17.2571C9.87823 17.2571 8.56783 14.0935 7.79008 10.8571C6.97571 7.46844 6.74531 4 6.74531 4Z"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M17.3132 3.99997C17.3132 3.99997 18.2344 3.0173 19 2.99996C20.5 2.966 20.7773 3.99997 20.7773 3.99997C21.0709 4.6095 21.3057 6.19426 19.8967 7.65712C18.4876 9.11997 16.9103 10.4 16.2684 10.8571"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M6.74527 3.99998C6.74527 3.99998 5.78547 3.00611 4.99995 2.99998C3.49995 2.98827 3.22264 3.99998 3.22264 3.99998C2.92908 4.6095 2.69424 6.19426 4.1033 7.65712C5.51235 9.11998 7.14823 10.4 7.79004 10.8571"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M8.50662 20C8.50662 18.1714 12.0292 17.2571 12.0292 17.2571C12.0292 17.2571 15.5519 18.1714 15.5519 20H8.50662Z"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</>
		),
	},
	[IconType.PROFILE_POSTS]: {
		viewBox: '24 24',
		definition: (
			<>
				<Path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M21.4189 15.7321C21.4189 19.3101 19.3099 21.4191 15.7319 21.4191H7.94991C4.36291 21.4191 2.24991 19.3101 2.24991 15.7321V7.93212C2.24991 4.35912 3.56391 2.25012 7.14291 2.25012H9.14291C9.86091 2.25112 10.5369 2.58812 10.9669 3.16312L11.8799 4.37712C12.3119 4.95112 12.9879 5.28912 13.7059 5.29012H16.5359C20.1229 5.29012 21.4469 7.11612 21.4469 10.7671L21.4189 15.7321Z"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path d="M7.481 14.463H16.216" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</>
		),
	},
	[IconType.EDIT]: {
		viewBox: '28 28',
		definition: (
			<>
				<Path d="M13.7474 20.4429H21" stroke-linecap="round" stroke-linejoin="round" />
				<Path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path d="M11.0208 6.00092L16.4731 10.188" stroke-linecap="round" stroke-linejoin="round" />
			</>
		),
	},
};

export default function Icon({
	type,
	width = 26,
	height = 26,
	fill = 'none',
	stroke = Colors.DARK_GREY,
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
