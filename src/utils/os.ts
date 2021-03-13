// import { createErrorNotification } from '/@/appCycle/Errors'

import { settingsState } from '/@/components/Windows/Settings/SettingsState'

export function platform() {
	if (
		settingsState?.developers?.simulateOS &&
		settingsState.developers.simulateOS !== 'auto'
	)
		return settingsState.developers.simulateOS

	const platform = navigator.platform.toLowerCase()
	return 'linux'
	

	// Breaks vue components \_o_/
	// createErrorNotification(new Error(`Unknown platform: ${platform}`))
}
