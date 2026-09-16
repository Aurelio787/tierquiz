let punktestand = 0; 

let aktuelleFrageIndex = 0; 

let statistik = []; 

let startTime; 

let timerInterval; 

 

let punktesystem = document.getElementById("punktesystem"); 

let frageElement = document.getElementById("frage"); 

let result = document.getElementById("result"); 

let buttons = document.querySelectorAll(".btn"); 

 

const startBtn = document.getElementById("startBtn"); 

const titelscreen = document.getElementById("titelscreen"); 

const quizContainer = document.querySelector(".quiz-container"); 

 

/* Fragenpool */ 

const fragenPool = [ 

{frage:"Welches Tier bellt?", antworten:["Katze","Hund","Vogel"], richtig:1}, 

{frage:"Welches Tier miaut?", antworten:["Katze","Hund","Kuh"], richtig:0}, 

{frage:"Welches Tier kann fliegen?", antworten:["Elefant","Vogel","Hund"], richtig:1}, 

{frage:"Welches Tier schwimmt im Meer?", antworten:["Delfin","Kuh","Tiger"], richtig:0}, 

{frage:"Welches Tier ist ein Raubtier?", antworten:["Löwe","Schaf","Kuh"], richtig:0}, 

{frage:"Welches Tier legt Eier?", antworten:["Vogel","Hund","Katze"], richtig:0}, 

{frage:"Welches Tier lebt im Wasser?", antworten:["Fisch","Pferd","Hund"], richtig:0}, 

{frage:"Welches Tier hat einen Rüssel?", antworten:["Elefant","Katze","Hund"], richtig:0}, 

{frage:"Welches Tier ist ein Haustier?", antworten:["Hund","Tiger","Wolf"], richtig:0}, 

{frage:"Welches Tier kann sehr hoch springen?", antworten:["Känguru","Elefant","Kuh"], richtig:0}, 

{frage:"Welches Tier gibt Milch?", antworten:["Kuh","Vogel","Tiger"], richtig:0}, 

{frage:"Welches Tier hat Federn?", antworten:["Vogel","Hund","Elefant"], richtig:0} 

]; 

 

/* 10 zufällige Fragen auswählen */ 

let quizFragen = fragenPool.sort(() => 0.5 - Math.random()).slice(0,10); 

 

/* Timer starten */ 

function starteTimer(){ 

startTime = Date.now(); 

timerInterval = setInterval(() => { 

let sekunden = Math.floor((Date.now() - startTime)/1000); 

punktesystem.textContent = `Punkte: ${punktestand} | Zeit: ${sekunden}s`; 

}, 500); 

} 

 

/* Quiz starten */ 

startBtn.addEventListener("click", ()=>{ 

titelscreen.style.display = "none"; 

quizContainer.style.display = "block"; 

starteTimer(); 

ladeFrage(); 

}); 

 

function ladeFrage(){ 

let frage = quizFragen[aktuelleFrageIndex]; 

frageElement.textContent = frage.frage; 

buttons[0].textContent = frage.antworten[0]; 

buttons[1].textContent = frage.antworten[1]; 

buttons[2].textContent = frage.antworten[2]; 

result.textContent = ""; 

} 

 

function checkAnswer(index){ 

let frage = quizFragen[aktuelleFrageIndex]; 

 

if(index === frage.richtig){ 

result.textContent = "Richtig!"; 

result.style.color = "green"; 

punktestand++; 

statistik.push("Richtig"); 

} else { 

result.textContent = "Falsch!"; 

result.style.color = "red"; 

statistik.push("Falsch"); 

} 

 

aktuelleFrageIndex++; 

 

setTimeout(()=>{ 

if(aktuelleFrageIndex < quizFragen.length){ 

ladeFrage(); 

} else { 

clearInterval(timerInterval); // Timer stoppen 

punktesystem.style.display = "none"; // Punkte und Timer ausblenden 

zeigeStatistik(); 

} 

},1000); 

} 

 

function zeigeStatistik(){ 

frageElement.textContent = "Quiz beendet"; 

buttons.forEach(btn => btn.style.display="none"); 

 

let richtige = statistik.filter(x=>x==="Richtig").length; 

let falsche = statistik.filter(x=>x==="Falsch").length; 

let gesamtSekunden = Math.floor((Date.now() - startTime)/1000); 

 

result.innerHTML = `Gesamt: 10 Fragen<br>Zeit: ${gesamtSekunden}s`; 

 

// Kreisdiagramm 

const ctx = document.getElementById('statistikChart').getContext('2d'); 

new Chart(ctx, { 

type: 'pie', 

data: { 

labels: ['Richtig','Falsch'], 

datasets: [{ 

data: [richtige,falsche], 

backgroundColor: ['#2ecc71','#e74c3c'], 

}] 

}, 

options: { 

responsive: false, 

plugins: { 

legend: { position:'bottom' }, 

tooltip: { callbacks: { label: function(context){ return context.label+': '+context.parsed; } } } 

} 

} 

}); 

} 