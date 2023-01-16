$(document).ready(function() {

	var select = $("select");

	select.change(function() {
		var select_name = $(this).children("option:selected").text();
		$(this).siblings("label").text(select_name);
	});

	/* 이벤트 탭 */
	$(".tabArea > section > h3 a, .tabArea2 > section > h3 a").bind("focus click", function(e) {
		e.preventDefault();

		$(".tabArea > section > div, .tabArea2 > section > div").hide();
		$(this).parent().next().show();


		$(".tabArea > section > h3 a, .tabArea2 > section > h3 a").each(function() {
			$(this).removeClass('on');
		});

		$(this).addClass('on');
	});

	tabMenu();
	layerPopEvent();

});

$(function() {
	eventTrigger.numberKeyup();
	eventTrigger.numberKeyup2();
});

var layerPop = {
	open: function(targetID) {
		targetID = $('.' + targetID);

		var scrollTemp = $(window).scrollTop();
		var wrap = targetID.parents('.layerPop'),
			bg = wrap.find('.dim');

		// 화면의 중앙에 레이어를 띄운다.
		if (targetID.outerHeight() < $(document).height()) targetID.css('margin-top', '-' + targetID.outerHeight() / 2 + 'px');
		else targetID.css('top', '0px');
		if (targetID.outerWidth() < $(document).width()) targetID.css('margin-left', '-' + targetID.outerWidth() / 2 + 'px');
		else targetID.css('left', '0px');

		//bg.show().css('height', $('.pop-wrapper').height());
		bg.show();
		targetID.show();
		wrap.show();
		layerPop.action(targetID, scrollTemp);
	},
	close: function() {
		$('.dim').hide();
		$('.layerPop').hide();
		$('.layerPop').find('.popup-wrapper').hide();
	},
	action: function(targetID, scrollTemp) {
		if (targetID.height() > $(window).height()) { //popup height이 window.height을 넘어가는 경우(top에서 50px)
			targetID.css({ 'top': scrollTemp + 30, 'position': 'absolute' });
			$(window).on('scroll', function(e) {

				if ($(window).scrollTop() < scrollTemp + 30) { //scrollTop이 popup이 위치한 화면을 넘어가는 경우 강제적으로 popupTop으로 scroll을 이동
					$('html,body').scrollTop(scrollTemp);
					e.preventDefault();
				};

			});
		} else { //popup height이 window.height을 안넘어감 (가운대 정렬)
			targetID.css('margin-top', (-targetID.height() / 2) + 'px');
		}

	}
};




/**
 * <pre>
 * 1. MethodName : fnDateSet
 * 2. ClassName  : common.js
 * 3. Comment    : 날짜 셋팅 - 오늘, 일주일, 15일, 한달, 두달
 * 4. 작성자       : laby
 * 5. 작성일       : 2018. 3. 22.
 * </pre>
 *
 * @param v_start_name
 * @param v_end_name
 * @param s_year
 * @param s_month
 * @param s_day
 * @param e_year
 * @param e_month
 * @param e_day
 * @param seperator
 */
function fnDateSet(v_start_name, v_end_name, s_year, s_month, s_day, e_year, e_month, e_day, seperator) {
	$('#' + v_start_name).val(getCalculatedDate(s_year, s_month, s_day, seperator));
	$('#' + v_end_name).val(getCalculatedDate(e_year, e_month, e_day, seperator));
}

/**
 * <pre>
 * 1. MethodName : getCalculatedDate
 * 2. ClassName  : common.js
 * 3. Comment    : 날짜 계산
 * 4. 작성자       : laby
 * 5. 작성일       : 2018. 3. 22.
 * </pre>
 *
 * @param iYear
 * @param iMonth
 * @param iDay
 * @param seperator
 * @returns
 */
