import { Plugin } from 'obsidian';

export default class FrontmatterAliasDisplay extends Plugin {
	displayAliases() {
		const fileExplorer = app.workspace.getLeavesOfType('file-explorer')[0];
		let files = fileExplorer.view.fileItems;
		for (const file of Object.values(files)) {
			if (file.file) {

				const aliasDiv = file.titleEl.querySelector('.file-alias')
				if ( aliasDiv ) {
					aliasDiv.remove();
				}

				let aliases = app.metadataCache.getFileCache(file.file)?.frontmatter?.aliases;
				let alias = app.metadataCache.getFileCache(file.file)?.frontmatter?.alias;

                let aliasContent = alias ? alias : aliases;
				// console.log(aliases);
				file.titleEl.createEl('div', {text: aliasContent, cls: 'file-alias nav-file-title-content'});
			}
		}
	}
	
	async onload() {
		app.workspace.onLayoutReady(this.displayAliases);
		app.workspace.on("layout-change", this.displayAliases);
		app.workspace.on("editor-change", this.displayAliases);
	}

	onunload() {
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