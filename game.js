/*
	 js file for the game
*/

var Game = {};
var total = 11 ; 
Game.deck = [
	'J1', 'J1',
	'Q1', 'Q1',
	'K1', 'K1',
	'J2', 'J2',
	'Q2', 'Q2',
	'K2', 'K2',
];


$(function(){

	//洗牌
	Game.deck.sort(function(){
		return 0.5 - Math.random();
	});

	for(var i=0; i<total; i++){
		$('.card:first-child').clone().appendTo('#cards');
	}

	$('#cards').children().each(function(index){
		console.log("index "+index);
		$(this).css({
			"left": ($(this).width()+20) * (index%4),
			"top" : ($(this).height()+20) * Math.floor(index/4)
		});


		var pattern = Game.deck.pop();

		$(this).find('.back').addClass(pattern);
		$(this).attr('data-pattern', pattern);

		$(this).click(clickCard);
	});

	Game.soundOver = document.getElementById('soundOver');
	Game.soundOver.volume = .4;
	Game.soundActive = document.getElementById('soundActive');
	Game.soundActive.volume = .4;

	$('.card')
	.hover(function(){
		Game.soundOver.currentTime = 0;
		Game.soundOver.play();
	},function(){
		Game.soundOver.pause();
	})
	.click(function(){
		Game.soundActive.currentTime = 0;
		Game.soundActive.play();
	});

});

function clickCard(){
	if($('.flipped').size>1){
		return;
	}

	//翻牌
	$(this).addClass('flipped');

	if($('.flipped').size()==2){
		setTimeout(checkPattern, 500);
	}
}

function checkPattern(){
	if(isMatch()){
		$('.flipped').removeClass('flipped').addClass('removed');

		$('.removed').bind("webkitTransitionEnd", removeMatched);
	}
	else{
		$('.flipped').removeClass('flipped');
	}
}

function isMatch(){
	var flippedCards = $('.flipped');
	var pattern0 = $(flippedCards[0]).data('pattern');
	var pattern1 = $(flippedCards[1]).data('pattern');
	console.log("$(flippedCards[0]).data('pattern') "+$(flippedCards[0]).data('pattern'));
	console.log("$(flippedCards[1]).data('pattern') "+$(flippedCards[1]).data('pattern'));
	return (pattern0 == pattern1);
}

function removeMatched(){
	$('.removed').remove();
}