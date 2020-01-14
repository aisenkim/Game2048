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

S_game.aniPx = [[],[],[],[]];

S_game.blockOnScreen = 0; //16개 이상이면 안됨
S_game.score = 0; //총 점수 보관하는곳
S_game.canKeyPress = true;


//게임 준비하는곳
S_game.init = function () {
    this.initGameBoard();
    this.initGameArray();
    this.createBlock();
    this.createBlock();
    // S_game.createBlockTestVersion(0,0,4);
    // S_game.createBlockTestVersion(0,1,4);
    // S_game.createBlockTestVersion(0,2,4);
    // S_game.createBlockTestVersion(0,3,2);
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
                        border: '2px solid #4c4c4c',
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
                beforeID : "",
                afterID: "",
                beforePosition: 0,
                afterPosition: 0
            }
        }
    }
}


S_game.createBlock = function () {
    if(S_game.blockOnScreen == 16){ //end of game
        //화면에 블럭은 16개 이지만 아직 합처질수 있는 블럭이 있는지 확인하는거
        S_game.canKeyPress = true;
        for(var i = 0; i<4; i++){ 
            for(var j=0; j<4; j++){
                if(j < 3){
                    if(S_game.gArray[i][j].num == S_game.gArray[i][j+1].num)
                        return; //블럭은 full 이지만 아직 할수있는 동작이 남았다
                }
                if(i < 3){ //2까지만 확인하기
                    if(S_game.gArray[i][j].num == S_game.gArray[i+1][j].num)
                        return; //블럭은 full 이지만 아직 할수있는 동작이 남았다
                }
            }
        }
        //이제 옵션이 없으면
        alert("GAME OVER");
        //초기화 함수 작성하기
        return;
    }
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
        S_game.blockOnScreen++;
    } else { //비어있는 자리가 없음으로 그냥 리턴 [재일 위에줄이랑 같은 역활 하는것]
        console.log("No empty spot");
        return;
    }
    var r = Math.random(1);
    S_game.gArray[spot.x][spot.y].num = r>0.1 ? 2 : 4;  //이건 2 아니면 4 값을 랜덤으로 배정할떄 쓰는 부분
    this.gArray[spot.x][spot.y].afterID = "block"+spot.x+spot.y;
    this.gArray[spot.x][spot.y].afterPosition = S_game.imageCoordinate[spot.x][spot.y]; //처음에 애프터 주면 beforePosID 함수에서 .after 에다가 넣어둔다 (cycles)
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
                // S_game.canKeyPress = false; //요기 있는걸 블럭 옮기는 애니매이션에다가 넣어두기
                UTIL.utilScale_xy_center("block" + spot.x + spot.y, curScale,curScale);
                loop_scale();
            } else {
                S_game.canKeyPress = true; // 애니매이션 끝났으니가 키 누를수 있게 해준다
                return;
            }
        }, 30);
    }
    loop_scale();
}

S_game.createBlockTestVersion = function(spotX, spotY, num){
    S_game.gArray[spotX][spotY].num = num;
    $("<div></div>").appendTo("#gameBoard")
        .attr("id", "block" + spotX + spotY)
        .addClass("allBlock") //css div 안에 숫자 중간에 두기
        .css({
            left: this.imageCoordinate[spotX][spotY].x,
            top: this.imageCoordinate[spotX][spotY].y,
            // border: '1px solid black',
            position: 'absolute',
            'background-color' : S_game.gArray[spotX][spotY].num == 2 ? S_game.blockColor.num2 : S_game.blockColor.num4 
        })
        .text(this.gArray[spotX][spotY].num);
}

S_game.animateBlock = function () {
    S_game.canKeyPress = false; //애니매이션 시작했으니 키 못누르게 막아라
    var beforeID = "";
    var afterID = "";
    var beforePos = "";
    var afterPos = "";
    var difLeft = 0;
    var difTop = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // console.log(S_game.gArray);
            if (S_game.gArray[i][j].num != 0) {
                beforeID = "#" + S_game.gArray[i][j].beforeID;
                afterID = "#" + S_game.gArray[i][j].afterID;
                beforePos = S_game.gArray[i][j].beforePosition;
                afterPos = S_game.gArray[i][j].afterPosition;
                difLeft = parseInt(afterPos.x) - parseInt(beforePos.x);
                difTop = parseInt(afterPos.y) - parseInt(beforePos.y);
                console.log("after.x: " + parseInt(afterPos.y) + " - " + "before.x: " + parseInt(beforePos.y));
                if (difLeft != 0) {
                    $(beforeID).animate({
                        left: "+=" + difLeft
                    }, 200);
                } else if (difTop != 0) {
                    $(beforeID).animate({
                        top: "+=" + difTop
                    }, 200);
                }

            }
        }
    }

}

