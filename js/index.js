$(document).ready(function() {
	//jquery selectors for optionsRow
	$strictBtn = $('#strict');
	$countNum = $('#countNum');
	$reset = $('#reset');

	//jquery selectors for buttons
	$b1 = $('#b1');
	$b2 = $('#b2');
	$b3 = $('#b3');
	$b4 = $('#b4');

	//base inits
	var isStrict = false;
	var count = 1;
	var simonSeq = [];
	var playerSeq = [];

	//launch the game
	$('#startGame').click(function() {
		$('#instructions').hide();
		$('#gameBoard').show();
		playGame();
		replay();
	});

	//replay sequence
	function replay() {
		for (i = 0; i < simonSeq.length; i++) {
			// create a closure to preserve the value of "i"
			(function(i) {
				window.setTimeout(function() {
					switch (simonSeq[i]) {
						case 1:
							b1Fn();
							break;
						case 2:
							b2Fn();
							break;
						case 3:
							b3Fn();
							break;
						case 4:
							b4Fn();
							break;
					}
				}, (i + 1) * 1000);
			}(i));
		};

	};

	function playGame() {
		var rand = Math.floor(Math.random() * 4) + 1;
		simonSeq.push(rand);
		console.log(simonSeq);
	};

	function b1Fn() {
		b1s.play();
		$b1.css("background-color", "#74ef93");
		setTimeout(function() {
			$b1.css("background-color", "#35e863");
		}, 300);
	}

	function b2Fn() {
		b2s.play();
		$b2.css("background-color", "#ef7474");
		setTimeout(function() {
			$b2.css("background-color", "#e83535");
		}, 300);
	};

	function b3Fn() {
		b3s.play();
		$b3.css("background-color", "#efe574");
		setTimeout(function() {
			$b3.css("background-color", "#e8da35");
		}, 300);
	};

	function b4Fn() {
		b4s.play();
		$b4.css("background-color", "#7485ef");
		setTimeout(function() {
			$b4.css("background-color", "#354ee8");
		}, 300);
	};

	//player clicks;
	$b1.click(function() {
		b1Fn();
		playerSeq.push(1);
		checkMatch();
	});
	$b2.click(function() {
		b2Fn();
		playerSeq.push(2);
		checkMatch();
	});
	$b3.click(function() {
		b3Fn();
		playerSeq.push(3);
		checkMatch();
	});
	$b4.click(function() {
		b4Fn();
		playerSeq.push(4);
		checkMatch();
	});

	function checkMatch() {
		if (playerSeq.length === simonSeq.length) {
			if ($(playerSeq).not(simonSeq).length === 0 && $(simonSeq).not(playerSeq).length === 0) {
				alert("Good Job, it's a match");
				playerSeq = [];
				count++;
				$countNum.html(count);
				if (count < 21) {
				playGame();
				replay();
				} else {
					alert("You Won!");
					reset();
				}
			} else {
				alert("Oops");
				playerSeq = [];
				if (isStrict) {
					reset();
				}
				replay();
			}
		} else {
			return;
		}
	};

	$reset.click(function() {
		reset();
	});

	function reset() {
		count = 1;
		$countNum.html(count);
		simonSeq = [];
		playerSeq = [];
		$strictBtn.removeClass("btn-success");
		$strictBtn.addClass("btn-danger");
		$strictBtn.html("Strict: Off");
		isStrict = false;
		playGame();
		replay();

	};
	$strictBtn.click(function() {
		if (!isStrict) {
			$strictBtn.removeClass("btn-danger");
			$strictBtn.addClass("btn-success");
			$strictBtn.html("Strict: On");
			isStrict = true;
		} else {
			$strictBtn.removeClass("btn-success");
			$strictBtn.addClass("btn-danger");
			$strictBtn.html("Strict: Off");
			isStrict = false;
		}
	});

});

var b1s = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var b2s = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var b3s = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var b4s = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');