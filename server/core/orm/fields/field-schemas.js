'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = require('../schema');

var _schema2 = _interopRequireDefault(_schema);

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldSchemas = function (_Field) {
	_inherits(FieldSchemas, _Field);

	function FieldSchemas(basePath, path, userSchema, options, internal) {
		_classCallCheck(this, FieldSchemas);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FieldSchemas).call(this, basePath, path, options, internal));

		_this.schema = new _schema2.default(userSchema, [].concat(_toConsumableArray(basePath), _toConsumableArray(path), ['..']), false);
		return _this;
	}

	_createClass(FieldSchemas, [{
		key: 'validate',
		value: function validate(data, basePath) {
			var _this2 = this;

			if (this.internal) return;
			var array = this.getByPath(data);

			if (!Array.isArray(array)) {
				this.typeError(Array, array, basePath);
			}

			array.forEach(function (value, index) {
				if (value !== Object(value)) _this2.typeError(Object, value, basePath, [index]);
				var subPath = [].concat(_toConsumableArray(basePath), _toConsumableArray(_this2.path), [index]);
				_this2.schema.validate(value, subPath);
			});
		}
	}, {
		key: 'convertToModelValue',
		value: function convertToModelValue(array) {
			var _this3 = this;

			return array.map(function (document) {
				var model = {};
				return _this3.schema.documentToModel(model, document);
			});
		}
	}, {
		key: 'convertToDocumentValue',
		value: function convertToDocumentValue(array) {
			var _this4 = this;

			return array.map(function (model) {
				var document = {};
				return _this4.schema.modelToDocument(model, document);
			});
		}
	}]);

	return FieldSchemas;
}(_field2.default);

exports.default = FieldSchemas;

//# sourceMappingURL=field-schemas.js.map