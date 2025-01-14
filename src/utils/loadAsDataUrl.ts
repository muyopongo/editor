import { FileSystem } from '../components/FileSystem/FileSystem'
import { App } from '/@/App'

export async function loadAsDataURL(filePath: string, fileSystem?: FileSystem) {
	if (!fileSystem) {
		const app = await App.getApp()
		fileSystem = app.fileSystem
	}

	return new Promise<string>(async (resolve, reject) => {
		const reader = new FileReader()

		try {
			const fileHandle = await fileSystem!.getFileHandle(filePath)
			const file = await fileHandle.getFile()

			reader.addEventListener('load', () => {
				resolve(<string>reader.result)
			})
			reader.addEventListener('error', reject)
			reader.readAsDataURL(file)
		} catch {
			reject(`File does not exist: "${filePath}"`)
		}
	})
}
