<template>
	<div>
		<component
			v-for="(window, uuid) in WINDOWS"
			:key="uuid"
			:is="window.component"
			:currentWindow="window"
		/>
	</div>
</template>

<script>
import { WINDOWS } from './create'

export default {
	name: 'CollectedWindows',

	data: () => ({
		WINDOWS,
	}),
}
</script>
