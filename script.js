* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --cyan: #00f6ff;
  --purple: #8a2cff;
  --pink: #ff2bd6;
  --red: #ff3158;
  --green: #58ff9b;
  --bg: #03040a;
  --panel: #080b14;
  --white: #f4f7ff;
  --muted: #737b91;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--white);
  font-family: "Rajdhani", sans-serif;
  overflow-x: hidden;
}


/* ================= INTRO ================= */

#intro {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #02030a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#intro.hide {
  animation: introOut 1s forwards;
  pointer-events: none;
}

@keyframes introOut {
  to {
    opacity: 0;
    transform: scale(1.08);
    visibility: hidden;
  }
}

.intro-grid {
  position: absolute;
  inset: -100%;
  background-image:
    linear-gradient(rgba(0,246,255,.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,246,255,.08) 1px, transparent 1px);
  background-size: 60px 60px;
  transform: perspective(500px) rotateX(65deg);
  animation: gridMove 5s linear infinite;
}

@keyframes gridMove {
  from {
    transform: perspective(500px) rotateX(65deg) translateY(0);
  }
  to {
    transform: perspective(500px) rotateX(65deg) translateY(60px);
  }
}

.intro-noise {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 3px,
      rgba(255,255,255,.025) 4px
    );
  pointer-events: none;
}

.intro-content {
  width: min(650px, 90%);
  position: relative;
  z-index: 2;
  text-align: center;
}

.intro-small {
  color: var(--cyan);
  font-family: Orbitron, sans-serif;
  font-size: 12px;
  letter-spacing: 5px;
  margin-bottom: 20px;
  animation: blink 1s infinite alternate;
}

@keyframes blink {
  from { opacity: .4; }
  to { opacity: 1; }
}

.intro-logo {
  font-family: Orbitron, sans-serif;
  font-size: clamp(60px, 13vw, 130px);
  font-weight: 900;
  line-height: .8;
  color: transparent;
  -webkit-text-stroke: 2px var(--cyan);
  text-shadow:
    0 0 10px var(--cyan),
    0 0 40px var(--cyan);
  animation: logoPulse 2s infinite;
}

@keyframes logoPulse {
  50% {
    transform: scale(1.03);
    text-shadow:
      0 0 20px var(--cyan),
      0 0 80px var(--cyan);
  }
}

.intro-title {
  margin-top: 20px;
  font-family: Orbitron, sans-serif;
  font-size: clamp(30px, 6vw, 65px);
  font-weight: 900;
  letter-spacing: 8px;
}

.intro-title span {
  color: var(--pink);
  text-shadow: 0 0 30px var(--pink);
}

.intro-line {
  width: 100%;
  height: 1px;
  margin: 30px auto;
  background: linear-gradient(
    90deg,
    transparent,
    var(--cyan),
    var(--pink),
    transparent
  );
}

.intro-status {
  display: flex;
  justify-content: space-between;
  font-family: Orbitron, sans-serif;
  font-size: 12px;
  color: #9ea8bd;
  margin-bottom: 10px;
}

#introPercent {
  color: var(--cyan);
}

.loading-box {
  height: 8px;
  border: 1px solid #26344e;
  padding: 2px;
  background: #050812;
}

#loadingBar {
  height: 100%;
  width: 0%;
  background: linear-gradient(
    90deg,
    var(--cyan),
    var(--purple),
    var(--pink)
  );
  box-shadow:
    0 0 15px var(--cyan),
    0 0 30px var(--purple);
}

.intro-terminal {
  text-align: left;
  margin-top: 25px;
  font-family: monospace;
  font-size: 11px;
  line-height: 1.8;
  color: #59667d;
}

.intro-terminal div:nth-child(4) {
  color: var(--green);
}

#skipIntro {
  margin-top: 30px;
  padding: 10px 25px;
  background: transparent;
  border: 1px solid #34415b;
  color: #9aa5bc;
  font-family: Orbitron, sans-serif;
  cursor: pointer;
  transition: .3s;
}

#skipIntro:hover {
  color: var(--cyan);
  border-color: var(--cyan);
  box-shadow: 0 0 20px rgba(0,246,255,.2);
}


/* ================= NAVBAR ================= */

