var S_game = {};

//define 으로 w h 설정하기

S_game.gArray = [];
S_game.imageCoordinate = [ //화면상 위치 (left: top: 값임)
    {
        x: "0px",
        y: "0px"
    },
    {
        x: "100px",
        y: "0px"
    },
    {
        x: "200px",
        y: "0px"
    },
    {
        x: "300px",
        y: "0px"
    },
    {
        x: "0px",
        y: "100px"
    },
    {
        x: "100px",
        y: "100px"
    },
    {
        x: "200px",
        y: "100px"
    },
    {
        x: "300px",
        y: "100px"
    },
    {
        x: "0px",
        y: "200px"
    },
    {
        x: "100px",
        y: "200px"
    },
    {
        x: "200px",
        y: "200px"
    },
    {
        x: "300px",
        y: "200px"
    },
    {
        x: "0px",
        y: "300px"
    },
    {
        x: "100px",
        y: "300px"
    },
    {
        x: "200px",
        y: "300px"
    },
    {
        x: "300px",
        y: "300px"
    },
];
S_game.blockOnScreen = 0; //16개 이상이면 안됨

//게임 준비하는곳
S_game.init = function () {
    this.initGameArray();
    this.createBlock();
    this.createBlock();
}


//16개 object를 initBlock으로부터  저장하는 배열 (초기화)
S_game.initGameArray = function (imageCoordinate) {
    for (var i = 0; i < 16; i++) {
        this.gArray[i] = {
            curx: 0,
            cury: 0,
            x: this.imageCoordinate[i].x, //left 값 image coordinate 에서 받아온 값으로 설정해주기
            y: this.imageCoordinate[i].y, //top 값
            w: DEFINE.size.w,
            h: DEFINE.size.h,
            num: 0, // 게임에서 숫자
            pos: 99 //0 ~ 15 
        }
    }
}

//한번 움직일때마다 새로운 블럭 생성
S_game.createBlock = function () {
    if (this.blockOnScreen > DEFINE.blockNum) //총 있을수 있는 블락 수 보다 더 많이 있다면 
        return;
    var ran = 0;
    while (1) { //비어있는 블락이 있을때 까지 루프를 돌아라 
        ran = Math.floor(Math.random() * 16);
        if (this.gArray[ran].num == 0) { //현제 새로운 블럭
            this.gArray[ran].num = 2;
            this.gArray[ran].pos = ran; //몇번째 위치인지 
            break;
        }
    }

    S_game.blockOnScreen++; //만들어 질떄만다 하나 증가 시킨다.

    //그려줄려고 스타일 주는부분
    $("<div></div>").appendTo("#gameBoard")
        .attr("id","block" + ran) 
        .css({
            width: this.gArray[ran].w,
            height: this.gArray[ran].h,
            left: this.gArray[ran].x,
            top: this.gArray[ran].y,
            'background-color': 'yellow',
            position: 'absolute'
        })
        .text(this.gArray[ran].num);
   
    // var gameDiv = document.getElementById("gameBoard");
    // var blockDiv = document.createElement("div");
    // blockDiv.innerHTML(this.gArray[ran].num);
    // gameDiv.appendChild(blockDiv);
    // $(blockDiv).css({
    //     width: this.gArray[ran].w,
    //         height: this.gArray[ran].h,
    //         left: this.gArray[ran].x,
    //         top: this.gArray[ran].y,
    //         'background-color': 'yellow',
    //         position: 'absolute'
    // })
}



S_game.moveRight = function () {
    for (var i = 0; i <= DEFINE.blockNum; i++) {
        if(i <=2){//0에서 3일때
            if(this.gArray[i+1].num ){
                
            }
        } else if(i>=4 && i<=6) {
            console.log("write something here");
        }else if(i>=8 && i<=10){
            console.log("write something here");
        }else if(i>=12 && i<=14) {
            console.log("write something here");
        } else { //오른쪽 끝자리들일때 아무것도 안해도 됨
            console.log("아무것도 안해도 됨 (리턴 넣기??")
        }
    }
}

S_game.checkMoveRight = function(index) { //배열 루프 돌때 몇번쨰 인지

}




//키 이벤트 리스너
S_game.keyDown = function (e) {
    var key = e.keyCode;

    switch (key) {
        case 37: //왼쪽 방향키
            break;
        case 39: //오른쪽 방향키 
            break;
        case 38: //밑으로 방향키
            break;
        case 40: //위로 방향키
            break;
    }
}

//2048 실행시 가장먼저 실행되는 부분
window.onload = function () {
    S_game.init();
}