
// Swal.fire({
//     icon: 'info',
//     title: '정답!!!',
//     text: '정답입니다!',
//     footer: ''
//   })

// Swal.fire({
//     icon: 'error',
//     title: '오답!!!',
//     text: '틀렸습니다!\n다시 생각해보세요.',
//     footer: ''
//   }) 

//변수 선언
let operationType = "01"; //01:+, 02:-, 03:*, 04:/
let mathExerciseType = "01"; //01: 답맞추기, 02: 뒷자리 숫자 맞추기, 03: 앞자리 숫자 맞추기
                             // 앞자리수가 큰수, 뒷자리수가 큰수 등등도 있구나...
let firstNum = null;
let firstNumRangFrom = 1;
let firstNumRangTo = 10;
let secondNum = null;
let secondNumRangFrom = 1;
let secondNumRangTo = 10;
let inputNum = null;
let answerNum = null;
let answerFlag = "N"; 
let settingDisplay = "none";
let examNum = 1;//문제횟수

$('document').ready(function() {

    fn_reset();
});

// 초기화
var fn_reset = function() {
    // 설정값 셋팅 
    $("#operator").val(operationType).prop("selected", true); //값이 01인 option 선택
    $("#operator option[value='"+operationType+"']").prop("disabled", true);

    $("#formulaType").val(mathExerciseType).prop("selected", true); //값이 01인 option 선택
    $("#formulaType option[value='"+mathExerciseType+"']").prop("disabled", true);

    $('#first_num_rang_from').val(firstNumRangFrom);
    $('#first_num_rang_to').val(firstNumRangTo); 

    $('#second_num_rang_from').val(secondNumRangFrom); 
    $('#second_num_rang_to').val(secondNumRangTo); 

    $('#examCount').text(examNum + "개"); 

    // 문제 셋팅
    fn_exam_setting();
}

// 숫자 초기화
var fn_num_reset = function(){
    firstNum = null;
    secondNum = null;
    inputNum = null;
    answerNum = null;
    //answerFlag = "N"; 
}

var fn_exam_setting = function() {

    // 숫자 초기화
    fn_num_reset();

    // $("#inputId").attr("disabled", true); //설정
    // $("#inputId").attr("disabled", false); //해제
    $('#first_num').attr("disabled", true);
    $('#second_num').attr("disabled", true);
    $('#answer_num').attr("disabled", false);

    // random 범위 지정 참고 사이트 - https://dasima.xyz/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-math-random-%EB%B2%94%EC%9C%84-%EC%9E%90%EB%A6%BF%EC%88%98/
    // random 범위 지정 참고 함수
    // function makeRandom(min, max){
    //     var RandVal = Math.floor(Math.random()*(max-min+1)) + min;
    //     return RandVal;
    // }
    
    // Returns a random integer from 1 to 10:
    // Math.floor(Math.random() * 10) + 1;
    firstNum = Math.floor(Math.random() * firstNumRangTo) + parseInt(firstNumRangFrom);
    $('#first_num').val(firstNum);

    secondNum = Math.floor(Math.random() * secondNumRangTo) + parseInt(secondNumRangFrom);
    $('#second_num').val(secondNum);

    answerNum = firstNum + secondNum;
    $('#answer_num').val(answerNum);

    $('#input_num').val('');
    $('#answer_flag').val('N');

    $('#input_num').focus();

}

// 다음 문제
var fn_next_exam_setting = function(){

    let answerFlag = $('#answer_flag').val();
    if( answerFlag == "N" ){
        Swal.fire({
            icon: '',
            title: '',
            text: '문제를 풀고 다음 문제로 넘어가세요!!!',
            footer: ''
        })
    } else {
        examNum += 1;
        $('#examCount').text(examNum + "개");
        fn_exam_setting();
    }
}

// 확인
var fn_confirm = function() {

    inputNum = $('#input_num').val();

    answerNum = $('#answer_num').val();

    if ( inputNum == answerNum) {
        Swal.fire({
            icon: 'info',
            title: '정답!!!',
            text: '정답입니다!',
            footer: ''
        })

        $('#answer_flag').val('Y');

    } else if( inputNum == null || inputNum == "" ){
        Swal.fire({
            icon: 'warning',
            title: '답을 입력해주세요!!!',
            text: '답을 입력해주세요',
            footer: ''
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: '오답!!!',
            text: '틀렸습니다!\n다시 생각해보세요.',
            footer: ''
        }) 
        $('#input_num').val('');
        $('#answer_flag').val('N');  
        $('#input_num').focus();
    }

}

// 설정 display 
var fn_setting_display = function() {

    if( settingDisplay == "block") {
        settingDisplay = "none";
    } else {
        settingDisplay = "block";
    }
    $('.setting-form').css("display", settingDisplay);
}

// 설정 값 셋팅
var fn_save_setting = function() {

    // alert($("#operator option:selected").val());
    // alert($("#formulaType option:selected").val());
    // alert($("#first_num_rang").val());
    // alert($("#second_num_rang").val());

    Swal.fire({
        title: '설정 저장',
        text: "입력한 설정으로 저장하시겠습니까??",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.value) {
            operationType     = $("#operator option:selected").val();
            mathExerciseType  = $("#formulaType option:selected").val();
            firstNumRangFrom  = $("#first_num_rang_from").val();
            firstNumRangTo    = $("#first_num_rang_from").val();
            secondNumRangFrom = $("#second_num_rang_from").val();
            secondNumRangTo   = $("#second_num_rang_to").val();

            // 문제 셋팅
            fn_exam_setting();

            // 설정 display
            fn_setting_display();
        }
      })

    

}