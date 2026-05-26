const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let activeNodes = [];

export const playChime = (type) => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  // Anti-Spam: Instantly kill any currently playing sound effects
  activeNodes.forEach(node => {
    try { node.stop(); node.disconnect(); } catch (e) { }
  });
  activeNodes = [];

  const playTone = (freq, startTime, duration, waveType = 'sine') => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Smooth envelope to make it sound like a bell/marimba (no harsh clicks)
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.4, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
    
    activeNodes.push(osc);
  };

  const now = audioCtx.currentTime;

  if (type === 'correct') {
    // Pleasant, bright "Ding-Ding" (C5 -> E5)
    playTone(523.25, now, 0.4); 
    playTone(659.25, now + 0.12, 0.6); 
  } else {
    // Soft, dull "Bloop" (Low F)
    playTone(174.61, now, 0.3, 'sine');
  }
};