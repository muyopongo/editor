<template>
	<div v-if="tabSystem.shouldRender" class="tab-system">
		<TabBar :tabSystem="tabSystem" />

		<keep-alive>
			<component
				:is="tabSystem.currentComponent"
				:key="`${tabSystem.uuid}.${tabSystem.currentComponent.name}`"
				:tab="tabSystem.selectedTab"
				:id="id"
			/>
		</keep-alive>
	</div>
</template>

<script>
import WelcomeScreen from '/@/components/TabSystem/WelcomeScreen.vue'
import TabBar from '/@/components/TabSystem/TabBar.vue'
import { App } from '/@/App'

export default {
	name: 'TabSystem',
	props: {
		tabSystem: Object,
		id: {
			type: Number,
			default: 0,
		},
	},
	components: {
		TabBar,
		WelcomeScreen,
	},
	watch: {
		'tabSystem.shouldRender'() {
			App.getApp().then((app) => app.windowResize.dispatch())
		},
	},
}
</script>

<style scoped>
.tab-system {
	display: inline;
	width: 50%;
	height: 100%;
}
</style>