S_game.updateBoard = function () {
    this.animateBlock();
    var numColorString = '';
    setTimeout(function () {

        for (var i = 0; i < 4; i++) { //이부분을 애니매이션 파트에 추가해주기  그리고 요기서 애니매이션 호출?? 
            for (var j = 0; j < 4; j++) {
                $('#block' + i + j).remove();
                S_game.blockOnScreen = 0; //화면에 있는 블락 수 다 지워준다
            }
        }

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                numColorString = "num" + S_game.gArray[i][j].num;
                if (S_game.gArray[i][j].num != 0) {
                    S_game.blockOnScreen++; //화면에 몇개 있는지 다시 확인해준다.
                    $("<div></div>").appendTo("#gameBoard")
                        .attr("id", "block" + i + j)
                        .addClass("allBlock") //css div 안에 숫자 중간에 두기
                        .css({
                            left: S_game.imageCoordinate[i][j].x,
                            top: S_game.imageCoordinate[i][j].y,
                            position: 'absolute',
                            'background-color': S_game.blockColor[numColorString]
                        })
                        .text(S_game.gArray[i][j].num == 0 ? '' : S_game.gArray[i][j].num);
                }
            }
        }
        S_game.createBlock(); // 업데이트 다 끝나고 새로운 블럭을 만든다
    }, 200);
}

S_game.storeBeforePosID = function(arr, row) {
    for(var i=0; i<4; i++){
        arr[i].beforePosition = arr[i].afterPosition;
        arr[i].beforeID = arr[i].afterID;
    }
}

S_game.storeAfterPosID = function (arr, row, direction) { //값 변경 후 위치 밎 아이디를 저장해둔다 
    if (direction === "leftright") {
        for (var i = 0; i < 4; i++) {
            arr[i].afterPosition = S_game.imageCoordinate[row][i];
            arr[i].afterID = "block" + row + i;
        }
    } else if(direction === "updown"){
        for (var i = 0; i < 4; i++) {
            arr[i].afterPosition = S_game.imageCoordinate[i][row]; //2D 배열에서 앞쪽만 루프돌고 뒤쪽은 고정  각 배열마다 0번째만 바꿔주면 되서
            arr[i].afterID = "block" + i + row;
        }
    }

}


//================================================================================================
//무조건 오른쪽으로 밀어버린다 한 배열 (one row 받아서)
S_game.slideR = function (row) {
    var temp = 0;
    for (var j = 0; j < 3; j++) { //3번 확인하기 위해서
        for (var i = 3; i >= 0; i--) {
            //0이면 아무것도 안해도됨
            if (i != 0) {
                if (row[i - 1].num != 0 && row[i].num == 0) {
                    temp = row[i];
                    row[i] = row[i-1];
                    row[i-1] = temp;
                }
            }
        }
    }
}

S_game.combineR = function (row) { //오른쪽에서 왼쪽으로 가면서 확인한다
    var temp = 0;
    for (var i = 3; i >= 0; i--) {
        //0이면 아무것도 안해도됨
        if (i != 0) {
            if (row[i].num == row[i - 1].num) {
                row[i-1].num += row[i].num;
                S_game.score += row[i-1].num;//점수 더해주는 부분
                temp = row[i-1];
                row[i-1] = row[i];
                row[i] = temp;
                row[i-1].num = 0;
            }
        }
    }
}

S_game.moveRight = function () {
    for (var i = 0; i < 4; i++) {
        this.storeBeforePosID(this.gArray[i], i);
        this.slideR(this.gArray[i]);
        this.combineR(this.gArray[i]);
        this.slideR(this.gArray[i]);
        this.storeAfterPosID(this.gArray[i], i, "leftright");
    }

}

//================================================================================================

//================================================================================================

S_game.slideL = function(row) {
    var temp = 0;
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i <4; i++) {
            //0이면 아무것도 안해도됨
            if (i != 3) {
                if (row[i].num == 0 && row[i + 1].num != 0) {
                    temp = row[i+1];
                    row[i+1] = row[i];
                    row[i] = temp;
                    // row[i].num = row[i + 1].num;
                    // row[i + 1].num = 0;
                }
            }
        }
    }
}

S_game.combineL = function (row) {
    var temp = 0;
    for (var i = 0; i < 4; i++) {
        //0이면 아무것도 안해도됨
        if (i != 3) {
            if (row[i].num == row[i + 1].num) {
                row[i+1].num += row[i].num;
                S_game.score += row[i+1].num;//점수 더해주는 부분
                temp = row[i+1];
                row[i+1] = row[i];
                row[i] = temp;
                row[i+1].num = 0;
            }
        }
    }
}

S_game.moveLeft = function () {
    for (var i = 0; i < 4; i++) {
        this.storeBeforePosID(this.gArray[i], i);
        this.slideL(this.gArray[i]);
        this.combineL(this.gArray[i]);
        this.slideL(this.gArray[i]);
        this.storeAfterPosID(this.gArray[i], i, "leftright");
    }
}
//================================================================================================

