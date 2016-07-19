DOM = require('ui-js/dom')
ShadowStyle = require('./shadow-style')
Directive = require('./directive')
Tree = require('./tree')


module.exports = class Component

	@selector = ''
	@template = ''
	@styles = []
	@components = []
	@directives = []

	@tree = null
	@initedComponents = null
	@compiledTemplate = ''
	@id = 0

	lastId = 0
	compiledComponents = []
	shadowStyles = new Map()


	@create: (Class)->
		if Class in compiledComponents then return Class
		@extend(Class)
		compiledComponents.push(compiledComponents)
		Class.initedComponents = []
		Class.isComponent = yes
		Class.id = lastId++
		Class.compile()
		return Class


	@extend: (Class)->
		for own key, value of @
			unless Class[key]? then Class[key] = value
		if Class.prototype
			for key, value of @prototype when key isnt 'constructor'
				Class.prototype[key] = value
		return Class


	@compile: ->
		@compileComponents()
		@compileDirectives()
		@compileTemplate()
		@compileStyles()
		return


	@compileComponents: ->
		@components = @components.map (Class)-> Component.create(Class)
		return


	@compileDirectives: ->
		@directives = @directives.map (Class)-> Directive.create(Class)
		return


	@compileTemplate: ->
		templateNode = DOM.createElement('root')
		templateNode.html(@template)
		@tree = new Tree(templateNode, @)
		@compiledTemplate = @tree.template
		return


	@compileStyles: ->
		unless shadowStyles.has(@)
			styleNode = document.createElement('style')
			styleNode.setAttribute('shadow-style', @selector)
			document.head.appendChild(styleNode)
			shadowStyles.set(@, styleNode)

		@styles = @styles.map (style)=> ShadowStyle.compile(style)

		css = ''
		for shadowStyle in @styles
			components = [ui.components..., @components...]
			css += shadowStyle(@id, [ui.components..., @components...])

		styleNode = shadowStyles.get(@)
		styleNode.innerHTML = css
		return


	@getSubComponent: (node)->
		globalComponents = ui.components.filter (component)=>
			# отфильтруем глобальные компоненты от текущего, чтобы не было рекурсии
			return component isnt @

		components = globalComponents.concat(@components)

		for component in components
			tag = component.selector
			if tag is node.tag then return component
		return null


	@isSubComponent: (node)->
		return !!@getSubComponent(node)


	@getDirective: (name)->
		for Dir in @directives
			if Dir.attribute is name
				return Dir
		for Dir in ui.directives
			if Dir.attribute is name
				return Dir
		return null


	@find: (node, shadowPrefix = off)->
		selector = if shadowPrefix then "ui-#{@selector}" else @selector
		return node.querySelectorAll(selector)


	@createTemplateNodes: ->
		return @compiledTemplate.clone().children


	@define: (component, prop, value)->
		Object.defineProperty component, prop,
			value: value
			writable: off
			enumerable: off
			configurable: on
		return


	@init: (host, app)->
		children = @createTemplateNodes()
		shadowRoot = host.createShadowRoot(@id)
		shadowRoot.html(children)

		component = Object.create(@prototype)
		locals = Object.create(ui.globals)

		@define(component, 'host', host)
		@define(component, 'locals', locals)
		@define(component, 'app', app or component)
		host.component = component

		# construct
		component.constructor()

		@tree.init(shadowRoot, component, locals)
		@initedComponents.push(component)

		host.one 'destroy', =>
			component.destructor?()
			index = @initedComponents.indexOf(component)
			@initedComponents.splice(index, 1)
			return

		return component


	@reloadStyles: ->
		@compileStyles()
		return


	@reloadTemplate: ->
		@compileTemplate()

		for component in @initedComponents.slice()
			host = component.host
			locals = component.locals
			host.destroyShadowRoot()

			children = @createTemplateNodes()
			shadowRoot = host.createShadowRoot(@id)
			shadowRoot.html(children)

			@tree.init(shadowRoot, component, locals)
		return


	@reload: ->
		@compile()
		for component in @initedComponents.slice()
			host = component.host
			app = component.app
			host.destroy(no)
			host.destroyShadowRoot()
			@init(host, app)
		return


	require: (name)->
		match = name.match /(.+?)(\?)?$/
		name = match[1]
		optional = !!match[2]

		context = @host.parent
		while context
			if context.component?.constructor?.selector is name
				return context.component
			context = context.parent
		if optional then return null
		throw Error "Not found parent component '#{name}' required in '#{@constructor.selector}'"
		return


	emit: (eventName, event)->
		@host.emit(eventName, event)
		return


	on: (eventName, handler)->
		@host.on(eventName, handler)
		return


	one: (eventName, handler)->
		@host.one(eventName, handler)
		return


	own: (eventName, handler)->
		@host.own(eventName, handler)
		return


	off: (eventName, handler)->
		@host.off(eventName, handler)
		return


	bindClass: (className, exp)->
		return @host.bindClass(className, exp, @, @locals)


	bind: (prop, exp)->
		return ui.bind(@, prop, @, exp, @locals)


	watch: (prop, handler)->
		return ui.watch(@, prop, handler, null, off)
		
