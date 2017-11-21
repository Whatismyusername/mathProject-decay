$(document).ready(function(){
var N1 = localStorage.getItem("C1Name");
var N2 = localStorage.getItem("C2Name");
var p1AvatarIndex = localStorage.getItem("p1AvatarIndex");
var p2AvatarIndex = localStorage.getItem("p2AvatarIndex");
var p1Avatars = ["Potato1L.png", "Rabbit1L.png", "Robot1L.png"];
var p2Avatars = ["Potato1R.png", "Rabbit1R.png", "Robot1R.png",];
var Character1 = $("#CharacterFinal1");
var Character1Step0 = {
    'top': '305',
    'left': '135',
}
var Character2Step0 = {
    'top': '305',
    'left': '735'
}
var RabbitLStep1 = {
    'top': '305',
    'left': '100',
}
var RabbitRStep1 = {
    'top': '305',
    'left': '770',
}
var RabbitLStep2 = {
    'top': '305',
    'left': '550',
};
var RabbitRStep2 = {
    'top': '305',
    'left': '320',
};
var PotatoLStep1 = {
    'top':'150',
    'left': '350',
};
var PotatoRStep1 = {
    'top':'150',
    'left': '520',
};
var PotatoLStep2 = {
    'top': '305',
    'left': '550',
};
var PotatoRStep2 = {
    'top': '305',
    'left': '320',
};
var RobotLStep1 = {
    'top': '305',
    'left': '420',
};
var RobotRStep1 = {
    'top': '305',
    'left': '450',
};
var RobotLStep2 = {
    'top': '0',
    'left':'350',
};
var RobotRStep2 = {
    'top': '0',
    'left':'520',
};
var RobotLStep3 = {
    'top': '0',
    'left': '135',
};
var RobotRStep3 = {
    'top': '0',
    'left': '735',
};
var Lightning1 = {
    'top': '180',
    'left': '100',
};
var Lightning2 = {
    'top': '180',
    'left': '715'
};
var AnswerSheet1 = {
    'top': '93px',
    'left': '43px'
};
var AnswerSheet2 = {
    'top': '660px',
    'left': '43px'
}
    $("#C1Name").append(N1);
    $("#C2Name").append(N2);
    $("#C1Pic").css("background-image", "url("+p1Avatars[p1AvatarIndex]+")" );
    $("#CharacterFinal1").css("background-image", "url("+p1Avatars[p1AvatarIndex]+")")
    $("#C2Pic").css("background-image", "url("+p2Avatars[p2AvatarIndex]+")" );
    $("#CharacterFinal2").css("background-image", "url("+p2Avatars[p2AvatarIndex]+")")
    $(".Questions").hide();
    $("#Top").hide();
    $("#Bot").hide();
    $("#Submit1").hide();
    $("#Submit2").hide()
    $("#Black").hide();
    $(".Lightning").hide();
    $(".Minus").hide();
    $("#AnswerSheet").hide();
    $.preloadImages = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
};
$.preloadImages("Potato1L.png", "Potato1R.png", "Potato2L.png", "Potato2R.png", "Potato3L.png", "Potato3R.png", "Rabbit1L.png", "Rabbit1R.png", "Rabbit2L.png", "Rabbit2R.png", "Rabbit3L.png", "Rabbit3R.png", "Robot1L.png", "Robot1R.png", "Robot2L.png", "Robot2R.png", "Robot3L.png","Robot3R.png");
    
    
    $("#Begin").click(function(){
        $("#Start").remove();
        $(".Questions").show();
        $(".Questions").css("background-color", "rgba(255, 255, 255, 0.4)");
        $("#Top").show();
        $("#Bot").show();
        putLettersInBoxes(); 
    });
    var interval1 = null;
    var interval2 = null;
    $("#Lock1").click(function(){
        $("#C1AInput").prop('disabled', false);
        $("#Lock1").hide();
        $("#Submit1").show();
        $("#Lock2").prop('disabled', true);
        
        // timer for player 1
        var timeRemaining = 5;
        $("#Submit1").text('Submit ' + timeRemaining);
        interval1 = setInterval(function() {
            if (timeRemaining === 1) {
                SubmitAnswer1();
                clearInterval(interval1);
            } else {
                timeRemaining = timeRemaining - 1;
                $("#Submit1").text('Submit ' + timeRemaining);
            }
        }, 1000);
    });
    $("#Lock2").click(function(){
        $("#C2AInput").prop('disabled', false);
        $("#Lock2").hide();
        $("#Submit2").show();
        $("#Lock1").prop('disabled', true);
        
        // timer for player 2
        var timeRemaining = 5;
        $("#Submit2").text('Submit ' + timeRemaining);
        interval2 = setInterval(function() {
            if (timeRemaining === 1) {
                SubmitAnswer2();
                clearInterval(interval2);
            } else {
                timeRemaining = timeRemaining - 1;
                $("#Submit2").text('Submit ' + timeRemaining);
            }
        }, 1000);
    });
    $("#Close").click(function(){
        $("#C1AInput").val("");
        $("#C2AInput").val("");
        $("#Bot").show(); 
        $("#Question").show();
        $("#AnswerSheet").css('top', '660px');
        $("#AnswerSheet").css('left', '43px')
        $("#Close").hide();
        letters2 = getQuestion();
        putLettersInBoxes();
    });
    $("#Submit1").click(function(){
        SubmitAnswer1();
        showReview();
        clearInterval(interval1);
        $("#YourAnswer").text('Your Answer is: ' + $("#C1AInput").val());
    });
    $("#Submit2").click(function(){
        SubmitAnswer2();
        showReview();
        clearInterval(interval2);
        $("#YourAnswer").text('Your Answer is: ' + $("#C2AInput").val());
    });

    
    function SubmitAnswer1(){
        $("#Lock2").prop('disabled', false);
        var Answer1 = $("#C1AInput").val();
        var rightAnswer = Answer();
        $("#C1AInput").prop('disabled', true);
        $("#Lock1").show();
        $("#Submit1").hide();
        if( checkIfCorrect(Answer1, rightAnswer) ) {
            $("#AnswerSheet").css('top', '93px');
            $("#AnswerSheet").css('left', '43px');
            $("#Close").show();
            $("#AnswerSheet").hide();
            $("#C1RW").hide();
            $("#C2RW").hide();
            AnswerSheet1R();
            if( p1AvatarIndex == 1 ){
                $("#CharacterFinal1")
                    .animate(RabbitLStep1, {
                        start:function(){
                            $('#CharacterFinal1').css('background-image', 'url(Rabbit1R.png)');
                            $("#Bot").hide();
                            $("#Question").hide();
                        },
                        complete:function(){
                            $('#CharacterFinal1').css('background-image', 'url(Rabbit2L.png)');
                        }
                    })
                    .delay(300)
                    .animate(RabbitLStep2, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $('#CharacterFinal1').css('background-image', 'url(Rabbit3L.png)');
                            $('#CharacterFinal1').css('-webkit-transform', 'rotate(-40deg)');
                        }
                    })
                    .delay(500)
                    .animate(RabbitLStep2, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $('#CharacterFinal1').css('-webkit-transform', 'rotate(0deg)');
                        }
                    })
                    .delay(1000)
                    .animate(Character1Step0, {
                        start:function(){
                            $('#CharacterFinal1').css('background-image', 'url(Rabbit2R.png)');
                            $("#Minus-2").fadeIn();
                        },
                        complete:function(){
                            $('#CharacterFinal1').css('background-image', "url(Rabbit1L.png)");
                        }
                    })
                    .delay(500)
                    .animate(Character1Step0, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $("#Minus-2").fadeOut();
                            $("#AnswerSheet").fadeIn();
                            C2HealthBarDecrement();
                        }
                    })
                } else if( p1AvatarIndex == 0 ){
                    $("#CharacterFinal1")
                    .animate(PotatoLStep1, {
                        start:function(){
                            $("#Top").hide();
                            $("#Bot").hide();
                            $("#Question").hide();
                            $("#Black").fadeIn('fast');
                        },
                        complete:function(){
                            $('#CharacterFinal1').css('background-image', 'url(Potato2L.png)');
                            $("#Top").show();
                            $("#Black").fadeOut('fast');
                        }
                    })
                    .delay(800)
                    .animate(PotatoLStep2, {
                        start:function(){
                            $("#Black").fadeIn('fast');
                            $("#Top").hide();
                        },
                        complete:function(){
                            $("#CharacterFinal1").css("background-image", "url(Potato3L.png)");
                            $("#Black").fadeOut('fast');
                            $("#Top").show()
                        }
                    })
                    .delay(800)
                    .animate(Character1Step0, {
                        start:function(){
                            $("#Black").fadeIn('fast');
                            $("#Top").hide();
                        },
                        complete:function(){
                            $("#CharacterFinal1").css("background-image", "url(Potato1L.png)");
                            $("#Black").fadeOut('fast');
                            $("#Top").show();
                        }
                    })
                    .delay(300)
                    .animate(Character1Step0, {
                        start:function(){
                            $("#Minus-2").fadeIn();
                        },
                        complete:function(){
                
                        }
                    })
                    .delay(500)
                    .animate(Character1Step0, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $("#Minus-2").fadeOut();
                            $("#AnswerSheet").fadeIn();
                            C2HealthBarDecrement();
                        }
                    })
                } else if ( p1AvatarIndex == 2 ){
                    $("#CharacterFinal1")
                    .animate(Character1Step0, {
                        start:function(){
                            $('#CharacterFinal1').css('background-image', 'url(Robot2L.png)');
                            $("#Bot").hide();
                            $("#Question").hide();
                        },
                        complete:function(){
                            
                        }
                    })
                    .delay(400)
                    .animate(RobotLStep1, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $("#CharacterFinal1").css("background-image", "url(Robot3L.png)");
                            $('#CharacterFinal1').css('-webkit-transform', 'rotate(5deg)');
                        }
                    })
                    .delay(100)
                    .animate(RobotLStep1, {
                        start:function(){
                            $('#CharacterFinal1').css('-webkit-transform', 'rotate(-5deg)');
                        },
                        complete:function(){
                            $('#CharacterFinal1').css('-webkit-transform', 'rotate(5deg)');
                        }
                    })
                    .delay(100)
                    .animate(RobotLStep1, {
                        start:function(){
                            $('#CharacterFinal1').css('-webkit-transform', 'rotate(-5deg)');
                        },
                        complete:function(){
                            $('#CharacterFinal1').css('-webkit-transform', 'rotate(0deg)');
                        }
                    })
                    .delay(500)
                    .animate(RobotLStep2, {
                        start:function(){
                            $("#CharacterFinal1").css("background-image", "url(Robot2L.png)")
                        },
                        complete:function(){
                            $("#CharacterFinal1").hide();
                            $("#Black").fadeIn('fast');
                        }
                    })
                    .delay(500)
                    .animate(RobotLStep3, {
                        start:function(){

                        },
                        complete:function(){
                            $("#Black").fadeOut('fast');
                            $("#CharacterFinal1").show();
                        }
                    })
                    .delay(500)
                    .animate(Character1Step0, {
                        start:function(){
                            $("#Minus-2").fadeIn();
                        },
                        complete:function(){
                            $("#CharacterFinal1").css("background-image", "url(Robot1L.png)");
                        }
                    })
                    .delay(500)
                    .animate(Character1Step0, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $("#Minus-2").fadeOut();
                            $("#AnswerSheet").fadeIn();
                            C2HealthBarDecrement();
                        }
                    });
                }
            
        } else{
            $("#AnswerSheet").css('top', '93px');
            $("#AnswerSheet").css('left', '43px');
            $("#Close").show();
            $("#AnswerSheet").hide();
            $("#C1RW").hide();
            $("#C2RW").hide();
            AnswerSheet1W();
            $("#Lightning1")
            .animate(Lightning1, {
                start:function(){
                    $("#Bot").hide();
                    $("#Question").hide();
                    $("#Black").fadeIn('fast');
                },
                complete:function(){
                    
                }
            })
            .delay(500)
            .animate(Lightning1, {
                start:function(){
                    $("#Lightning1").show();
                },
                complete:function(){
    
                }
            })
            .delay(800)
            .animate(Lightning1, {
                start:function(){
                    $("#Lightning1").hide();
                    $("#Minus-1").fadeIn();
                },
                complete:function(){
                    $("#Black").fadeOut('fast');
                }
            })
            .delay(500)
            .animate(Lightning1, {
                start:function(){
                    
                },
                complete:function(){
                    $("#Minus-1").fadeOut();
                    C1HealthBarDecrement();
                    $("#AnswerSheet").fadeIn();
                }
            });
            
        }
    }
    function SubmitAnswer2(){
        $("#Lock1").prop('disabled', false);
        var Answer2 = $("#C2AInput").val();
        var rightAnswer = Answer();
        $("#C2AInput").prop('disabled', true);
        $("#Lock2").show();
        $("#Submit2").hide();
        if( checkIfCorrect(Answer2, rightAnswer) ) {
            $("#AnswerSheet").css('top', '93px');
            $("#AnswerSheet").css('left', '43px');
            $("#Close").show();
            $("#AnswerSheet").hide();
            $("#C1RW").hide();
            $("#C2RW").hide();
            AnswerSheet2R();
            if( p2AvatarIndex == 1 ){
                $("#CharacterFinal2")
                    .animate(RabbitRStep1, {
                        start:function(){
                            $('#CharacterFinal2').css('background-image', 'url(Rabbit1L.png)');
                            $("#Bot").hide();
                            $("#Question").hide();
                        },
                        complete:function(){
                            $('#CharacterFinal2').css('background-image', 'url(Rabbit2R.png)');
                        }
                    })
                    .delay(300)
                    .animate(RabbitRStep2, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $('#CharacterFinal2').css('background-image', 'url(Rabbit3R.png)');
                            $('#CharacterFinal2').css('-webkit-transform', 'rotate(40deg)');
                        }
                    })
                    .delay(500)
                    .animate(RabbitRStep2, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $('#CharacterFinal2').css('-webkit-transform', 'rotate(0deg)');
                        }
                    })
                    .delay(1000)
                    .animate(Character2Step0, {
                        start:function(){
                            $('#CharacterFinal2').css('background-image', 'url(Rabbit2L.png)');
                            $("#Minus-1").fadeIn();
                        },
                        complete:function(){
                            $('#CharacterFinal2').css('background-image', "url(Rabbit1R.png)");
                        }
                    })
                    .delay(500)
                    .animate(Character2Step0, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $("#Minus-1").fadeOut();
                            $("#AnswerSheet").fadeIn();
                            C1HealthBarDecrement();
                        }
                    })
                } else if( p2AvatarIndex == 0 ){
                    $("#CharacterFinal2")
                    .animate(PotatoRStep1, {
                        start:function(){
                            $("#Top").hide();
                            $("#Bot").hide();
                            $("#Question").hide();
                            $("#Black").fadeIn('fast');
                        },
                        complete:function(){
                            $('#CharacterFinal2').css('background-image', 'url(Potato2R.png)');
                            $("#Top").show();
                            $("#Black").fadeOut('fast');
                        }
                    })
                    .delay(800)
                    .animate(PotatoRStep2, {
                        start:function(){
                            $("#Black").fadeIn('fast');
                            $("#Top").hide();
                        },
                        complete:function(){
                            $("#CharacterFinal2").css("background-image", "url(Potato3R.png)");
                            $("#Black").fadeOut('fast');
                            $("#Top").show()
                        }
                    })
                    .delay(800)
                    .animate(Character2Step0, {
                        start:function(){
                            $("#Black").fadeIn('fast');
                            $("#Top").hide();
                        },
                        complete:function(){
                            $("#CharacterFinal2").css("background-image", "url(Potato1R.png)");
                            $("#Black").fadeOut('fast');
                            $("#Top").show();
                        }
                    })
                    .delay(300)
                    .animate(Character2Step0, {
                        start:function(){
                            $("#Minus-1").fadeIn();
                        },
                        complete:function(){
                
                        }
                    })
                    .delay(500)
                    .animate(Character2Step0, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $("#Minus-1").fadeOut();
                            $("#AnswerSheet").fadeIn();
                            C1HealthBarDecrement();
                        }
                    })
                } else if ( p2AvatarIndex == 2 ){
                    $("#CharacterFinal2")
                    .animate(Character2Step0, {
                        start:function(){
                            $('#CharacterFinal2').css('background-image', 'url(Robot2R.png)');
                            $("#Bot").hide();
                            $("#Question").hide();
                        },
                        complete:function(){
                            
                        }
                    })
                    .delay(400)
                    .animate(RobotRStep1, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $("#CharacterFinal2").css("background-image", "url(Robot3R.png)");
                            $('#CharacterFinal2').css('-webkit-transform', 'rotate(-5deg)');
                        }
                    })
                    .delay(100)
                    .animate(RobotRStep1, {
                        start:function(){
                            $('#CharacterFinal2').css('-webkit-transform', 'rotate(5deg)');
                        },
                        complete:function(){
                            $('#CharacterFinal2').css('-webkit-transform', 'rotate(-5deg)');
                        }
                    })
                    .delay(100)
                    .animate(RobotRStep1, {
                        start:function(){
                            $('#CharacterFinal2').css('-webkit-transform', 'rotate(5deg)');
                        },
                        complete:function(){
                            $('#CharacterFinal2').css('-webkit-transform', 'rotate(0deg)');
                        }
                    })
                    .delay(500)
                    .animate(RobotRStep2, {
                        start:function(){
                            $("#CharacterFinal2").css("background-image", "url(Robot2R.png)")
                        },
                        complete:function(){
                            $("#CharacterFinal2").hide();
                            $("#Black").fadeIn('fast');
                        }
                    })
                    .delay(500)
                    .animate(RobotRStep3, {
                        start:function(){

                        },
                        complete:function(){
                            $("#Black").fadeOut('fast');
                            $("#CharacterFinal2").show();
                        }
                    })
                    .delay(500)
                    .animate(Character2Step0, {
                        start:function(){
                            $("#Minus-1").fadeIn();
                        },
                        complete:function(){
                            $("#CharacterFinal2").css("background-image", "url(Robot1R.png)");
                        }
                    })
                    .delay(500)
                    .animate(Character2Step0, {
                        start:function(){
                            
                        },
                        complete:function(){
                            $("#Minus-1").fadeOut();
                            $("#AnswerSheet").fadeIn();
                            C1HealthBarDecrement();
                        }
                    });
                }
            
        } else{
            $("#AnswerSheet").css('top', '93px');
            $("#AnswerSheet").css('left', '43px');
            $("#Close").show();
            $("#AnswerSheet").hide();
            $("#C1RW").hide();
            $("#C2RW").hide();
            AnswerSheet2W();
            $("#Lightning2")
            .animate(Lightning2, {
                start:function(){
                    $("#Bot").hide();
                    $("#Question").hide();
                    $("#Black").fadeIn('fast');
                },
                complete:function(){
                    
                }
            })
            .delay(500)
            .animate(Lightning2, {
                start:function(){
                    $("#Lightning2").show();
                },
                complete:function(){
    
                }
            })
            .delay(800)
            .animate(Lightning2, {
                start:function(){
                    $("#Lightning2").hide();
                    $("#Minus-2").fadeIn();
                },
                complete:function(){
                    $("#Black").fadeOut('fast');
                }
            })
            .delay(500)
            .animate(Lightning2, {
                start:function(){
                    
                },
                complete:function(){
                    $("#Minus-2").fadeOut();
                    C2HealthBarDecrement();
                    $("#AnswerSheet").fadeIn();
                }
            });
            
        }
    }

});


