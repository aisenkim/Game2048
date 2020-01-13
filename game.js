var S_game = {};

//define 으로 w h 설정하기

S_game.gArray = [
    [],
    [],
    [],
    []
];
S_game.imageCoordinate = [ //화면상 위치 (left: top: 값임)
    [{x:"0px",y: "0px"},{ x: "100px",y: "0px"},{x: "200px", y: "0px"},{ x: "300px",y: "0px" }],
    [{x:"0px", y: "100px"},{x:"100px",y: "100px"}, {x:"200px", y: "100px"},{x:"300px", y: "100px"}],
    [{x:"0px", y: "200px"},{x: "100px",y: "200px"},{x: "200px",y: "200px"},{x: "300px",y: "200px"}],
    [{x:"0px",y: "300px"},{x: "100px",y: "300px"},{x: "200px",y: "300px"},{x: "300px",y: "300px"}]
];

S_game.blockColor = {
    num2 : "rgb(238, 228,218)",
    num4 : "rgb(237, 224,200)",
    num8 : "rgb(242, 177, 121)",
    num16 : "rgb(245 149 99)",
    num32 : "rgb(246 124 95)",
    num64 : "rgb(246 94 59)",
    num128 : "rgb(237 207 114)",
    num256 : "rgb(237 204 97)",
    num512 : "rgb(237 200 80)",
    num1024 : "rgb(237 197 63)",
    num2048 : "rgb(237 194 46)",
}

S_game.blockOnScreen = 0; //16개 이상이면 안됨
S_game.score = 0; //총 점수 보관하는곳
S_game.canKeyPress = true;

//게임 준비하는곳
S_game.init = function () {
    this.initGameBoard();
    this.initGameArray();
    this.createBlock();
    this.createBlock();
}

S_game.initGameBoard = function() {
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            $("<div></div>").appendTo("#gameBoard")
                    .css({
                        left: this.imageCoordinate[i][j].x,
                        top: this.imageCoordinate[i][j].y,
                        width : "100px",
                        height: "100px",
                        border: '1px solid black',
                        position: 'absolute',
                        'z-index' : 2
                    });
        }
    }
}



//16개 object를 initBlock으로부터  저장하는 배열 (초기화)
S_game.initGameArray = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            this.gArray[i][j] = {
                num : 0,
                position : {x : 99, y : 99},
                prevPosition: {x : 99, y : 99}
            }
        }
    }
}


S_game.createBlock = function () {
    var options = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (S_game.gArray[i][j].num == 0 || S_game.gArray[i][j] == null) { //비어있는 인덱스 값만 넣어라 
                options.push({  //랜덤한 인덱스를 받기위해서 비어있는곳 인덱스를 다 넣어둔다. randomArray에 매개변수로 보낸다
                    x: i,
                    y: j
                });
            }
        }
    }
    if (options.length > 0) {
        var spot = UTIL.randomArray(options);
    } else { //비어있는 자리가 없음으로 그냥 리턴
        console.log("No empty spot");
        return;
    }
    var r = Math.random(1);
    S_game.gArray[spot.x][spot.y].num = r>0.1 ? 2 : 4;  //이건 2 아니면 4 값을 랜덤으로 배정할떄 쓰는 부분
    this.gArray[spot.x][spot.y].position = this.imageCoordinate[spot.x][spot.y];
    // S_game.gArray[spot.x][spot.y] = 2;

    //생성 후 그려줘라 화면에 
    $("<div></div>").appendTo("#gameBoard")
        .attr("id", "block" + spot.x + spot.y)
        .addClass("allBlock") //css div 안에 숫자 중간에 두기
        .css({
            left: this.imageCoordinate[spot.x][spot.y].x,
            top: this.imageCoordinate[spot.x][spot.y].y,
            // border: '1px solid black',
            position: 'absolute',
            'background-color' : S_game.gArray[spot.x][spot.y].num == 2 ? S_game.blockColor.num2 : S_game.blockColor.num4 
        })
        .text(this.gArray[spot.x][spot.y].num);

    //생성될때 작은상태에서 커지는 부분 
    UTIL.utilScale_xy_center("block" + spot.x + spot.y, 0,0);
    
    var scaleUp = 0.2; //0.2씩 증가해서 1 만든다
    var curScale = 0;
    var loop_scale = function(){
        setTimeout(function(){
            curScale += scaleUp; 
            if(curScale <= 1){
                S_game.canKeyPress = false;
                UTIL.utilScale_xy_center("block" + spot.x + spot.y, curScale,curScale);
                loop_scale();
            } else {
                S_game.canKeyPress = true; // 애니매이션 끝났으니가 키 누를수 있게 해준다
                return;
            }
        }, 50);
    }
    loop_scale();
}

