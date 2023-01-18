/* Add here all your JS customizations */

function plusHandler() {
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber + secondNumber;

    $("#result").val(result);
}

function minusHandler() {
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber - secondNumber;

    $("#result").val(result);
}

function multiplyHandler() {
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber * secondNumber;

    $("#result").val(result);
}

function divideHandler() {
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber / secondNumber;

    $("#result").val(result);
}

$(document).ready(function() {
    $("#plus").click(plusHandler)
    $("#minus").click(minusHandler)
    $("#multiply").click(multiplyHandler)
    $("#divide").click(divideHandler)
});

$(document).ready(function() {
    function calculateHandler() {
        var loan = $('#loan').val();
        var interest = $('#interest').val();
        var period = $('#period').val();
    
        loan = parseFloat(loan);
        interest = parseFloat(interest);
        period = parseFloat(period);
    
        var interestMonth = interest / 12 / 100;
    
        var div1 = loan * interestMonth * (1 + interestMonth) ** period;
        var div2 = (1 + interestMonth) ** period - 1;
    
        var result = div1 / div2;
    
        result = Math.round(result).toLocaleString();
    
        var resultText;
        if($("#setLanguage").text() == 'KR') {
            resultText = `고객님의 ${period}개월 동안 월 상환액은 <mark>${result}원</mark> 입니다.`;
        }else {
            resultText = `Your monthly payment for ${period} months is <mark>$ ${result}</mark>.`;
        }
        
    
        $('#result').html(resultText);
    }
    
    function loan100Handler() {
        var loan = $('#loan').val();
    
        if (loan == "") {
            loan = 0;
        }
    
        loan = parseFloat(loan);
    
        loan = loan + 1000000;
    
        $('#loan').val(loan);
    }
    
    function loan1000Handler() {
        var loan = $('#loan').val();
    
        if (loan == "") {
            loan = 0;
        }
    
        loan = parseFloat(loan);
    
        loan = loan + 10000000;
    
        $('#loan').val(loan);
    }
    
    function loan10000Handler() {
        var loan = $('#loan').val();
    
        if (loan == "") {
            loan = 0;
        }
    
        loan = parseFloat(loan);
    
        loan = loan + 100000000;
    
        $('#loan').val(loan);
    }
    
    function interest3Handler() {
        $('#interest').val(3);
    }
    
    function interest4Handler() {
        $('#interest').val(4);
    }
    
    function interest5Handler() {
        $('#interest').val(5);
    }
    
    function period1Handler() {
        $('#period').val(12);
    }
    
    function period3Handler() {
        $('#period').val(36);
    }
    
    function period5Handler() {
        $('#period').val(60);
    }
    
    $(document).ready(function() {
        $('#calculate').click(calculateHandler);
    
        $('#loan-100').click(loan100Handler);
        $('#loan-1000').click(loan1000Handler);
        $('#loan-10000').click(loan10000Handler);
    
        $('#interest-3').click(interest3Handler);
        $('#interest-4').click(interest4Handler);
        $('#interest-5').click(interest5Handler);
    
        $('#period-1').click(period1Handler);
        $('#period-3').click(period3Handler);
        $('#period-5').click(period5Handler);
    });
});

// header > 즐겨찾기 추가 버튼
$('#favorite').on('click', function(e) {
    var bookmarkURL = window.location.href;
    var bookmarkTitle = document.title;
    var triggerDefault = false;

    if (window.sidebar && window.sidebar.addPanel) {
        // Firefox version < 23
        window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
    } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
        // Firefox version >= 23 and Opera Hotlist
        var $this = $(this);
        $this.attr('href', bookmarkURL);
        $this.attr('title', bookmarkTitle);
        $this.attr('rel', 'sidebar');
        $this.off(e);
        triggerDefault = true;
    } else if (window.external && ('AddFavorite' in window.external)) {
        // IE Favorite
        window.external.AddFavorite(bookmarkURL, bookmarkTitle);
    } else {
        // WebKit - Safari/Chrome
        if($("#setLanguage").text() == 'KR') {
            alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'cmd' : 'ctrl') + '+d 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
        }else {
            alert('You can add to your favorites by pressing '+(navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'cmd' : 'ctrl') + '+d');
        }
    }

    return triggerDefault;
});

// header > URL 공유하기 버튼
$('#share').click(function () {
    var textArea = document.createElement("textarea");//textarea 생성
    textArea.value = window.document.location.href;//textarea에 url 입력
    document.body.appendChild(textArea); //body에 textarea 추가
    textArea.select();//선택
    document.execCommand("Copy");//복사
    textArea.remove();//생성한 textarea 삭제
    if($("#setLanguage").text() == 'KR') {
        alert("URL이 복사되었습니다.");
    }else {
        alert("URL is copied.");
    }
});

// 다크모드 체크박스 theme 핸들링
$("#chageTheme").change(function() {
    if(this.checked) {
        localStorage.setItem("isBlackMode", "y");
        $(".fixed").addClass("dark");
        $(".flexbox").addClass("dark");
    } else {
        localStorage.removeItem("isBlackMode")
        $(".fixed").removeClass("dark");
        $(".flexbox").removeClass("dark");
    }
});