.navbar {
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
  border-bottom: 1px solid #111827;
  background: rgba(3,4,10,.85);
  backdrop-filter: blur(15px);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.brand {
  font-family: Orbitron, sans-serif;
  font-weight: 800;
  letter-spacing: 2px;
}

.brand-icon {
  color: var(--cyan);
  margin-right: 10px;
  text-shadow: 0 0 15px var(--cyan);
}

.navbar nav {
  display: flex;
  gap: 35px;
}

.navbar nav a {
  text-decoration: none;
  color: #8992a7;
  font-family: Orbitron, sans-serif;
  font-size: 12px;
  transition: .3s;
}

.navbar nav a:hover {
  color: var(--cyan);
  text-shadow: 0 0 15px var(--cyan);
}

.developer {
  font-size: 11px;
  color: var(--green);
  letter-spacing: 2px;
}


/* ================= HERO ================= */

.hero {
  min-height: calc(100vh - 75px);
  position: relative;
  display: flex;
  align-items: center;
  padding: 80px 8%;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,246,255,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,246,255,.035) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: bgMove 12s linear infinite;
}

@keyframes bgMove {
  to {
    background-position: 50px 50px;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 650px;
}

.online {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--green);
  font-family: Orbitron, sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.online span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 15px var(--green);
  animation: blink 1s infinite alternate;
}

.hero-small {
  color: #59647b;
  font-family: Orbitron, sans-serif;
  font-size: 11px;
  letter-spacing: 4px;
  margin-bottom: 15px;
}

.hero h1 {
  font-family: Orbitron, sans-serif;
  font-size: clamp(55px, 9vw, 110px);
  line-height: .85;
  font-weight: 900;
  letter-spacing: -4px;
  text-shadow: 0 0 30px rgba(0,246,255,.15);
}

.hero h1 span {
  display: block;
  color: transparent;
  -webkit-text-stroke: 2px var(--cyan);
  text-shadow: 0 0 30px rgba(0,246,255,.3);
}

.hero p {
  max-width: 500px;
  margin: 30px 0;
  color: #8a94aa;
  font-size: 18px;
  line-height: 1.6;
}

.main-button {
  padding: 16px 25px;
  border: 1px solid var(--cyan);
  background: rgba(0,246,255,.08);
  color: var(--cyan);
  font-family: Orbitron, sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: .3s;
}

.main-button:hover {
  background: var(--cyan);
  color: #02030a;
  box-shadow:
    0 0 20px var(--cyan),
    0 0 60px rgba(0,246,255,.3);
}

.main-button span {
  margin-left: 20px;
}


/* ================= HERO ART ================= */

.hero-art {
  position: absolute;
  right: 5%;
  width: 500px;
  height: 500px;
}

.circle {
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0,246,255,.25);
  border-radius: 50%;
}

.circle-1 {
  width: 200px;
  height: 200px;
  animation: rotate 10s linear infinite;
}

.circle-2 {
  width: 340px;
  height: 340px;
  border-color: rgba(138,44,255,.3);
  animation: rotateReverse 15s linear infinite;
}

.circle-3 {
  width: 470px;
  height: 470px;
  border-color: rgba(255,43,214,.15);
  animation: rotate 25s linear infinite;
}

@keyframes rotate {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotateReverse {
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

.energy-core {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--cyan);
  box-shadow:
    0 0 30px var(--cyan),
    0 0 80px var(--cyan),
    0 0 150px var(--purple);
  animation: corePulse 2s infinite alternate;
}

.core-inner {
  position: absolute;
  width: 45px;
  height: 45px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 30px white;
}

@keyframes corePulse {
  to {
    transform: translate(-50%, -50%) scale(1.15);
  }
}


/* ================= GAME ================= */

.game-section,
.about-section {
  padding: 100px 8%;
}

.section-heading {
  font-family: Orbitron, sans-serif;
  letter-spacing: 3px;
  font-size: 13px;
  color: #8b95aa;
  margin-bottom: 25px;
}

.section-heading span {
  color: var(--cyan);
  margin-right: 10px;
}

.game-panel {
  border: 1px solid #1c2940;
  background: #050711;
  padding: 20px;
  box-shadow:
    0 0 50px rgba(0,246,255,.04),
    inset 0 0 80px rgba(0,0,0,.4);
}

.hud {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px 20px;
}

.hud-item {
  min-width: 150px;
}

.hud-item small {
  display: block;
  color: #56627a;
  font-family: Orbitron, sans-serif;
  font-size: 9px;
  letter-spacing: 2px;
  margin-bottom: 5px;
}

.hud-item strong {
  font-family: Orbitron, sans-serif;
  color: var(--cyan);
  font-size: 22px;
  text-shadow: 0 0 15px rgba(0,246,255,.6);
}

.canvas-wrapper {
  height: 580px;
  position: relative;
  border: 1px solid #172238;
  overflow: hidden;
  background: #02040a;
}

#gameCanvas {
  width: 100%;
  height: 100%;
  display: block;
}

.game-message {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(2,4,10,.72);
  backdrop-filter: blur(4px);
  padding: 20px;
}

.game-message.hidden {
  display: none;
}

.message-icon {
  color: var(--cyan);
  font-size: 30px;
  margin-bottom: 15px;
  animation: rotate 3s linear infinite;
}

