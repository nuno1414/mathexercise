
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
let mathExerciseType = "1"; //1: 일반 덧셈
let operationType = "1"; //1:+, 2:-, 3:*, 4:/
let firstNum = null;
let secondNum = null;
let inputNum = null;
let answerNum = null;
let answerFlag = "N"; 

$('document').ready(function() {
    fn_reset();
});

// 초기화
var fn_reset = function() {
    
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

    // Returns a random integer from 1 to 10:
    // Math.floor(Math.random() * 10) + 1;
    firstNum = Math.floor(Math.random() * 10) + 1;
    $('#first_num').val(firstNum);

    secondNum = Math.floor(Math.random() * 10) + 1;
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