S_game.updateBoard = function () {
    // this.animateBlock();
    var numColorString = '';
    for (var i = 0; i < 4; i++) { //이부분을 애니매이션 파트에 추가해주기  그리고 요기서 애니매이션 호출?? 
        for (var j = 0; j < 4; j++) {
            $('#block' + i + j).remove();
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            numColorString = "num"+S_game.gArray[i][j].num;
            if (this.gArray[i][j].num != 0) {

                $("<div></div>").appendTo("#gameBoard")
                    .attr("id", "block" + i + j)
                    .addClass("allBlock") //css div 안에 숫자 중간에 두기
                    .css({
                        left: this.imageCoordinate[i][j].x,
                        top: this.imageCoordinate[i][j].y,
                        position: 'absolute',
                        'background-color' : S_game.blockColor[numColorString] 
                    })
                    .text(this.gArray[i][j].num == 0 ? '' : this.gArray[i][j].num);
            }

        }
    }
}


//위치 변경후 position 세팅하기 위해서 
S_game.beforeSlide = function() {
        for (var i=0; i<4; i++) { //3번 확인하기 위해서
            for (var j=0; j<4; j++) {
               this.gArray[i][j].prevPosition = this.gArray[i][j].position;
            //    this.gArray[i][j].position = "block"+i+j;
            }
        }
    
    
}

//================================================================================================
//무조건 오른쪽으로 밀어버린다 한 배열 (one row 받아서)
S_game.slideR = function (row) {
    for (var j = 0; j < 3; j++) { //3번 확인하기 위해서
        for (var i = 3; i >= 0; i--) {
            //0이면 아무것도 안해도됨
            if (i != 0) {
                if (row[i - 1].num != 0 && row[i].num == 0) {
                    row[i].num = row[i - 1].num;
                    row[i].position = row[i - 1].position;
                    row[i - 1].num = 0;
                }
            }
        }
    }
    console.log(row[3]);
}

S_game.combineR = function (row) {
    for (var i = 3; i >= 0; i--) {
        //0이면 아무것도 안해도됨
        if (i != 0) {
            if (row[i].num == row[i - 1].num) {
                row[i].num += row[i - 1].num;
                S_game.score += row[i].num;//점수 더해주는 부분
                row[i].position = row[i - 1].position;
                row[i - 1].num = 0;
            }
        }
    }
}

S_game.moveRight = function () {
    for (var i = 0; i < 4; i++) {
        this.beforeSlide();
        this.slideR(this.gArray[i]);
        this.combineR(this.gArray[i]);
        this.slideR(this.gArray[i]);
    }
}
//================================================================================================

//================================================================================================

S_game.slideL = function(row) {
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i <4; i++) {
            //0이면 아무것도 안해도됨
            if (i != 3) {
                if (row[i].num == 0 && row[i + 1].num != 0) {
                    row[i].num = row[i + 1].num;
                    row[i].position = row[i + 1].position;
                    row[i + 1].num = 0;
                }
            }
        }
    }
}

S_game.combineL = function (row) {
    var combineCounter = 0;
    for (var i = 0; i < 4; i++) {
        //0이면 아무것도 안해도됨
        if (i != 3) {
            if (row[i].num == row[i + 1].num) {
                row[i].num += row[i + 1].num;
                S_game.score += row[i].num;//점수 더해주는 부분
                row[i].position = row[i + 1].position;
                row[i + 1].num = 0;
            }
        }
    }
}

S_game.moveLeft = function () {
    for (var i = 0; i < 4; i++) {
        this.beforeSlide();
        this.slideL(this.gArray[i]);
        this.combineL(this.gArray[i]);
        this.slideL(this.gArray[i]);
    }
}
//================================================================================================

//================================================================================================

S_game.moveUp = function () {
    var arr = [];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    this.beforeSlide();
    for (var i = 0; i < 4; i++) {
       arr.push(S_game.gArray[i][0]);
       arr1.push(S_game.gArray[i][1]);
       arr2.push(S_game.gArray[i][2]);
       arr3.push(S_game.gArray[i][3]);
    }
    arr = this.operateUp(arr);
    arr1 = this.operateUp(arr1);
    arr2 = this.operateUp(arr2);
    arr3 = this.operateUp(arr3);
    for(var i=0; i<4; i++) {
        S_game.gArray[i][0].num = arr[i].num;
        S_game.gArray[i][1].num = arr1[i].num;
        S_game.gArray[i][2].num = arr2[i].num;
        S_game.gArray[i][3].num = arr3[i].num;
    }
}

S_game.operateUp = function (row) {
    
    row = this.slideU(row);
    row = this.combineU(row);
    row = this.slideU(row);
    return row;
}

