(function gameFunction(){
    window.onload = function(){
        var wordnum = 0;
        var win = 0;
        var loss = 0;
        var guesses = 10;
        var guessedStr = "";
        var wordlist = ['billy jean','beat it'];
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
                    console.log("here");
                    wordStr += wordlist[wordnum][i] + " ";
                } else {
                    wordStr += "_ ";
                }
            }
            document.getElementById("word").innerHTML = wordStr.trim();
            updateValues();
        }
        //progresses the game to the next word
        function nextWord(){
            guesses = 10;
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
        
            } else {
                if (win > loss) {
                    document.getElementById("msg").innerHTML = "You win!"
                } else {
                    document.getElementById("msg").innerHTML = "Game Over!"
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
                    document.getElementById("msg").innerHTML = "Congratulations"
                } else if (guesses ===0) {
                    loss +=1;
                    document.getElementById("msg").innerHTML = "Too Bad! :("
                }
                nextWord()
            }
        }
        for (i=0; i < wordlist[wordnum].length; i++) {
            wordStr += "_ ";
        }
        document.getElementById("word").innerHTML = wordStr.trim();
        updateValues();
        window.addEventListener("keypress", function(e){
            var key = e.key.toLowerCase();
            if (!gameover) {
                //checks letter and update values accordingly
                checkGuess(key);
                //check if word has been guessed or run out of guesses
                checkWinLoss();
            }


        })
    };
}());