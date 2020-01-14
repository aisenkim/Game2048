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
        // beforeMove = this.gArray[i]; //각 row 마다 숫자 변경되기 전에 보관
        this.slideR(this.gArray[i]);
        this.combineR(this.gArray[i]);
        this.slideR(this.gArray[i]);
        this.storeAfterPos(this.gArray[i], i);
    }

}