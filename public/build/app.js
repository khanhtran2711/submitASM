(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.css */ "./assets/styles/app.css");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/style.css */ "./assets/styles/style.css");
/* harmony import */ var _styles_fonts_icomoon_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/fonts/icomoon/style.css */ "./assets/styles/fonts/icomoon/style.css");
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main.js */ "./assets/main.js");
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_main_js__WEBPACK_IMPORTED_MODULE_3__);
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.css in this case)
 // import './styles/bootstrap.min.css';


 // start the Stimulus application
// import './bootstrap';



/***/ }),

/***/ "./assets/main.js":
/*!************************!*\
  !*** ./assets/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.object.values.js */ "./node_modules/core-js/modules/es.object.values.js");

$(function () {
  $("#loader").hide(); // Set the date we're counting down to

  var countDownDate = new Date("July 10, 2022 00:00:00").getTime(); // Update the count down every 1 second

  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime(); // Find the distance between now and the count down date

    var distance = countDownDate - now; // Time calculations for days, hours, minutes and seconds

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor(distance % (1000 * 60) / 1000); // Output the result in an element with id="demo"

    document.getElementById("demo").innerHTML = '<button type="button" class="btn btn-outline-primary">Countdown Timer  <span class="badge bg-secondary">' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's</span></button>'; // If the count down is over, write some text 

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = '<span class="badge bg-danger">EXPIRED</span>';
      $("#result").html('<div class="alert alert-danger" role="alert">You are out of time!</div>');
      $("#subBtn").attr("disabled", "disabled");
    }
  }, 1000);

  if (countDownDate > new Date().getTime()) {
    loadajax();
    $("#submitForm").on('submit', function (e) {
      e.preventDefault(); // var inputFile = document.getElementById('docFile');
      // var file = inputFile.files[0];

      var formData = new FormData(this);
      var files = $('#docFile')[0].files;

      if (files.length > 0) {
        console.log(files);
        formData.append('file', files[0]); // formData.append('file', file, file.name);
      }

      $.ajax({
        type: 'POST',
        url: "/submit",
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function beforeSend() {
          $("#loader").show();
        },
        complete: function complete() {
          $("#loader").hide();
        },
        success: function success(res) {
          $("#loader").hide();

          if (res.status == true) {
            $("#result").html('<div class="alert alert-success" role="alert">Congrats! Your information has been submitted.! Keep calm and have good luck on your defense</div>');
          } else {
            $("#result").html('<div class="alert alert-warning" role="alert">' + res.statusMsg + '</div>');
          } //  console.log(res);

        },
        error: function error() {
          $("#loader").hide();
          $("#result").html('<div class="alert alert-danger" role="alert">Error!</div>');
        }
      });
    });
  }
});

function loadajax() {
  var availableTags = function () {
    var tmp = null;
    $.ajax({
      'async': false,
      'type': "GET",
      'dataType': 'json',
      'url': "/student",
      'success': function success(data) {
        tmp = data.slice();
        $(".container").show();
      }
    });
    return tmp;
  }();

  Object.values = function (object) {
    var values = [];

    for (var property in object) {
      values.push(object[property].code);
    }

    return values;
  }; //console.log(Object.values(availableTags));


  $("#code").autocomplete({
    source: Object.values(availableTags)
  });
}

/***/ }),

