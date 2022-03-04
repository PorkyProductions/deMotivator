function GenerateInsult(){
    insult = insults[Math.floor(Math.random() * (insults.length-0.01))];
      console.log(insults);
      document.getElementById("insult").innerHTML = insult;
    }
  
  
  function geolocation(): void {
    new Geolocation().then(pos => {
      console.log(pos);}
    )
    .catch((err: any) => {
      console.log(err);
    });
  }