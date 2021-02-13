import { v4 as uuid } from 'uuid'
import { TabSystem } from './TabSystem'
import { IFileSystem } from '@/components/FileSystem/Common'
import { App } from '@/App'
import { FileType } from '../Data/FileType'
import { PackType } from '../Data/PackType'

export abstract class Tab {
	abstract component: Vue.Component
	uuid = uuid()
	hasRemoteChange = false
	isUnsaved = false

	setIsUnsaved(val: boolean) {
		this.isUnsaved = val
	}

	static is(filePath: string) {
		return false
	}

	constructor(protected parent: TabSystem, protected path: string) {}

	get name() {
		const pathArr = this.path.split(/\\|\//g)
		return pathArr.pop()!
	}
	getPath() {
		return this.path
	}
	getPackPath() {
		return this.path.replace(
			`projects/${App.instance.selectedProject}/`,
			''
		)
	}
	get icon() {
		return FileType.get(this.getPackPath())?.icon ?? 'mdi-file-outline'
	}
	get iconColor() {
		return PackType.get(this.getPath())?.color
	}

	get isSelected() {
		return this.parent.selectedTab === this
	}
	select() {
		this.parent.select(this)
		return this
	}
	close() {
		this.parent.close(this)
	}
	isFor(path: string) {
		return path === this.path
	}

	onActivate() {}
	onDeactivate() {}
	onDestroy() {}

	abstract save(): void | Promise<void>

	copy() {
		document.execCommand('copy')
	}
	cut() {
		document.execCommand('cut')
	}
	paste() {}
}