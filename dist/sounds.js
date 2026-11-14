'use strict';
// Short, locally synthesized cues. No audio downloads, microphone or autoplay.
(()=>{
  const preferenceKey='daywell-sound-enabled';
  let enabled=true,context=null,master=null,lastCue=-Infinity;
  try{enabled=localStorage.getItem(preferenceKey)!=='off'}catch{}
  const cues={
    click:[[660,0,.045,.13],[880,.025,.05,.08]],
    success:[[523.25,0,.12,.22],[659.25,.075,.12,.20],[783.99,.15,.2,.18]],
    meal:[[587.33,0,.1,.18],[739.99,.08,.15,.17],[880,.17,.17,.13]],
    buddy:[[440,0,.09,.18,620],[660,.09,.11,.14,820]],
    water:[[940,0,.09,.15,460],[1160,.075,.12,.10,580]],
    pick:[[392,0,.07,.15],[493.88,.065,.07,.14],[587.33,.13,.13,.15]],
    save:[[659.25,0,.09,.16],[880,.08,.15,.13]]
  };
  function unlock(){
    if(!enabled)return null;
    try{
      if(!context){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;context=new Audio();master=context.createGain();master.gain.value=.16;master.connect(context.destination)}
      if(context.state==='suspended')context.resume().catch(()=>{});
      return context;
    }catch{return null}
  }
  function play(kind='click'){
    if(!enabled||document.hidden)return;
    const ctx=unlock();if(!ctx||ctx.state!=='running')return;
    // Collapse rapid repeated presses; cues never build an unbounded queue.
    const now=ctx.currentTime;if(now-lastCue<.075)return;lastCue=now;
    try{for(const [frequency,offset,duration,volume,finish] of cues[kind]||cues.click){
      const oscillator=ctx.createOscillator(),gain=ctx.createGain(),start=now+offset;
      oscillator.type=kind==='buddy'?'sine':'triangle';
      oscillator.frequency.setValueAtTime(frequency,start);
      if(finish)oscillator.frequency.exponentialRampToValueAtTime(finish,start+duration);
      gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.008);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
      oscillator.connect(gain);gain.connect(master);
      oscillator.onended=()=>{oscillator.disconnect();gain.disconnect()};oscillator.start(start);oscillator.stop(start+duration+.015);
    }}catch{}
  }
  const toggle=document.querySelector('#sound-toggle');
  function update(){toggle.textContent=enabled?'♪ 音效：开':'♪ 音效：关';toggle.setAttribute('aria-pressed',String(enabled));toggle.setAttribute('aria-label',enabled?'关闭音效':'开启音效');toggle.title=enabled?'关闭轻柔互动音效':'开启轻柔互动音效'}
  toggle.addEventListener('click',()=>{
    enabled=!enabled;if(master&&context)master.gain.setValueAtTime(enabled ? .16 : 0,context.currentTime);
    try{localStorage.setItem(preferenceKey,enabled?'on':'off')}catch{}
    update();if(enabled){unlock();play('click')}
  });
  document.addEventListener('pointerdown',unlock,{capture:true,passive:true});
  document.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')unlock()},{capture:true});
  document.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(!button||button.disabled||(button.type==='submit'&&button.form)||button.matches('#sound-toggle,.mascot-touch,#buddy-chat,#buddy-show,#buddy-food,#water-add,#pick-meal'))return;
    play('click');
  },true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&context?.state==='running')context.suspend().catch(()=>{})});
  window.daywellSounds={play};update();
})();