S_game.slideU = function (row) {
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 4; i++) {
            //0이면 아무것도 안해도됨
            if (i != 3) {
                if (row[i].num == 0 && row[i + 1].num != 0) {
                    row[i].num = row[i + 1].num;
                    row[i].position = row[i + 1].position;
                    row[i + 1].num = 0;
                }
            }
        }
    }
    return row;
}

S_game.combineU = function (row) {
    for (var i = 0; i < 4; i++) {
        //0이면 아무것도 안해도됨
        if (i != 3) {
            if (row[i].num == row[i + 1].num) {
                row[i].num += row[i + 1].num;
                S_game.score += row[i].num;//점수 더해주는 부분
                row[i].position = row[i + 1].position;
                row[i + 1].num = 0;
            }
        }
    }
    return row;
}

//================================================================================================

//=======================================================================================================

S_game.moveDown = function () {
    var arr = [];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    this.beforeSlide();
    for (var i = 0; i < 4; i++) {
       arr.push(S_game.gArray[i][0]);
       arr1.push(S_game.gArray[i][1]);
       arr2.push(S_game.gArray[i][2]);
       arr3.push(S_game.gArray[i][3]);
    }
    arr = this.operateDown(arr);
    arr1 = this.operateDown(arr1);
    arr2 = this.operateDown(arr2);
    arr3 = this.operateDown(arr3);
    for(var i=0; i<4; i++) {
        S_game.gArray[i][0].num = arr[i].num;
        S_game.gArray[i][1].num = arr1[i].num;
        S_game.gArray[i][2].num = arr2[i].num;
        S_game.gArray[i][3].num = arr3[i].num;
    }
}

S_game.operateDown = function(row){
    row = this.slideD(row);
    row = this.combineD(row);
    row = this.slideD(row);
    return row;
}

S_game.slideD = function (row) {

    for (var j = 0; j < 3; j++) { //3번 확인하기 위해서
        for (var i = 3; i >= 0; i--) {
            //0이면 아무것도 안해도됨
            if (i != 0) {
                if (row[i - 1].num != 0 && row[i].num == 0) {
                    row[i].num = row[i - 1].num;
                    row[i].position = row[i - 1].position;
                    row[i - 1].num = 0;
                }
            }
        }
    }
    return row;
}

S_game.combineD = function (row) {
    for (var i = 3; i >= 0; i--) {
        //0이면 아무것도 안해도됨
        if (i != 0) {
            if (row[i].num == row[i - 1].num) {
                row[i].num += row[i - 1].num;
                S_game.score += row[i].num;//점수 더해주는 부분
                row[i].position = row[i - 1].position;
                row[i - 1].num = 0;
            }
        }
    }
    return row;
}

//=======================================================================================================



// S_game.animateBlock = function(){
//     var currentX=0;
//     var currentY=0;
//     var prevX = 0;
//     var prevY = 0;
//     var difference = 0;
//     for(var i=0; i<4; i++){
//         for(var j=0; j<4; j++){
//             currentX = S_game.gArray[i][j].position.x;
//             currentY = S_game.gArray[i][j].position.y;
//             prevX = S_game.gArray[i][j].prevPosition.x;
//             prevY = S_game.gArray[i][j].prevPosition.y;
//             $("body").keydown(function(e){
//                 if(e.keyCode == 37 || which == 37) { //왼쪽 키 
//                     S_game.aniInterval(i,j,currentX);
//                 }
//             })
//         }
//     }
// }

S_game.updateScore = function(){
    $("#scoreBoard").text("SCORE: " + S_game.score);
}


//키 이벤트 리스너
S_game.keyDown = function (e) {
    var key = e.keyCode;

    if(S_game.canKeyPress == false){ //애니메이션 중 키를 막기위해서 toggle 설정함.
        return;
    }

    switch (key) {
        case 37: //왼쪽 방향키
            S_game.moveLeft();
            S_game.updateBoard();
            S_game.createBlock();
            S_game.updateScore();
            break;
        case 39: //오른쪽 방향키
            S_game.moveRight();
            S_game.updateBoard();
            S_game.createBlock();
            S_game.updateScore();
            //그려주는 함수 추가하기 (업데이트 함수)
            break;
        case 38: //위로 방향키
            S_game.moveUp();
            S_game.updateBoard();
            S_game.createBlock();
            S_game.updateScore();
            break;
        case 40: //밑으로방향키
            S_game.moveDown();
            S_game.updateBoard();
            S_game.createBlock();
            S_game.updateScore();
            break;
    }
}

document.onkeydown = S_game.keyDown;

//2048 실행시 가장먼저 실행되는 부분
window.onload = function () {
    S_game.init();
}