//================================================================================================

S_game.moveUp = function () {
    var arr = [];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    // this.beforeSlide();
    for (var i = 0; i < 4; i++) {
       arr.push(S_game.gArray[i][0]);
       arr1.push(S_game.gArray[i][1]);
       arr2.push(S_game.gArray[i][2]);
       arr3.push(S_game.gArray[i][3]);
    }
    arr = this.operateUp(arr, 0);
    arr1 = this.operateUp(arr1, 1);
    arr2 = this.operateUp(arr2,2);
    arr3 = this.operateUp(arr3,3);
    for(var i=0; i<4; i++) {
        S_game.gArray[i][0]= arr[i];
        S_game.gArray[i][1] = arr1[i];
        S_game.gArray[i][2] = arr2[i];
        S_game.gArray[i][3] = arr3[i];
    }
}

S_game.operateUp = function (row, idx) {
    this.storeBeforePosID(row, idx);
    row = this.slideU(row);
    row = this.combineU(row);
    row = this.slideU(row);
    this.storeAfterPosID(row, idx, "updown");
    return row;
}

S_game.slideU = function (row) {
    var temp = 0;
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i <4; i++) {
            //0이면 아무것도 안해도됨
            if (i != 3) {
                if (row[i].num == 0 && row[i + 1].num != 0) {
                    temp = row[i+1];
                    row[i+1] = row[i];
                    row[i] = temp;
                    // row[i].num = row[i + 1].num;
                    // row[i + 1].num = 0;
                }
            }
        }
    }
    return row;
}

S_game.combineU = function (row) {
    var temp = 0;
    for (var i = 0; i < 4; i++) {
        //0이면 아무것도 안해도됨
        if (i != 3) {
            if (row[i].num == row[i + 1].num) {
                row[i+1].num += row[i].num;
                S_game.score += row[i+1].num;//점수 더해주는 부분
                temp = row[i+1];
                row[i+1] = row[i];
                row[i] = temp;
                row[i+1].num = 0;
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
    // this.beforeSlide();
    for (var i = 0; i < 4; i++) {
       arr.push(S_game.gArray[i][0]);
       arr1.push(S_game.gArray[i][1]);
       arr2.push(S_game.gArray[i][2]);
       arr3.push(S_game.gArray[i][3]);
    }
    arr = this.operateDown(arr,0);
    arr1 = this.operateDown(arr1,1);
    arr2 = this.operateDown(arr2,2);
    arr3 = this.operateDown(arr3,3);
    for(var i=0; i<4; i++) {
        S_game.gArray[i][0] = arr[i];
        S_game.gArray[i][1] = arr1[i];
        S_game.gArray[i][2] = arr2[i];
        S_game.gArray[i][3] = arr3[i];
    }
}

S_game.operateDown = function(row,idx){
    this.storeBeforePosID(row, idx);
    row = this.slideD(row);
    row = this.combineD(row);
    row = this.slideD(row);
    this.storeAfterPosID(row, idx, "updown");
    return row;
}

S_game.slideD = function (row) {
    var temp = 0;
    for (var j = 0; j < 3; j++) { //3번 확인하기 위해서
        for (var i = 3; i >= 0; i--) {
            //0이면 아무것도 안해도됨
            if (i != 0) {
                if (row[i - 1].num != 0 && row[i].num == 0) {
                    temp = row[i];
                    row[i] = row[i-1];
                    row[i-1] = temp;
                }
            }
        }
    }
    return row;
}

S_game.combineD = function (row) {
    var temp = 0;
    for (var i = 3; i >= 0; i--) {
        //0이면 아무것도 안해도됨
        if (i != 0) {
            if (row[i].num == row[i - 1].num) {
                row[i-1].num += row[i].num;
                S_game.score += row[i-1].num;//점수 더해주는 부분
                temp = row[i-1];
                row[i-1] = row[i];
                row[i] = temp;
                row[i-1].num = 0;
            }
        }
    }
    return row;
}

//=======================================================================================================


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
            S_game.updateScore();
            break;
        case 39: //오른쪽 방향키
            S_game.moveRight();
            S_game.updateBoard();
            S_game.updateScore();
            //그려주는 함수 추가하기 (업데이트 함수)
            break;
        case 38: //위로 방향키
            S_game.moveUp();
            S_game.updateBoard();
            S_game.updateScore();
            break;
        case 40: //밑으로방향키
            S_game.moveDown();
            S_game.updateBoard();
            S_game.updateScore();
            break;
    }
}

document.onkeydown = S_game.keyDown;

//2048 실행시 가장먼저 실행되는 부분
window.onload = function () {
    S_game.init();
}