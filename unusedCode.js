//createBlock() 에다가 나중에 jquery 문이랑 교체하기
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


//영상보고 바꾸기 전에 활용했던 코드 (while loop 때문에 문제가 있음)
//한번 움직일때마다 새로운 블럭 생성
S_game.createBlock = function () {
    if (this.blockOnScreen > DEFINE.blockNum) //총 있을수 있는 블락 수 보다 더 많이 있다면 
        return;
    var ran1 = 0;
    var ran2 = 0;
    
    while (1) { //비어있는 블락이 있을때 까지 루프를 돌아라 
        ran1 = Math.floor(Math.random() * 4);
        ran2 = Math.floor(Math.random() * 4);
        if (this.gArray[ran1][ran2].num == 0) { //현제 새로운 블럭
            this.gArray[ran1][ran2].num = 2;
            this.gArray[ran1][ran2].pos = ""+ran1+ran2; //몇번째 위치인지 
            break;
        }
        if(this.blockOnScreen == DEFINE.blockNum) break;
    }

    S_game.blockOnScreen++; //만들어 질떄만다 하나 증가 시킨다.

    //그려줄려고 스타일 주는부분
    $("<div></div>").appendTo("#gameBoard")
        .attr("id","block" + spot.x + spot.y) 
        .addClass("allBlock") //css div 안에 숫자 중간에 두기
        .css({
            width: this.gArray[spot.x][spot.y].w,
            height: this.gArray[spot.x][spot.y].h,
            left: this.gArray[spot.x][spot.y].x,
            top: this.gArray[spot.x][spot.y].y,
            'background-color': 'yellow',
            position: 'absolute'
        })
        .text(this.gArray[ran1][ran2].num);
   
    
}



S_game.moveRight = function () {
    for (var i = 0; i < 4; i++) {
        for(var j=0; j<4; j++){
            if(j == 0) {
                if(this.gArray[i][j].num == this.gArray[i][j+1].num){ //다음 값이랑 같은지 확인 
                    this.gArray[i][j+1].num += this.gArray[i][j].num;//0번쨰 1번째 같은경우 
                    this.gArray[i][j].num = 0; //옆으로 더해서 옮김으로 비웠다
                    this.blockOnScreen--;
                    if(this.gArray[i][j+2].num == this.gArray[i][j+3].num){ //0이랑 1 이같으면 2번째 랑 3번째도 같은지 확인
                        //합해라 3번째 4번쨰
                        this.gArray[i][j+3].num += this.gArray[i][j+2].num;
                        this.gArray[i][j+3].num = 0;
                        this.blockOnScreen--;
                        //첫째 둘째 합한것도 옮겨주기
                        this.gArray[i][j+2].num = this.gArray[i][j+1].num;
                        this.gArray[i][j+1].num = 0;
                    }
                } else if(this.gArray[i][j].num == this.gArray[i][j+2].num && this.gArray[i][j+1].num == 0) { //0이랑 2랑 같고  1에 값은 0인지
                    this.gArray[i][j+2].num = this.gArray[i][j].num;
                    this.gArray[i][j].num = 0;
                    this.blockOnScreen--;
                } else if(this.gArray[i][j].num == this.gArray[i][j+3].num && this.gArray[i][j+1].num == 0 && this.gArray[i][j+2].num == 0){ //0번쨰 3번째 같은지
                    this.gArray[i][j+3].num = this.gArray[i][j].num;
                    this.gArray[i][j].num = 0;
                    this.blockOnScreen--;
                }
            }else if(j==1) {
                if(this.gArray[i][j].num == this.gArray[i][j+1].num){
                    this.gArray[i][j+1].num += this.gArray[i][j].num;
                } else if(this.gArray[i][j].num == this.gArray[i][j+2].num && this.gArray[i][j+1].num == 0){
                    this.gArray[i][j+2].num += this.gArray[i][j].num;
                    this.gArray[i][j].num = 0;
                    this.blockOnScreen--;
                }
            } else if(j ==2) {
                if(this.gArray[i][j].num == this.gArray[i][j+1].num){
                    this.gArray[i][j+1].num += this.gArray[i][j].num;
                    this.gArray[i][j].num = 0;
                    this.blockOnScreen--;
                }
            }
        }
    }
}

//======================================================================

S_game.moveUp = function () {
    var arr = [];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    for (var i = 0; i < 4; i++) {
       arr.push(S_game.gArray[i][0]);
       arr1.push(S_game.gArray[i][1]);
       arr2.push(S_game.gArray[i][2]);
       arr3.push(S_game.gArray[i][3]);
    }
    arr = this.operateUp(arr);
    arr1 = this.operateUp(arr1);
    arr2 = this.operateUp(arr2);
    arr3 = this.operateUp(arr2);
    for(var i=0; i<4; i++) {
        S_game.gArray[i][0] = arr[i];
        S_game.gArray[i][1] = arr1[i];
        S_game.gArray[i][2] = arr2[i];
        S_game.gArray[i][3] = arr3[i];
    }
    
}


S_game.operateUp = function(row){
    for (var i = 0; i < 4; i++) {
        row = this.slideU(row);
        row = this.combineU(row);
        row = this.slideU(row);
    }
    return row;
}

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
    return row;
}

S_game.combineU = function (row) {
    for (var i = 0; i <4; i++) {
        //0이면 아무것도 안해도됨
        if (row[i] == row[i + 1] && i != 3) {
            row[i] += row[i + 1];
            row[i + 1] = 0;
        }
    }
    return row;
}


//======================================================================






//위치 변경후 position 세팅하기 위해서 
// S_game.beforeSlide = function() {
//         for (var i=0; i<4; i++) { //3번 확인하기 위해서
//             for (var j=0; j<4; j++) {
//                this.gArray[i][j].prevPosition = this.gArray[i][j].position;
//             //    this.gArray[i][j].position = "block"+i+j;
//             }
//         }
    
    
// }







//요기서 합침 애니매이션 넣기 [커졌다가 줄어들기]
UTIL.utilScale_xy_center("block" + i + j, 0, 0);

var scaleUp = 0.2; //0.2씩 증가해서 1 만든다
var curScale = 2.0;
var loop_scale = function () {
    setTimeout(function () {
        curScale -= scaleUp;
        if (curScale >= 1) {
            // S_game.canKeyPress = false; //요기 있는걸 블럭 옮기는 애니매이션에다가 넣어두기
            UTIL.utilScale_xy_center("block" + i + j, curScale, curScale);
            loop_scale();
        } else {
            return;
        }
    }, 3000);
}
loop_scale();
    }