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

        // 다이어리 아이템 핸들링
        $("#diaryDiv .list-group-item").each(function(index, item){
            $(item).css("background-color", "#282d36");
        });
    } else {
        localStorage.removeItem("isBlackMode")
        $(".fixed").removeClass("dark");
        $(".flexbox").removeClass("dark");

        // 다이어리 아이템 핸들링
        $("#diaryDiv .list-group-item").each(function(index, item){
            $(item).css("background-color", "");
        });
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
        diary:"일기",
        jsonFomatter:"JSON 포맷터",
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
        diary_explain:"깔끔한 디자인의 심플 다이어리 입니다.",
        jsonFomatter_explain:"JSON을 포맷에 맞게 수정해 줍니다.",
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
        regex_rule_text:"정규 표현식 규칙",
        regex_patternStart_text:"패턴구분자 시작",
        regex_patternExpression_text:"찾을 문자열의 패턴",
        regex_patternEnd_text:"패턴 구분자 끝",
        regex_patternChange_text:"패턴 변경자",
        // diary
        diary_inputDate_text:"오늘 날짜를 입력해 주세요.",
        diary_inputFeeling_text:"오늘 기분은 어땠나요?",
        diary_inputDiary_text:"오늘 있었던 일을 기록하세요.",
        // json formatter
        formatting:"포맷 맞추기",
        clear:"클리어",
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
        regex:"RegEx Test",
        diary:"Diary",
        jsonFomatter:"JSON Formatter",
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
        diary_explain:"It's a simple diary.",
        jsonFomatter_explain:"Make JSON prettier/beautifier simply.",
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
        regex_rule_text:"Regular Expression Rule",
        regex_patternStart_text:"Start pattern separator",
        regex_patternExpression_text:"Pattern to find",
        regex_patternEnd_text:"End of pattern separator",
        regex_patternChange_text:"Pattern Changer",
        // diary
        diary_inputDate_text:"Please enter today's date.",
        diary_inputFeeling_text:"How did you feel today?",
        diary_inputDiary_text:"Record what happened today.",
        // json formatter
        formatting:"Format / Beautify",
        clear:"Clear",
        
    },
    "jp" : {
        msg :"こんにちは世界。",
        title:"英語",
        goPage:"ページに移動",
        toDoList:"やることリスト",
        simpleCalc:"算術計算機",
        loanInterestCalc:"ローン金利計算機",
        countText:"テキストカウンター",
        colorPicker:"カラーセレクター",
        markdownEditor:"マークダウン エディター",
        dDayCalc:"D-day 電卓",
        stopWatch:"ストップウォッチ",
        memo:"メモ帳",
        lotto:"ロトジェネレーター",
        shoppingList:"買い物リスト",
        regex:"正規表現テスト",
        diary:"日記",
        jsonFomatter:"JSON フォーマッター",
        toDoList_explain:"やることリストのシンプルなデザインです。",
        simpleCalc_explain:"シンプルなデザインの算数計算機です。",
        loanInterestCalc_explain:"これは、単純なローン金利計算機です。",
        countText_explain:"テキストの数をカウントします。(スペースを含む/スペースを除く)",
        colorPicker_explain:"色を選択してカラーコード(RGBA)に変換",
        markdownEditor_explain:"Mark Down Editor で文章を編集します。",
        dDayCalc_explain:"D デイの日付を計算します。",
        stopWatch_explain:"シンプルなデザインのストップウォッチです。",
        memo_explain:"メモを取って、内容をコピーして貼り付けるだけです。",
        lotto_explain:"1 から 45 の番号から 6 つの宝くじ番号を生成します。",
        shoppingList_explain:"買い物リストを管理します。",
        regex_explain:"正規表現をテストします。",
        diary_explain:"簡単な日記です。",
        jsonFomatter_explain:"JSON をよりきれいに/美しくする。",
        toDoList_plusAdd_text:"+ 追加",
        toDoList_complete_text:"小切手",
        toDoList_todo_text:"トド",
        toDoList_delete_text:"消去",
        calc_firstNumber_text:"最初の番号",
        calc_secondNumber_text:"秒数",
        calc_plus_text:"+ プラス",
        calc_minus_text:"- マイナス",
        calc_multiply_text:"×掛ける",
        calc_divide_text:"÷ 割る",
        calc_result_text:"結果",
        loanCalc_amount_text:"ローン金額",
        loanCalc_won_text:"¥",
        loanCalc_year_text:"1年当たり",
        data_interestRate_text:"ローン金利",
        loanCalc_1000000_text:"+ 100万",
        loanCalc_100000000_text:"+ 1,000万",
        loanCalc_1000000000_text:"+ 1億",
        loanCalc_loanPeriod_text:"貸出期間",
        loanCalc_loanMonth_text:"月",
        loanCalc_oneYear_text:"1年",
        loanCalc_threeYear_text:"3年",
        loanCalc_fiveYear_text:"5年",
        loanCalc_calculate_text:"計算する",
        textCounter_withSpace_text:"スペースを含める:",
        textCounter_withoutSpace_text:"スペースを除外:",
        textCounter_characters_text:" 文字",
        dday_leftDate_text:"残日",
        dday_day_text:" 日々",
        dday_time_text:" 時間",
        dday_includeStartDate_text:"開始日を含める",
        dday_include_text:"含む",
        dday_exclude_text:"除外",
        dday_startDate_text:"開始日（今日）",
        dday_endDate_text:"終了日",
        stopWatch_start_text:"始める",
        stopWatch_stop_text:"ストップ",
        stopWatch_reset_text:"リセット",
        memo_copy_text:"コピー",
        lotto_getNumber_text:"リトライ",
        shoppingList_complete_text:"完了",
        shoppingList_item_text:"買い物リスト",
        regex_regex_text:"正規表現",
        regex_apply_text:"申し込み",
        regex_subject_text:"ターゲット テキスト",
        regex_result_text:"結果",
        regex_seperator_text:"セパレーター",
        regex_testResult_text:"テスト結果 ：",
        regex_rule_text:"正規表現の規則",
        regex_patternStart_text:"開始パターン区切り",
        regex_patternExpression_text:"見つけるパターン",
        regex_patternEnd_text:"パターン区切りの終わり",
        regex_patternChange_text:"パターンチェンジャー",
        diary_inputDate_text:"今日の日付を入力してください。",
        diary_inputFeeling_text:"今日はどんな気分でしたか？",
        diary_inputDiary_text:"今日の出来事を記録します。",
        formatting:"整形・美化",
        clear:"クリア",
    }, 
    "cn" : {
        msg : "你好世界。",
        title: "英语",
        goPage: "转到页面",
        toDoList: "待办事项",
        simpleCalc: "算术计算器",
        loanInterestCalc: "贷款利息计算器",
        countText: "文本计数器",
        colorPicker: "颜色选择器",
        markdownEditor: "降价编辑器",
        dDayCalc: "D 日计算器",
        stopWatch: "秒表",
        memo: "记事本",
        lotto: "乐透生成器",
        shoppingList: "购物清单",
        regex: "正则表达式测试",
        diary: "日记",
        jsonFomatter: "JSON格式化程序",
        toDoList_explain: "这是一个简单的待办事项设计。",
        simpleCalc_explain: "这是一个简单的设计算术计算器。",
        loanInterestCalc_explain: "这是一个简单的贷款利息计算器。",
        countText_explain: "计算文本的数量。（包括空格/不包括空格）",
        colorPicker_explain: "选择一种颜色并将其转换为颜色代码（RGBA）",
        markdownEditor_explain: "使用 Mark Down 编辑器编辑句子。",
        dDayCalc_explain: "计算 D 日日期。",
        stopWatch_explain: "这是一款设计简单的秒表。",
        memo_explain: "只需记下并复制和粘贴内容即可。",
        lotto_explain: "从 1 到 45 的数字生成 6 个彩票号码。",
        shoppingList_explain: "管理您的购物清单。",
        regex_explain: "测试你的正则表达式。",
        diary_explain: "这是一本简单的日记。",
        jsonFomatter_explain: "让 JSON 更漂亮/更简单。",
        toDoList_plusAdd_text: "+ 添加",
        toDoList_complete_text: "查看",
        toDoList_todo_text: "去做",
        toDoList_delete_text: "删除",
        calc_firstNumber_text: "第一个号码",
        calc_secondNumber_text: "第二个号码",
        calc_plus_text: "+ 加上",
        calc_minus_text: "- 减",
        calc_multiply_text: "× 相乘",
        calc_divide_text: "÷ 除法",
        calc_result_text: "结果",
        loanCalc_amount_text: "贷款额度",
        loanCalc_won_text: "元",
        loanCalc_year_text: "每年",
        data_interestRate_text: "贷款利率",
        loanCalc_1000000_text: "+ 100 万",
        loanCalc_100000000_text: "+ 1000万",
        loanCalc_1000000000_text: "+ 100 百万",
        loanCalc_loanPeriod_text: "贷款期限",
        loanCalc_loanMonth_text: "月",
        loanCalc_oneYear_text: "1年",
        loanCalc_threeYear_text: "3年",
        loanCalc_fiveYear_text: "5年",
        loanCalc_calculate_text: "计算",
        textCounter_withSpace_text: "包括空格：",
        textCounter_withoutSpace_text: "排除空格：",
        textCounter_characters_text: " 人物",
        dday_leftDate_text: "离开日期",
        dday_day_text: " 天",
        dday_time_text: " 小时",
        dday_includeStartDate_text: "包括开始日期",
        dday_include_text: "包括",
        dday_exclude_text: "排除",
        dday_startDate_text: "开始日期（今天）",
        dday_endDate_text: "结束日期",
        stopWatch_start_text: "开始",
        stopWatch_stop_text: "停止",
        stopWatch_reset_text: "重置",
        memo_copy_text: "复制",
        lotto_getNumber_text: "重试",
        shoppingList_complete_text: "完全的",
        shoppingList_item_text: "要买的东西",
        regex_regex_text: "正则表达式",
        regex_apply_text: "申请",
        regex_subject_text: "目标文本",
        regex_result_text: "结果",
        regex_seperator_text: "分隔符",
        regex_testResult_text: "测试结果 ：",
        regex_rule_text: "正则表达式规则",
        regex_patternStart_text: "起始模式分隔符",
        regex_patternExpression_text: "要查找的模式",
        regex_patternEnd_text: "模式分隔符结束",
        regex_patternChange_text: "模式转换器",
        diary_inputDate_text: "请输入今天的日期。",
        diary_inputFeeling_text: "你今天感觉如何？",
        diary_inputDiary_text: "记录今天发生的事情。",
        formatting: "格式/美化",
        clear: "清除",
    }
};

