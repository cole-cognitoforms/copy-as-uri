# Copy as URI

Copy the current file location as a VSCode URI scheme link, perfect for sharing code references.

## Features

Two commands to copy the current file and line as VSCode URIs:

- **Copy as URI** - Copies URI in format: `vscode://file/C:/path/to/file.cs:10:5`
- **Copy as URI Hyperlink** - Copies markdown hyperlink: `` [`file.cs:10`](vscode://file/C:/path/to/file.cs:10:5) ``

## Usage

### Command Palette
1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Search for "Copy as URI" or "Copy as URI Hyperlink"
3. The URI is copied to your clipboard

### Context Menu
1. Right-click in the editor
2. Navigate to **Copy As** submenu
3. Select either command

## Use Cases

- Share specific code locations with teammates
- Reference code in documentation or markdown files
- Create clickable links to files and lines in VS Code

## Requirements

VS Code 1.107.0 or higher