var letters2 = getQuestion();

function getQuestion() {
    var yRandom = Math.floor(Math.random() * 599999)/100;
    var aRandom = Math.floor(Math.random() * 9999999)/100;
    var rRandom = Math.floor((Math.random() * 90) +5 )/100;
    var tRandom = Math.floor(Math.random() * 10);
    var tmpLetters = [
        {
            qLabel: 'y = ',
            variable: 'y',
            qText: yRandom,
        },
        {
            qLabel: 'Initial Amount = ',
            variable: 'a',
            qText: aRandom
        },
        {
            qLabel: 'Percent Decrease = ',
            variable: 'r',
            qText: rRandom
        },
        {
            qLabel: 'Numbers of Years = ',
            variable: 't',
            qText: tRandom
        }
    ];
    var index = Math.floor(Math.random() * 3);
    if (index === 2) { index = 3 };
    tmpLetters[index].qText = 'x';
    return tmpLetters;
}

function showReview() {
    $('#ReviewQ1').text(letters2[0].qLabel);
    $('#ReviewN1').text(letters2[0].qText);
    $('#ReviewQ2').text(letters2[1].qLabel);
    $('#ReviewN2').text(letters2[1].qText);
    $('#ReviewQ3').text(letters2[2].qLabel);
    $('#ReviewN3').text(letters2[2].qText);
    $('#ReviewQ4').text(letters2[3].qLabel);
    $('#ReviewN4').text(letters2[3].qText);
}
function putLettersInBoxes() {
    var shuffledLetters = _.shuffle(letters2);
    $('#QuestionQ1').text(shuffledLetters[0].qLabel);
    $('#QuestionN1').text(shuffledLetters[0].qText);
    $('#QuestionQ2').text(shuffledLetters[1].qLabel);
    $('#QuestionN2').text(shuffledLetters[1].qText);
    $('#QuestionQ3').text(shuffledLetters[2].qLabel);
    $('#QuestionN3').text(shuffledLetters[2].qText);
    $('#QuestionQ4').text(shuffledLetters[3].qLabel);
    $('#QuestionN4').text(shuffledLetters[3].qText);
}

