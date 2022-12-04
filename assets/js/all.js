"use strict";

//新增資料
var formElement = document.querySelector('.js_form');
var originData = {};
var data = {};
var c3Obj = {};
var c3Array = [];
formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  var name = formElement[0].value.trim();
  var imgUrl = formElement[1].value.trim();
  var area = formElement[2].value.trim();
  var price = formElement[3].value.trim();
  var group = formElement[4].value.trim();
  var rate = formElement[5].value.trim();
  var description = formElement[6].value.trim();
  var error_name = document.querySelector('.js_error_name');
  var error_imgUrl = document.querySelector('.js_error_imgUrl');
  var error_area = document.querySelector('.js_error_area');
  var error_price = document.querySelector('.js_error_price');
  var error_group = document.querySelector('.js_error_group');
  var error_rate = document.querySelector('.js_error_rate');
  var reFilter = document.querySelector('.js_filterGroup');

  if (!formElement[0].validity.valid) {
    error_name.innerHTML = "\u5957\u7968\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A";
  } else {
    error_name.innerHTML = '';
  }

  if (!formElement[1].validity.valid) {
    if (formElement[1].value == '') {
      error_imgUrl.innerHTML = "\u5716\u7247\u7DB2\u5740\u4E0D\u80FD\u70BA\u7A7A";
    } else {
      error_imgUrl.innerHTML = "\u5716\u7247\u7DB2\u5740\u683C\u5F0F\u932F\u8AA4";
    }
  } else {
    error_imgUrl.innerHTML = '';
  }

  if (!formElement[2].validity.valid) {
    error_area.innerHTML = "\u8ACB\u9078\u64C7\u666F\u9EDE\u5730\u5340";
  } else {
    error_area.innerHTML = '';
  }

  if (!formElement[3].validity.valid) {
    if (formElement[3].value == '') {
      error_price.innerHTML = "\u8ACB\u8F38\u5165\u5957\u7968\u91D1\u984D";
    } else {
      error_price.innerHTML = "\u5957\u7968\u91D1\u984D\u683C\u5F0F\u932F\u8AA4";
    }
  } else {
    error_price.innerHTML = '';
  }

  if (!formElement[4].validity.valid) {
    if (formElement[4].value == '') {
      error_group.innerHTML = "\u8ACB\u8F38\u5165\u5957\u7968\u7D44\u6578";
    } else {
      error_group.innerHTML = "\u5957\u7968\u7D44\u6578\u683C\u5F0F\u932F\u8AA4";
    }
  } else {
    error_group.innerHTML = '';
  }

  if (!formElement[5].validity.valid) {
    if (formElement[5].value == '') {
      error_rate.innerHTML = "\u8ACB\u8F38\u5165\u5957\u7968\u661F\u7D1A";
    } else {
      error_rate.innerHTML = "\u5957\u7968\u661F\u7D1A\u683C\u5F0F\u932F\u8AA4";
    }
  } else {
    error_rate.innerHTML = '';
  }

  if (formElement[0].validity.valid && formElement[1].validity.valid && formElement[2].validity.valid && formElement[3].validity.valid && formElement[4].validity.valid && formElement[5].validity.valid && formElement[6].validity.valid) {
    console.log(data);
    console.log(name, imgUrl, area, price, group, rate, description);
    originData.push({
      "id": data.length,
      name: name,
      imgUrl: imgUrl,
      area: area,
      description: description,
      group: group,
      price: price,
      rate: rate
    });
    formElement.reset();
    error_name.innerHTML = '';
    error_imgUrl.innerHTML = '';
    error_area.innerHTML = '';
    error_price.innerHTML = '';
    error_group.innerHTML = '';
    error_rate.innerHTML = '';
    reFilter.value = '全部地區';
    console.log(originData);
    render(originData);
    c3Data();
  }
}); //渲染畫面

var init = function init() {
  var _url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
  axios.get(_url).then(function (res) {
    originData = res.data.data;
    data = originData;
    render(originData);
    c3Data();
  })["catch"](function () {
    console.log('error');
  });
};

init();

var render = function render(arr) {
  var ticketList = document.querySelector('.js_ticketList');
  var filterNum = document.querySelector('.js_filter');
  var str = '';
  arr.forEach(function (item) {
    var content = "\n      <li\n        class=\"col-span-4 bg-white shadow-[0px_3px_6px_#00000029] rounded\"\n      >\n        <div class=\"relative\">\n          <img\n            class=\"block w-full h-[180px] object-cover rounded-t\"\n            src=\"".concat(item.imgUrl, "\"\n            alt=\"\"\n          />\n          <div\n            class=\"absolute px-5 py-2 bg-secondary text-white text-xl rounded-r top-0 -translate-y-1/4\"\n          >\n          ").concat(item.area, "\n          </div>\n          <div\n            class=\"absolute px-2 py-[5px] bg-primary text-white rounded-r bottom-0 translate-y-1/2\"\n          >\n          ").concat(item.rate, "\n          </div>\n        </div>\n        <div\n          class=\"flex flex-col justify-between h-[calc(100%_-_180px)] p-5\"\n        >\n          <div>\n            <h3\n              class=\"text-primary text-2xl font-medium pb-1 mb-4 border-b-2 border-b-primary\"\n            >\n            ").concat(item.name, "\n            </h3>\n            <p class=\"mb-5\">\n            ").concat(item.description, "\n            </p>\n          </div>\n          <div class=\"flex justify-between items-center\">\n            <p class=\"text-primary\">\n              <span class=\"material-symbols-outlined align-middle mr-[6px]\">\n                error\n              </span>\n              \u5269\u4E0B\u6700\u5F8C <span id=\"ticketCard-num\"> ").concat(item.group, " </span> \u7D44\n            </p>\n            <p class=\"flex items-center text-primary\">\n              TWD\n              <span\n                class=\"font-roboto text-[32px] ml-1\"\n                id=\"ticketCard-price\"\n              >\n                $").concat(item.price, "\n              </span>\n            </p>\n          </div>\n        </div>\n      </li>\n    ");
    str += content;
  });
  ticketList.innerHTML = str;
  filterNum.innerHTML = "\u641C\u5C0B\u8CC7\u6599\u70BA ".concat(arr.length, " \u7B46");
};

var filterGroup = document.querySelector('.js_filterGroup');
filterGroup.addEventListener('change', function (e) {
  if (e.target.value == '全部地區') {
    init();
  } else {
    var newData = data.filter(function (item) {
      return item.area == e.target.value;
    });
    render(newData);
  }
});

var c3Data = function c3Data() {
  originData.forEach(function (item) {
    c3Obj[item.area] ? c3Obj[item.area] += 1 : c3Obj[item.area] = 1;
  });
  var chart = c3.generate({
    bindto: '#chart',
    size: {
      height: 250,
      width: 480
    },
    data: {
      columns: Object.entries(c3Obj),
      type: 'donut'
    },
    donut: {
      label: {
        show: false
      },
      title: "套票地區比重",
      width: 20
    }
  });
};
//# sourceMappingURL=all.js.map
