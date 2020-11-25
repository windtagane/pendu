let word = "<?= (string)$word ?>";
let gameState = true;
let lifePoint = "<?= (int)$lifePoints ?>";
let btns = $('.btn'); 
let image = document.getElementById("hangman");
let resultDiv = document.getElementById("result");


document.addEventListener("keypress", function() {
    if (gameState === true) {
        let key = event.key;
        let result = compare(key, word);
        if (result["valid"] === true) {
            let btn = document.querySelectorAll(`[data-letter = ${result["keyPressed"]}]`);
            btn.forEach(element => {
                element.innerHTML = result["keyPressed"];
            })
            if (isGameSolved(word, btns)) {
                resultDiv.innerHTML = "<p class='d-flex justify-content-center'>Vous avez gagné !</p><p class='d-flex justify-content-center'>Le mot était " + word.toUpperCase() + " </p>";
                gameState = false;
            }

        }   
        if (result["valid"] === false) {
            lifePoint = lifePoint - 1;
            document.querySelector('#lifePoints').innerHTML = " " + lifePoint;
            image.setAttribute("src", `/public/img/hangman-${lifePoint}.jpg`);
            if (lifePoint <= 0) {
                resultDiv.innerHTML = "<p class='d-flex justify-content-center'>Votre collier est beau mais vous l'avez trop serré...</p><p class='d-flex justify-content-center'>Le mot était " + word.toUpperCase() + " </p>";
                gameState = false;
            }
        }
    }
});

function compare(key, word) {

    let _word = word.toUpperCase();
    let _key = key.toUpperCase();
    let split = _word.split('');
    let valid = false;

    split.forEach(letter => {
        if (letter === _key) {
            valid = true;
        }
    });

    let result = {
        "valid": valid,
        "keyPressed": _key,
    }

    return result;
}

function isGameSolved(solution, inputs) {
    let playerInputs = "";
    for (input of inputs){
        playerInputs += input.textContent;
    };
    let result = (playerInputs === solution.toUpperCase()) ? true : false;
    return result;
}
