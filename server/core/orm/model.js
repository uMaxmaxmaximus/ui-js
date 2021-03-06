'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arangojs = require('arangojs');

var _arangojs2 = _interopRequireDefault(_arangojs);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
	function Model() {
		_classCallCheck(this, Model);
	}

	_createClass(Model, [{
		key: 'save',


		/******************* public methods *******************/

		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.abrupt('return', this.constructor.save(this));

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save() {
				return ref.apply(this, arguments);
			}

			return save;
		}()
	}, {
		key: 'update',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								return _context2.abrupt('return', this.constructor.update(this));

							case 1:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function update() {
				return ref.apply(this, arguments);
			}

			return update;
		}()
	}, {
		key: 'remove',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								return _context3.abrupt('return', this.constructor.remove(this));

							case 1:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function remove() {
				return ref.apply(this, arguments);
			}

			return remove;
		}()
	}, {
		key: 'restore',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								return _context4.abrupt('return', this.constructor.restore(this));

							case 1:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function restore() {
				return ref.apply(this, arguments);
			}

			return restore;
		}()
	}], [{
		key: '_getSchema',
		// connection options
		value: function _getSchema() {
			if (!this._normalSchema) {
				this._normalSchema = new _schema2.default(this.schema);
			}
			return this._normalSchema;
		} // user schema

	}, {
		key: '_getDatabase',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
				var dbName, host, port, username, password, db;
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								if (!Model._database) {
									_context5.next = 2;
									break;
								}

								return _context5.abrupt('return', Model._database);

							case 2:
								dbName = this.options.database;
								host = this.options.host || 'localhost';
								port = this.options.port || 8529;
								username = this.options.username || 'root';
								password = this.options.password || '';
								db = (0, _arangojs2.default)({
									url: 'http://' + username + ':' + password + '@' + host + ':' + port
								});
								_context5.prev = 8;
								_context5.next = 11;
								return db.createDatabase(dbName);

							case 11:
								_context5.next = 15;
								break;

							case 13:
								_context5.prev = 13;
								_context5.t0 = _context5['catch'](8);

							case 15:

								db.useDatabase(dbName);

								Model._database = db;
								return _context5.abrupt('return', db);

							case 18:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this, [[8, 13]]);
			}));

			function _getDatabase() {
				return ref.apply(this, arguments);
			}

			return _getDatabase;
		}()
	}, {
		key: '_getCollection',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
				var db, collection;
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								if (!this._collection) {
									_context6.next = 2;
									break;
								}

								return _context6.abrupt('return', this._collection);

							case 2:
								_context6.next = 4;
								return this._getDatabase();

							case 4:
								db = _context6.sent;
								collection = db.collection(this.name);
								_context6.prev = 6;
								_context6.next = 9;
								return collection.create();

							case 9:
								_context6.next = 11;
								return this._setIndexes(collection);

							case 11:
								_context6.next = 15;
								break;

							case 13:
								_context6.prev = 13;
								_context6.t0 = _context6['catch'](6);

							case 15:
								return _context6.abrupt('return', this._collection = collection);

							case 16:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this, [[6, 13]]);
			}));

			function _getCollection() {
				return ref.apply(this, arguments);
			}

			return _getCollection;
		}()
	}, {
		key: '_setIndexes',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(collection) {
				var schema, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field, path, unique;

				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								schema = this._getSchema();
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								_context7.prev = 4;
								_iterator = schema[Symbol.iterator]();

							case 6:
								if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
									_context7.next = 17;
									break;
								}

								field = _step.value;

								if (field.options.index) {
									_context7.next = 10;
									break;
								}

								return _context7.abrupt('continue', 14);

							case 10:
								path = field.path.join('.');
								unique = field.options.unique;
								_context7.next = 14;
								return collection.createHashIndex(path, { unique: unique });

							case 14:
								_iteratorNormalCompletion = true;
								_context7.next = 6;
								break;

							case 17:
								_context7.next = 23;
								break;

							case 19:
								_context7.prev = 19;
								_context7.t0 = _context7['catch'](4);
								_didIteratorError = true;
								_iteratorError = _context7.t0;

							case 23:
								_context7.prev = 23;
								_context7.prev = 24;

								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}

							case 26:
								_context7.prev = 26;

								if (!_didIteratorError) {
									_context7.next = 29;
									break;
								}

								throw _iteratorError;

							case 29:
								return _context7.finish(26);

							case 30:
								return _context7.finish(23);

							case 31:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this, [[4, 19, 23, 31], [24,, 26, 30]]);
			}));

			function _setIndexes(_x) {
				return ref.apply(this, arguments);
			}

			return _setIndexes;
		}()
	}, {
		key: '_call',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(method) {
				var collection,
				    _len,
				    args,
				    _key,
				    _args8 = arguments;

				return regeneratorRuntime.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								_context8.prev = 0;
								_context8.next = 3;
								return this._getCollection();

							case 3:
								collection = _context8.sent;

								if (collection[method]) {
									_context8.next = 6;
									break;
								}

								throw Error('Collection has not method \'' + method + '\'');

							case 6:
								for (_len = _args8.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
									args[_key - 1] = _args8[_key];
								}

								_context8.next = 9;
								return collection[method].apply(collection, args);

							case 9:
								return _context8.abrupt('return', _context8.sent);

							case 12:
								_context8.prev = 12;
								_context8.t0 = _context8['catch'](0);

								console.error(_context8.t0);

							case 15:
							case 'end':
								return _context8.stop();
						}
					}
				}, _callee8, this, [[0, 12]]);
			}));

			function _call(_x2, _x3) {
				return ref.apply(this, arguments);
			}

			return _call;
		}()
	}, {
		key: '_validate',
		value: function _validate(data) {
			var schema = this._getSchema();
			schema.validate(data);
		}
	}, {
		key: '_getDocument',
		value: function _getDocument(documentHandle) {
			return this._call('document', documentHandle);
		}
	}, {
		key: '_getDocuments',
		value: function _getDocuments(documentHandles) {
			return this._call('lookupByKeys', documentHandles);
		}
	}, {
		key: '_createModelByDocument',
		value: function _createModelByDocument(document) {
			var model = Object.create(this.prototype);
			this._documentToModel(model, document);
			model.constructor();
			return model;
		}
	}, {
		key: '_documentToModel',
		value: function _documentToModel(model, document) {
			var schema = this._getSchema();
			schema.documentToModel(model, document);
			return model;
		}
	}, {
		key: '_modelToDocument',
		value: function _modelToDocument(model) {
			var schema = this._getSchema();
			var document = {};
			schema.modelToDocument(model, document);
			return document;
		}

		/******************* public static methods *******************/

	}, {
		key: 'add',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(data) {
				var documentHandle, document;
				return regeneratorRuntime.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								this._validate(data);
								data = this._modelToDocument(data);
								data._removed = false;
								_context9.next = 5;
								return this._call('save', data);

							case 5:
								documentHandle = _context9.sent;
								_context9.next = 8;
								return this._call('document', documentHandle);

							case 8:
								document = _context9.sent;
								return _context9.abrupt('return', this._createModelByDocument(document));

							case 10:
							case 'end':
								return _context9.stop();
						}
					}
				}, _callee9, this);
			}));

			function add(_x4) {
				return ref.apply(this, arguments);
			}

			return add;
		}()
	}, {
		key: 'get',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(documentHandle) {
				var document;
				return regeneratorRuntime.wrap(function _callee10$(_context10) {
					while (1) {
						switch (_context10.prev = _context10.next) {
							case 0:
								_context10.next = 2;
								return this._getDocument(documentHandle);

							case 2:
								document = _context10.sent;
								return _context10.abrupt('return', this._createModelByDocument(document));

							case 4:
							case 'end':
								return _context10.stop();
						}
					}
				}, _callee10, this);
			}));

			function get(_x5) {
				return ref.apply(this, arguments);
			}

			return get;
		}()
	}, {
		key: 'getArr',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(documentHandles) {
				var _this = this;

				var documents;
				return regeneratorRuntime.wrap(function _callee11$(_context11) {
					while (1) {
						switch (_context11.prev = _context11.next) {
							case 0:
								_context11.next = 2;
								return this._getDocuments(documentHandles);

							case 2:
								documents = _context11.sent;
								return _context11.abrupt('return', documents.map(function (document) {
									return _this._createModelByDocument(document);
								}));

							case 4:
							case 'end':
								return _context11.stop();
						}
					}
				}, _callee11, this);
			}));

			function getArr(_x6) {
				return ref.apply(this, arguments);
			}

			return getArr;
		}()
	}, {
		key: 'save',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(model) {
				var document, newHandle;
				return regeneratorRuntime.wrap(function _callee12$(_context12) {
					while (1) {
						switch (_context12.prev = _context12.next) {
							case 0:
								this._validate(model);
								document = this._modelToDocument(model);
								_context12.next = 4;
								return this._call('update', model._id, document);

							case 4:
								newHandle = _context12.sent;

								model._rev = newHandle._rev;
								return _context12.abrupt('return', model);

							case 7:
							case 'end':
								return _context12.stop();
						}
					}
				}, _callee12, this);
			}));

			function save(_x7) {
				return ref.apply(this, arguments);
			}

			return save;
		}()
	}, {
		key: 'update',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(model) {
				var document;
				return regeneratorRuntime.wrap(function _callee13$(_context13) {
					while (1) {
						switch (_context13.prev = _context13.next) {
							case 0:
								_context13.next = 2;
								return this._getDocument(model);

							case 2:
								document = _context13.sent;

								this._documentToModel(model, document);
								return _context13.abrupt('return', model);

							case 5:
							case 'end':
								return _context13.stop();
						}
					}
				}, _callee13, this);
			}));

			function update(_x8) {
				return ref.apply(this, arguments);
			}

			return update;
		}()
	}, {
		key: 'remove',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(model) {
				return regeneratorRuntime.wrap(function _callee14$(_context14) {
					while (1) {
						switch (_context14.prev = _context14.next) {
							case 0:
								model._removed = true;
								return _context14.abrupt('return', this.save(model));

							case 2:
							case 'end':
								return _context14.stop();
						}
					}
				}, _callee14, this);
			}));

			function remove(_x9) {
				return ref.apply(this, arguments);
			}

			return remove;
		}()
	}, {
		key: 'restore',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee15(model) {
				return regeneratorRuntime.wrap(function _callee15$(_context15) {
					while (1) {
						switch (_context15.prev = _context15.next) {
							case 0:
								model._removed = false;
								return _context15.abrupt('return', this.save(model));

							case 2:
							case 'end':
								return _context15.stop();
						}
					}
				}, _callee15, this);
			}));

			function restore(_x10) {
				return ref.apply(this, arguments);
			}

			return restore;
		}()
	}, {
		key: 'find',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee16(selector) {
				var _this2 = this;

				var skip = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
				var limit = arguments.length <= 2 || arguments[2] === undefined ? 100 : arguments[2];
				var cursor, documents;
				return regeneratorRuntime.wrap(function _callee16$(_context16) {
					while (1) {
						switch (_context16.prev = _context16.next) {
							case 0:
								if (!selector) selector = {};
								limit = Math.min(Math.max(limit, 0), 100);
								selector._removed = false;
								_context16.next = 5;
								return this._call('byExample', selector, { skip: skip, limit: limit });

							case 5:
								cursor = _context16.sent;
								_context16.next = 8;
								return cursor.all();

							case 8:
								documents = _context16.sent;
								return _context16.abrupt('return', documents.map(function (document) {
									return _this2._createModelByDocument(document);
								}));

							case 10:
							case 'end':
								return _context16.stop();
						}
					}
				}, _callee16, this);
			}));

			function find(_x11, _x12, _x13) {
				return ref.apply(this, arguments);
			}

			return find;
		}()
	}, {
		key: 'findOne',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee17(selector) {
				var skip = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
				var models, model;
				return regeneratorRuntime.wrap(function _callee17$(_context17) {
					while (1) {
						switch (_context17.prev = _context17.next) {
							case 0:
								_context17.next = 2;
								return this.find(selector, skip, 1);

							case 2:
								models = _context17.sent;
								model = models[0];
								return _context17.abrupt('return', model || null);

							case 5:
							case 'end':
								return _context17.stop();
						}
					}
				}, _callee17, this);
			}));

			function findOne(_x16, _x17) {
				return ref.apply(this, arguments);
			}

			return findOne;
		}()
	}, {
		key: 'count',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee18(selector) {
				var cursor;
				return regeneratorRuntime.wrap(function _callee18$(_context18) {
					while (1) {
						switch (_context18.prev = _context18.next) {
							case 0:
								_context18.next = 2;
								return this._call('byExample', selector);

							case 2:
								cursor = _context18.sent;
								return _context18.abrupt('return', cursor.count);

							case 4:
							case 'end':
								return _context18.stop();
						}
					}
				}, _callee18, this);
			}));

			function count(_x19) {
				return ref.apply(this, arguments);
			}

			return count;
		}()
	}, {
		key: 'have',
		value: function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee19(selector) {
				var model;
				return regeneratorRuntime.wrap(function _callee19$(_context19) {
					while (1) {
						switch (_context19.prev = _context19.next) {
							case 0:
								_context19.next = 2;
								return this.findOne(selector);

							case 2:
								model = _context19.sent;
								return _context19.abrupt('return', !!model);

							case 4:
							case 'end':
								return _context19.stop();
						}
					}
				}, _callee19, this);
			}));

			function have(_x20) {
				return ref.apply(this, arguments);
			}

			return have;
		}()
	}]);

	return Model;
}();

Model.options = null;
Model.schema = null;
Model._normalSchema = null;
Model._collection = null;
Model._database = null;
exports.default = Model;

//# sourceMappingURL=model.js.map