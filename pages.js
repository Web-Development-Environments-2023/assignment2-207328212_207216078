let keyCodeDict = {'a': 65, 'b':66, 'c':67, 'd':68, 'e':69, 'f':70, 'g':71, 'h':72, 'i':73, 'j':74, 'k':75, 'l':76, 'm':77,
'n':78, '0':79, 'p':80, 'q':81, 'r':82, 's':83, 't':84, 'u':85, 'v':86, 'w':87, 'x':88, 'y':89, 'z':90, 'space':32}
let ENEMIES_PER_ROW = 5;
let ENEMY_HORIZONTAL_PADDING = 20;
let ENEMY_VERTICAL_PADDING = 10;
let ENEMY_VERTICAL_SPACING = 70;
let PLAYER_MAX_SPEED = 600;
let upArrow = false;
let downArrow = false;
let leftArrow = false;
let rightArrow = false;
let spaceSpeed = 600;
let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let playerX = 0;
let playerY = 0;
var mySpaceShip;
var enemySpaceships = [];
var hearts = [];
var gameMusic;
let numOfEnememies = 20;
let enemyDie = false;
var enemyDieRow;
let numOfScore = 0;
var score;
var timer;
var timerEnemySpaceShip;
var timeOutEndGame0;
var timeOutEndGameWinner;
var timeOutEndGame1;
var timeOutEndGame2;
var shootOnMe;
var myShip = 'photos/space16.jpg'; // default spaceship
var myEnemyShip ='photos/space7.jpg'; // default enemy
var shootingKey;
let listOfUsers = new Array()
listOfUsers[0]=["p","p"];
let usersScores = {}
let curLoggedUser;
let up = 38;
let down = 40;
let left = 37;
let right = 39;
var endGame = -1;
var gameDuration;
var isGame = false;
var champAudio;
var champPlay = false;
var looseAudio;
var winAudio;
var winPlay = false;
var tryAudio;
var tryPlay = false;
var requestID;
var requestID2;

function checkLogin(){
  const errorMsg = document.getElementById("login-error-msg-Login");
  let name = document.getElementById('usernameLogin').value;
  let password = document.getElementById('passwordLogin').value;
    errorMsg.innerHTML='';
    for(i=0 ; i < listOfUsers.length ; i++){
        if(listOfUsers[i][0] == name){
            if(listOfUsers[i][1] != password){
                errorMsg.innerHTML = "Incorrect Password.";
            }
            else{
                clearFuncLog();
                settingpage();
                curLoggedUser = name;
                return;
            }
        }
    }
    errorMsg.innerHTML = "User does not exist.";
    return;
}
function clearFuncLog(){
    document.getElementById('usernameLogin').value='';
    document.getElementById('passwordLogin').value='';
}

function checkRegister(){
    const errorMsg = document.getElementById("login-error-msg");
    let userNameValue = document.getElementById('username').value;
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    let password2Value = document.getElementById('password2').value;
    let firstNameValue = document.getElementById('firstname').value;
    let lastNameValue = document.getElementById('lastname').value;
    let dateValue = document.getElementById('bday').value;
    errorMsg.innerHTML='';
    const hasLetter = /[a-zA-Z]/.test(passwordValue);
    const hasNumber = /\d/.test(passwordValue);
    const hasNumberFirst = /\d/.test(firstNameValue);
    const hasNumberLast = /\d/.test(lastNameValue);

    if(userNameValue === '' || emailValue === '' || passwordValue === '' || password2Value === '' || firstNameValue === '' || lastNameValue === '' ||dateValue === '') {
        errorMsg.innerHTML = "All details must be not empty.";
    }
    else if(userNameValueExist(userNameValue) == true){
        errorMsg.innerHTML = "User Name is already exist.";
    }
        
    else if(isEmail(emailValue) == false){
        errorMsg.innerHTML = "Email Address is not valid.";
    }

    else if(passwordValue.length < 8 ){
        errorMsg.innerHTML = "Password cannot be less then 8 characters.";
    }
    else if((!hasLetter && hasNumber) || (hasLetter && !hasNumber)){
        errorMsg.innerHTML = "Password must include digits and characters.";
    }

    else if(passwordValue !== password2Value) {
        errorMsg.innerHTML = 'Passwords does not match.';
    }

    else if(hasNumberFirst) {
            errorMsg.innerHTML = "First Name cannot contain digits.";
    }
    else if(hasNumberLast) {
        errorMsg.innerHTML = "Last Name cannot contain digits.";
    }
    else if(!isValidDate(dateValue)) {
      errorMsg.innerHTML = "Birth Date cannot be after today's date";
    }

    else{
        listOfUsers.push([userNameValue,passwordValue]);
        usersScores[userNameValue] = new Array() // add list of scores 
        clearFuncReg();
        loginpage();
        curLoggedUser = userNameValue;
    }
};

function isValidDate(dateValue) {
  let inputDate = new Date(dateValue);
  let curDate = new Date();
  if (inputDate > curDate) {
    return false;
  }
  return true;
}

function clearFuncReg(){
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password2').value = '';
  document.getElementById('firstname').value = '';
  document.getElementById('lastname').value = '';
  document.getElementById('bday').value = '';
}

window.onloadstart = Welcomepage();

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function userNameValueExist(userNameValue){
    for(i=0 ; i < listOfUsers.length ; i++){
        if(listOfUsers[i][0] == userNameValue){
            return true;
            }
    }
    return false;
}

