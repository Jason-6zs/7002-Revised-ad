(()=>{
'use strict';
const ad=document.getElementById('recruitment-ad'),screen=document.getElementById('ad-screen'),shell=document.querySelector('.app-shell'),transition=document.getElementById('ad-transition');
const soundButton=document.getElementById('ad-sound'),pauseButton=document.getElementById('ad-pause'),music=document.getElementById('ad-music'),phone=document.getElementById('ad-phone'),endCard=document.querySelector('.ad-end-card');
const subtitle=document.getElementById('ad-subtitle'),status=document.getElementById('ad-sound-status'),progress=document.querySelector('.ad-progress'),bar=progress.firstElementChild,person=document.querySelector('.ad-person');
const narration=document.getElementById('ad-voice'),INTRO_DURATION=9.740816,END=46.997393;
const BEATS={"introEnd":9.740816,"business":6.2,"moneyStart":7.9,"moneyEnd":13.673968,"hey":13.673968,"challenge":15.391315,"better":18.163175,"medicine":20.332766,"route":25.914626,"vision":31.872177,"hiring":35.071905,"finalFrom":40.57059,"weMake":42.748527,"onlyIf":44.266804,"you":45.036577,"costumeRussia":41.64814595238096};
let voiceFinished=false,voiceFailed=false;
ad.dataset.voice='ElevenLabs · Niraj · Indian English';
const cues=[
 {at:0,pose:0,caption:'GANGA PHARMACEUTICALS PRESENTS — ATTENTION! HEY, YOU!'},
 {at:BEATS.better,pose:1,caption:'BETTER CALL GANGA!'},
 {at:BEATS.medicine,pose:3,caption:'ONE MEDICINE. A NEW FACTORY. ONE MISSION. — OMEPRAZOLE'},
 {at:BEATS.route,pose:2,caption:'FROM INDIA TO RUSSIA — TAKING OUR EXPERTISE ACROSS BORDERS.'},
 {at:BEATS.vision,pose:2,caption:'TWO COUNTRIES. ONE SHARED MISSION.'},
 {at:BEATS.hiring,pose:4,caption:'WE NEED YOU: RUSSIA PHARMACEUTICAL LOCALIZATION PROJECT MANAGER'},
 {at:BEATS.weMake,pose:5,caption:'WE MAKE IT HAPPEN.'}
];
let openingState=null;
let time=0,last=0,raf=0,scene=-1,muted=true,paused=false,ended=false,running=false,entering=false,hiddenPause=false,runId=0;
function cancelSpeech(){narration.pause();ad.classList.remove('hr-speaking')}
function playNarration(){if(muted||paused||ended)return;const generation=runId;narration.volume=.86;ad.dataset.voiceState='loading';narration.play().then(()=>{if(generation!==runId)return;if(muted||paused||ended){narration.pause();return}ad.dataset.voiceState='speaking';ad.classList.add('hr-speaking');status.textContent='SOUND ON · NIRAJ / INDIAN ENGLISH + MUSIC'}).catch(error=>{if(generation!==runId||((paused||muted||ended)&&error.name==='AbortError'))return;voiceFailed=true;ad.dataset.voiceState='blocked';status.textContent='VOICE PLAYBACK BLOCKED · CLICK PLAY WITH SOUND';soundButton.querySelector('span').textContent='RETRY SOUND'})}
narration.addEventListener('ended',()=>{voiceFinished=true;ad.classList.remove('hr-speaking');ad.dataset.voiceState='complete'});
narration.addEventListener('error',()=>{voiceFailed=true;ad.dataset.voiceState='unavailable';status.textContent='VOICE UNAVAILABLE · SUBTITLES ON'});
const poseSources=['assets/hr-attention.webp','assets/hr-invite.webp','assets/hr-present.webp','assets/hr-medicine.webp','assets/hr-fist.webp','assets/hr-point.webp','assets/hr-business-money.webp','assets/hr-india.webp','assets/hr-russia.webp'];poseSources.forEach(src=>{const picture=new Image();picture.src=src});
function showScene(index){costumeState='';if(index===0)openingState=null;scene=index;ad.dataset.scene=String(index);ad.dataset.pose=String(cues[index].pose);document.getElementById('hr-figure').src=poseSources[cues[index].pose];ad.dataset.punch='false';person.classList.remove('pose-change');void person.offsetWidth;person.classList.add('pose-change');document.querySelectorAll('[data-ad-scene]').forEach(el=>el.hidden=Number(el.dataset.adScene)!==index);subtitle.textContent=cues[index].caption}
function updateOpening(){
 if(scene!==0)return;
 const mode=time<BEATS.business?'intro':time<INTRO_DURATION?'business':time<BEATS.hey?'presents':time<BEATS.challenge?'attention':'challenge';
 if(openingState===mode)return;openingState=mode;
 const business=mode==='business'||mode==='presents';
 document.querySelector('.ad-attention').innerHTML=mode==='intro'?"NAMASTE!<br><em>I'M RAHUL.</em>":business?"LET'S GET<br><em>TO BUSINESS!</em>":'ATTENTION!<br><em>HEY, YOU!</em>';
 document.querySelector('.presents-script').textContent=mode==='intro'?'Your HR manager. Your next chapter.':business?'Indian roots. International ambition.':'A message from HR...';
 const pose=mode==='intro'?1:business?6:0;ad.dataset.pose=String(pose);document.getElementById('hr-figure').src=poseSources[pose];
 subtitle.textContent=mode==='intro'?"NAMASTE! I AM RAHUL — YOUR HR MANAGER AT GANGA PHARMACEUTICALS.":mode==='business'?'NOW… LET US GET DOWN TO BUSINESS!':mode==='presents'?'GANGA PHARMACEUTICALS PRESENTS…':mode==='attention'?'ATTENTION! HEY, YOU!':'LOOKING FOR A BIGGER CHALLENGE?';
}
function updateBusiness(){
 ad.dataset.business=String(scene===0&&time>=BEATS.business&&time<BEATS.hey);
 ad.dataset.money='false';
}
let costumeState='';
function updateCostume(){
 const mode=scene===5&&time>=BEATS.finalFrom?(time<BEATS.costumeRussia?'india':'russia'):'';
 ad.dataset.costume=mode;
 if(mode===costumeState)return;costumeState=mode;
 if(mode){document.getElementById('hr-figure').src=poseSources[mode==='india'?7:8]}
 else if(scene>=0&&scene<cues.length){document.getElementById('hr-figure').src=poseSources[cues[scene].pose];if(scene===0){openingState=null;updateOpening()}}

}
function update(){updateOpening();updateBusiness();updateCostume();ad.dataset.punch=String(scene===6&&time>=BEATS.you);if(scene===5&&time>=BEATS.finalFrom)subtitle.textContent='FROM INDIA TO RUSSIA…';if(scene===6)subtitle.textContent=time>=BEATS.onlyIf?'BUT ONLY IF YOU JOIN US!':'WE MAKE IT HAPPEN.';const percentage=Math.min(100,time/END*100);bar.style.width=percentage+'%';document.getElementById('ad-seek').value=String(Math.min(END,time));document.getElementById('ad-timestamp').textContent='00:'+String(Math.floor(time)).padStart(2,'0');ad.dataset.elapsed=time.toFixed(1)}
document.getElementById('ad-seek').addEventListener('input',e=>{if(ended)return;time=Number(e.target.value);voiceFinished=time>=narration.duration;if(Number.isFinite(narration.duration))narration.currentTime=Math.min(time,narration.duration);if(!muted&&!paused&&!voiceFinished)playNarration();const i=cues.reduce((n,c,k)=>time>=c.at?k:n,0);showScene(i);if(Number.isFinite(music.duration)&&music.duration>0)music.currentTime=time%music.duration;last=0;update();if(time>=END)endFilm()});
let endingTimers=[],snowFrame=0;
const staticSound=document.getElementById('ad-static-sound');
function clearEnding(){endingTimers.forEach(clearTimeout);endingTimers=[];cancelAnimationFrame(snowFrame);snowFrame=0;staticSound.pause();endCard.dataset.phase='rain'}
function scheduleEnding(delay,action){const generation=runId;endingTimers.push(setTimeout(()=>{if(generation===runId&&!ad.hidden&&!entering)action()},delay))}
function createPaperStorm(){const holder=endCard.querySelector('.paper-storm');holder.replaceChildren();const cols=innerWidth<700?3:6,paperHeight=innerWidth/cols*1.65*464/768,rows=Math.min(16,Math.ceil(innerHeight/(paperHeight*.65))+1);for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){const i=row*cols+col,paper=document.createElement('div');paper.className='falling-flyer';const rand=n=>Math.sin((i+3)*n)*.5+.5;paper.style.setProperty('--x',`${col*100/cols-9+(rand(9.3)-.5)*8}vw`);paper.style.setProperty('--y',`${row*100/rows-7+(rand(3.4)-.5)*7}vh`);paper.style.setProperty('--w',`${100/cols*1.65}vw`);paper.style.setProperty('--r',`${(rand(1.7)-.5)*38}deg`);paper.style.setProperty('--wind',`${(rand(6.2)-.5)*45}vw`);paper.style.setProperty('--delay',`${.015*i+rand(3.2)*.7}s`);paper.style.setProperty('--duration',`${.8+rand(4.8)*.5}s`);const picture=document.createElement('img');picture.src=endCard.querySelector('.lens-flyer img').src;picture.alt='';paper.append(picture);holder.append(paper)}const width=Math.min(innerWidth*.9,1200),height=width*464/768;endCard.style.setProperty('--lens-scale',String(Math.max(innerWidth/width,innerHeight/height)*1.2))}
function startSnow(){
 endCard.dataset.phase='snow';phone.pause();
 const canvas=document.getElementById('tv-static'),ctx=canvas.getContext('2d',{alpha:false});
 const w=Math.min(960,Math.max(480,innerWidth)),h=Math.min(1200,Math.round(w*innerHeight/innerWidth));canvas.width=w;canvas.height=h;
 const frameData=ctx.createImageData(w,h),pixels=new Uint32Array(frameData.data.buffer),ghost=endCard.querySelector('.lens-flyer img');
 let seed=(Math.random()*4294967295)>>>0,lastPaint=0,start=performance.now(),count=0;
 function draw(now){if(endCard.dataset.phase!=='snow')return;
  if(now-lastPaint>38){const t=(now-start)/1000,roll=((t*.61+.3)%1)*h;
   for(let y=0;y<h;y++){const band=Math.abs(y-roll)<h*.045?24:0,line=(y%3===0?-24:0)+Math.sin(y*.16+t*25)*10;
    for(let x=0;x<w;x++){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;let v=(seed>>>24)+line+band;v=Math.max(0,Math.min(255,v));pixels[y*w+x]=(255<<24)|(v<<16)|(v<<8)|v}}
   ctx.putImageData(frameData,0,0);
   // Brief traces of the advertisement, like an analogue receiver losing lock.
   if((t<.32||count%19===0)&&ghost.complete){ctx.globalAlpha=t<.32?.18:.065;ctx.globalCompositeOperation='screen';const iw=Math.max(w,h*ghost.naturalWidth/ghost.naturalHeight),ih=iw*ghost.naturalHeight/ghost.naturalWidth;ctx.drawImage(ghost,(w-iw)/2+Math.sin(t*60)*24,(h-ih)/2,iw,ih);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'}
   const tearY=Math.floor(((t*.83+.1)%1)*h),tearH=Math.max(3,Math.floor(h*.018));ctx.drawImage(canvas,0,tearY,w,tearH,Math.sin(t*47)*w*.1,tearY,w,tearH);
   ctx.fillStyle='rgba(8,10,9,.42)';ctx.fillRect(0,roll,w,Math.max(2,h*.008));ctx.fillStyle='rgba(233,241,226,.16)';ctx.fillRect(0,(roll+h*.045)%h,w,h*.012);
   lastPaint=now;count++;
  }snowFrame=requestAnimationFrame(draw)
 }draw(start);
 if(!muted){staticSound.volume=.38;staticSound.currentTime=0;staticSound.play().catch(()=>{})}
}
function showPoster(){endingTimers.forEach(clearTimeout);endingTimers=[];cancelAnimationFrame(snowFrame);phone.pause();staticSound.pause();endCard.dataset.phase='poster';ad.dataset.scene='final-poster';document.getElementById('ad-enter-site').focus({preventScroll:true});window.dispatchEvent(new CustomEvent('ganga:ending-ready',{detail:{muted}}))}
function beginEnding(){clearEnding();createPaperStorm();endCard.hidden=false;endCard.dataset.phase='rain';ad.dataset.scene='paper-rain';ringPhone();if(matchMedia('(prefers-reduced-motion: reduce)').matches){showPoster();return}scheduleEnding(2300,()=>{endCard.dataset.phase='lens';ad.dataset.scene='lens-flyer'});scheduleEnding(4150,()=>{ad.dataset.scene='tv-snow';startSnow()});scheduleEnding(5000,()=>{endCard.dataset.phase='off';ad.dataset.scene='tv-off';cancelAnimationFrame(snowFrame);staticSound.pause()});scheduleEnding(5170,showPoster)}
document.getElementById('ending-skip').addEventListener('click',showPoster);
window.addEventListener('resize',()=>{if(ended&&!ad.hidden&&['rain','lens'].includes(endCard.dataset.phase))createPaperStorm()});

function stopMedia(){music.pause();phone.pause();staticSound.pause();cancelSpeech()}
function ringPhone(){phone.volume=.85;phone.currentTime=0;if(!muted)phone.play().catch(()=>{ad.dataset.ringState='blocked'});ad.dataset.ringState=muted?'muted':'playing';document.getElementById('flyer-sound').textContent=muted?'◖)) SOUND OFF':'◖)) SOUND ON'}
function endFilm(){if(ended)return;ended=true;running=false;paused=false;ad.classList.remove('is-paused');cancelAnimationFrame(raf);stopMedia();time=END;update();document.querySelectorAll('[data-ad-scene]').forEach(el=>el.hidden=true);subtitle.hidden=true;pauseButton.disabled=true;ad.classList.add('is-ended');document.getElementById('ad-duration').textContent='YOUR MISSION IS CALLING';beginEnding()}
function frame(now){if(!running)return;if(!last)last=now;if(!paused&&!document.hidden){if(!muted&&!voiceFailed&&!voiceFinished){time=narration.currentTime}else{time+=Math.min((now-last)/1000,.1)}const i=cues.reduce((active,cue,index)=>time>=cue.at?index:active,0);if(i!==scene)showScene(i);update();if(time>=END&&(muted||voiceFinished||voiceFailed)){endFilm();return}}last=now;raf=requestAnimationFrame(frame)}
function unlockPhone(){phone.volume=0;const id=runId;phone.play().then(()=>{if(id!==runId||ended)return;phone.pause();phone.currentTime=0;phone.volume=.85}).catch(()=>{})}
function playMusic(){const generation=runId;music.volume=.45;music.currentTime=0;music.play().catch(error=>{if(generation!==runId||error.name==='AbortError')return;status.textContent='VOICEOVER + SUBTITLES · MUSIC PLAYBACK UNAVAILABLE'})}
function startFilm(withSound= !muted){window.dispatchEvent(new Event('ganga:film-start'));clearEnding();runId++;screen.scrollTop=0;entering=false;stopMedia();cancelAnimationFrame(raf);muted=!withSound;time=0;last=0;scene=-1;ended=false;paused=false;running=true;voiceFinished=false;voiceFailed=false;narration.currentTime=0;transition.hidden=true;ad.hidden=false;shell.hidden=true;shell.inert=true;shell.setAttribute('aria-hidden','true');endCard.hidden=true;subtitle.hidden=false;ad.classList.remove('is-paused','is-ended');screen.classList.remove('is-black');ad.dataset.punch='false';pauseButton.disabled=false;pauseButton.setAttribute('aria-pressed','false');pauseButton.setAttribute('aria-label','Pause advertisement');pauseButton.textContent='Ⅱ';soundButton.setAttribute('aria-pressed',String(!muted));soundButton.querySelector('span').textContent=muted?'PLAY WITH SOUND':'SOUND ON';status.textContent=muted?'MUTED PREVIEW · CLICK PLAY WITH SOUND FOR VOICE & MUSIC':'SOUND ON · NIRAJ / INDIAN ENGLISH + MUSIC';document.getElementById('ad-duration').textContent='RECRUITMENT FILM / 00:'+String(Math.ceil(END)).padStart(2,'0');showScene(0);if(!muted){unlockPhone();playMusic();playNarration()}update();raf=requestAnimationFrame(frame)}
function setPaused(value){if(ended)return;paused=value;ad.classList.toggle('is-paused',paused);pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.setAttribute('aria-label',paused?'Resume advertisement':'Pause advertisement');pauseButton.textContent=paused?'▶':'Ⅱ';if(paused){music.pause();narration.pause()}else{if(!muted)music.play().catch(()=>{});if(!muted&&!voiceFinished)playNarration();last=0}}
function openWebsite(guide=false){if(entering)return;clearEnding();entering=true;running=false;cancelAnimationFrame(raf);stopMedia();transition.hidden=false;ad.hidden=true;try{sessionStorage.setItem('ganga-ad-completed','1')}catch{}location.hash='home';setTimeout(()=>{shell.hidden=false;shell.inert=false;shell.removeAttribute('aria-hidden');transition.hidden=true;document.querySelector('[data-page="home"]').focus({preventScroll:true});window.dispatchEvent(new CustomEvent('ganga:website-ready',{detail:{guide,muted}}))},650)}
soundButton.addEventListener('click',()=>{if(muted||voiceFailed){startFilm(true)}else{muted=true;stopMedia();soundButton.setAttribute('aria-pressed','false');soundButton.querySelector('span').textContent='PLAY WITH SOUND';status.textContent='MUTED PREVIEW · SUBTITLES ON';}});
document.getElementById('flyer-sound').addEventListener('click',()=>{muted=!muted;if(muted){phone.pause();ad.dataset.ringState='muted';document.getElementById('flyer-sound').textContent='◖)) SOUND OFF'}else ringPhone()});
phone.addEventListener('ended',()=>ad.dataset.ringState='ended');pauseButton.addEventListener('click',()=>setPaused(!paused));document.getElementById('ad-enter-site').addEventListener('click',e=>{e.preventDefault();openWebsite(true)});document.getElementById('ad-skip').addEventListener('click',()=>openWebsite(false));document.getElementById('ad-rewatch').addEventListener('click',()=>startFilm(!muted));document.querySelectorAll('[data-replay-ad]').forEach(b=>b.addEventListener('click',()=>{startFilm(!muted);soundButton.focus({preventScroll:true})}));
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(ended)phone.pause();if(running&&!paused){hiddenPause=true;setPaused(true)}}else if(hiddenPause){hiddenPause=false;setPaused(false)}});window.addEventListener('pagehide',()=>{clearEnding();running=false;cancelAnimationFrame(raf);stopMedia()});
let completed=false;try{completed=sessionStorage.getItem('ganga-ad-completed')==='1'}catch{}if(completed&&!new URLSearchParams(location.search).has('intro')){ad.hidden=true;shell.hidden=false;shell.inert=false;shell.removeAttribute('aria-hidden')}else startFilm(false);
})();
