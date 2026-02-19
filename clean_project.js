const fs = require('fs')
const path = require('path')

const extensions = ['.js', '.jsx', '.css', '.html']
const rootDir = __dirname
const srcDir = path.join(rootDir, 'src')
const publicDir = path.join(rootDir, 'public')

function removeComments(content, ext) {
	if (ext === '.css') {
		// Remove CSS comments /* ... */
		return content.replace(/\/\*[\s\S]*?\*\//g, '')
	} else if (ext === '.html') {
		// Remove HTML comments <!-- ... -->
		return content.replace(/<!--[\s\S]*?-->/g, '')
	} else {
		// JS/JSX: Remove single line // and multi-line /* */
		// We need to be careful not to remove // inside strings
		// This regex is a bit complex to handle strings correctly
		// A simpler approach for this task is to use a regex that handles strings or comments

		// Matches:
		// 1. Strings "..." or '...' or `...`
		// 2. Multi-line comments /* ... */
		// 3. Single-line comments // ...
		const regex =
			/("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`)|(\/\*[\s\S]*?\*\/)|(\/\/.*)/g

		return content.replace(
			regex,
			(match, string, multiLineComment, singleLineComment) => {
				if (string) {
					return string // Keep strings as is
				}
				return '' // Remove comments
			},
		)
	}
}

function processFile(filePath) {
	const ext = path.extname(filePath).toLowerCase()
	if (!extensions.includes(ext)) return

	try {
		const content = fs.readFileSync(filePath, 'utf8')
		const newContent = removeComments(content, ext)

		// Simple check to avoid writing if no change (removes empty lines that might be left behind?
		// ideally we should also trim empty lines but maybe that's too aggressive)
		// Let's just write if different.

		// Also let's do a basic cleanup of multiple empty lines resulting from comment removal if we want to be nice
		// But the user just asked to remove comments.

		if (content !== newContent) {
			fs.writeFileSync(filePath, newContent, 'utf8')
			console.log(`Cleaned: ${filePath}`)
		}
	} catch (err) {
		console.error(`Error processing ${filePath}:`, err)
	}
}

function walkDir(dir) {
	if (!fs.existsSync(dir)) return
	const files = fs.readdirSync(dir)

	for (const file of files) {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		if (stat.isDirectory()) {
			if (file !== 'node_modules' && file !== '.git') {
				walkDir(filePath)
			}
		} else {
			processFile(filePath)
		}
	}
}

console.log('Starting cleanup...')
walkDir(srcDir)
walkDir(publicDir)
console.log('Cleanup finished.')