function registerpage(){
  stopGifMusic();
  if(isGame){
    isGame = false;
    endGame = -1;
    clearAllObject();
    stopGame();
  }
  document.getElementById("Setting").style.display = "none";
  document.getElementById("Welcome").style.display = "none";
  document.getElementById("Login").style.display = "none";
  document.getElementById("RegisterPage").style.display = "flex";
  document.getElementById("Rules").style.display = "none";
  document.getElementById("EnemyShip").style.display = "none";
  document.getElementById("ChooseKeys").style.display = "none";
  document.getElementById("myModal").style.display = "none";
  document.getElementById("Game").style.display = "none";
  document.getElementById("GameOver").style.display = "none";
  document.getElementById("championTable").style.display = "none";
  document.getElementById("YouCanDoBetter").style.display = "none";
  document.getElementById("Winner").style.display = "none";
  document.getElementById("youLost").style.display = "none";
  document.getElementById("champion").style.display = "none";

  document.getElementById("submit").addEventListener("click",checkInputs);

}

function Welcomepage(){
  stopGifMusic();
  if(isGame){
    isGame = false;
    endGame = -1;
    clearAllObject();
    stopGame();
  }
  document.getElementById("Setting").style.display = "none";
  document.getElementById("Welcome").style.display = "flex";
  document.getElementById("Login").style.display = "none";
  document.getElementById("RegisterPage").style.display = "none";
  document.getElementById("Rules").style.display = "none";
  document.getElementById("EnemyShip").style.display = "none";
  document.getElementById("ChooseKeys").style.display = "none";
  document.getElementById("myModal").style.display = "none";
  document.getElementById("Game").style.display = "none";
  document.getElementById("GameOver").style.display = "none";

  document.getElementById("YouCanDoBetter").style.display = "none";
  document.getElementById("Winner").style.display = "none";
  document.getElementById("youLost").style.display = "none";
  document.getElementById("champion").style.display = "none";
  document.getElementById("championTable").style.display = "none";
}

function loginpage(){
  stopGifMusic();
  if(isGame){
    isGame = false;
    endGame = -1;
    clearAllObject();
    stopGame();
  }
  document.getElementById("Setting").style.display = "none";
  document.getElementById("Welcome").style.display = "none";
  document.getElementById("Login").style.display = "flex";
  document.getElementById("RegisterPage").style.display = "none";
  document.getElementById("Rules").style.display = "none";
  document.getElementById("EnemyShip").style.display = "none";
  document.getElementById("ChooseKeys").style.display = "none";
  document.getElementById("myModal").style.display = "none";
  document.getElementById("Game").style.display = "none";
  document.getElementById("GameOver").style.display = "none";
  document.getElementById("championTable").style.display = "none";
  document.getElementById("YouCanDoBetter").style.display = "none";
  document.getElementById("Winner").style.display = "none";
  document.getElementById("youLost").style.display = "none";
  document.getElementById("champion").style.display = "none";

}

function rulespage(){
  stopGifMusic();
  if(isGame){
    isGame = false;
    endGame = -1;
    clearAllObject();
    stopGame();
  }
  document.getElementById("Setting").style.display = "none";
  document.getElementById("Welcome").style.display = "none";
  document.getElementById("Login").style.display = "none";
  document.getElementById("RegisterPage").style.display = "none";
  document.getElementById("Rules").style.display = "flex";
  document.getElementById("EnemyShip").style.display = "none";
  document.getElementById("ChooseKeys").style.display = "none";
  document.getElementById("myModal").style.display = "none";
  document.getElementById("Game").style.display = "none";
  document.getElementById("GameOver").style.display = "none";
  document.getElementById("championTable").style.display = "none";
  document.getElementById("YouCanDoBetter").style.display = "none";
  document.getElementById("Winner").style.display = "none";
  document.getElementById("youLost").style.display = "none";
  document.getElementById("champion").style.display = "none";
  document.getElementById("championTable").style.display = "none";
}

function menuClick(){
  // if(isGame){
    // endGame = -1;
    // stopGame();
  // }
    document.getElementById("submit").addEventListener("click",checkInputs);
    document.getElementById("Welcome").addEventListener('click', Welcomepage);
    document.getElementById("Login").addEventListener('click', loginpage);
    document.getElementById("RegisterPage").addEventListener('click', registerpage);
    document.getElementById("Rules").addEventListener('click', rulespage);
}

window.addEventListener("load",menuClick,false);

function openModal() {
    document.getElementById("myModal").style.display = "block";
    document.addEventListener("keydown", closeModalOnEscape);
    document.addEventListener("click", closeModalOnClickOutside);
  }
  
function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.removeEventListener("keydown", closeModalOnEscape);
    document.removeEventListener("click", closeModalOnClickOutside);
    
}

function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    closeModal();
  }

}
  
  function closeModalOnClickOutside(event) {
    if (event.target == document.getElementById("myModal")) {
      closeModal();
    }

  }

  function settingpage(){
    stopGifMusic();
    if(isGame){
      isGame = false;
      endGame = -1;
      clearAllObject();
      stopGame();
    }
    document.getElementById("Setting").style.display = "flex";
    document.getElementById("Welcome").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("RegisterPage").style.display = "none";
    document.getElementById("Rules").style.display = "none";
    document.getElementById("EnemyShip").style.display = "none";
    document.getElementById("ChooseKeys").style.display = "none";
    document.getElementById("myModal").style.display = "none";
    document.getElementById("GameOver").style.display = "none";
    document.getElementById("championTable").style.display = "none";
    document.getElementById("YouCanDoBetter").style.display = "none";
    document.getElementById("Winner").style.display = "none";
    document.getElementById("youLost").style.display = "none";
    document.getElementById("champion").style.display = "none";
    document.getElementById("championTable").style.display = "none";
}

