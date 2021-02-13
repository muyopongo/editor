import { App } from '@/App'
import { ButtonToggle } from './Controls/ButtonToggle/ButtonToggle'
import { Toggle } from './Controls/Toggle/Toggle'
import { SettingsWindow } from './SettingsWindow'
import { settingsState } from './SettingsState'
import { ActionViewer } from './Controls/ActionViewer/ActionViewer'
import { Selection } from './Controls/Selection/Selection'
import { ProjectSelection } from './Controls/Selection/ProjectSelection'
import {
	getCurrentLanguage,
	getLanguages,
	selectLanguage,
} from '@/utils/locales'

export async function setupSettings(settings: SettingsWindow) {
	settings.addControl(
		new ButtonToggle({
			category: 'appearance',
			name: 'windows.settings.appearance.colorScheme.name',
			description: 'windows.settings.appearance.colorScheme.description',
			key: 'colorScheme',
			options: ['auto', 'dark', 'light'],
			default: 'auto',
			onChange: () => {
				App.getApp().then(app => app.themeManager.updateTheme())
			},
		})
	)
	settings.addControl(
		new Selection({
			category: 'appearance',
			name: 'windows.settings.appearance.darkTheme.name',
			description: 'windows.settings.appearance.darkTheme.description',
			key: 'darkTheme',
			get options() {
				return settings.parent.themeManager
					.getThemes('dark')
					.map(theme => ({ text: theme.name, value: theme.id }))
			},
			default: 'bridge.default.dark',
			onChange: () => {
				App.getApp().then(app => app.themeManager.updateTheme())
			},
		})
	)
	settings.addControl(
		new Selection({
			category: 'appearance',
			name: 'windows.settings.appearance.lightTheme.name',
			description: 'windows.settings.appearance.lightTheme.description',
			key: 'lightTheme',
			get options() {
				return settings.parent.themeManager
					.getThemes('light')
					.map(theme => ({ text: theme.name, value: theme.id }))
			},
			default: 'bridge.default.light',
			onChange: () => {
				App.getApp().then(app => app.themeManager.updateTheme())
			},
		})
	)
	settings.addControl(
		new ProjectSelection({
			category: 'appearance',
			name: 'windows.settings.appearance.localDarkTheme.name',
			description:
				'windows.settings.appearance.localDarkTheme.description',
			key: 'darkTheme',
			get options() {
				return settings.parent.themeManager
					.getThemes('dark', false)
					.map(theme => ({ text: theme.name, value: theme.id }))
					.concat([{ text: 'None', value: 'bridge.noSelection' }])
			},
			default: 'bridge.noSelection',
			onChange: () => {
				App.getApp().then(app => app.themeManager.updateTheme())
			},
		})
	)
	settings.addControl(
		new ProjectSelection({
			category: 'appearance',
			name: 'windows.settings.appearance.localLightTheme.name',
			description:
				'windows.settings.appearance.localLightTheme.description',
			key: 'lightTheme',
			get options() {
				return settings.parent.themeManager
					.getThemes('light', false)
					.map(theme => ({ text: theme.name, value: theme.id }))
					.concat([{ text: 'None', value: 'bridge.noSelection' }])
			},
			default: 'bridge.noSelection',
			onChange: () => {
				App.getApp().then(app => app.themeManager.updateTheme())
			},
		})
	)

	settings.addControl(
		new Toggle({
			category: 'appearance',
			name: 'windows.settings.appearance.sidebarRight.name',
			description: 'windows.settings.appearance.sidebarRight.description',
			key: 'isSidebarRight',
			default: false,
		})
	)
	settings.addControl(
		new Toggle({
			category: 'appearance',
			name: 'windows.settings.appearance.shrinkSidebarElements.name',
			description:
				'windows.settings.appearance.shrinkSidebarElements.description',
			key: 'smallerSidebarElements',
			default: false,
		})
	)

	settings.addControl(
		new ButtonToggle({
			category: 'developers',
			name: 'windows.settings.developer.simulateOS.name',
			description: 'windows.settings.developer.simulateOS.description',
			key: 'simulateOS',
			options: ['auto', 'win32', 'darwin', 'linux'],
			default: 'auto',
		})
	)
	settings.addControl(
		new Toggle({
			category: 'developers',
			name: 'windows.settings.developer.devMode.name',
			description: 'windows.settings.developer.devMode.description',
			key: 'isDevMode',
		})
	)

	settings.addControl(
		new Selection({
			category: 'general',
			name: 'windows.settings.general.language.name',
			description: 'windows.settings.general.language.description',
			key: 'locale',
			get options() {
				return getLanguages().map(lang => ({
					text: lang[1],
					value: lang[0],
				}))
			},
			default: getCurrentLanguage(),
			onChange: val => {
				selectLanguage(val)
			},
		})
	)

	settings.addControl(
		new Toggle({
			category: 'general',
			name: 'windows.settings.general.collaborativeMode.name',
			description:
				'windows.settings.general.collaborativeMode.description',
			key: 'fullLightningCacheRefresh',
			default: true,
		})
	)
	settings.addControl(
		new Toggle({
			category: 'general',
			name: 'windows.settings.general.packSpider.name',
			description:
				'windows.settings.general.packSpider.description',
			key: 'enablePackSpider',
			default: true,
		})
	)

	settings.addControl(
		new Toggle({
			category: 'general',
			name: 'windows.settings.general.openLinksInBrowser.name',
			description:
				'windows.settings.general.openLinksInBrowser.description',
			key: 'openLinksInBrowser',
			default: false,
		})
	)

	const app = await App.getApp()
	Object.values(app.actionManager.state).forEach(action => {
		settings.addControl(new ActionViewer(action))
	})
}