var S_game = {};

//define 으로 w h 설정하기

S_game.gArray = [];
S_game.imageCoordinate = [
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
    {x:0, y:0},
];

//게임 준비하는곳
S_game.init = function() {
    this.initGameArray();
    this.createBlock();
}



//16개 object를 initBlock으로부터  저장하는 배열 (초기화)
S_game.initGameArray = function(imageCoordinate){
    for(var i=0; i<16; i++){
        this.gArray[i] = {
            curx : 0,
            cury : 0,
            x    : 0, //left 값 image coordinate 에서 받아온 값으로 설정해주기
            y    : 0, //top 값
            num : 0 // 게임에서 숫자
        }
    }
}

//한번 움직일때마다 새로운 블럭 생성
S_game.createBlock = function () {
    var ran = Math.floor(Math.random() * 15);
    while (1) { //비어있는 블락이 있을때 까지 루프를 돌아라 
        if (this.gArray[ran] == 0) { //현제 새로운 블럭
            this.gArray[ran] = 2;
            break;
        }
    }
    console.log("Random: " + ran);
    var position = $('#cell' + ran).position();
    var height = $('#cell' + ran).height();
    var width = $('#cell' + ran).width();

    $('<div class=block></div>')
        .appendTo('.game_grid')
        .css({
            left: position.left + 'px',
            top: position.top + 'px',
            height: height+'px',
            width: width+'px',
            outline: '1px solid',
            'background-color': 'yellow'
        })
}



S_game.moveLeft = function() {

}




//키 이벤트 리스너
S_game.keyDown = function(e) {
    var key = e.keyCode; 

    switch(key) {
        case 37: //왼쪽 방향키
            break;
        case 39: //오른쪽 방향키 
            break;
        case 38 ://밑으로 방향키
            break;
        case 40 : //위로 방향키
            break;
    }
} 

//2048 실행시 가장먼저 실행되는 부분
window.onload = function() {
    S_game.init();
}