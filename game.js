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

S_game.blockOnScreen = 0; //16개 이상이면 안됨

//게임 준비하는곳
S_game.init = function () {
    this.initGameArray();
    this.createBlock();
    this.createBlock();
}


//16개 object를 initBlock으로부터  저장하는 배열 (초기화)
S_game.initGameArray = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            this.gArray[i][j] = 0;
        }
    }
}


S_game.createBlock = function () {
    var options = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (S_game.gArray[i][j] == 0) { //비어있는 인덱스 값만 넣어라 
                options.push({
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
    S_game.gArray[spot.x][spot.y] = r>0.1 ? 2 : 4;  //이건 2 아니면 4 값을 랜덤으로 배정할떄 쓰는 부분
    // S_game.gArray[spot.x][spot.y] = 2;

    //생성 후 그려줘라 화면에 
    $("<div></div>").appendTo("#gameBoard")
        .attr("id", "block" + spot.x + spot.y)
        .addClass("allBlock") //css div 안에 숫자 중간에 두기
        .css({
            left: this.imageCoordinate[spot.x][spot.y].x,
            top: this.imageCoordinate[spot.x][spot.y].y,
            border: '1px solid black',
            position: 'absolute'
        })
        .text(this.gArray[spot.x][spot.y]);
}

S_game.updateBoard = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#block' + i + j).remove();
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // if(this.gArray[i][j] == 0){
            //     $('#block'+i+j).text(' ');
            // } else {
            //     $('#block'+i+j).css({
            //         left: this.imageCoordinate[i][j].x,
            //         top: this.imageCoordinate[i][j].y,
            //         position: 'absolute'
            //     })
            //     .text(this.gArray[i][j] == 0 ? '':this.gArray[i][j]);
            // }


            if (this.gArray[i][j] != 0) {

                $("<div></div>").appendTo("#gameBoard")
                    .attr("id", "block" + i + j)
                    .addClass("allBlock") //css div 안에 숫자 중간에 두기
                    .css({
                        left: this.imageCoordinate[i][j].x,
                        top: this.imageCoordinate[i][j].y,
                        border: '1px solid black',
                        position: 'absolute'
                    })
                    .text(this.gArray[i][j] == 0 ? '' : this.gArray[i][j]);
            }

        }
    }
}

//================================================================================================
//무조건 오른쪽으로 밀어버린다 한 배열 (one row 받아서)
S_game.slideR = function (row) {

    for (var j = 0; j < 3; j++) { //3번 확인하기 위해서
        for (var i = 3; i >= 0; i--) {
            //0이면 아무것도 안해도됨
            if (row[i - 1] != 0 && row[i] == 0 && i != 0) {
                row[i] = row[i - 1];
                row[i - 1] = 0;
            }
        }
    }

}

S_game.combineR = function (row) {
    for (var i = 3; i >= 0; i--) {
        //0이면 아무것도 안해도됨
        if (row[i] == row[i - 1] && i != 0) {
            row[i] += row[i - 1];
            row[i - 1] = 0;
        }
    }
}

S_game.moveRight = function () {
    for (var i = 0; i < 4; i++) {
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
            if (row[i] == 0 && row[i+1] != 0 && i != 3) {
                row[i] = row[i+1];
                row[i+1] = 0;
            }
        }
    }
}

S_game.combineL = function (row) {
    for (var i = 0; i <4; i++) {
        //0이면 아무것도 안해도됨
        if (row[i] == row[i + 1] && i != 3) {
            row[i] += row[i + 1];
            row[i + 1] = 0;
        }
    }
    console.log(row);
}

S_game.moveLeft = function () {
    for (var i = 0; i < 4; i++) {
        this.slideL(this.gArray[i]);
        this.combineL(this.gArray[i]);
        this.slideL(this.gArray[i]);
    }
}
//================================================================================================

//================================================================================================

S_game.slideU = function(row) {
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i <4; i++) {
            //0이면 아무것도 안해도됨
            if (row[i] == 0 && row[i+1] != 0 && i != 3) {
                row[i] = row[i+1];
                row[i+1] = 0;
            }
        }
    }
}

//================================================================================================




//키 이벤트 리스너
S_game.keyDown = function (e) {
    var key = e.keyCode;

    switch (key) {
        case 37: //왼쪽 방향키
            S_game.moveLeft();
            S_game.updateBoard();
            S_game.createBlock();
            break;
        case 39: //오른쪽 방향키
            S_game.moveRight();
            S_game.updateBoard();
            S_game.createBlock();
            //그려주는 함수 추가하기 (업데이트 함수)
            break;
        case 38: //위로 방향키
            S_game.moveUp();
            S_game.updateBoard();
            S_game.createBlock();
            break;
        case 40: //밑으로방향키
            
            break;
    }
}

document.onkeydown = S_game.keyDown;

//2048 실행시 가장먼저 실행되는 부분
window.onload = function () {
    S_game.init();
}