function EnemyShipPage(){
    document.getElementById("EnemyShip").style.display = "flex";
    document.getElementById("Setting").style.display = "none";
    document.getElementById("Welcome").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("RegisterPage").style.display = "none";
    document.getElementById("Rules").style.display = "none";
    document.getElementById("ChooseKeys").style.display = "none";
    document.getElementById("myModal").style.display = "none";
    document.getElementById("Game").style.display = "none";
    document.getElementById("GameOver").style.display = "none";
    document.getElementById("championTable").style.display = "none";
}

function ChooseKeys(){
    document.getElementById("ChooseKeys").style.display = "flex";
    document.getElementById("EnemyShip").style.display = "none";
    document.getElementById("Setting").style.display = "none";
    document.getElementById("Welcome").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("RegisterPage").style.display = "none";
    document.getElementById("Rules").style.display = "none";
    document.getElementById("myModal").style.display = "none";
    document.getElementById("Game").style.display = "none";
    document.getElementById("GameOver").style.display = "none";
    document.getElementById("championTable").style.display = "none";
}

function championTable(){
  records();
  document.getElementById("ChooseKeys").style.display = "none";
  document.getElementById("EnemyShip").style.display = "none";
  document.getElementById("Setting").style.display = "none";
  document.getElementById("Welcome").style.display = "none";
  document.getElementById("Login").style.display = "none";
  document.getElementById("RegisterPage").style.display = "none";
  document.getElementById("Rules").style.display = "none";
  document.getElementById("myModal").style.display = "none";
  document.getElementById("Game").style.display = "none";
  document.getElementById("GameOver").style.display = "none";
  document.getElementById("championTable").style.display = "flex";
  document.getElementById("YouCanDoBetter").style.display = "none";
  document.getElementById("Winner").style.display = "none";
  document.getElementById("youLost").style.display = "none";
  document.getElementById("champion").style.display = "none";
}

function myFunctionSpace(event) {
  const input = document.getElementById("buttonChoosen");
  input.value = "";
  // Check if the key pressed was a space
  if (event.code === "Space") {
    input.value = "space";
  } else {
    input.value = event.key;
  }
}

