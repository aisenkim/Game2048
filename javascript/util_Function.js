var UTIL = {};

UTIL.utilDrawImage_no_wh_pos = function (Img_id, Img_file, left, top) {
	//var temp = document.getElementById(Img_id);

	//setTimeout(function() {  // ==>테스트 해보고 싶지만 참는다. 이거 주석 풀면 아마도 속도 빨라질수도 있다.
	$('#' + Img_id).attr('src', Img_file).css({
		left: left + 'px',
		top: top + 'px',
		position: 'absolute'
	});
	//},0);

}
//배열 받아서 랜덤한 인덱스에 값을 돌려준다
UTIL.randomArray = function (array) {
	var ran1 = Math.floor(Math.random() * array.length);
	return array[ran1]; //비어있는 블럭 하나를 리턴한다
}


UTIL.utilScale_xy_center = function (id, numX, numY) {

	var scaleX = numX;
	var scaleY = numY;
	var originV = '50% 50%';
	var command = 'scale(' + scaleX + ',' + scaleY + ')';

	//utilConsoleLog("===>"+command);

	$('#' + id).css({
		'transform': command,
		'-ms-transform': command,
		/* IE 9 */
		'-webkit-transform': command,
		/* Safari and Chrome */
		'-o-transform': command,
		/* Opera */
		'-moz-transform': command,
		/* Firefox */

		'transform-origin': originV,
		'-ms-transform-origin': originV,
		/* IE 9 */
		'-webkit-transform-origin': originV,
		/* Safari and Chrome */
		'-o-transform-origin': originV,
		/* Opera */
		'-moz-transform-origin': originV /* Firefox */
	});
}


