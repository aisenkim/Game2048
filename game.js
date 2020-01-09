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
    console.table(this.gArray);
    this.createBlock();
    this.createBlock();
}


//16개 object를 initBlock으로부터  저장하는 배열 (초기화)
S_game.initGameArray = function () {
    for (var i = 0; i < 4; i++) {
        for(var j=0; j<4; j++)
        this.gArray[i][j] = {
            x: this.imageCoordinate[i][j].x, //left 값 image coordinate 에서 받아온 값으로 설정해주기
            y: this.imageCoordinate[i][j].y, //top 값
            w: DEFINE.size.w,
            h: DEFINE.size.h,
            num: 0, // 게임에서 숫자
        }
    }
}

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
        .attr("id","block" + ran1 + ran2) 
        .addClass("allBlock") //css div 안에 숫자 중간에 두기
        .css({
            width: this.gArray[ran1][ran2].w,
            height: this.gArray[ran1][ran2].h,
            left: this.gArray[ran1][ran2].x,
            top: this.gArray[ran1][ran2].y,
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




//키 이벤트 리스너
S_game.keyDown = function (e) {
    var key = e.keyCode;

    console.log(key);

    switch (key) {
        case 37: //왼쪽 방향키
            S_game.createBlock();
            
            break;
        case 39: //오른쪽 방향키 
        S_game.moveRight();
        S_game.createBlock();
            //그려주는 함수 추가하기 (업데이트 함수)
            break;
        case 38: //밑으로 방향키
            S_game.createBlock();
            break;
        case 40: //위로 방향키
            S_game.createBlock();
            break;
    }
}

document.onkeydown = S_game.keyDown;

//2048 실행시 가장먼저 실행되는 부분
window.onload = function () {
    S_game.init();
}