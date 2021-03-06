'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require('ui-js/core/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentPatcher = function () {
	function ComponentPatcher() {
		_classCallCheck(this, ComponentPatcher);
	}

	_createClass(ComponentPatcher, null, [{
		key: 'test',
		value: function test(target) {
			if (!target) return false;
			return 'selector' in target || 'template' in target;
		}
	}, {
		key: 'patch',
		value: function patch(Class, module) {
			// try {
			if (module.hot.data) {
				var Wrapper = module.hot.data.wrapper;
			} else {
				var Wrapper = this.createWrapper(Class.name);
			}

			module.hot.dispose(function (data) {
				return data.wrapper = Wrapper;
			});
			module.hot.accept();

			Wrapper.__setClass(Class);
			// }
			// catch (e) {
			// 	console.error(e)
			// }

			return Wrapper;
		}
	}, {
		key: 'createWrapper',
		value: function createWrapper(name) {

			// to save original name
			var Wrapper = eval('(function ' + name + ' () {\n\t\t\treturn ' + name + '.__activeClass.apply(this, arguments) \n\t\t})');

			this.allWrappers.push(Wrapper);

			Wrapper.__inited = false;
			Wrapper.__oldStyle = null;
			Wrapper.__oldTemplate = null;
			Wrapper.__oldLogic = null;
			Wrapper.__activeClass = null;
			Wrapper.__oldActiveClass = null;
			Wrapper.__oldComponents = null;
			Wrapper.__oldTag = null;

			Wrapper.toString = function () {
				if (this.__activeClass) {
					return this.__activeClass.toString();
				}
				return '';
			};

			Wrapper.__setClass = function (Class) {
				this.__oldActiveClass = this.__activeClass;
				this.__activeClass = Class;

				// TODO check directives
				var templateHasDiff = this.__checkTemplate(Class);
				var componentsHasDiff = this.__checkComponents(Class);
				var styleHasDiff = this.__checkStyle(Class);
				var logicHasDiff = this.__checkLogic(Class);
				var tagHasDiff = this.__checkTag(Class);

				var inherits = this.__getInherits();
				this.__copyPropsFrom(Class, inherits);

				if (this.__inited) {

					if (tagHasDiff) {
						throw new Error('Page reload, cuz tag was changed');
					}

					if (logicHasDiff || componentsHasDiff) {
						this.__reload(inherits);
					} else {
						if (styleHasDiff) this.__reloadStyle(inherits);
						if (templateHasDiff) this.__reloadTemplate(inherits);
					}
				}

				this.__inited = true;
			};

			Wrapper.__reload = function (inherits) {
				this.reload();
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = inherits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var inherit = _step.value;
						inherit.reload();
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			};

			Wrapper.__reloadTemplate = function (inherits) {
				this.reloadTemplate();
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = inherits[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var inherit = _step2.value;
						inherit.reloadTemplate();
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			};

			Wrapper.__reloadStyle = function (inherits) {
				this.reloadStyle();
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = inherits[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var inherit = _step3.value;
						inherit.reloadStyle();
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			};

			Wrapper.__getInherits = function () {
				var SuperWrapper = arguments.length <= 0 || arguments[0] === undefined ? this : arguments[0];
				var inherits = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = ComponentPatcher.allWrappers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _Wrapper = _step4.value;

						if (this.__isInherit(_Wrapper, SuperWrapper)) {
							if (inherits.indexOf(_Wrapper) === -1) {
								inherits.push(_Wrapper);
							}
							this.__getInherits(_Wrapper, inherits);
						}
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				return inherits;
			};

			Wrapper.__isInherit = function (Wrapper, SuperWrapper) {
				var prototype = Object.getPrototypeOf(Wrapper.prototype);
				while (prototype) {
					if (prototype.constructor === SuperWrapper) {
						return true;
					}
					prototype = Object.getPrototypeOf(prototype);
				}
				return false;
			};

			Wrapper.__copyPropsFrom = function (Class, inherits) {
				var oldTemplate = this.template;
				var oldPrototype = this.prototype;

				var prototype = Object.getPrototypeOf(Class);
				if (Object.setPrototypeOf) Object.setPrototypeOf(this, prototype);else this.__proto__ = prototype;

				var newProps = Object.getOwnPropertyNames(Class);
				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = newProps[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var prop = _step5.value;

						var descriptor = Object.getOwnPropertyDescriptor(Class, prop);
						Object.defineProperty(this, prop, descriptor);
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}

				this.prototype.constructor = this;

				_component2.default.extend(this);

				if (this.__inited) {
					var removedProps = this.__getRemovedProps(newProps);
					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {
						for (var _iterator6 = removedProps[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							var removedProp = _step6.value;

							delete this[removedProp];
						}
					} catch (err) {
						_didIteratorError6 = true;
						_iteratorError6 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion6 && _iterator6.return) {
								_iterator6.return();
							}
						} finally {
							if (_didIteratorError6) {
								throw _iteratorError6;
							}
						}
					}

					this.__copyPropsToInherits(inherits, oldTemplate, oldPrototype);
				}
			};

			Wrapper.__getRemovedProps = function (newProps) {
				var currentProps = Object.getOwnPropertyNames(this.__oldActiveClass);
				return currentProps.filter(function (prop) {
					return newProps.indexOf(prop) === -1;
				});
			};

			Wrapper.__copyPropsToInherits = function (inherits, oldTemplate, oldPrototype) {
				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = inherits[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var inherit = _step7.value;

						// template
						if (inherit.template === oldTemplate) {
							inherit.template = this.template;
						}

						// logic
						var context = inherit.prototype;
						while (context) {
							var chainPrototype = Object.getPrototypeOf(context);
							if (chainPrototype === oldPrototype) {
								if (Object.setPrototypeOf) {
									Object.setPrototypeOf(context, this.prototype);
								} else {
									context.__proto__ = this.prototype;
								}
								break;
							}
							context = chainPrototype;
						}
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}
			};

			Wrapper.__checkTemplate = function (Class) {
				var template = Class.template + '';
				var hasDiff = this.__oldTemplate !== template;
				this.__oldTemplate = template;
				return hasDiff;
			};

			Wrapper.__checkStyle = function (Class) {
				var style = Class.style + '';
				var hasDiff = this.__oldStyle !== style;
				this.__oldStyle = style;
				return hasDiff;
			};

			Wrapper.__checkLogic = function (Class) {
				var logic = this.__getLogic(Class);
				var hasDiff = this.__oldLogic !== logic;
				this.__oldLogic = logic;
				return hasDiff;
			};

			Wrapper.__checkComponents = function (Class) {
				var components = Class.components || [];
				var oldComponents = this.__oldComponents || [];
				var hasDiff = this.__componentsHasDiff(components, oldComponents);
				this.__oldComponents = components.slice();
				return hasDiff;
			};

			Wrapper.__componentsHasDiff = function (components, oldComponents) {
				if (components.length !== oldComponents.length) {
					return true;
				}
				return components.some(function (component, index) {
					return oldComponents[index] !== component;
				});
			};

			Wrapper.__checkTag = function (Class) {
				var tag = Class.tag;
				var hasDiff = this.__oldTag !== tag;
				this.__oldTag = tag;
				return hasDiff;
			};

			Wrapper.__getLogic = function (Class) {
				var code = '';

				var _iteratorNormalCompletion8 = true;
				var _didIteratorError8 = false;
				var _iteratorError8 = undefined;

				try {
					for (var _iterator8 = Object.getOwnPropertyNames(Class)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
						var prop = _step8.value;

						if (prop === 'template' || prop === 'style') continue;
						var descriptor = Object.getOwnPropertyDescriptor(Class, prop);
						code += this.__getDescriptorCode(descriptor);
					}
				} catch (err) {
					_didIteratorError8 = true;
					_iteratorError8 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion8 && _iterator8.return) {
							_iterator8.return();
						}
					} finally {
						if (_didIteratorError8) {
							throw _iteratorError8;
						}
					}
				}

				var _iteratorNormalCompletion9 = true;
				var _didIteratorError9 = false;
				var _iteratorError9 = undefined;

				try {
					for (var _iterator9 = Object.getOwnPropertyNames(Class.prototype)[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
						var _prop = _step9.value;

						var _descriptor = Object.getOwnPropertyDescriptor(Class.prototype, _prop);
						code += this.__getDescriptorCode(_descriptor);
					}
				} catch (err) {
					_didIteratorError9 = true;
					_iteratorError9 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion9 && _iterator9.return) {
							_iterator9.return();
						}
					} finally {
						if (_didIteratorError9) {
							throw _iteratorError9;
						}
					}
				}

				return code;
			};

			Wrapper.__getDescriptorCode = function (descriptor) {
				if (descriptor.hasOwnProperty('value')) {
					var value = descriptor.value;

					if (typeof value === 'function') {
						return '' + descriptor.value;
					} else {
						return JSON.stringify(value);
					}
				}

				return '' + descriptor.get + descriptor.set;
			};

			return Wrapper;
		}
	}]);

	return ComponentPatcher;
}();

ComponentPatcher.allWrappers = [];
exports.default = ComponentPatcher;

//# sourceMappingURL=component-patcher.js.map