function StartGame(){
    const errorMsg = document.getElementById("configuration-error-msg");
    errorMsg.innerHTML='';
    let keyBoardKey = document.getElementById("buttonChoosen").value;
    const isLetter = /[a-zA-Z]/.test(keyBoardKey);  
    if ((keyBoardKey.length == 1 && isLetter) || keyBoardKey == "space") {
        document.getElementById("ChooseKeys").style.display = "none";
        document.getElementById("EnemyShip").style.display = "none";
        document.getElementById("Setting").style.display = "none";
        document.getElementById("Welcome").style.display = "none";
        document.getElementById("Login").style.display = "none";
        document.getElementById("RegisterPage").style.display = "none";
        document.getElementById("Rules").style.display = "none";
        document.getElementById("myModal").style.display = "none";
        document.getElementById("Game").style.display = "flex";
        document.getElementById("GameOver").style.display = "none";
        document.getElementById('buttonChoosen').value = ''; // clear textbox
        // window.alert("before");
        // clearAllObject(); 
        // window.alert("after");
        playerSpaceShip();
        enemySpaceShip();
        Game();
        // save keycode of shooting key in a var
        shootingKey = keyCodeDict[keyBoardKey.toLowerCase()]
    }

    else {
        errorMsg.innerHTML = "keyBoard key must be one character between a-z or space";
    }
    }


    function Game(){
    // clearAllObject();  
    numOfScore = 0;
    isGame = true;
    endGame = -1;
    gameMusic = new Audio("sounds/gameMuSIC2.mp3");
    gameMusic.play();

    // add pause music button
    const button = document.createElement("button");
    button.textContent = "Pause Music";
    button.setAttribute("id","audioButton");
    // document.body.appendChild(button);
    document.getElementById('Game').appendChild(button);
    let isPlay = true;

    // add event listener to button
    button.addEventListener("click", function() {
        if (!isPlay) {
          gameMusic.play(); // play
          button.textContent = "Pause Music";
        } else {
          gameMusic.pause(); // pause
          button.textContent = "Play Music";
        }
        isPlay = !isPlay; // change flag
      });

    // add new game button
    const newGamebutton = document.createElement("button");
    newGamebutton.textContent = "New Game";
    newGamebutton.setAttribute("id","NewGameButton");
    // document.body.appendChild(button);
    document.getElementById('Game').appendChild(newGamebutton);
    newGamebutton.addEventListener("click", function() {
      clearScreen();
      gameMusic.pause();
    });


    score = document.getElementById("score-label").innerHTML = "Score:" + numOfScore;
    gameDuration = document.getElementById("myRange").value;  

    // clear configurations of the current game
    document.getElementById("myRange").value = 120; // clear slider time
    document.getElementById("output").innerHTML = '120'; // clear label shows time
    // clear white backgroung
    let images = document.querySelectorAll(".selected");
    for (var i=0; i < images.length; i++) {
      images[i].classList.remove("selected")
    }
    document.getElementById("countdown").innerHTML = "Game Start"
    timer = setInterval(function() {
        if (gameDuration <=0 && (!enemyDie)) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "Finished" // end game
            endGame = 0
            stopGame();
        }
        else {
            document.getElementById("countdown").innerHTML = gameDuration + " seconds remaining"
        }
        gameDuration -= 1;
    }, 1000)       
    }

    function pressKeyUp(e) {
        if (e.keyCode === down) {
            downArrow = false;
        } else if (e.keyCode === up) {
            upArrow = false;
        } else if (e.keyCode === left) {
            leftArrow = false;
        }
        else if (e.keyCode === right) {
            rightArrow = false;
        }
    }

    function pressKeyDown(e) {
        if (e.keyCode === down) {
            downArrow = true;
        } else if (e.keyCode === up) {
            upArrow = true;
        } else if (e.keyCode === left) {
            leftArrow = true;
        }
        else if (e.keyCode === right) {
            rightArrow = true;
        }    
        else if (e.keyCode === shootingKey) {
            shoot();
        }
        updateMySpace(Date.now());
    }
    window.addEventListener("keydown", pressKeyDown);
    window.addEventListener("keyup", pressKeyUp);
    
    
  function MyShipChoose(source){
    let st = "photos/space"
    let st1 = ".jpg"
    myShip= st.concat(source,st1);
  }

    function playerSpaceShip(){
    playerX = screenWidth / 2 ;
    playerY = screenHeight - 1*screenHeight/10 ;
    mySpaceShip = document.createElement("img");
    mySpaceShip.setAttribute('src',myShip);
    mySpaceShip.setAttribute('id','myImage');
    // document.body.appendChild(mySpaceShip);
    document.getElementById('Game').appendChild(mySpaceShip);
    mySpaceShip.style.position = "absolute";
    mySpaceShip.style.top = playerY + "px";
    mySpaceShip.style.left = playerX + "px";
    mySpaceShip.style.height = "60px";
    mySpaceShip.style.filter = "drop-shadow(2px 2px 2px #fff)" //checkkkkkkkkkk
    requestID = window.requestAnimationFrame(updateMySpace);

    // creates heart for life icon
    for (let i=1; i < 4; i++) {
        let heart = document.createElement("img");
        heart.setAttribute('src','photos/heart2.gif');
        heart.setAttribute('id', "heart" + i)
        heart.style.position = "absolute";
        heart.style.height = "50px";
        heart.style.left = i * 30 + "px"; 
        heart.style.filter = "drop-shadow(2px 2px 2px #fff)"
        heart.style.top =  screenHeight - (8.9*(screenHeight/10))+ "px"; 
        // document.body.appendChild(heart);
        document.getElementById('Game').appendChild(heart);
        hearts.push(heart);

    }
    // document.getElementById('Game').appendChild(hearts);
  }

  var lastTime = null;
  function updateMySpace(currentTime) {

    if (!mySpaceShip) {
      return;
    }

    var currentTime = Date.now();
    var dt = (currentTime - lastTime) / 1000.0;

    
    if (leftArrow){
        playerX -=  dt * PLAYER_MAX_SPEED; 
    }
    if (rightArrow) {
        playerX +=  dt * PLAYER_MAX_SPEED; 
    }
    if (upArrow) {
        playerY -=  dt * PLAYER_MAX_SPEED; 
    }
    if (downArrow) {
        playerY +=  dt * PLAYER_MAX_SPEED; 
    }   

    playerX = clampX(playerX,screenWidth-(9*screenWidth/10), screenWidth-(1.5*screenWidth/10));
    playerY = clampY(playerY,screenHeight-(4*screenHeight/10), screenHeight-(1*screenHeight/10));


    
    mySpaceShip.style.top = playerY + "px";
    mySpaceShip.style.left = playerX + "px";
    
    // else {
    //   return;
    // }

    lastTime = currentTime;
    requestID2 = window.requestAnimationFrame(updateMySpace);
}

    // window.requestAnimationFrame(updateMySpace);

  function clampX(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
  function clampY(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }

    
  function MyEnemyShipChoose(source){
    let st = "photos/space"
    let st1 = ".jpg"
    myEnemyShip= st.concat(source,st1);
  }

function shoot() {
    let shoot = document.createElement("img");
    shoot.setAttribute('src',"photos/laser.jpg");

    for(let i = 0; i< enemySpaceships.length; i++){
      enemySpaceships[i].img.classList.add('laser');
    }
    // document.body.appendChild(shoot);
    document.getElementById('Game').appendChild(shoot);
    shoot.style.position = "absolute";
    shoot.style.top = playerY + "px";
    shoot.style.left = playerX + "px";
    shoot.style.height = "55px";
    shoot.style.filter = "drop-shadow(5px 5px 5px #000)"
    
    // add shooting sound
    const shootAudio = new Audio("sounds/SpacedInvaders-Shoot.mp3");
    shootAudio.play();
    let moveUp = setInterval(() => {
      if (!isGame){
        clearInterval(moveUp);
        if (shoot != null && shoot.parentNode != null) {
          console.log(shoot);
          shoot.parentNode.removeChild(shoot);
        }
        return;
      }
      if(endGame === 0){
        shoot.parentNode.removeChild(shoot);
        return;
      }
      if( enemySpaceships.length === 0 && (!enemyDie) && isGame){
        clearInterval(timerEnemySpaceShip);
        shoot.parentNode.removeChild(shoot);
        enemyDie = true;
        endGame = 2
        stopGame();
        return;
      }
      // console.log(enemySpaceships.length);
      // console.log(enemyDie);
      // console.log(isGame);

      let curPosition = parseInt(shoot.style.top);
      shoot.style.top = (curPosition - 5) + "px";
      if (curPosition < 0 || hitEnemy(shoot)) { // check if hit enemy or reached the top of the screen
        clearInterval(moveUp);
        shoot.parentNode.removeChild(shoot);
        addScore(enemyDieRow);
      }

    
    }, 10);
  }
  

  function hitEnemy(shoot) {
    for (let i = 0; i < enemySpaceships.length; i++) {
      const enemy = enemySpaceships[i];
      const enemyRect = enemy.img.getBoundingClientRect();
      const shootRect = shoot.getBoundingClientRect();
     if (shootRect.bottom >= enemyRect.top && shootRect.top <= enemyRect.bottom && shootRect.right >= enemyRect.left && shootRect.left <= enemyRect.right) { 
        clearInterval(enemy.intervalId);
        // numOfEnememies--;
        enemySpaceships.splice(i,1); //checkkkkkkkkkkkkkkkkkkkkkkkkk
        enemyDieRow = parseInt(enemy.row);
        enemy.img.parentNode.removeChild(enemy.img);
        const enemyDieAudio = new Audio("sounds/Atari-Space-Invaders.mp3");
        enemyDieAudio.play();
        return true;
      }
      }
      // if( enemySpaceships.length === 0){
      //   enemyDie = true;
      //   endGame = 2
      //   stopGame();
      //   return;
      // }
    return false;
  }

function addScore() {
    const scoreLabel = document.getElementById("score-label");
    let scoreValue = parseInt(scoreLabel.innerText.replace("Score:", "").trim());
    let pointsToAdd = 0;
    
    // Determine the score to add based on the row the enemy was in
    if (enemyDieRow === 1) {
      pointsToAdd = 20;
    } else if (enemyDieRow === 2) {
      pointsToAdd = 15;
    } else if (enemyDieRow === 3) {
      pointsToAdd = 10;
    } else if (enemyDieRow === 4) {
      pointsToAdd = 5;
    }
    else{
        return;
    }
    
    // Add the points to the score and update the score label
    scoreValue += pointsToAdd;
    scoreLabel.innerText = "Score: " + scoreValue;
    enemyDieRow = parseInt(0);
  }
  
  function stopGame(){
    cancelAnimationFrame(requestID);
    cancelAnimationFrame(requestID2);
    clearInterval(timer);
    clearInterval(timerEnemySpaceShip);
    clearTimeout(timeOutEndGame0);
    clearTimeout(timeOutEndGameWinner);
    clearTimeout(timeOutEndGame1);
    clearTimeout(timeOutEndGame2);
    // clearInterval(shootOnMe); //??
    gameMusic.pause();

    shootingKey = '';
    document.getElementById("ChooseKeys").style.display = "none";
    document.getElementById("EnemyShip").style.display = "none";
    document.getElementById("Setting").style.display = "none";
    document.getElementById("Welcome").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("RegisterPage").style.display = "none";
    document.getElementById("Rules").style.display = "none";
    document.getElementById("myModal").style.display = "none";
    document.getElementById("Game").style.display = "none";
    // document.getElementById("GameOver").style.display = "flex";
    // document.getElementById("myImage").style.display = "none";

    const scoreLabel = document.getElementById("score-label");
    let scoreValue = parseInt(scoreLabel.innerText.replace("Score:", "").trim());
    numOfScore = scoreValue;
    // let curlist = [new Date(), scoreValue];
    // (usersScores[curLoggedUser]).push("hey");
    // window.alert(usersScores[curLoggedUser])
    if (endGame == 0) { // time over
      isGame = false;
      if (scoreValue < 100) { // "you can do better"
        tryAudio = new Audio("sounds/trynexttime.mp3");
        tryAudio.play();
        tryAudio.loop = true;
        tryPlay = true;
        gameMusic.pause();
        document.getElementById("YouCanDoBetter").style.display = "flex";
        timeOutEndGame0 = setTimeout (function() {
          const modaltxt = document.createElement('div');
          modaltxt.classList.add('modal-content-game');
          modaltxt.id = 'myModalYouCanDoBetter';
          // modaltxt.innerHTML = '<h4>You Can Do Better!<h4><br><h4>Your Score: </h4>' + scoreValue;
          modaltxt.innerHTML = 
          `<h4>You Can Do Better!</h4>
          <h4>Your Score: <span class="score-value">${scoreValue}</span></h4>
          <h4><span class="score-value">What do you want to do?</span></h4>
          <abc id="button1" href="#Welcome" onclick="Welcomepage()"><h5>Home Page</h5></abc>
          <abc id="button2" onclick="clearScreen()"><h5>New Game</h5></abc>
          <abc id="button3" onclick="championTable()"><h5>Champion Table</h5></abc>`;
          modaltxt.style.alignItems = 'center';
          modaltxt.style.textAlign = 'center';
          modaltxt.style.position = 'fixed';
          modaltxt.style.width = '600px'
          modaltxt.style.height = '500px'
          modaltxt.style.top = '30%'
          modaltxt.style.left = '50%'
          modaltxt.style.transform = 'translate(-50%, -50%)';
          modaltxt.style.opacity = 1.5
          document.getElementById("YouCanDoBetter").appendChild(modaltxt);
          const button1 = document.getElementById("button1");
          const button2 = document.getElementById("button2");
          const button3 = document.getElementById("button3");
          
          button1.addEventListener('click', function() {
            tryAudio.pause();
            Welcomepage();
          });
    
          button2.addEventListener('click', function() {
            tryAudio.pause();
            clearScreen();
          });
    
          button3.addEventListener('click', function() {
            tryAudio.pause();
            // championTable();
          });
          
        }, 3000)
        clearAllObject();
    }
 

      else { // "Winner!"
        document.getElementById("Winner").style.display = "flex";
        winAudio = new Audio("sounds/Chicken-Dance.mp3");
        winAudio.play();
        winPlay = true;
        gameMusic.pause();
        winAudio.loop = true;
        timeOutEndGameWinner = setTimeout (function() {
          const modaltxt = document.createElement('div');
          modaltxt.classList.add('modal-content-game');
          modaltxt.id = 'myModalWinner';
          modaltxt.innerHTML = 
          `<h4>Winner!</h4>
          <h4>Your Score: <span class="score-value">${scoreValue}</span></h4>
          <h4><span class="score-value">What do you want to do?</span></h4>
          <abc id="button1" href="#Welcome" onclick="Welcomepage()"><h5>Home Page</h5></abc>
          <abc id="button2" onclick="clearScreen()"><h5>New Game</h5></abc>
          <abc id="button3" onclick="championTable()"><h5>Champion Table</h5></abc>`;
          modaltxt.style.alignItems = 'center';
          modaltxt.style.textAlign = 'center';
          modaltxt.style.position = 'fixed';
          modaltxt.style.width = '600px'
          modaltxt.style.height = '500px'
          modaltxt.style.top = '30%'
          modaltxt.style.left = '50%'
          modaltxt.style.transform = 'translate(-50%, -50%)';
          modaltxt.style.opacity = 1.5
          document.getElementById("Winner").appendChild(modaltxt);
          const button1 = document.getElementById("button1");
          const button2 = document.getElementById("button2");
          const button3 = document.getElementById("button3");   
          button1.addEventListener('click', function() {
            winAudio.pause();
            Welcomepage();
          });
    
          button2.addEventListener('click', function() {
            winAudio.pause();
            clearScreen();
          });
    
          button3.addEventListener('click', function() {
            winAudio.pause();
            // championTable();
          });
          
        }, 3000)
        clearAllObject();
      }

    }
    else if (endGame == 1) { // life over "You Lost"
      isGame = false;
      document.getElementById("youLost").style.display = "flex";
      looseAudio = new Audio("sounds/Lose.mp3");
      looseAudio.play();
      gameMusic.pause();
      timeOutEndGame1 = setTimeout (function() {
        const modaltxt = document.createElement('div');
        modaltxt.classList.add('modal-content-game');
        modaltxt.id = 'myModalyouLost';
        modaltxt.innerHTML = 
        `<h4>You Lost!</h4>
        <h4>Your Score: <span class="score-value">${scoreValue}</span></h4>
        <h4><span class="score-value">What do you want to do?</span></h4>
        <abc id="button1" href="#Welcome" onclick="Welcomepage()"><h5>Home Page</h5></abc>
        <abc id="button2" onclick="clearScreen()"><h5>New Game</h5></abc>
        <abc id="button3" onclick="championTable()"><h5>Champion Table</h5></abc>`;
        modaltxt.style.alignItems = 'center';
        modaltxt.style.textAlign = 'center';
        modaltxt.style.position = 'fixed';
        modaltxt.style.width = '600px'
        modaltxt.style.height = '500px'
        modaltxt.style.top = '30%'
        modaltxt.style.left = '50%'
        modaltxt.style.transform = 'translate(-50%, -50%)';
        modaltxt.style.opacity = 1.5
        document.getElementById("youLost").appendChild(modaltxt);
        const button1 = document.getElementById("button1");
        const button2 = document.getElementById("button2");
        const button3 = document.getElementById("button3");
        
        button1.addEventListener('click', function() {
          looseAudio.pause();
          Welcomepage();
        });
  
        button2.addEventListener('click', function() {
          looseAudio.pause();
          clearScreen();
        });
  
        button3.addEventListener('click', function() {
          looseAudio.pause();
          // championTable();
        });
        
      }, 3000)
      clearAllObject();
  
    }
    else if (endGame == 2) { // all enemies died "Champion!"
      isGame = false;
      document.getElementById("champion").style.display = "flex";
      champAudio = new Audio("sounds/we-are-the-champions-copia.mp3");
      champAudio.play();
      champPlay = true;
      gameMusic.pause();
      champAudio.loop = true;
      timeOutEndGame2 = setTimeout (function() {
        const modaltxt = document.createElement('div');
        modaltxt.classList.add('modal-content-game');
        modaltxt.id = 'myModalchampion';
        modaltxt.innerHTML = 
        `<h4>Champion!</h4>
        <h4>Your Score: <span class="score-value">${scoreValue}</span></h4>
        <h4><span class="score-value">What do you want to do?</span></h4>
        <abc id="button1" href="#Welcome" onclick="Welcomepage()"><h5>Home Page</h5></abc>
        <abc id="button2" onclick="clearScreen()"><h5>New Game</h5></abc>
        <abc id="button3" onclick="championTable()"><h5>Champion Table</h5></abc>`;
        modaltxt.style.alignItems = 'center';
        modaltxt.style.textAlign = 'center';
        modaltxt.style.position = 'fixed';
        modaltxt.style.width = '600px'
        modaltxt.style.height = '500px'
        modaltxt.style.top = '30%'
        modaltxt.style.left = '50%'
        modaltxt.style.transform = 'translate(-50%, -50%)';
        modaltxt.style.opacity = 1.5
        document.getElementById("champion").appendChild(modaltxt);
        const button1 = document.getElementById("button1");
        const button2 = document.getElementById("button2");
        const button3 = document.getElementById("button3");
        
        button1.addEventListener('click', function() {
          champAudio.pause();
          Welcomepage();
        });
  
        button2.addEventListener('click', function() {
          champAudio.pause();
          clearScreen();
        });
  
        button3.addEventListener('click', function() {
          champAudio.pause();
          // championTable();
        });
        
      }, 3000)
      
      clearAllObject();
    }
    // clearAllObject();

    // for(let i =0 ; i < 20 ; i++){
    //   let enemy = enemySpaceships.pop();
    //   enemy.img.parentNode.removeChild(enemy.img);
    // }
    // mySpaceShip.parentNode.removeChild(mySpaceShip);

    // for(let j=0;j < hearts ; j++){
    //   let heart = hearts.pop();
    //   heart.parentNode.removeChild(heart);
    // }
  endGame = -1;
  }

  
function enemySpaceShip() {
  var enemySpacing = (screenWidth - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1) - 170;
  for (let j = 0; j < 5; j++) {
    var x = j * enemySpacing + ENEMY_HORIZONTAL_PADDING + 400;
    for (let i = 0; i < ENEMIES_PER_ROW- 1 ; i++) {
      var y = ENEMY_VERTICAL_PADDING + screenHeight / 2 - 300 + i * ENEMY_VERTICAL_SPACING;    
      var enemy = {x: x, y: y, speed: 5, directionX: 1, img: new Image(), row: i+1}
  
      // myEnemySpaceShip = document.createElement("img");
      // myEnemySpaceShip.setAttribute('src', myEnemyShip);
      // myEnemySpaceShip.classList.add('enemyShipImage');
      enemy.img.src = myEnemyShip;
      enemy.img.classList.add('enemyShipImage') // checkkkkkkkkkkkkkkkkkkkkk
      // enemy.dataset.row = j + 1;
      // document.body.appendChild(enemy);
      enemy.img.style.position = "absolute";
      // enemy.img.style.display = "block";
      enemy.img.style.top = enemy.y + "px";
      enemy.img.style.left = enemy.x + "px";
      enemy.img.style.height = "60px";
      enemy.img.style.filter = "drop-shadow(2px 2px 2px #fff)";
      enemySpaceships.push(enemy);
      // document.body.appendChild(enemy.img);
      document.getElementById('Game').appendChild(enemy.img);
      // window.requestAnimationFrame(updateMySpace);

    }
    // window.requestAnimationFrame(updateEnemySpace);

  }
  enemyDie = false;
  // ShootOnMe();
  // var enemies = document.querySelectorAll(".enemyShipImage");
  window.requestAnimationFrame(moveEnemySpaceships);
  // animateEnemies(enemies);
}




function moveEnemySpaceships() {
  var directionX = 1; // Start moving to the right initially
  var moveDistance = 1; // Set the initial distance to move in pixels
  var speedIncrease = 1; // Set the speed increase amount in pixels
  var speedIncreaseCount = 0; // Keep track of speed increase count

  timerEnemySpaceShip = setInterval(function() {
    // if (!isGame) {
    //   clearInterval(timerEnemySpaceShip);
    //   return;
    // }
    // Update the positions of all enemy spaceships
    for (var i = 0; i < enemySpaceships.length; i++) {
      var enemy = enemySpaceships[i];
      enemy.x += directionX * moveDistance;
      enemy.img.style.left = enemy.x + "px";
    }

    if (enemySpaceships.length==0) {
      return;
    }
    // reached left boundary
    if (directionX === -1 && enemySpaceships[0].x <= (screenWidth - (9 * screenWidth / 10))) {
      directionX = 1;
    } else if (directionX === 1 && enemySpaceships[enemySpaceships.length - 1].x >= (screenWidth - (1.5 * screenWidth / 10))) {
      // reached right boundary
      directionX = -1;
    }

    // Increase speed every 5 seconds for 4 times
    if (speedIncreaseCount < 4 && (new Date().getTime() - startTime) / 1000 > 5) {
      moveDistance += speedIncrease;
      startTime = new Date().getTime();
      speedIncreaseCount++;
    }
  }, 1000 / 60); // ???? 
}

var startTime = new Date().getTime(); // Store the start time to keep track of time

  function clampX(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
  function clampY(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }

  
  // Define a function to create enemy bullets
function createEnemyBullet(x, y) {
  if (!isGame){
    return;
  }
  var bullet = new Image();
  bullet.src = "photos/enemyBullet.png"; 
  bullet.classList.add('enemyBulletImage');
  bullet.style.position = "absolute";
  bullet.style.top = y + "px";
  bullet.style.left = x + "px";
  bullet.style.height = "40px";
  // document.body.appendChild(bullet);
  document.getElementById('Game').appendChild(bullet);

  var intervalId = setInterval(function() {
    if (!isGame){
      return;
    }
    // Update bullet position
    y += 5; 
    bullet.style.top = y + "px";

    // Check collision with player's spaceship
    var playerRect = mySpaceShip.getBoundingClientRect(); 
    var bulletRect = bullet.getBoundingClientRect();
    if ((bulletRect.bottom >= playerRect.top && bulletRect.top <= playerRect.bottom && bulletRect.right >= playerRect.left && bulletRect.left <= playerRect.right) && hearts.length != 0) {
      let heart = hearts.pop();
      heart.parentNode.removeChild(heart);
      if(hearts.length === 0 && endGame != 2){
        endGame = 1;
        stopGame();
      }
      clearInterval(intervalId);
      bullet.parentNode.removeChild(bullet);
      playerX = screenWidth / 2 ;
      playerY = screenHeight - 1*screenHeight/10 ;
      mySpaceShip.style.top = playerY + "px";
      mySpaceShip.style.left = playerX + "px";
      const MeDieAudio = new Audio("sounds/SpacedInvaders-killd.mp3");
      MeDieAudio.play();
    }

    // bullet is at the buttom of the screen
    if (y >= screenHeight -50) { 
      clearInterval(intervalId);
      bullet.parentNode.removeChild(bullet);
    }
  }, 16);
}

function ShootOnMe(){
  shootOnMe = setInterval(function() {

  const enemyCount = enemySpaceships.length;
 
  if (enemyCount === 0) {
    return;
  }
 
 const randomEnemyIndex = Math.floor(Math.random() * enemyCount);
 const randomEnemy = enemySpaceships[randomEnemyIndex];
 createEnemyBullet(randomEnemy.x + randomEnemy.img.width / 2, randomEnemy.y + randomEnemy.img.height);
},1500)
 
}
 window.requestAnimationFrame(ShootOnMe);

 function clearScreen(){
  // clearAllObject();
  document.getElementById("YouCanDoBetter").style.display = "none";
  document.getElementById("Winner").style.display = "none";
  document.getElementById("youLost").style.display = "none";
  document.getElementById("champion").style.display = "none";
  settingpage();
 }

 function clearAllObject(){
  // if (mySpaceShip){
    mySpaceShip.parentNode.removeChild(mySpaceShip);
  // }
  mySpaceShip = null;
  shootingKey = '';

  // destroy heart for life icon
  for (let i=0; i < hearts.length; i++) {
    let heart = hearts[i]
    // if (heart){
      // heart.parentNode.removeChild(heart);
      document.getElementById('Game').removeChild(heart);
      
    // }
  }
  hearts = [];

  // destroy pause/play music button
  let button = document.getElementById("audioButton");
  // if (button){
  button.parentNode.removeChild(button);
  // }

  // destroy enemy spaceships
  var len = enemySpaceships.length;
  for(let i =0 ; i < len ; i++){
      let enemy = enemySpaceships.pop();
      // if(enemy) {
        enemy.img.parentNode.removeChild(enemy.img);
      // }  
  }
  enemySpaceships = [];
 }

function stopGifMusic(){
  if(champPlay){
    champAudio.pause();
    champPlay = false;
  }
  if(winPlay){
    winAudio.pause();
    winPlay = false;
  }
  if(tryPlay){
    tryAudio.pause();
    tryPlay = false;
  }
}

function clearAll() {
  var allElements = document.getElementById("Game");
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].parentNode.removeChild(allElements[i]);
  }
  hearts = []
  enemySpaceships = []
}

