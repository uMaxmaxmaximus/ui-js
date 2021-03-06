let stringLiteralRegExp = /(['"`])[\s\S]*?\1/img
let privatePropRegExp = /\.?_([\w$]+)/img
let label = `###${Math.random().toString().slice(2)}###`
let labelRegExp = new RegExp(label, 'img')


export default function compiler(code) {
	if (!code) return code
	let props = []

	// save literals
	let literals = []
	code = code.replace(stringLiteralRegExp, (literal)=> {
		literals.push(literal)
		return label
	})

	// transform code
	code = code.replace(privatePropRegExp, (match, prop)=> {
		if (props.indexOf(prop) === -1) {
			props.push(prop)
		}
		return `[$$${prop}$$]`
	})

	// restore literals
	code = code.replace(labelRegExp, ()=> literals.shift())

	// add symbols in head
	let symbolsInit = props.map(prop => {
		return `var $$${prop}$$ = Symbol('${prop}');`
	}).join('\n')

	if (!symbolsInit) return code
	return `${symbolsInit}\n\n${code}`
}