var C1HealthDecreased = 0;
var C1HealthAmount = ["1000/1000", "900/1000", "800/1000", "700/1000", "600/1000", "500/1000", "400/1000", "300/1000", "200/1000", "100/1000", "0/1000"];
function C1HealthBarDecrement(){
    ( C1HealthDecreased = C1HealthDecreased + 1 );
    $('#H1-' + C1HealthDecreased).hide();
    $("#C1HealthAmount").text(C1HealthAmount[C1HealthDecreased]);
    if( C1HealthDecreased == 5 ){
        $(".Health1").css("background-color", "#ff6600");
    } else if( C1HealthDecreased == 7){
            $(".Health1").css("background-color", "#ff3300");
    } else if( C1HealthDecreased == 10){
        alert('Player 2 Wins The Game!');
    }
}
var C2HealthDecreased = 0;
var C2HealthAmount = ["1000/1000", "900/1000", "800/1000", "700/1000", "600/1000", "500/1000", "400/1000", "300/1000", "200/1000", "100/1000", "0/1000"];
function C2HealthBarDecrement(){
    ( C2HealthDecreased = C2HealthDecreased + 1 );
    $('#H2-' + C2HealthDecreased).hide();
    $("#C2HealthAmount").text(C2HealthAmount[C2HealthDecreased]);
    if( C2HealthDecreased == 5 ){
        $(".Health2").css("background-color", "#ff6600");
    } else if( C2HealthDecreased == 7){
            $(".Health2").css("background-color", "#ff3300");
    } else if( C2HealthDecreased == 10){
        alert('Player 1 Wins The Game!');
    }
}
function AnswerSheet1R(){
    $("#C1RW").text("Correct");
    $("#C1RW").css("color", "#00ff00");
    $("#C1RW").css("border", "#00ff00 solid 5px");
    $("#C1RW").css("background-color", "rgba(0, 255, 0, 0.2)");
    $("#Close").css("background-color", "rgba(0, 255, 0, 0.2)");
}
function AnswerSheet2R(){
    $("#C2RW").text("Correct");
    $("#C2RW").css("color", "#00ff00");
    $("#C2RW").css("border", "#00ff00 solid 5px");
    $("#C2RW").css("background-color", "rgba(0, 255, 0, 0.2)");
    $("#Close").css("background-color", "rgba(0, 255, 0, 0.2)");
}
function AnswerSheet1W(){
    $("#C1RW").text("Wrong");
    $("#C1RW").css("color", "#ff3300");
    $("#C1RW").css("border", "#ff3300 solid 5px");
    $("#C1RW").css("background-color", "rgba(255, 51, 0, 0.2)");
    $("#Close").css("background-color", "rgba(255, 51, 0, 0.2)");
}
function AnswerSheet2W(){
    $("#C2RW").text("Wrong");
    $("#C2RW").css("color", "#ff3300");
    $("#C2RW").css("border", "#ff3300 solid 5px");
    $("#C2RW").css("background-color", "rgba(255, 51, 0, 0.2)");
    $("#Close").css("background-color", "rgba(255, 51, 0, 0.2)");
}
var RightAnswer = '';
function Answer(){
    if( letters2[0].qText === 'x') {
        //if y = x;
        var FirstStep = ((1*100)-(Number(letters2[2].qText)*100))/100;
        var SecondStep = Math.pow(Number(((1*100)-(Number(letters2[2].qText)*100))/100)*100,Number(letters2[3].qText))/Math.pow(100,Number(letters2[3].qText));
        var ThirdStep = Number(letters2[1].qText)*Number(SecondStep);
        var answer = ThirdStep;
        $("#FirstStep").text(letters2[0].qText + ' = ' +letters2[1].qText + '(' +FirstStep + ')^' +letters2[3].qText);
        $("#SecondStep").text(letters2[0].qText + ' = ' + letters2[1].qText + '(' + SecondStep + ')' );
        $("#ThirdStep").text(letters2[0].qText + ' = ' + ThirdStep);
        // return 'test';
        return answer;
    } else if ( letters2[1].qText === 'x'){
        //If a = x;
        var FirstStep = ((1*100)-(Number(letters2[2].qText)*100))/100;
        var SecondStep = Math.pow(Number(FirstStep)*100,letters2[3].qText)/Math.pow(100,letters2[3].qText);
        var ThirdStep = Number(letters2[0].qText) / Number(SecondStep);
        var answer = ThirdStep;
        $("#FirstStep").text(letters2[0].qText + ' = ' +letters2[1].qText + '(' +FirstStep + ')^' +letters2[3].qText);
        $("#SecondStep").text(letters2[0].qText + ' = ' + letters2[1].qText + '(' + SecondStep + ')' );
        $("#ThirdStep").text(letters2[1].qText + ' = ' + ThirdStep);
        // return 'test';
        return answer;
    } else if ( letters2[2].qText === 'x'){
        //if r = x
        return 'test'; // make sure to change this and return correct answer instead of 'test'
    } else if ( letters2[3].qText === 'x'){
        var FirstStep = Number(letters2[0].qText) / Number(letters2[1].qText);
        var ThirdStep  = Math.log( Number(FirstStep) ) / Math.log( Number(letters2[2].qText) ); 
        var answer = ThirdStep
        $("#FirstStep").text(letters2[0].qText + ' = ' +letters2[1].qText + '(' +FirstStep + ')^' +letters2[3].qText);
        $("#SecondStep").text('Log' + FirstStep + letters2[3].qText + 'Log' + letters2[2].qText);
        $("#ThirdStep").text(letters2[3].qText + ' = ' + ThirdStep);
        return answer; // make sure to change this and return correct answer instead of 'test'
    }
}
function checkIfCorrect(answerGiven, rightAnswer) {
    var xIndex = _.findIndex(letters2, { 'qText': 'x' });
    var range = 0;
    switch (letters2[xIndex].variable) {
        case 'y':
            range = 5;
        case 'a':
            range = 5;
            break;
        case 'r':
            range = 0.1;
            break;
        case 't':
            range = 1;
            break;
    }
    var bottomRange = Math.floor(rightAnswer-range);
    var upperRange = Math.ceil(rightAnswer+range);
    console.log({
        bottomRange: bottomRange,
        upperRange: upperRange,
        rightAnswer: rightAnswer,
        answerGiven: Number(answerGiven),
        range: range,
        result: Number(answerGiven) >= bottomRange && Number(answerGiven) <= upperRange,
    });
    if (  Number(answerGiven) >= bottomRange && Number(answerGiven) <= upperRange ) {
        return true;
    }
    return false;
}