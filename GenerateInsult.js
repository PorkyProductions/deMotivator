function GenerateInsult() {
    insult = insults[Math.floor(Math.random() * (insults.length - 0.01))];
    console.log(insult);
    document.getElementById("insult").innerHTML = insult;
}

// create a function that selects from the insult array and then reverses it