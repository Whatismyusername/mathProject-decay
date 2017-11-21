// lets create two variables to hold information on whether
// p1 and p2 have locked their selection. We set it as false initially
var P1Lock = false;
var P2Lock = false;
    
$(document).ready(function(){
    $("#JsName1").hide();
    $("#JsName2").hide();
    $("#StartGame").hide();
    $.preloadImages = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
};
$.preloadImages("Potato1L.png","Potato1R.png", "Rabbit1L.png", "Rabbit1R.png", "Robot1L.png","Robot1R.png");
    
    
    $("#JsLock1").click(function(){
        $("#JsName1").show();
        $("#C1NameInput").hide();
        $("#JsLock1").hide();
        $("#JsName1").text($("#C1NameInput").val());
        $("#L1").hide();
        $("#R1").hide();
        P1Lock = true;
        // call function to check if startGame button should be shown
        shouldShowStartGameButton();
    });
    $("#JsLock2").click(function(){
        $("#JsName2").show();
        $("#C2NameInput").hide();
        $("#JsLock2").hide();
        $("#JsName2").text($("#C2NameInput").val());
        $("#L2").hide();
        $("#R2").hide();
        P2Lock = true;
        // call function to check if startGame button should be shown
        shouldShowStartGameButton();
    });
        var x = ["Rabbit1L.png", "Robot1L.png", "Potato1L.png"];
        var y = 0;
    $("#R1").click(function(){
        $("#CharacterS1").css("background-image", "url("+getImage('p1', 1)+")");
 
    });
    $("#L1").click(function(){
       $("#CharacterS1").css("background-image", "url("+getImage('p1', -1)+")");

    });
    $("#R2").click(function(){
        $("#CharacterS2").css("background-image", "url("+getImage('p2', 1)+")");
    });
    $("#L2").click(function(){
        $("#CharacterS2").css("background-image", "url("+getImage('p2', -1)+")");
    });
    $("#StartGame").mouseover(function(){
        $("#StartGameWords").css("text-shadow", "#ffffff 0px 0px 20px");
        $("#StartGameWords").css("color", "#ff0000");
        $("#StartGameWords").css("font-weight", "900");
        $("#StartGame").css("border", "#ffffff solid 8px");
        $("#StartGame").css("border-radius", "100%");
    });
    $("#StartGame").mouseout(function(){
        $("#StartGameWords").css("text-shadow", "#ffffff 0px 0px 0px");
        $("#StartGameWords").css("color", "#000000");
        $("#StartGameWords").css("font-weight", "900");
        $("#StartGame").css("border", "#000000 solid 3px");
        $("#StartGame").css("border-radius", "10px");
    });
    $("#StartGame").click(function(){
    localStorage.setItem("C1Name", $("#C1NameInput").val() );
    localStorage.setItem("C2Name", $("#C2NameInput").val() );
    localStorage.setItem("p1AvatarIndex", p1AvatarIndex);
    localStorage.setItem("p2AvatarIndex", p2AvatarIndex);
});
});

// this function checks if the start game button should be shown
// and shows it if both players have locked their selection
function shouldShowStartGameButton() {
    // check if both P1Lock and P2Lock are true
    if(P1Lock && P2Lock) {
        // if they are both true, then run this code
        $("#StartGame").show();
    }
}




var p1AvatarIndex = 0;
var p2AvatarIndex = 0;
var p1Avatars = ["Potato1L.png", "Rabbit1L.png", "Robot1L.png"];
var p2Avatars = ["Potato1R.png", "Rabbit1R.png", "Robot1R.png",];

function getImage(player, x){
   if (player === 'p1') {
       // p1 logic
      p1AvatarIndex = p1AvatarIndex + x;
      if (p1AvatarIndex === 3) {
          p1AvatarIndex = 0;
      }
      if (p1AvatarIndex === -1) {
          p1AvatarIndex = 2;
      }
      return p1Avatars[p1AvatarIndex]; 
       
   } else{
       // p2 logic
       p2AvatarIndex = p2AvatarIndex + x;
      if (p2AvatarIndex === 3) {
          p2AvatarIndex = 0;
      }
      if (p2AvatarIndex === -1) {
          p2AvatarIndex = 2;
      }
      return p2Avatars[p2AvatarIndex]; 
   };
}