function records() {
  const table = document.querySelector('#championTable table');
  const now = new Date();
  const newRow = document.createElement('tr');
  const scoreCell = document.createElement('td');
  const dateCell = document.createElement('td');
  scoreCell.textContent = numOfScore;
  dateCell.textContent = now.toLocaleString();
  newRow.appendChild(dateCell);
  newRow.appendChild(scoreCell);
  table.querySelector('tbody').appendChild(newRow);

  const rows = table.querySelectorAll('tbody tr');
  const rowsArray = Array.from(rows);
  rowsArray.sort((rowA, rowB) => {
    const scoreA = parseInt(rowA.cells[1].textContent);
    const scoreB = parseInt(rowB.cells[1].textContent);
    return scoreB - scoreA;
  });
  rowsArray.forEach(row => table.querySelector('tbody').appendChild(row));
  // numOfScore = 0;


  // let latestDate = null;
  // const rowCount = rowsArray.length;
  // for (let i = 1; i < rowCount; i++) {
  //   const row = rowsArray[i];
  //   const date = new Date(row.cells[0].textContent);
  //   if (!latestDate || date > latestDate) {
  //     latestDate = date;
  //   }
  // }

  // const latestDateString = latestDate ? latestDate.toLocaleString() : 'No records found';
  // const latestDateString = latestDate.toLocaleString();
  // const latestDateCell = table.querySelector('tbody tr:last-child td:first-child');
  // latestDateCell.textContent = latestDate;
  // newRow.classList.add('last-date');
  
}