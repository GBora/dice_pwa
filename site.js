// let padNumber = (num) => num >= 10 ? num : '0' + num;

let rollRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let rollDice = (max) => {
    return rollRandom(1, max);
}

let throwDice = (dice) => {
    let result = rollDice(dice);
    // let now = new Date();
    // let time = `${padNumber(now.getHours())}:${padNumber(now.getMinutes())}:${padNumber(padNumber(now.getSeconds()))}` 
    let text = `D${dice} rolled ${result}`;
    document.querySelector('.result').textContent = text;
}

let throwCustom = () => {
    let customDice = document.querySelector('#custom-dice').value;
    try {
        let customNr = Number.parseInt(customDice);
        if (!Number.isNaN(customNr) && customNr >=2) {
            throwDice(customNr);
        } else {
            document.querySelector('.result').textContent = 'Please enter a positive number.'; 
        } 
    } catch {
        document.querySelector('.result').textContent = 'Please enter a positive number.';
    }
}

let throwD6D6 = () => {
    let result1 = rollDice(6);
    let result2 = rollDice(6);
    let text = `D6/D6 rolled ${result1}${result2}`;
    document.querySelector('.result').textContent = text; 
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
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
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