/***/ "./assets/styles/app.css":
/*!*******************************!*\
  !*** ./assets/styles/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/styles/fonts/icomoon/style.css":
/*!***********************************************!*\
  !*** ./assets/styles/fonts/icomoon/style.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/styles/style.css":
/*!*********************************!*\
  !*** ./assets/styles/style.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_slice_js-node_modules_core-js_modules_es_date_t-6dc58c","assets_styles_fonts_icomoon_style_css"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8sVUFKSjtNQUtILFdBQVcsaUJBQVVHLElBQVYsRUFBZ0I7UUFDdkJjLEdBQUcsR0FBR2QsSUFBSSxDQUFDZSxLQUFMLEVBQU47UUFDQWxELENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0J5QyxJQUFoQjtNQUNIO0lBUkUsQ0FBUDtJQVVBLE9BQU9RLEdBQVA7RUFDQSxDQWJtQixFQUFwQjs7RUFjQUUsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLFVBQVNDLE1BQVQsRUFBaUI7SUFDaEMsSUFBSUQsTUFBTSxHQUFHLEVBQWI7O0lBQ0EsS0FBSSxJQUFJRSxRQUFSLElBQW9CRCxNQUFwQixFQUE0QjtNQUMxQkQsTUFBTSxDQUFDRyxJQUFQLENBQVlGLE1BQU0sQ0FBQ0MsUUFBRCxDQUFOLENBQWlCRSxJQUE3QjtJQUNEOztJQUNELE9BQU9KLE1BQVA7RUFDQSxDQU5ELENBZm1CLENBc0JuQjs7O0VBQ0FwRCxDQUFDLENBQUUsT0FBRixDQUFELENBQWF5RCxZQUFiLENBQTBCO0lBQ3pCQyxNQUFNLEVBQUVQLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSixhQUFkO0VBRGlCLENBQTFCO0FBR0M7Ozs7Ozs7Ozs7OztBQ3pHSDs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9tYWluLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYXBwLmNzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2ZvbnRzL2ljb21vb24vc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXG4gKlxuICogV2UgcmVjb21tZW5kIGluY2x1ZGluZyB0aGUgYnVpbHQgdmVyc2lvbiBvZiB0aGlzIEphdmFTY3JpcHQgZmlsZVxuICogKGFuZCBpdHMgQ1NTIGZpbGUpIGluIHlvdXIgYmFzZSBsYXlvdXQgKGJhc2UuaHRtbC50d2lnKS5cbiAqL1xuXG4vLyBhbnkgQ1NTIHlvdSBpbXBvcnQgd2lsbCBvdXRwdXQgaW50byBhIHNpbmdsZSBjc3MgZmlsZSAoYXBwLmNzcyBpbiB0aGlzIGNhc2UpXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5jc3MnO1xuLy8gaW1wb3J0ICcuL3N0eWxlcy9ib290c3RyYXAubWluLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL2ZvbnRzL2ljb21vb24vc3R5bGUuY3NzJztcblxuLy8gc3RhcnQgdGhlIFN0aW11bHVzIGFwcGxpY2F0aW9uXG4vLyBpbXBvcnQgJy4vYm9vdHN0cmFwJztcbmltcG9ydCAnLi9tYWluLmpzJztcbiIsIiQoZnVuY3Rpb24oKXtcbiAgICAkKFwiI2xvYWRlclwiKS5oaWRlKCk7XG4gICAgLy8gU2V0IHRoZSBkYXRlIHdlJ3JlIGNvdW50aW5nIGRvd24gdG9cbiAgICB2YXIgY291bnREb3duRGF0ZSA9IG5ldyBEYXRlKFwiSnVseSAxMCwgMjAyMiAwMDowMDowMFwiKS5nZXRUaW1lKCk7XG4gIFxuICAgIC8vIFVwZGF0ZSB0aGUgY291bnQgZG93biBldmVyeSAxIHNlY29uZFxuICAgIHZhciB4ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gIFxuICAgICAgLy8gR2V0IHRvZGF5J3MgZGF0ZSBhbmQgdGltZVxuICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICBcbiAgICAgIC8vIEZpbmQgdGhlIGRpc3RhbmNlIGJldHdlZW4gbm93IGFuZCB0aGUgY291bnQgZG93biBkYXRlXG4gICAgICB2YXIgZGlzdGFuY2UgPSBjb3VudERvd25EYXRlIC0gbm93O1xuICAgICAgICBcbiAgICAgIC8vIFRpbWUgY2FsY3VsYXRpb25zIGZvciBkYXlzLCBob3VycywgbWludXRlcyBhbmQgc2Vjb25kc1xuICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICAgIHZhciBob3VycyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpO1xuICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xuICAgICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjApKSAvIDEwMDApO1xuICAgIFxuICAgIFxuICAgICAgLy8gT3V0cHV0IHRoZSByZXN1bHQgaW4gYW4gZWxlbWVudCB3aXRoIGlkPVwiZGVtb1wiXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbW9cIikuaW5uZXJIVE1MID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIj5Db3VudGRvd24gVGltZXIgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmctc2Vjb25kYXJ5XCI+JytkYXlzICsgJ2QgJyArIGhvdXJzICsgJ2ggJysgbWludXRlcyArICdtICcrIHNlY29uZHMgKyAnczwvc3Bhbj48L2J1dHRvbj4nO1xuICAgICAgICBcbiAgICAgIC8vIElmIHRoZSBjb3VudCBkb3duIGlzIG92ZXIsIHdyaXRlIHNvbWUgdGV4dCBcbiAgICAgIGlmIChkaXN0YW5jZSA8IDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh4KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZW1vXCIpLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJnLWRhbmdlclwiPkVYUElSRUQ8L3NwYW4+JztcbiAgICAgICAgJChcIiNyZXN1bHRcIikuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHJvbGU9XCJhbGVydFwiPllvdSBhcmUgb3V0IG9mIHRpbWUhPC9kaXY+Jyk7XG4gICAgICAgICQoXCIjc3ViQnRuXCIpLmF0dHIoIFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiICk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gICAgaWYoY291bnREb3duRGF0ZSA+IG5ldyBEYXRlKCkuZ2V0VGltZSgpKXtcbiAgICAgIGxvYWRhamF4KCk7XG4gICAgICAkKFwiI3N1Ym1pdEZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAvLyB2YXIgaW5wdXRGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvY0ZpbGUnKTtcbiAgICAgICAgICAvLyB2YXIgZmlsZSA9IGlucHV0RmlsZS5maWxlc1swXTtcbiAgICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcyk7XG4gICAgICAgICAgdmFyIGZpbGVzID0gJCgnI2RvY0ZpbGUnKVswXS5maWxlcztcbiAgICAgICAgICBpZihmaWxlcy5sZW5ndGg+MCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlcyk7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLGZpbGVzWzBdKTtcbiAgICAgICAgICAgIC8vIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiBcIi9zdWJtaXRcIixcbiAgICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICBwcm9jZXNzRGF0YTpmYWxzZSxcbiAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNsb2FkZXJcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNsb2FkZXJcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjbG9hZGVyXCIpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgJChcIiNyZXN1bHRcIikuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcIiByb2xlPVwiYWxlcnRcIj5Db25ncmF0cyEgWW91ciBpbmZvcm1hdGlvbiBoYXMgYmVlbiBzdWJtaXR0ZWQuISBLZWVwIGNhbG0gYW5kIGhhdmUgZ29vZCBsdWNrIG9uIHlvdXIgZGVmZW5zZTwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAkKFwiI3Jlc3VsdFwiKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiIHJvbGU9XCJhbGVydFwiPicrcmVzLnN0YXR1c01zZysnPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjbG9hZGVyXCIpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICQoXCIjcmVzdWx0XCIpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5FcnJvciE8L2Rpdj4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICBcbiAgZnVuY3Rpb24gbG9hZGFqYXgoKXtcbiAgdmFyIGF2YWlsYWJsZVRhZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICB2YXIgdG1wID0gbnVsbDtcbiAgICQuYWpheCh7XG4gICAgICAgJ2FzeW5jJzogZmFsc2UsXG4gICAgICAgJ3R5cGUnOiBcIkdFVFwiLFxuICAgICAgICdkYXRhVHlwZSc6ICdqc29uJyxcbiAgICAgICAndXJsJzogXCIvc3R1ZGVudFwiLFxuICAgICAgICdzdWNjZXNzJzogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgdG1wID0gZGF0YS5zbGljZSgpO1xuICAgICAgICAgICAkKFwiLmNvbnRhaW5lclwiKS5zaG93KCk7XG4gICAgICAgfVxuICAgfSk7XG4gICByZXR1cm4gdG1wO1xuICB9KCk7XG4gIE9iamVjdC52YWx1ZXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgIGZvcih2YXIgcHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgIHZhbHVlcy5wdXNoKG9iamVjdFtwcm9wZXJ0eV0uY29kZSk7XG4gICB9XG4gICByZXR1cm4gdmFsdWVzO1xuICB9XG4gIC8vY29uc29sZS5sb2coT2JqZWN0LnZhbHVlcyhhdmFpbGFibGVUYWdzKSk7XG4gICQoIFwiI2NvZGVcIiApLmF1dG9jb21wbGV0ZSh7XG4gICBzb3VyY2U6IE9iamVjdC52YWx1ZXMoYXZhaWxhYmxlVGFncylcbiAgfSk7XG4gIH0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiJCIsImhpZGUiLCJjb3VudERvd25EYXRlIiwiRGF0ZSIsImdldFRpbWUiLCJ4Iiwic2V0SW50ZXJ2YWwiLCJub3ciLCJkaXN0YW5jZSIsImRheXMiLCJNYXRoIiwiZmxvb3IiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImNsZWFySW50ZXJ2YWwiLCJodG1sIiwiYXR0ciIsImxvYWRhamF4Iiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZmlsZXMiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiYXBwZW5kIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhIiwiZGF0YVR5cGUiLCJjb250ZW50VHlwZSIsImNhY2hlIiwicHJvY2Vzc0RhdGEiLCJiZWZvcmVTZW5kIiwic2hvdyIsImNvbXBsZXRlIiwic3VjY2VzcyIsInJlcyIsInN0YXR1cyIsInN0YXR1c01zZyIsImVycm9yIiwiYXZhaWxhYmxlVGFncyIsInRtcCIsInNsaWNlIiwiT2JqZWN0IiwidmFsdWVzIiwib2JqZWN0IiwicHJvcGVydHkiLCJwdXNoIiwiY29kZSIsImF1dG9jb21wbGV0ZSIsInNvdXJjZSJdLCJzb3VyY2VSb290IjoiIn0=