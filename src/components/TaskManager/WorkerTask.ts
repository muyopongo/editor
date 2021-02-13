import { FileSystem } from '@/components/FileSystem/FileSystem'
import { EventDispatcher } from '@/components/Common/Event/EventDispatcher'

class Progress<T, K> {
	constructor(
		protected taskService: TaskService<T, K>,
		protected current: number,
		protected total: number,
		protected prevTotal: number
	) {}

	addToCurrent(value?: number) {
		this.current += value ?? 1
		this.taskService.dispatch([this.getCurrent(), this.getTotal()])
	}
	addToTotal(value?: number) {
		this.total += value ?? 1
		this.taskService.dispatch([this.getCurrent(), this.getTotal()])
	}

	getTotal() {
		return this.total > this.prevTotal ? this.total : this.prevTotal
	}
	getCurrent() {
		return this.current
	}

	setTotal(val: number) {
		this.total = val
	}
}

export abstract class TaskService<T, K = void> extends EventDispatcher<
	[number, number]
> {
	public fileSystem: FileSystem
	public progress!: Progress<T, K>
	constructor(
		protected taskId: string,
		baseDirectory: FileSystemDirectoryHandle
	) {
		super()
		this.fileSystem = new FileSystem(baseDirectory)
	}

	protected async loadPreviousTaskRun() {
		try {
			const file = await this.fileSystem.readFile(
				`bridge/tasks/${this.taskId}.txt`
			)
			const prevTotal = Number(await file.text())
			return Number.isNaN(prevTotal) ? 100 : prevTotal
		} catch {
			return 100
		}
	}
	protected async saveCurrentTaskRun() {
		await this.fileSystem.writeFile(
			`bridge/tasks/${this.taskId}.txt`,
			`${this.progress.getCurrent()}`
		)
	}

	protected abstract onStart(data: K): Promise<T> | T

	async start(data: K) {
		this.progress = new Progress(
			this,
			0,
			0,
			await this.loadPreviousTaskRun()
		)

		const result = await this.onStart(data)

		this.saveCurrentTaskRun()
		this.dispatch([this.progress.getCurrent(), this.progress.getCurrent()])

		return result
	}
}