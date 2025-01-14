import { editor as Editor } from 'monaco-editor'
import { keyword } from 'color-convert'
import { Theme } from './Theme'

export class MonacoSubTheme {
	constructor(protected theme: Theme) {}

	apply() {
		Editor.defineTheme(`bridgeMonacoDefault`, {
			base: this.theme.colorScheme === 'light' ? 'vs' : 'vs-dark',
			inherit: false,
			colors: {
				'editor.background': this.convertColor(
					this.theme.getColor('background')
				),
				'editor.lineHighlightBackground': this.convertColor(
					this.theme.getColor('lineHighlightBackground')
				),
				'editorWidget.background': this.convertColor(
					this.theme.getColor('background')
				),
				'editorWidget.border': this.convertColor(
					this.theme.getColor('sidebarNavigation')
				),
				'pickerGroup.background': this.convertColor(
					this.theme.getColor('background')
				),
				'pickerGroup.border': this.convertColor(
					this.theme.getColor('sidebarNavigation')
				),
				'badge.background': this.convertColor(
					this.theme.getColor('background')
				),

				'input.background': this.convertColor(
					this.theme.getColor('sidebarNavigation')
				),
				'input.border': this.convertColor(this.theme.getColor('menu')),
				'inputOption.activeBorder': this.convertColor(
					this.theme.getColor('primary')
				),
				focusBorder: this.convertColor(this.theme.getColor('primary')),
				'list.focusBackground': this.convertColor(
					this.theme.getColor('menu')
				),
				'list.hoverBackground': this.convertColor(
					this.theme.getColor('sidebarNavigation')
				),
				contrastBorder: this.convertColor(
					this.theme.getColor('sidebarNavigation')
				),

				'peekViewTitle.background': this.convertColor(
					this.theme.getColor('background')
				),
				'peekView.border': this.convertColor(
					this.theme.getColor('primary')
				),
				'peekViewResult.background': this.convertColor(
					this.theme.getColor('sidebarNavigation')
				),
				'peekViewResult.selectionBackground': this.convertColor(
					this.theme.getColor('menu')
				),
				'peekViewEditor.background': this.convertColor(
					this.theme.getColor('background')
				),
				'peekViewEditor.matchHighlightBackground': this.convertColor(
					this.theme.getColor('menu')
				),
				...this.theme.getMonacoDefinition(),
			},
			rules: [
				//@ts-ignore Token is not required
				{
					background: this.convertColor(
						this.theme.getColor('background')
					),
					foreground: this.convertColor(this.theme.getColor('text')),
				},
				...Object.entries(this.theme.getHighlighterDefinition())
					.map(([token, { color, textDecoration, isItalic }]) => ({
						token: token,
						foreground: this.convertColor(color as string),
						fontStyle: `${
							isItalic ? 'italic ' : ''
						}${textDecoration}`,
					}))
					.filter(({ foreground }) => foreground !== undefined),
			],
		})
	}

	convertColor(color: string) {
		if (!color) return color
		if (color.startsWith('#')) {
			if (color.length === 4) {
				return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
			}
			return color
		}

		return keyword.hex(color as any)
	}
}
