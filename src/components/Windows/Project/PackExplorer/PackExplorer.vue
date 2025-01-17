<template>
	<SidebarWindow
		v-if="shouldRender"
		windowTitle="windows.packExplorer.title"
		:isVisible="isVisible"
		:hasMaximizeButton="false"
		:isFullscreen="false"
		:percentageWidth="80"
		:percentageHeight="80"
		@closeWindow="onClose"
		:sidebarItems="sidebar.elements"
		v-model="sidebar.selected"
	>
		<template #toolbar>
			<v-btn @click="createPreset" icon small>
				<v-icon :color="isDarkMode ? 'white' : 'grey darken-1'" small>
					mdi-plus
				</v-icon>
			</v-btn>
			<v-btn @click="refreshPackExplorer" icon small>
				<v-icon :color="isDarkMode ? 'white' : 'grey darken-1'" small>
					mdi-refresh
				</v-icon>
			</v-btn>
		</template>

		<template #sidebar>
			<v-text-field
				class="pt-2"
				prepend-inner-icon="mdi-magnify"
				:label="t('windows.packExplorer.searchFiles')"
				v-model="sidebar._filter"
				autofocus
				outlined
				dense
			/>
		</template>
		<template #default="{ selectedSidebar }">
			<div v-if="sidebar.currentElement.kind === 'directory'">
				<h1 class="mt-2 mb-6 d-flex align-center">
					<v-icon
						class="mr-1"
						large
						:color="sidebar.currentState.color"
					>
						{{ sidebar.currentState.icon }}
					</v-icon>
					{{ sidebar.currentState.text }}
				</h1>
				<FileDisplayer
					:key="selectedSidebar"
					:startPath="
						selectedSidebar ? selectedSidebar.split('/') : undefined
					"
					:entry="sidebar.currentState.directoryEntry"
					@closeWindow="onClose"
				/>
			</div>

			<div
				class="body-1"
				v-else-if="sidebar.currentElement.kind === 'file'"
			>
				<h1 class="mt-2 mb-6 d-flex align-center">
					<v-icon
						class="mr-1"
						large
						:color="sidebar.currentState.color"
					>
						{{ sidebar.currentState.icon }}
					</v-icon>
					{{ sidebar.currentState.text }}
				</h1>
				<p><strong>Path:</strong> {{ selectedSidebar }}</p>

				<div class="mt-8 d-flex">
					<v-spacer />
					<v-btn color="primary" @click="openFile(selectedSidebar)">
						Open
					</v-btn>
				</div>
			</div>
		</template>
	</SidebarWindow>
</template>

<script>
import SidebarWindow from '/@/components/Windows/Layout/SidebarWindow.vue'
import FileDisplayer from './FileDisplayer.vue'

import { App } from '/@/App'
import { TranslationMixin } from '/@/components/Mixins/TranslationMixin.ts'

export default {
	name: 'PackExplorerWindow',
	mixins: [TranslationMixin],
	components: {
		SidebarWindow,
		FileDisplayer,
	},
	props: ['currentWindow'],
	data() {
		return this.currentWindow
	},
	methods: {
		onClose() {
			this.currentWindow.close()
		},
		async refreshPackExplorer() {
			this.currentWindow.close()
			const app = await App.getApp()
			await app.project.refresh()
		},
		openFile(filePath) {
			this.currentWindow.close()
			App.ready.once((app) => {
				app.project.openFile(
					`projects/${app.selectedProject}/${filePath}`
				)
			})
		},
		createPreset() {
			this.currentWindow.close()
			App.ready.once((app) => app.windows.createPreset.open())
		},
	},
	computed: {
		isDarkMode() {
			return this.$vuetify.theme.dark
		},
	},
}
</script>
