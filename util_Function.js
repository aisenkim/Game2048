var UTIL = {};

UTIL.utilDrawImage_no_wh_pos = function( Img_id,Img_file,left,top)
{
	//var temp = document.getElementById(Img_id);

	//setTimeout(function() {  // ==>테스트 해보고 싶지만 참는다. 이거 주석 풀면 아마도 속도 빨라질수도 있다.
			$('#'+Img_id).attr('src',Img_file).css({
											left: left + 'px',
											top: top +  'px',
											position: 'absolute' });
	//},0);

}