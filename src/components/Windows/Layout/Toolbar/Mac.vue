<template>
	<v-system-bar height="30px" color="toolbar">
		<span
			:class="{ 'window-title': !hasSidebar }"
			:style="{
				'padding-left': hasSidebar
					? `calc(${sidebarWidth} + 12px)`
					: undefined,
			}"
			>{{ windowTitle }}</span
		>

		<div style="position: absolute; top: 3px;">
			<MacWindowControls
				v-if="!hasSidebar"
				:hasCloseButton="hasCloseButton"
				:hasMaximizeButton="hasMaximizeButton"
				:hasMinimizeButton="hasMinimizeButton"
				v-on="$listeners"
			/>
		</div>
		<v-spacer />
		<slot />
	</v-system-bar>
</template>

<script>
import MacWindowControls from './Mac/WindowControls.vue'

export default {
	name: 'MacToolbar',

	components: {
		MacWindowControls,
	},
	props: {
		windowTitle: String,
		hasSidebar: Boolean,
		sidebarWidth: {
			type: String,
			default: '25%',
		},
		hasCloseButton: {
			type: Boolean,
			default: true,
		},
		hasMinimizeButton: {
			type: Boolean,
			default: false,
		},
		hasMaximizeButton: {
			type: Boolean,
			default: true,
		},
	},
}
</script>

<style scoped>
.window-title {
	position: absolute;
	width: 100%;
	text-align: center;
}
</style>
