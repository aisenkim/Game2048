var TEST = {};

//테스트 위해 작성한 코드  블럭 원하는곳 생성하기 위해서 
TEST.createBlockTestVersion = function(spotX, spotY, num){
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