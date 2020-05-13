webpackHotUpdate("static/development/pages/cp/random/add.js",{

/***/ "./pages/cp/random/add.jsx":
/*!*********************************!*\
  !*** ./pages/cp/random/add.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_layouts_admin__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/layouts/admin */ "./components/layouts/admin.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_13__);














var Option = antd__WEBPACK_IMPORTED_MODULE_12__["Select"].Option;

var add =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(add, _Component);

  function add(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, add);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(add).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "handleInputChange", function (e, index) {
      console.log(e);
      _this.state.inputR[index] = e;

      _this.setState({
        inputR: _this.state.inputR
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "addInput", function () {
      _this.setState({
        inputR: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_this.state.inputR), [''])
      });
    });

    _this.state = {
      //add
      inputR: [],
      postList: []
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(add, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_10___default.a.get('/api/list-posts-random').then(function (response) {
        _this2.setState({
          postList: response.data.data
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(index) {
      this.state.inputR.splice(index, 1);
      this.setState({
        inputR: this.state.inputR
      });
      console.log(this.state.inputR);
    }
  }, {
    key: "submit",
    value: function submit(e) {
      e.preventDefault();
      console.log(this.state.inputR);
      var data = {
        posts: this.state.inputR,
        tag: this.tag.value
      };
      console.log(data);
      axios__WEBPACK_IMPORTED_MODULE_10___default.a.post('/api/create-random', data).then(function (result) {
        console.log(result);

        if (result.data.data == 'success') {
          next_router__WEBPACK_IMPORTED_MODULE_11___default.a.push('/random/list');
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var posts = this.state.posts;
      var _this$state = this.state,
          fetching = _this$state.fetching,
          data = _this$state.data,
          value = _this$state.value;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_layouts_admin__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this3.submit(e);
        },
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "form-group col-4"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("label", null, "Random Tag"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("select", {
        ref: function ref(input) {
          return _this3.tag = input;
        },
        className: "form-control",
        required: true
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("option", {
        value: ""
      }, "Select Tag"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("option", {
        value: "CatDog"
      }, "Cat and Dog"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("option", {
        value: "Meme"
      }, "Meme"))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "col-4 form-group"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("label", {
        htmlFor: ""
      }, " Select lang for the random"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("select", {
        className: "form-control",
        required: true
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("option", {
        value: "Ar"
      }, "Arabic"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("option", {
        value: "En"
      }, "English"))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "form-group col-4"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("label", {
        htmlFor: ""
      }, "to add mulitple posts "), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "button",
        className: "btn btn-primary",
        onClick: this.addInput
      }, "add more  posts")), this.state.inputR.map(function (post, index) {
        return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          key: index,
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_12__["Select"], {
          showSearch: true,
          style: {
            width: 200
          },
          placeholder: "Select a person",
          optionFilterProp: "children",
          value: post,
          onChange: function onChange(e) {
            return _this3.handleInputChange(e, index);
          }
          /*        onChange={onChange}
                 onFocus={onFocus}
                 onBlur={onBlur}
                 onSearch={onSearch} */
          ,
          filterOption: function filterOption(input, option) {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }
        }, _this3.state.postList.map(function (el) {
          return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Option, {
            key: el.id,
            value: el.id
          }, el.title);
        })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
          type: "button",
          onClick: function onClick() {
            return _this3.handleRemove(index);
          }
        }, " remove"));
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "form-group col-12"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "submit",
        className: "btn btn-block btn-info"
      }, "Add to Random")))));
    }
  }]);

  return add;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (add);

/***/ })

})
//# sourceMappingURL=add.js.560278e4c186d297a72e.hot-update.js.map