function getCalculatedDate(iYear, iMonth, iDay, seperator) {
	//현재 날짜 객체를 얻어옴.
	var gdCurDate = new Date();

	//현재 날짜에 날짜 게산.
	gdCurDate.setYear(gdCurDate.getFullYear() + iYear);
	gdCurDate.setMonth(gdCurDate.getMonth() + iMonth);
	gdCurDate.setDate(gdCurDate.getDate() + iDay);

	//실제 사용할 연, 월, 일 변수 받기.
	var giYear = gdCurDate.getFullYear();
	var giMonth = gdCurDate.getMonth() + 1;
	var giDay = gdCurDate.getDate();

	//월, 일의 자릿수를 2자리로 맞춘다.
	giMonth = '0' + giMonth;
	giMonth = giMonth.substring(giMonth.length - 2, giMonth.length);
	giDay = '0' + giDay;
	giDay = giDay.substring(giDay.length - 2, giDay.length);

	//display 형태 맞추기.
	return giYear + seperator + giMonth + seperator + giDay;
}


function layerPopEvent() {
	$("body").on('click', '.open-pop', function(event) {
		event.preventDefault();
		$("body").addClass('pop-wrapper');
		targetID = $(this).attr('data-target');
		layerPop.open(targetID);
	});

	$('.btn-pop-close, .pop-close').on('click', function(event) {
		event.preventDefault();
		$("body").removeClass('pop-wrapper');
		layerPop.close();
	});
};

function menuOpen() {
	$(".sub-menu > ul > li").each(function() {
		var $this = $(this);
		if ($this.find('li').hasClass('on') == true) {
			$this.addClass('on');

			if ($this.hasClass('on') == true) {
				$this.children('ul').show();
			}
		}

		if ($this.children('ul').length > 0) {
			$this.addClass('down');
		}
	});
}

/*
	  #tabMenu li가 on된 a의 data-target의 값과 같은 id를 show()
*/
function tabMenu() {
	var $tab = $("#tabMenu ul");
	var $tabPanel = $(".tab-area .tab-contents");
	var $item = $tab.children("li");

	if ($tabPanel.length > 0) {
		$tabPanel.hide();
		$item.each(function() {
			var $this = $(this);
			if ($this.hasClass('on')) {
				var $dataTarget = $this.children("a").attr("data-target");
				$("#" + $dataTarget).show();

			}
		});
		$item.click(function() {
			var $this = $(this);
			$item.removeClass("on");
			$this.addClass("on");
			var $dataTarget = $this.children("a").attr("data-target");
			$tabPanel.hide();
			$("#" + $dataTarget).show();

			return false;
		});
	}
}

$(window).resize(function() {
	tabMenu();
});

//function tab_menu(num){
//	var f = $('.tab-menu1').find('a');
//	for ( var i = 0; i < f.length; i++ ) {
//		if ( i == num) {
//			f.eq(i).addClass('selected');
//			$('.menu_tab0' + i ).show();
//		} else {
//			f.eq(i).removeClass('selected');
//			$('.menu_tab0' + i ).hide();
//		}
//	}
//}
jQuery(function($) {
	var tab = $('.tab_list');
	tab.removeClass('js_off');
	tab.css('height', tab.find('>ul>li>ul:visible').height() + 40);
	function onSelectTab() {
		var t = $(this);
		var myClass = t.parent('li').attr('class');
		t.parents('.tab_list:first').attr('class', 'tab_list ' + myClass);
		tab.css('height', t.next('ul').height() + 40);
	}
	tab.find('>ul>li>a').click(onSelectTab).focus(onSelectTab);
});

/*
 function alert(txt, callbackMethod, jsonData){
	  modal({
		  type: 'alert',
		  text: txt,
		  callback: function(result){
			  if(callbackMethod){
				  callbackMethod(jsonData);
			  }
		  }
	  });
 }

 function confirm(txt, callbackMethod){
	 modal({
		 type: 'confirm',
		 text: txt,
		 callback: function(result) {
			 if(result){
				 callbackMethod(result);
			 }
		 }
	 });
 }
*/
function searchResultCheck(searchCount, searchYn) {
	if (searchCount == 0 && searchYn == "Y") {
		alert("검색결과가 없습니다.");
		history.back();
	}
}

/**
 * <pre>
 * 1. MethodName : stringUtil
 * 2. ClassName  : common.js
 * 3. Comment    : 문자열 관련 함수
 * 4. 작성자       : laby
 * 5. 작성일       : 2018. 3. 22.
 * </pre>
 *
 */
