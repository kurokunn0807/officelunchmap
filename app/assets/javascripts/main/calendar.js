$(function(){
  var $window = $(window);
  var $ivent = $('#ivent-text');
  var topMonth = 0;
  var topYear = 0;

  var today = new Date();
  var currentYear = today.getFullYear(),
      currentMonth = today.getMonth();

  // 今年度各月予定日配列
  var nowJanuary   = [1,8];
  var nowFebruary  = [11, 12];
  var nowMarch     = [21];
  var nowApril     = [29, 30];
  var nowMay       = [3, 4, 5];
  var nowJune      = [];
  var nowJuly      = [16];
  var nowAugust    = [11];
  var nowSeptember = [17, 23, 24];  
  var nowOctober   = [8];
  var nowNovember  = [3, 23];
  var nowDecember  = [23, 24];
  var nowMonths    = [nowJanuary,nowFebruary,nowMarch,nowApril,nowMay,nowJune,nowJuly,nowAugust,nowSeptember,nowOctober,nowNovember,nowDecember];

  // 昨年度各月予定日配列
  var pastJanuary   = [1,2,9];
  var pastFebruary  = [11];
  var pastMarch     = [20];
  var pastApril     = [29];
  var pastMay       = [3, 4, 5];
  var pastJune      = [];
  var pastJuly      = [17];
  var pastAugust    = [11];
  var pastSeptember = [18, 23];  
  var pastOctober   = [9];
  var pastNovember  = [3, 23];
  var pastDecember  = [23];
  var pastMonths    = [pastJanuary,pastFebruary,pastMarch,pastApril,pastMay,pastJune,pastJuly,pastAugust,pastSeptember,pastOctober,pastNovember,pastDecember];

  // 来年度各月予定日配列
  var nextJanuary   = [1,14];
  var nextFebruary  = [11];
  var nextMarch     = [21];
  var nextApril     = [29, 30];
  var nextMay       = [1, 2, 3, 4, 5, 6];
  var nextJune      = [];
  var nextJuly      = [15];
  var nextAugust    = [11, 12];
  var nextSeptember = [16, 23];  
  var nextOctober   = [14, 22];
  var nextNovember  = [3, 4, 23];
  var nextDecember  = [23];
  var nextMonths    = [nextJanuary,nextFebruary,nextMarch,nextApril,nextMay,nextJune,nextJuly,nextAugust,nextSeptember,nextOctober,nextNovember,nextDecember];



  $window.on('load',function(){
    calendarHeading(currentYear, currentMonth);
    calendarBody(currentYear, currentMonth, today);
    calendarIvent();
  });

  // カレンダーめくり変数宣言
  var changeMonth=currentMonth;
  var changeYear=currentYear;

  // カレンダー送り
  $('#next').click(function(){
    changeMonth=changeMonth+6;
    var changeTime=new Date(changeYear,changeMonth,1);
    var newYear=changeTime.getFullYear();
    var newMonth=changeTime.getMonth();
    calendarHeading(newYear, newMonth);
    calendarBody(newYear, newMonth, today);
    calendarIvent();
  });

  // カレンダー戻し
  $('#back').click(function(){
    changeMonth=changeMonth-6;
    var changeTime=new Date(changeYear,changeMonth,1);
    var newYear=changeTime.getFullYear();
    var newMonth=changeTime.getMonth();
    calendarHeading(newYear, newMonth);
    calendarBody(newYear, newMonth, today);
    calendarIvent();
  });



  // カレンダー本体
  function calendarBody(year, month, today){
    topMonth = month
    topYear = year
    console.log(topYear)
    month--;
    for (var cal=1; cal<7; cal++) {//複数表示のfor文
      // 複数表示機能
      var $tbody = $('#js-calendar-body'+ cal);
      month++;
      var countYear = year
      var countTime=new Date(countYear,month,1);
      countYear =countTime.getFullYear();
      year = countYear
      month =countTime.getMonth();
      // ここまで
      var todayYMFlag = today.getFullYear() === year && today.getMonth() === month ? true : false; // 本日の年と月が表示されるカレンダーと同じか判定
      var startDate = new Date(year, month, 1); // その月の最初の日の情報
      var endDate  = new Date(year, month + 1 , 0); // その月の最後の日の情報
      var startDay = startDate.getDay();// その月の最初の日の曜日を取得
      var endDay = endDate.getDate();// その月の最後の日の曜日を取得
      var textSkip = true; // 日にちを埋める用のフラグ
      var textDate = 1; // 日付(これがカウントアップされます)
      var tableBody =''; // テーブルのHTMLを格納する変数
      var iventClass = false;     
      for (var row = 0; row < 6; row++){
        var tr = '<tr>';
        
        for (var col = 0; col < 7; col++) {
          if (row === 0 && startDay === col){
            textSkip = false;
          }
          if (textDate > endDay) {
            textSkip = true;
          }
          // 今年度予定日特定
          if (year === currentYear) {
            for (m=0; m<12; m++){
              for (i=0; i<32; i++){
                if (month === m && nowMonths[m][i] === textDate) {
                  iventClass = true;
                  break;  
                  }else{
                  iventClass = false;
                }
              }
              //追加部分
              if (month === m) {
                break;
              }
            }
          }
          // 昨年度予定日特定
          if (year === currentYear-1) {
            for (m=0; m<12; m++){
              for (i=0; i<32; i++){
                if (month === m && pastMonths[m][i] === textDate) {
                  iventClass = true;
                  break;  
                  }else{
                  iventClass = false;
                }
              }
              //追加部分
              if (month === m) {
                break;
              }
            }
          }
          // 来年度予定日特定
          if (year === currentYear+1) {
            for (m=0; m<12; m++){
              for (i=0; i<32; i++){
                if (month === m && nextMonths[m][i] === textDate) {
                  iventClass = true;
                  break;  
                  }else{
                  iventClass = false;
                }
              }
              //追加部分
              if (month === m) {
                break;
              }
            }
          }

          var addClass = todayYMFlag && textDate === today.getDate() ? 'is-today' : '';
          var addIvent =  addClass !== 'is-today' && iventClass ? 'iventDay' : ''; //イベントと今日の日付がかぶってる時は今日の日付を優先する
          var textTd = textSkip ? ' ' : textDate++;
          var td = '<td class='+addClass+''+addIvent+'>'+textTd+'</td>';
          tr += td;
        }
        tr += '</tr>';
        tableBody += tr;
      }
      $tbody.html(tableBody);
    }
  }


  // カレンダー年月
  function calendarHeading(year, month){
    month--;
    for (var cal=1; cal<7; cal++) {//複数表示のfor文
      // 複数表示機能
      var $year = $('#js-year' + cal);
      var $month = $('#js-month' + cal);
      month++;
      var countYear = year
      var countTime=new Date(countYear,month,1);
      countYear =countTime.getFullYear();
      year = countYear
      month =countTime.getMonth();
      //ここまで
      $year.text(year);
      $month.text(month + 1);
    }
  }


  // 予定詳細表示
  function calendarIvent(){
      topMonth--;
      var iventBody = ''
      for (var mon=0; mon<6; mon++) {
        topMonth++;
        var countTime=new Date(topYear,topMonth,1);
        topYear =countTime.getFullYear();
        topMonth =countTime.getMonth();
        if (topYear === currentYear) {    //今年度予定詳細表示
          if (topMonth === 0) {
            iventBody += '<tr><td>1月1日</td><td>元旦</td></tr><tr><td>1月8日</td><td>成人の日</td></tr>'
          }else if (topMonth === 1) {
            iventBody += '<tr><td>2月11日</td><td>建国記念の日</td></tr><tr><td>2月12日</td><td>振替休日</td></tr>'
          }else if (topMonth === 2) {
            iventBody += '<tr><td>3月21日</td><td>春分の日</td></tr>'
          }else if (topMonth === 3) {
            iventBody += '<tr><td>4月29日</td><td>昭和の日</td></tr><tr><td>4月30日</td><td>振替休日</td></tr>'
          }else if (topMonth === 4) {
            iventBody += '<tr><td>5月3日</td><td>憲法記念日</td></tr><tr><td>5月4日</td><td>みどりの日</td></tr><tr><td>5月5日</td><td>こどもの日</td></tr>'
          }else if (topMonth === 5) {
            iventBody += ''
          }else if (topMonth === 6) {
            iventBody += '<tr><td>7月16日</td><td>海の日</td></tr>'
          }else if (topMonth === 7) {
            iventBody += '<tr><td>8月11日</td><td>山の日</td></tr>'
          }else if (topMonth === 8) {
            iventBody += '<tr><td>9月17日</td><td>敬老の日</td></tr><tr><td>9月23日</td><td>秋分の日</td></tr><tr><td>9月24日</td><td>振替休日</td></tr>'
          }else if (topMonth === 9){
            iventBody += '<tr><td>10月8日</td><td>体育の日</td></tr>'
          }else if (topMonth === 10){
            iventBody += '<tr><td>11月3日</td><td>文化の日</td></tr><tr><td>11月23日</td><td>勤労感謝の日</td></tr>'
          }else if (topMonth === 11) {
            iventBody += '<tr><td>12月23日</td><td>天皇誕生日</td></tr><tr><td>12月24日</td><td>振替休日</td></tr>'
          }
        }else if (topYear === currentYear+1) {    //来年度予定詳細表示
          if (topMonth === 0) {
            iventBody += '<tr><td>1月1日</td><td>元旦</td></tr><tr><td>1月14日</td><td>成人の日</td></tr>'
          }else if (topMonth === 1) {
            iventBody += '<tr><td>2月11日</td><td>建国記念の日</td></tr>'
          }else if (topMonth === 2) {
            iventBody += '<tr><td>3月21日</td><td>春分の日</td></tr>'
          }else if (topMonth === 3) {
            iventBody += '<tr><td>4月29日</td><td>昭和の日</td></tr>'
          }else if (topMonth === 4) {
            iventBody += '<tr><td>5月3日</td><td>憲法記念日</td></tr><tr><td>5月4日</td><td>みどりの日</td></tr><tr><td>5月5日</td><td>こどもの日</td></tr><tr><td>5月6日</td><td>振替休日</td></tr>'
          }else if (topMonth === 5) {
            iventBody += ''
          }else if (topMonth === 6) {
            iventBody += '<tr><td>7月15日</td><td>海の日</td></tr>'
          }else if (topMonth === 7) {
            iventBody += '<tr><td>8月11日</td><td>山の日</td></tr><tr><td>8月12日</td><td>振替休日</td></tr>'
          }else if (topMonth === 8) {
            iventBody += '<tr><td>9月16日</td><td>敬老の日</td></tr><tr><td>9月23日</td><td>秋分の日</td></tr>'
          }else if (topMonth === 9){
            iventBody += '<tr><td>10月14日</td><td>体育の日</td></tr>'
          }else if (topMonth === 10){
            iventBody += '<tr><td>11月3日</td><td>文化の日</td></tr><tr><td>11月4日</td><td>振替休日</td></tr><tr><td>11月23日</td><td>勤労感謝の日</td></tr>'
          }else if (topMonth === 11) {
            iventBody += '<tr><td>12月23日</td><td>天皇誕生日</td></tr>'
          }
        }else if (topYear === currentYear-1) {      //昨年度予定詳細表示
          if (topMonth === 0) {
            iventBody += '<tr><td>1月1日</td><td>元旦</td></tr><tr><td>1月2日</td><td>振替休日</td></tr><tr><td>1月9日</td><td>成人の日</td></tr>'
          }else if (topMonth === 1) {
            iventBody += '<tr><td>2月11日</td><td>建国記念の日</td></tr>'
          }else if (topMonth === 2) {
            iventBody += '<tr><td>3月20日</td><td>春分の日</td></tr>'
          }else if (topMonth === 3) {
            iventBody += '<tr><td>4月29日</td><td>昭和の日</td></tr>'
          }else if (topMonth === 4) {
            iventBody += '<tr><td>5月3日</td><td>憲法記念日</td></tr><tr><td>5月4日</td><td>みどりの日</td></tr><tr><td>5月5日</td><td>こどもの日</td></tr>'
          }else if (topMonth === 5) {
            iventBody += ''
          }else if (topMonth === 6) {
            iventBody += '<tr><td>7月17日</td><td>海の日</td></tr>'
          }else if (topMonth === 7) {
            iventBody += '<tr><td>8月11日</td><td>山の日</td></tr>'
          }else if (topMonth === 8) {
            iventBody += '<tr><td>9月18日</td><td>敬老の日</td></tr><tr><td>9月23日</td><td>秋分の日</td></tr>'
          }else if (topMonth === 9){
            iventBody += '<tr><td>10月9日</td><td>体育の日</td></tr>'
          }else if (topMonth === 10){
            iventBody += '<tr><td>11月3日</td><td>文化の日</td></tr><tr><td>11月23日</td><td>勤労感謝の日</td></tr>'
          }else if (topMonth === 11) {
            iventBody += '<tr><td>12月23日</td><td>天皇誕生日</td></tr>'
          }
        }
      }
      $ivent.html(iventBody)
  }
});

// 予定表示機能
// ・カレンダーに最初に表示される月から６か月分表示
// ・また特定のイベントも条件分岐で表示させる
// ・カレンダーの表示を変更した場合も表示されるようにする