// 다국어 언어
let multiLanguage = {
    "ko" : {
        msg : "안녕하세요.",
        title: "한국어",
        goPage:"바로가기",
        // side menu 
        toDoList: "To Do 리스트",
        simpleCalc:"사칙연산 계산기",
        loanInterestCalc:"대출이자 계산기",
        countText:"글자 수 세기",
        colorPicker:"컬러 선택",
        markdownEditor:"마크다운 에디터",
        dDayCalc:"D-day 계산기",
        stopWatch:"스톱워치",
        memo:"메모장",
        lotto:"로또 번호 생성기",
        shoppingList:"쇼핑 리스트",
        regex:"정규식 테스트",
        // menu explain
        toDoList_explain:"깔끔한 디자인의 To Do 리스트 입니다.",
        simpleCalc_explain:"깔끔한 디자인의 사칙연산 계산기 입니다.",
        loanInterestCalc_explain:"깔끔한 디자인의 대출 이자 계산기입니다. 원리금균등상환 계산을 빠르게 할 수 있습니다.",
        countText_explain:"텍스트 글자수를 세어 줍니다.(공백 포함/미포함)",
        colorPicker_explain:"색을 선택하면 코드값(RGBA)으로 변환해 줍니다.",
        markdownEditor_explain:"마크다운 에디터로 문장을 편집해 보세요.",
        dDayCalc_explain:"D-day 날짜를 계산해 보세요.",
        stopWatch_explain:"깔끔한 디자인의 스톱워치 입니다.",
        memo_explain:"간단하게 메모하고 내용을 복사 붙여넣기 하세요.",
        lotto_explain:"1~45개 숫자에서 6개의 로또 번호를 뽑아줍니다.",
        shoppingList_explain:"쇼핑 리스트를 관리해 보세요.",
        regex_explain:"정규식을 테스트해보세요.",
        // to do list
        toDoList_plusAdd_text:"+ 추가",
        toDoList_complete_text:"완료",
        toDoList_todo_text:"해야 할 일",
        toDoList_delete_text:"삭제",
        // calc
        calc_firstNumber_text:"첫번째 숫자",
        calc_secondNumber_text:"첫번째 숫자",
        calc_plus_text:"+ 더하기",
        calc_minus_text:"- 뺴기",
        calc_multiply_text:"× 곱하기",
        calc_divide_text:"÷ 나누기",
        calc_result_text:"결과",
        // loan calc
        loanCalc_amount_text:"대출금",
        loanCalc_won_text:"₩",
        loanCalc_year_text:"연",
        data_interestRate_text:"대출금리",
        loanCalc_1000000_text:"+ 1백만",
        loanCalc_100000000_text:"+ 1천만",
        loanCalc_1000000000_text:"+ 1억",
        loanCalc_loanPeriod_text:"대출기간",
        loanCalc_loanMonth_text:"개월",
        loanCalc_oneYear_text:"1년",
        loanCalc_threeYear_text:"3년",
        loanCalc_fiveYear_text:"5년",
        loanCalc_calculate_text:"계산하기",
        // text counter
        textCounter_withSpace_text:"공백 포함 : ",
        textCounter_withoutSpace_text:"공백 제외 : ",
        textCounter_characters_text:" 자",
        // d-day
        dday_leftDate_text:"남은 날짜",
        dday_day_text:" 일",
        dday_time_text:" 시간",
        dday_includeStartDate_text:"시작일 포함",
        dday_include_text:"포함",
        dday_exclude_text:"미포함",
        dday_startDate_text:"시작일(오늘)",
        dday_endDate_text:"종료일",
        // stop watch
        stopWatch_start_text:"시작",
        stopWatch_stop_text:"중지",
        stopWatch_reset_text:"리셋",
        // memo
        memo_copy_text:"복사",
        // lotto
        lotto_getNumber_text:"다시뽑기",
        // shopping list
        shoppingList_complete_text:"구매 완료",
        shoppingList_item_text:"사야 할 것",
        // regEx test
        regex_regex_text:"정규 표현식",
        regex_apply_text:"적용",
        regex_subject_text:"대상 텍스트",
        regex_result_text:"결과",
        regex_seperator_text:"구분자",
        regex_testResult_text:"테스트 결과 : ",
    },
    "en" : {
        msg : "Hello World.",
        title: "English",
        goPage:"Go Page",
        // side menu 
        toDoList: "To Do List",
        simpleCalc:"Arithmetic Calculator",
        loanInterestCalc:"Loan Interest Calculator",
        countText:"Text Counter",
        colorPicker:"Color Selector",
        markdownEditor:"Markdown Editor",
        dDayCalc:"D-day Calculator",
        stopWatch:"Stop Watch",
        memo:"Notepad",
        lotto:"Lotto Generator",
        shoppingList:"Shopping List",
        regex:"regEx Test",
        // menu explain
        toDoList_explain:"It's a simple design to do list.",
        simpleCalc_explain:"It's a simple design arithmetic calculator.",
        loanInterestCalc_explain:"It's a simple loan interest calculator.",
        countText_explain:"Count the number of text.(Include space/Exclude space)",
        colorPicker_explain:"Select a color, and convert it to color code(RGBA)",
        markdownEditor_explain:"Edit the sentence with the Mark Down Editor.",
        dDayCalc_explain:"Calculate the D-day date.",
        stopWatch_explain:"It's a simple design stopwatch.",
        memo_explain:"Simply take a note and copy and paste the contents.",
        lotto_explain:"Generate 6 lottery numbers from 1 to 45 numbers.",
        shoppingList_explain:"Manage your shopping list.",
        regex_explain:"Test your regular expression.",
        // to do list
        toDoList_plusAdd_text:"+ Add",
        toDoList_complete_text:"Check",
        toDoList_todo_text:"Todo",
        toDoList_delete_text:"Delete",
        // calc
        calc_firstNumber_text:"First Number",
        calc_secondNumber_text:"Second Number",
        calc_plus_text:"+ Plus",
        calc_minus_text:"- Minus",
        calc_multiply_text:"× Multiply",
        calc_divide_text:"÷ divide",
        calc_result_text:"Result",
        // loan calc
        loanCalc_amount_text:"Loan Amount",
        loanCalc_won_text:"$",
        loanCalc_year_text:"per year",
        data_interestRate_text:"Loan Interest Rate",
        loanCalc_1000000_text:"+ 1 million",
        loanCalc_100000000_text:"+ 10 million",
        loanCalc_1000000000_text:"+ 100 miilion",
        loanCalc_loanPeriod_text:"Loan Period",
        loanCalc_loanMonth_text:"Months",
        loanCalc_oneYear_text:"1 year",
        loanCalc_threeYear_text:"3 years",
        loanCalc_fiveYear_text:"5 years",
        loanCalc_calculate_text:"Calculate",
        // text counter
        textCounter_withSpace_text:"Include spaces : ",
        textCounter_withoutSpace_text:"Exclude spaces : ",
        textCounter_characters_text:" characters",
        // d-day
        dday_leftDate_text:"Left Date",
        dday_day_text:" days",
        dday_time_text:" hours",
        dday_includeStartDate_text:"Include Start Date",
        dday_include_text:"Include",
        dday_exclude_text:"exclude",
        dday_startDate_text:"Start Date(today)",
        dday_endDate_text:"End Date",
        // stop watch
        stopWatch_start_text:"Start",
        stopWatch_stop_text:"Stop",
        stopWatch_reset_text:"Reset",
        // memo
        memo_copy_text:"Copy",
        // lotto
        lotto_getNumber_text:"Retry",
        // shopping list
        shoppingList_complete_text:"Complete",
        shoppingList_item_text:"Things to buy",
        // regEx test
        regex_regex_text:"Regular Expression",
        regex_apply_text:"Apply",
        regex_subject_text:"Target Text",
        regex_result_text:"Result",
        regex_seperator_text:"Seperator",
        regex_testResult_text:"Test Result : ",
        
    }
};