var stringUtil = {
	/**
	 * <pre>
	 * 1. MethodName : getString
	 * 2. ClassName  : common.js
	 * 3. Comment    : 문자열확인 후 문자열 또는 기본값 리턴
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param str 체크 문자열
	 * @param def 기본값
	 * @returns
	 */
	getString: function(str, def) {
		if (str != undefined && str && str != '' && str != 'null') {
			return $.trim(str);
		} else {
			return $.trim(def);
		}
	},
	/**
	 * <pre>
	 * 1. MethodName : getInt
	 * 2. ClassName  : common.js
	 * 3. Comment    : 정수형 확인 후 정수형 또는 기본값 리턴
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param num 체크 정수형
	 * @param def 기본값
	 * @returns
	 */
	getInt: function(num, def) {
		var val = parseInt(num.replace(/,/gi, ''), 10);
		if (isNaN(val)) {
			return def;
		} else {
			return val;
		}
	},
	/**
	 * <pre>
	 * 1. MethodName : trim
	 * 2. ClassName  : common.js
	 * 3. Comment    : 공백제거
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param str 공백 제거 할 문자열
	 * @returns
	 */
	trim: function(str) {
		return $.trim(str);
	},
	/**
	 * <pre>
	 * 1. MethodName : getDateView
	 * 2. ClassName  : common.js
	 * 3. Comment    : 설명추가부분
	 * 4. 작성자       : Date
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param regdt
	 * @returns {String}
	 */
	getDateView: function(regdt) {

		var yyyy = regdt.substring(0, 4);
		var MM = regdt.substring(4, 6) - 1;
		var dd = regdt.substring(6, 8);
		var hh = regdt.substring(8, 10);
		var mm = regdt.substring(10, 12);
		var ss = regdt.substring(12, 14);

		var nowDate = new Date();
		var regDate = new Date(yyyy, MM, dd, hh, mm, ss);

		var ss = Math.floor(nowDate.getTime() - regDate.getTime()) / 1000;
		var mm = Math.floor(ss / 60);
		var hh = Math.floor(mm / 60);
		var day = Math.floor(hh / 24);

		var diff_hour = Math.floor(hh % 24);
		var diff_minute = Math.floor(mm % 60);
		//var diff_second = Math.floor(ss % 60);

		var returnDate = '';
		if (day > 1 || diff_hour > 1) {
			returnDate = regDate.format('yyyy.MM.dd HH:mm');
		} else {
			returnDate = diff_minute + '분 전';
		}

		return returnDate;
	},
	/**
	 * <pre>
	 * 1. MethodName : formatDate
	 * 2. ClassName  : common.js
	 * 3. Comment    : Format Date
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param regdt
	 * @param f
	 * @returns
	 */
	formatDate: function(regdt, f) {

		var yyyy = regdt.substring(0, 4);
		var yy = regdt.substring(2, 4);
		var MM = regdt.substring(4, 6);
		var dd = regdt.substring(6, 8);
		var hh = regdt.substring(8, 10);
		var mm = regdt.substring(10, 12);
		var ss = regdt.substring(12, 14);

		return f.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/gi, function($1) {
			switch ($1) {
				case 'yyyy':
					return yyyy;
				case 'yy':
					return yy.zf(2);
				case 'MM':
					return MM.zf(2);
				case 'dd':
					return dd.zf(2);
				case 'hh':
					return hh.zf(2);
				case 'mm':
					return mm.zf(2);
				case 'ss':
					return ss.zf(2);
				default:
					return $1;
			}
		});
	},
	/**
	 * <pre>
	 * 1. MethodName : formatDateStr
	 * 2. ClassName  : common.js
	 * 3. Comment    : Format Date
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param regdt
	 * @param f
	 * @returns
	 */
	formatDateStr: function(regdt, f) {

		var yyyy = regdt.substring(0, 4);
		var yy = regdt.substring(2, 4);
		var MM = regdt.substring(4, 6);
		var dd = regdt.substring(6, 8);
		var hh = regdt.substring(8, 10);
		var mm = regdt.substring(10, 12);
		var ss = regdt.substring(12, 14);

		return f.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/gi, function($1) {
			switch ($1) {
				case 'yyyy':
					return yyyy;
				case 'yy':
					return yy;
				case 'MM':
					return MM;
				case 'dd':
					return dd;
				case 'hh':
					return hh;
				case 'mm':
					return mm;
				case 'ss':
					return ss;
				default:
					return $1;
			}
		});
	},
	/**
	 * <pre>
	 * 1. MethodName : setComma
	 * 2. ClassName  : common.js
	 * 3. Comment    : 콤마적용
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param num
	 * @returns
	 */
	setComma: function(num) {
		var pattern = /(^[+-]?\d+)(\d{3})/;
		num += '';
		while (pattern.test(num)) {
			num = num.replace(pattern, '$1' + ',' + '$2');
		}
		return num;
	},
	/**
	 * <pre>
	 * 1. MethodName : removeComma
	 * 2. ClassName  : common.js
	 * 3. Comment    : 콤마제거
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param num
	 * @returns
	 */
	removeComma: function(num) {
		return num.replace(/,/gi, '');
	},
	/**
	 * <pre>
	 * 1. MethodName : getStrByte
	 * 2. ClassName  : common.js
	 * 3. Comment    : 글자제한
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22.
	 * </pre>
	 *
	 * @param obj
	 * @param tgt
	 * @param size
	 * @param korSize
	 * ex ) onkeyup='getStrByte(this,'#byte', 200, 3);'
	 */
	getStrByte: function(obj, tgt, size, korSize) {
		var korByte = 3; //한글 바이트 기본값 3
		if (korSize != undefined && korSize != '') {
			korByte = parseInt(korSize, 10);
		}
		var str = obj.value;
		var str_max = size;
		var p = 0;
		var bytes = 0;
		var len_num = 0;
		var str2 = '';

		if (str != '') {

			for (p = 0; p < str.length; p++) {

				(str.charCodeAt(p) > 255) ? bytes += korByte : bytes++; //한글은 korByte, 영문, 숫자, 공백은 1byte
				if (str.charCodeAt(p) == 10) bytes++;	//엔터 2Byte처리

				if (bytes <= str_max) {

					len_num = p + 1;

				} else {

					alert(size + ' byte를 초과 입력할수 없습니다.\n초과된 내용은 자동으로 삭제 됩니다.');
					str2 = str.substr(0, len_num);
					obj.value = str2;
					break;
				}

				$(tgt).text(bytes);
			}
		} else {
			$(tgt).text('0');
		}
	},
	/**
	 * <pre>
	 * 1. MethodName : getStrLength
	 * 2. ClassName  : common.js
	 * 3. Comment    : 글자수제한
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22
	 * </pre>
	 *
	 * @param obj
	 * @param tgt
	 * @param size
	 * @param korSize
	 * ex ) onkeyup="getStrLength(this,'#byte', 200);"
	 */
	getStrLength: function(obj, tgt, len) {
		var str = obj.value;

		if (str.length > len) {
			alert(len + '글자를 초과 입력할수 없습니다.\n초과된 내용은 자동으로 삭제 됩니다.');
			obj.value = str.substr(0, len);
			$(tgt).text(len);
		} else {
			$(tgt).text(str.length);
		}

		obj.focus();
	}
};

