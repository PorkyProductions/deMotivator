function GenerateInsult() {
    insult = insults[Math.floor(Math.random() * (insults.length - 0.01))];
    console.log(insult);
    document.getElementById("insult").innerHTML = insult;
}
