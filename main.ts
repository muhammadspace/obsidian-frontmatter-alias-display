import { Plugin } from 'obsidian';

export default class FrontmatterAliasDisplay extends Plugin {
	displayAliases() {
		// const fileExplorer = app.workspace.getLeavesOfType('file-explorer')[0];
		// let files = fileExplorer.view.fileItems;
		for (const file of Object.values(app.workspace.getLeavesOfType('file-explorer')[0].view.fileItems)) {
			if (file.file) {

				const aliasDiv = file.titleEl.querySelector('.file-alias')
				if ( aliasDiv ) {
					aliasDiv.remove();
				}

				let aliases = app.metadataCache.getFileCache(file.file)?.frontmatter?.aliases;
				// console.log(aliases);
				file.titleEl.createEl('div', {text: aliases, cls: 'file-alias'});
			}
		}
	}
	
	async onload() {
		app.workspace.onLayoutReady(this.displayAliases);
		this.registerEvent(app.workspace.on("layout-change", this.displayAliases));
		this.registerEvent(app.workspace.on("editor-change", this.displayAliases));
	}

	onunload() {
		app.workspace.off("editor-change", this.displayAliases);
		const fileExplorer = app.workspace.getLeavesOfType('file-explorer')[0];
		let files = fileExplorer.view.fileItems;
		for (const file of Object.values(files)) {
			if (file.file) {
				const aliasDiv = file.titleEl.querySelector('.file-alias')
				if ( aliasDiv ) {
					aliasDiv.remove();
				}
			}
		}
	}
}