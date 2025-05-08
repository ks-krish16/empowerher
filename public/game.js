const scenes = [
    {
      text: "You had applied for a job and got selected in it",
      bg: "img/pc.jpeg", 
      choices: [
        { text: "accept the job offer", effects: { confidence: +5, career: +10 } },
        { text: "Look for some other job", effects: { confidence: -10, career: -5 } }
      ]
    },
    {
      text: "You join your new company full of excitement, but quickly notice all leadership roles are held by men. The workplace jokes feel exclusionary",
      bg: "img/office.jpeg",
      choices: [
        { text: "Speak with HR about the culture ", effects: {confidence: +5, career: +5 } },
        { text: "Stay quiet and observe for now", effects: { wellbeing: -5 } }
      ]
    },
    {
      text: "Despite being a developer, you’re constantly assigned note-taking and team organizing roles, unlike your male colleagues",
      bg: "img/office.jpeg",
      choices: [
        { text: "Politely decline and request technical tasks ", effects: {confidence: +5, career: +5 } },
        { text: "Do the tasks to avoid conflict", effects: { wellbeing: -5, confidence: -5 } }
      ]
    },
    {
      text: "Your manager calls you 'too emotional' when you assert yourself in meetings, while praising assertiveness in male peers.",
      bg: "img/office2.jpeg",
      choices: [
        { text: "Ask for specific, actionable feedback", effects: {confidence: +5, career: +5 } },
        { text: "Apologize and try to be quieter", effects: { wellbeing: -5, confidence: -10 } }
      ]
    },
    {
      text: "Your colleagues often make career deals during golf outings and bar meetups — and you’re never invited.",
      bg: "img/bar.jpeg",
      choices: [
        { text: "Request to be included in all team networking", effects: { career: +5 } },
        { text: "Accept that it’s just how things work", effects: { wellbeing: -10, career: -5 } }
      ]
    },
    {
      text: "A male coworker says you're 'too pretty to be a coder' during a coffee break. Others laugh.",
      bg: "img/canteen.jpeg",
      choices: [
        { text: "Confront the comment and explain it's not okay", effects: { confidence:+5 } },
        { text: "Laugh it off and walk away", effects: { wellbeing: -10 } }
      ]
    },
    {
      text: "For the second time, your suggestion is echoed by a male colleague who gets credit for it",
      bg: "img/office.jpeg",
      choices: [
        { text: "Call it out in the moment", effects: { confidence:+5 } },
        { text: "Talk to your manager privately later", effects: { confidence:+3} }
      ]
    },
    {
      text: "You hear whispers that women who take maternity leave here are seen as 'uncommitted' and passed up for promotions.",
      bg: "img/office.jpeg",
      choices: [
        { text: "Ask HR about your rights and policies", effects: { confidence:+5 } },
        { text: "Start hiding personal plans", effects: { wellbeing: -10, confidence :-5} }
      ]
    }

    ]; 
    const stats = {
        confidence: 70,
        career: 50,
        wellbeing: 50
      };
      let currentScene = 0;
      const sceneText = document.getElementById("scene-text");
      const choiceA = document.getElementById("choiceA");
      const choiceB = document.getElementById("choiceB");
  
      function updateStatsDisplay() {
        document.getElementById("confidence").textContent = stats.confidence;
        document.getElementById("career").textContent = stats.career;
  
        document.getElementById("wellbeing").textContent = stats.wellbeing;
      }
      
    function showScene(index) {
        if (index >= scenes.length) {
          endGame();
          return;
        }
        const scene = scenes[index];
        sceneText.textContent = scene.text;
        choiceA.textContent = scene.choices[0].text;
        choiceB.textContent = scene.choices[1].text;
  
        choiceA.onclick = () => applyChoice(scene.choices[0].effects);
        choiceB.onclick = () => applyChoice(scene.choices[1].effects);
  
        
        main=document.querySelector(".main");
        if ( scene.bg.endsWith('.jpeg')) {
          
              main.style.backgroundImage = `url('${scene.bg}')`;
              main.style.backgroundSize = 'cover';
              main.style.backgroundColor = '';
          } else{           
              main.style.backgroundImage = '';
              main.style.backgroundColor = scene.bg;
          }
    
      
     
        for (let key in effects) {
          stats[key] += effects[key];
        }
        updateStatsDisplay();
        currentScene++;
        showScene(currentScene);
      
     
}
function applyChoice(effects) {
  for (let key in effects) {
    stats[key] += effects[key];
  }
  updateStatsDisplay();
  currentScene++;
  showScene(currentScene);
}
  
      function endGame() {
        document.getElementById("scene-container").innerHTML = 
          `<h2>Game Over</h2>
          <p>Final Stats:</p>
          <p>Confidence: ${stats.confidence}</p>
          <p>Career Progress: ${stats.career}</p>
  
          <p>Mental Well-being: ${stats.wellbeing}</p>
              <hr>
        <p><strong>You just navigated a world that reflects what many women silently endure every day.</strong></p>
        <p>Sexism in the workplace isn’t always loud. It’s in the overlooked ideas, the subtle comments, the invisible ceilings. The weight of navigating bias can chip away at confidence, stifle growth, and harm well-being — all while the world keeps asking women to “adjust.”</p>
        <p>But awareness is power. When we recognize injustice, we create room to resist it, to speak up, to support others, and to demand better systems. Whether you thrived or simply survived in this story, your journey matters — and so does your voice.</p>
        <hr>
        <p><strong>This was not just a game. It’s a reflection. And maybe, a beginning.</strong></p>
        <button onclick="location.reload()">Play Again</button>`
        ;
      }
  
      showScene(currentScene);
      updateStatsDisplay();