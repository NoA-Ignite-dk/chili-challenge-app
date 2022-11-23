import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';

import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view';


// Components

// Config
import Colors from '@src/config/colors';
import InformationCard from '@src/components/InfoCard';
import Button from '@src/components/buttons/PrimaryButton';

const RulesRoute = () => (
	<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
		<InformationCard title="Rules" subtitle="Subtitle" imageSource={require('../../assets/images/chiliplant.jpg')} />
	</View>
);

const PointsRoute = () => (
	<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
		<InformationCard title="Points" subtitle="Subtitle" imageSource={require('../../assets/images/chiliplant.jpg')} />
	</View>
);

const TipsAndTrickRoute = () => (
	<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
		<InformationCard title="Tips and tricks" subtitle="Subtitle" imageSource={require('../../assets/images/chiliplant.jpg')} />
	</View>
);
const GeneralInfoRoute = () => (
	<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
		<InformationCard title="About the plant" subtitle="Subtitle" imageSource={require('../../assets/images/chiliplant.jpg')} />
	</View>
);


const renderTabBar = (props: SceneRendererProps & {
	navigationState: NavigationState<{
		key: string;
		title: string;
	}>;
}) => (
	<TabBar
		{...props}
		activeColor={Colors.GREEN_PRIMARY}
		inactiveColor={Colors.WHITE}
		style={{ backgroundColor: Colors.WHITE }}
		tabStyle={{width: 'auto', marginTop: 10, marginBottom: 10 }}
		scrollEnabled={true}
		renderIndicator={()=> null}
		renderLabel={({ route, color }) => {
			const isActive = color === Colors.GREEN_PRIMARY;

			return (
				<Button style={{ backgroundColor: color, padding: 15, borderRadius:12  }}>
					<Text style={{ textTransform: 'none', color: isActive ? Colors.WHITE : Colors.BLACK }}>{route.title}</Text>
				</Button>
			);
		}}
	/>
);

const renderScene = SceneMap({
	rules: RulesRoute,
	points: PointsRoute,
	tipsAndTricks: TipsAndTrickRoute,
	generalInfo: GeneralInfoRoute
});

export default function InformationScreen() {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);

	const [routes] = React.useState([
		{ key: 'rules', title: 'Rules' },
		{ key: 'points', title: 'Points' },
		{ key: 'tipsAndTricks', title: 'Tips and tricks' },
		{ key: 'generalInfo', title: 'About the plant' },
	]);

	return (
		<TabView
			navigationState={{ index, routes }}
			renderTabBar={renderTabBar}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
		/>
	);
}
