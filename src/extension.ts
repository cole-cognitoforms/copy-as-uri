// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copy-as-uri" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('copy-as-uri.copyCurrentFileUri', () => {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage('No file is currently open');
			return;
		}

		// Get the current file URI
		const fileUri = editor.document.uri;

		// Get the current cursor position
		const position = editor.selection.active;
		const line = position.line + 1; // Convert to 1-based line number
		const column = position.character + 1; // Convert to 1-based column number

		// Construct the VSCode URI in the format: vscode://file/{path}:line:column
		const vscodeUri = `vscode://file/${fileUri.fsPath}:${line}:${column}`;

		// Copy to clipboard
		vscode.env.clipboard.writeText(vscodeUri).then(() => {
			vscode.window.showInformationMessage(`Copied URI to clipboard: ${vscodeUri}`);
		}, (error) => {
			vscode.window.showErrorMessage(`Failed to copy URI: ${error}`);
		});
	});

	context.subscriptions.push(disposable);

	// Register the "Copy as URI Hyperlink" command
	const hyperlinkDisposable = vscode.commands.registerCommand('copy-as-uri.copyAsHyperlink', () => {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage('No file is currently open');
			return;
		}

		// Get the current file URI
		const fileUri = editor.document.uri;
		const fileName = fileUri.fsPath.split(/[\\/]/).pop() || 'file'; // Get just the filename

		// Get the current cursor position
		const position = editor.selection.active;
		const line = position.line + 1; // Convert to 1-based line number
		const column = position.character + 1; // Convert to 1-based column number

		// Construct the VSCode URI in the format: vscode://file/{path}:line:column
		const vscodeUri = `vscode://file/${fileUri.fsPath}:${line}:${column}`;

		// Create markdown hyperlink in format: [FileName.ext:lineNum](vscode://...)
		const hyperlink = `[\`${fileName}:${line}\`](${vscodeUri})`;

		// Copy to clipboard
		vscode.env.clipboard.writeText(hyperlink).then(() => {
			vscode.window.showInformationMessage(`Copied hyperlink to clipboard: ${hyperlink}`);
		}, (error) => {
			vscode.window.showErrorMessage(`Failed to copy hyperlink: ${error}`);
		});
	});

	context.subscriptions.push(hyperlinkDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
