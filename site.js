let padNumber = (num) => num >= 10 ? num : '0' + num;

let rollRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let rollDice = (max) => {
    return rollRandom(1, max);
}

let showResult = (text) => {
    let div = document.createElement("div");
    let now = new Date();
    let time = `${padNumber(now.getHours())}:${padNumber(now.getMinutes())}:${padNumber(padNumber(now.getSeconds()))}` 
    div.innerText = time + ' ' + text;
    document.querySelector('.inner-result').appendChild(div);
    // document.querySelector('.result').textContent = text;
}

let throwDice = (dice) => {
    let result = rollDice(dice);
    let text = `D${dice} rolled ${result}`;
    showResult(text);
}

let throwCustom = () => {
    let customDice = document.querySelector('#custom-dice').value;
    try {
        let customNr = Number.parseInt(customDice);
        if (!Number.isNaN(customNr) && customNr >=2) {
            throwDice(customNr);
        } else {
            showResult('Please enter a positive number.'); 
        } 
    } catch {
        showResult('Please enter a positive number.'); 
    }
}

let throwD6D6 = () => {
    let result1 = rollDice(6);
    let result2 = rollDice(6);
    let text = `D6/D6 rolled ${result1}${result2}`;
    showResult(text);
}

let throw2D6 = () => {
    let result1 = rollDice(6);
    let result2 = rollDice(6);
    let text = `2D6 rolled ${result1 + result2} = ${result1} + ${result2}`;
    showResult(text);
}

let throwExploding2D6 = () => {
    let charges = 2;
    let sum = 0;
    let results = [];
    while (charges > 0) {
        charges--;
        let diceResult = rollDice(6);
        sum += diceResult;
        results.push(diceResult);
        if (diceResult === 6) {
            charges++
        }
    }
    let text = `2D6 Exploding rolled ${sum} = ${results}`;
    showResult(text);
}

let throwFudge = () => {
    let result = rollDice(6);
    switch (result) {
        case 1: return -1;
        case 2: return -1;
        case 3: return 0;
        case 4: return 0;
        case 5: return 1;
        case 6: return 1;
    }
}

let throw4Fudge = () => {
    let sum = 0;
    let results = []
    for (let i = 0; i < 4; i++) {
        let diceResult = throwFudge();
        sum += diceResult;
        results.push(diceResult);
    }
    let text = `4DF rolled ${sum} = ${results}`;
    showResult(text);
}

let throw2D20 = () => {
    let result1 = rollDice(20);
    let result2 = rollDice(20);
    let text = `2D20 rolled ${result1 + result2} = ${result1} + ${result2}`;
    showResult(text);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => { console.log('Service Worker Registered'); });
  }

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    // addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        // addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
            } else {
            console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});