.game-message h2 {
  font-family: Orbitron, sans-serif;
  font-size: 38px;
  color: white;
  text-shadow: 0 0 20px var(--cyan);
}

.game-message p {
  max-width: 450px;
  color: #8792aa;
  line-height: 1.5;
  margin: 15px 0 25px;
}

.game-message button {
  padding: 14px 28px;
  background: var(--cyan);
  border: none;
  color: #02030a;
  font-family: Orbitron, sans-serif;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 0 25px rgba(0,246,255,.4);
  transition: .3s;
}

.game-message button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 50px rgba(0,246,255,.7);
}

.controls {
  display: flex;
  justify-content: space-around;
  padding: 20px 10px 5px;
  color: #606b82;
  font-family: Orbitron, sans-serif;
  font-size: 9px;
  letter-spacing: 1px;
  text-align: center;
}

.controls b {
  display: block;
  color: var(--cyan);
  margin-bottom: 5px;
}

.mobile-controls {
  display: none;
  text-align: center;
  margin-top: 20px;
}

.mobile-controls button {
  width: 55px;
  height: 45px;
  margin: 3px;
  border: 1px solid var(--cyan);
  background: #07111d;
  color: var(--cyan);
  font-size: 20px;
}


/* ================= ABOUT ================= */

.about-card {
  position: relative;
  border: 1px solid #1b273b;
  background:
    linear-gradient(
      135deg,
      rgba(0,246,255,.04),
      transparent 40%
    ),
    #060912;
  min-height: 350px;
  display: grid;
  grid-template-columns: 120px 1fr 200px;
  gap: 40px;
  padding: 50px;
  overflow: hidden;
}

.profile-number {
  font-family: Orbitron, sans-serif;
  color: #27354c;
  font-size: 60px;
  font-weight: 900;
}

.profile-label {
  color: var(--cyan);
  font-family: Orbitron, sans-serif;
  font-size: 10px;
  letter-spacing: 3px;
}

.profile-content h2 {
  margin: 15px 0;
  font-family: Orbitron, sans-serif;
  font-size: 50px;
  line-height: .9;
}

.profile-content h2 span {
  color: transparent;
  -webkit-text-stroke: 1px var(--purple);
}

.profile-content p {
  max-width: 550px;
  color: #7b869d;
  line-height: 1.7;
  font-size: 17px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 25px;
}

.skills span {
  border: 1px solid #26344c;
  padding: 7px 12px;
  color: #8c98ae;
  font-family: Orbitron, sans-serif;
  font-size: 9px;
}

.profile-status {
  border-left: 1px solid #1c2940;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.status-circle {
  width: 90px;
  height: 90px;
  border: 1px solid var(--green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
  font-family: Orbitron, sans-serif;
  font-size: 11px;
  box-shadow: 0 0 30px rgba(88,255,155,.15);
  margin-bottom: 25px;
}

.profile-status small {
  color: #58647b;
  font-family: Orbitron, sans-serif;
  font-size: 9px;
  margin-bottom: 10px;
}

.profile-status strong {
  color: var(--cyan);
  font-family: Orbitron, sans-serif;
  font-size: 12px;
  line-height: 1.8;
}


/* ================= FOOTER ================= */

footer {
  border-top: 1px solid #121b2b;
  padding: 30px 8%;
  display: flex;
  justify-content: space-between;
  color: #4d586e;
  font-family: Orbitron, sans-serif;
  font-size: 9px;
  letter-spacing: 1px;
}


/* ================= RESPONSIVE ================= */

@media (max-width: 900px) {

  .developer {
    display: none;
  }

  .hero-art {
    opacity: .25;
    right: -100px;
  }

  .about-card {
    grid-template-columns: 1fr;
  }

  .profile-status {
    border-left: none;
    border-top: 1px solid #1c2940;
    padding: 25px 0 0;
  }

}

@media (max-width: 600px) {

  .navbar {
    padding: 0 20px;
  }

  .navbar nav {
    gap: 15px;
  }

  .brand {
    font-size: 11px;
  }

  .hero {
    padding: 70px 25px;
  }

  .hero-art {
    right: -180px;
  }

  .game-section,
  .about-section {
    padding: 70px 20px;
  }

  .canvas-wrapper {
    height: 480px;
  }

  .hud-item {
    min-width: auto;
  }

  .hud-item strong {
    font-size: 16px;
  }

  .controls {
    display: none;
  }

  .mobile-controls {
    display: block;
  }

  .about-card {
    padding: 30px 25px;
  }

  .profile-number {
    display: none;
  }

  .profile-content h2 {
    font-size: 38px;
  }

  footer {
    flex-direction: column;
    gap: 10px;
  }

}