window.onload = () => {
    
    let koBtn = document.getElementById("koBtn");
    let enBtn = document.getElementById("enBtn");
    let jpBtn = document.getElementById("jpBtn");
    let cnBtn = document.getElementById("cnBtn");

    let setLanguage = (lang) => {
        if(lang == 'ko') {
            $("#setLanguage").text("KR");
        } else if(lang == 'en') {
            $("#setLanguage").text("EN");
        } else if(lang == 'jp') {
            $("#setLanguage").text("JP");
        } else if(lang == 'cn') {
            $("#setLanguage").text("CN");
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

    jpBtn.addEventListener("click" , () => {
        setLanguage(jpBtn.dataset.lang);
        localStorage.setItem("language", "jp");
    });

    cnBtn.addEventListener("click" , () => {
        setLanguage(cnBtn.dataset.lang);
        localStorage.setItem("language", "cn");
    });

    // 한국어/영어 세팅(초기화)
    var userLang = navigator.language || navigator.userLanguage; // 내비게이터 언어
    var userSetLang = localStorage.getItem("language"); // 사용자 세팅 언어
    if(userSetLang != null) {
        if (userSetLang == 'ko') {
            setLanguage('ko');
        } else if (userSetLang == 'en') {
            setLanguage('en');
        } else if (userSetLang == 'jp') {
            setLanguage('jp');
        } else if (userSetLang == 'cn') {
            setLanguage('cn');
        }
    } else if(userLang.split('-')[0] == 'ko') {
        setLanguage('ko');
    } else if(userLang.split('-')[0] == 'en') {
        setLanguage('en');
    } else if(userLang.split('-')[0] == 'jp') {
        setLanguage('jp');
    } else if(userLang.split('-')[0] == 'cn') {
        setLanguage('cn');
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
        $("#diaryDiv .list-group-item").each(function(index, item){
            $(item).css("background-color", "#282d36");
        });
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