window.onload = () => {
    
    let koBtn = document.getElementById("koBtn");
    let enBtn = document.getElementById("enBtn");

    let setLanguage = (lang) => {
        if(lang == 'ko') {
            $("#setLanguage").text("KR");
        } else if(lang == 'en') {
            $("#setLanguage").text("EN");
        }
        let changeNodeList = Array.prototype.slice.call(document.querySelectorAll('[data-detect]'));
        
        // 각 dataset중 detect인 요소들을 찾아 변경하는 곳. 
        changeNodeList.map( v => {
        v.textContent = multiLanguage[lang][v.dataset.detect]
        })
    };

    koBtn.addEventListener("click" , () => {
        setLanguage(koBtn.dataset.lang);
        localStorage.setItem("language", "ko");
    });

    enBtn.addEventListener("click" , () => {
        setLanguage(enBtn.dataset.lang);
        localStorage.setItem("language", "en");
    });

    // 한국어/영어 세팅(초기화)
    var userLang = navigator.language || navigator.userLanguage; // 내비게이터 언어
    var userSetLang = localStorage.getItem("language"); // 사용자 세팅 언어
    if(userSetLang != null) {
        if (userSetLang == 'ko') {
            setLanguage('ko');
        } else {
            setLanguage('en');
        }
    } else if(userLang.split('-')[0] == 'ko') {
        setLanguage('ko');
    } else {
        setLanguage('en');
    }

    // theme 시팅(초기화)
    isBlackMode = localStorage.getItem("isBlackMode");
    if (isBlackMode == null) {
        return;
    } 
    if(isBlackMode == "y") {
        $(".fixed").addClass("dark");
        $(".flexbox").addClass("dark");
        $("#chageTheme").prop('checked', true);
    }
    
};

// 로고 선택시 홈이동
$(".logo").click(function () {
    location.href = "/index.html";
});

// 메뉴 검색 input 입력시 > 메뉴 검색
$("#menuSearch").on("keyup", function() {
    var value = this.value.toLowerCase().trim();
    $(".nav-main li").show().filter(function() {
        return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
});