var eventTrigger = {
	/**
	 * <pre>
	 * 1. MethodName : numberKeyup
	 * 2. ClassName  : common.js
	 * 3. Comment    : 숫자만 입력
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22
	 * </pre>
	 *
	 */
	numberKeyup: function() {
		$(".number").off("keyup");
		$(".number").on("keyup", function(event) {
			if (!(event.keyCode >= 37 && event.keyCode <= 40)) {

				var inputVal = $(this).val();
				$(this).val(inputVal.replace(/[^0-9]/gi, ''));

			}
		});
	}
	/**
	 * <pre>
	 * 1. MethodName : numberKeyup2
	 * 2. ClassName  : common.js
	 * 3. Comment    : 숫자와 대쉬(-) 만 입력
	 * 4. 작성자       : laby
	 * 5. 작성일       : 2018. 3. 22
	 * </pre>
	 *
	 */
	, numberKeyup2: function() {
		$(".number2").off("keyup");
		$(".number2").on("keyup", function(event) {
			var charCode = event.keyCode;
			if (!(charCode == 8 || charCode == 9 || charCode == 13 || charCode == 46 || charCode == 45 || charCode == 144 ||
				(charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || charCode == 110 || charCode == 190 ||
				(charCode == 189 || charCode == 109))) {

				var inputVal = $(this).val();
				$(this).val(inputVal.replace(/[^0-9\-_]/gi, ''));

			}

		});
	}
};
