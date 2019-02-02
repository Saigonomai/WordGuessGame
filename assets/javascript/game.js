(function gameFunction(){
    window.onload = function(){
        var wordnum = 0;
        var win = 0;
        var loss = 0;
        var guesses = 15;
        var guessedStr = "";
        var wordlist = ["canada", "china", "japan", "mexico", "united kingdom", "south korea", "australia",  "greece"];
        var correctGuesses = [];
        var wordStr = "";
        var gameover = false;
        function updateValues(){
            document.getElementById("win").innerHTML = "Wins: "+ win;
            document.getElementById("lose").innerHTML = "Losses: "+ loss;
            document.getElementById("guessleft").innerHTML = "Number of guesses remaining: "+ guesses;
            document.getElementById("guessed").innerHTML = "Letters already guessed: "+ guessedStr;
    
        }
        //checks the key that was pressed
        function checkGuess(key){
            wordStr="";
            if (wordlist[wordnum].includes(key)) {
                if (correctGuesses.indexOf(key) === -1){
                    correctGuesses.push(key);
                    guesses--;
                }
            } else {
                if (!guessedStr.includes(key)){
                  guessedStr += key;
                  guesses--;
                }
            }
            for (i=0; i < wordlist[wordnum].length; i++) {
                if (correctGuesses.includes(wordlist[wordnum][i])){
                    wordStr += wordlist[wordnum][i] + "&nbsp;";
                } else {
                    wordStr += "_ ";
                }
            }
            document.getElementById("word").innerHTML = wordStr.trim();
            updateValues();
        }
        //progresses the game to the next word
        function nextWord(){
            guesses = 15;
            guessedStr = "";
            correctGuesses = [];
            wordStr = "";
            updateValues();
            if (wordnum < wordlist.length-1) {
                wordnum += 1;
                for (i=0; i < wordlist[wordnum].length; i++) {
                    wordStr += "_ ";
                }
                document.getElementById("word").innerHTML = wordStr.trim();
                document.getElementById("hint").src = "assets/images/" + wordlist[wordnum] +".png";
        
            } else {
                if (win > loss) {
                    document.getElementById("msg").innerHTML = "You win!";
                    document.getElementById("hint").src = "assets/images/fireworks.png";
                    document.getElementById("hint").style.height = 150;
                } else {
                    document.getElementById("msg").innerHTML = "Better Luck Next Time!";
                    document.getElementById("hint").src = "assets/images/surrender.png";
                }
                gameover = true;
            }
    
        }
        //checks if the round has ended
        function checkWinLoss(){
            var wordGuessed = true;
            for (i=0; i < wordlist[wordnum].length; i++){
                if (!(correctGuesses.includes(wordlist[wordnum][i]))) {
                    wordGuessed  = false;
                }
            }
            if ((guesses === 0) || wordGuessed) {
                if (wordGuessed) {
                    win += 1;
                    document.getElementById("msg").innerHTML = "Congratulations";
                } else if (guesses ===0) {
                    loss +=1;
                    document.getElementById("msg").innerHTML = "Too Bad!";
                }
                nextWord();
            }
        }
        for (i=0; i < wordlist[wordnum].length; i++) {
            wordStr += "_ ";
        }
        document.getElementById("word").innerHTML = wordStr.trim();
        document.getElementById("hint").src = "assets/images/" + wordlist[wordnum] +".png";
        updateValues();
        window.addEventListener("keypress", function(e){
            var key = e.key.toLowerCase();
            if (!gameover) {
                //checks letter and update values accordingly
                checkGuess(key);
                //check if word has been guessed or run out of guesses
                checkWinLoss();
            }


        });
    };
}());