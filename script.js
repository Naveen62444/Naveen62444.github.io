const menuButton=document.querySelector('.menu-toggle'),navLinks=document.querySelector('.nav-links');if(menuButton&&navLinks)menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});const currentPage=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-links a').forEach(a=>{if(a.getAttribute('href')===currentPage)a.classList.add('active')});const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.brand-expand').forEach(brand=>{const target=brand.querySelector('.typed-name');if(!target)return;const text=target.dataset.text||'Naveen Pilla';let timer,run=0;const reset=()=>{run++;clearTimeout(timer);target.textContent='';brand.classList.remove('typing','typed')};const type=()=>{reset();const id=run;brand.classList.add('typing');if(reduceMotion){target.textContent=text;brand.classList.remove('typing');brand.classList.add('typed');return}let i=0;const tick=()=>{if(id!==run)return;target.textContent=text.slice(0,++i);if(i<text.length)timer=setTimeout(tick,text[i-1]===' '?90:72);else{brand.classList.remove('typing');brand.classList.add('typed')}};timer=setTimeout(tick,90)};brand.addEventListener('mouseenter',type);brand.addEventListener('mouseleave',reset);brand.addEventListener('focus',type);brand.addEventListener('blur',reset)});

(()=>{const canvas=document.getElementById('matrix-bg');if(!canvas||reduceMotion)return;const ctx=canvas.getContext('2d'),glyphs='01<>[]{}();:/\\+=-*#AI',fontSize=16;let drops=[],last=0;function resize(){const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.floor(innerWidth*dpr);canvas.height=Math.floor(innerHeight*dpr);canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(dpr,0,0,dpr,0,0);drops=Array.from({length:Math.ceil(innerWidth/fontSize)},()=>Math.random()*-70)}function draw(t){if(t-last>62){ctx.fillStyle='rgba(5,11,18,.13)';ctx.fillRect(0,0,innerWidth,innerHeight);ctx.font=`${fontSize}px ui-monospace,monospace`;drops.forEach((d,i)=>{const ch=glyphs[Math.floor(Math.random()*glyphs.length)],y=d*fontSize;ctx.fillStyle=Math.random()>.95?'rgba(205,255,242,.48)':'rgba(87,230,194,.16)';ctx.fillText(ch,i*fontSize,y);if(y>innerHeight+60&&Math.random()>.975)drops[i]=Math.random()*-25;else drops[i]+=.46});last=t}requestAnimationFrame(draw)}resize();addEventListener('resize',resize,{passive:true});requestAnimationFrame(draw)})();

const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible','matrix-visible');revealObserver.unobserve(e.target)}}),{threshold:.06});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const meterObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const card=e.target;card.querySelectorAll('.meter').forEach(m=>m.style.setProperty('--meter-level',`${m.dataset.level||0}%`));card.classList.add('meters-active');meterObserver.unobserve(card)}}),{threshold:.15});document.querySelectorAll('.meter-card').forEach(c=>meterObserver.observe(c));
const selectable=document.querySelectorAll('.card,.focus,.feature,.skill,.experience,.edu,.cert-card,.empty,.meter-card');selectable.forEach(el=>el.addEventListener('click',()=>{selectable.forEach(x=>x.classList.remove('is-selected'));el.classList.add('is-selected')}));

if(!reduceMotion){const selector='h1,h2,h3,h4,p:not(.eyebrow):not(.open),li,.meter-label b,.meter-label span,.links b';function prepare(section){if(section.dataset.prepared)return;section.dataset.prepared='1';section.querySelectorAll(selector).forEach(el=>{if(!el.closest('.nav')&&!el.closest('.brand-expand')&&el.textContent.trim())el.dataset.originalText=el.textContent})}function type(el){if(el.dataset.typed)return;el.dataset.typed='1';const text=el.dataset.originalText||el.textContent;el.textContent='';el.style.visibility='visible';el.classList.add('terminal-typing');let i=0;const heading=/^H[1-4]$/.test(el.tagName),chunk=heading?1:text.length>150?3:text.length>90?2:1,base=heading?44:text.length>150?14:text.length>90?18:text.length>50?24:32;const tick=()=>{el.textContent+=text.slice(i,i+chunk);i+=chunk;if(i<text.length){const ch=text[Math.max(0,i-1)],delay=/[.!?]/.test(ch)?105:/[,;:]/.test(ch)?60:base;setTimeout(tick,delay)}else{el.classList.remove('terminal-typing');el.classList.add('terminal-typed')}};setTimeout(tick,80)}function start(section){if(section.dataset.started)return;section.dataset.started='1';prepare(section);[...section.querySelectorAll(selector)].filter(el=>el.dataset.originalText).forEach((el,i)=>setTimeout(()=>type(el),Math.min(i*70,420)))}const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){start(e.target);observer.unobserve(e.target)}}),{threshold:0});document.querySelectorAll('main>section').forEach(sec=>{prepare(sec);observer.observe(sec)})}


// Matrix portal entry screen - click, Enter/Space, or intentional scroll to enter.
(() => {
  const intro=document.getElementById('portal-intro');
  if(!intro) return;
  const canvas=document.getElementById('portal-canvas'),ctx=canvas.getContext('2d');
  const button=document.getElementById('portal-enter');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished=false,raf,last=0,drops=[],font=17;
  document.body.classList.add('portal-locked');

  function resize(){
    const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(dpr,0,0,dpr,0,0);drops=Array.from({length:Math.ceil(innerWidth/font)},()=>Math.random()*-70)
  }
  function rain(t){
    if(t-last>48){ctx.fillStyle='rgba(2,6,9,.13)';ctx.fillRect(0,0,innerWidth,innerHeight);ctx.font=`${font}px ui-monospace,monospace`;const glyphs='01<>[]{}:/\\+=#AI';drops.forEach((d,i)=>{const y=d*font;ctx.fillStyle=Math.random()>.94?'rgba(220,255,246,.7)':'rgba(87,230,194,.3)';ctx.fillText(glyphs[Math.floor(Math.random()*glyphs.length)],i*font,y);drops[i]=(y>innerHeight+50&&Math.random()>.97)?Math.random()*-25:d+.72});last=t}raf=requestAnimationFrame(rain)
  }
  resize();if(!reduce)raf=requestAnimationFrame(rain);

  function enter(){
    if(!intro.classList.contains('cmd-ready')) return;
    if(finished)return;finished=true;intro.classList.add('entering');document.body.classList.remove('portal-locked');cancelAnimationFrame(raf);setTimeout(()=>{intro.classList.add('is-gone');intro.remove();window.scrollTo({top:0,behavior:'auto'})},reduce?50:1450)
  }
  button?.addEventListener('click',enter);
  window.addEventListener('keydown',e=>{if(!intro.classList.contains('cmd-ready')) return;if(e.key==='Enter'||e.key===' '){e.preventDefault();enter()}},{once:false});
  let wheelTotal=0;window.addEventListener('wheel',e=>{if(!intro.classList.contains('cmd-ready')||finished)return;wheelTotal+=Math.abs(e.deltaY);if(wheelTotal>55)enter()},{passive:true});
  let touchY=null;intro.addEventListener('touchstart',e=>{touchY=e.touches[0].clientY},{passive:true});intro.addEventListener('touchmove',e=>{if(!intro.classList.contains('cmd-ready')) return;if(touchY!==null&&Math.abs(e.touches[0].clientY-touchY)>35)enter()},{passive:true});
  window.addEventListener('resize',resize,{passive:true});
  setTimeout(()=>button?.focus({preventScroll:true}),180);
})();


// Fictional warning sequence. Uses localhost placeholder only; never reads the visitor's real IP/network details.
(() => {
  const intro=document.getElementById('portal-intro');
  if(!intro) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){intro.classList.add('matrix-awake');return;}
  setTimeout(()=>intro.classList.add('matrix-awake'),3450);
})();

(()=>{
  const box=document.getElementById('cmd-intro'),out=document.getElementById('cmd-output'),prompt=document.getElementById('cmd-prompt'),answer=document.getElementById('cmd-answer'),intro=document.getElementById('portal-intro');
  if(!box||!out||!intro)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){box.remove();intro.classList.add('cmd-ready');return;}

  // Real browser clock/timezone only. IP and location below are intentionally fictional demo values.
  const now=new Date();
  const browserTime=now.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'});
  const timeZone=Intl.DateTimeFormat().resolvedOptions().timeZone||'Local/Browser';
  const demoIp=`203.0.113.${Math.floor(10+Math.random()*180)}`; // IANA TEST-NET-3, never a visitor IP.
  const demoLocation='SECTOR-LDN-404 [SIMULATED]';
  const lines=[
    ['C:\\> connection_diagnostic.exe --deep-scan',''],
    ['[BOOT] Recovery console loaded','dim'],
    [`[TIME] Browser clock: ${browserTime}`,''],
    [`[TIME] Browser timezone: ${timeZone}`,''],
    ['[NET] Checking internet speed ........ 9999 Mbps*','ok'],
    ['[NET] Testing packet stability ....... suspiciously perfect','warn'],
    [`[IP] Checking IP address ............. ${demoIp}`,'warn'],
    [`[GEO] Tracking location .............. ${demoLocation}`,'warn'],
    ['[SYS] Downloading system files ....... 12%',''],
    ['[SYS] Downloading system files ....... 48%',''],
    ['[SYS] Downloading system files ....... 99%',''],
    ['[ERROR] download failed: common_sense.dll missing','err'],
    ['[RETRY] Reinstalling common_sense.dll','warn'],
    ['[ERROR] reinstall failed: user is too curious','err'],
    ['[TASK] Installing virus.exe ..........','err'],
    ['[ERROR] virus.exe refused to run: portfolio too secure','err'],
    ['[TASK] Uploading embarrassing browser history ...','warn'],
    ['[ERROR] no embarrassing history found. Impressive.','err'],
    ['[SCAN] Searching Downloads folder for final_final_v7_REAL.zip',''],
    ['[FOUND] 37 copies detected. Developer status confirmed.','ok'],
    ['[WARN] Keyboard activity detected','warn'],
    ['[WARN] Viewer appears to be reading this line','warn'],
    ['[PATCH] Installing courage_update_v2.0',''],
    ['[OK] courage_update_v2.0 installed successfully','ok'],
    ['[READY] Secure portfolio gateway available','ok'],
    ['',''],
    ['NOTICE: cinematic simulation only. No real IP, location, files or browsing data are accessed.','dim']
  ];
  let li=0;
  const mistakes={
    '[NET] Checking internet speed ........ 9999 Mbps*': '[NET] Checking internet speeed ........ 9999 Mbps*',
    '[IP] Checking IP address ............. 203.0.113.': null,
    '[SYS] Downloading system files ....... 48%': '[SYS] Downloading systm files ....... 48%',
    '[TASK] Installing virus.exe ..........': '[TASK] Instaling virus.exe ..........',
    '[PATCH] Installing courage_update_v2.0': '[PATCH] Installng courage_update_v2.0'
  };
  function typeWithCorrection(span,target,done){
    let wrong=mistakes[target];
    // Demo IP line is dynamic, so synthesize its typo from its real target string.
    if(target.startsWith('[IP] Checking IP address')) wrong=target.replace('address','adress');
    const first=wrong||target;
    let i=0;
    const forwardSpeed=target.length>72?5:target.length>42?7:11;
    const typeForward=()=>{
      span.textContent=first.slice(0,++i);
      if(i<first.length){setTimeout(typeForward,forwardSpeed);return;}
      if(!wrong){done();return;}
      setTimeout(()=>eraseToDifference(span,wrong,target,done),210);
    };
    typeForward();
  }
  function eraseToDifference(span,wrong,target,done){
    let common=0;while(common<wrong.length&&common<target.length&&wrong[common]===target[common])common++;
    let shown=wrong;
    const erase=()=>{
      if(shown.length>common){shown=shown.slice(0,-1);span.textContent=shown;setTimeout(erase,24);}
      else setTimeout(()=>rewrite(),90);
    };
    let j=common;
    const rewrite=()=>{
      span.textContent=target.slice(0,++j);
      if(j<target.length)setTimeout(rewrite,9);else done();
    };
    erase();
  }
  function addLine(){
    if(li>=lines.length){prompt.hidden=false;const help=document.createElement('div');help.className='startup-help';help.textContent='Type Y or N on your keyboard. Enter / Space / Scroll are locked until Y is accepted.';prompt.after(help);return;}
    const [text,cls]=lines[li++],span=document.createElement('span');
    span.className='cmd-line '+cls+' is-typing';out.appendChild(span);
    const finish=()=>{span.classList.remove('is-typing');span.classList.add('is-finished');setTimeout(addLine,text===''?45:75);};
    typeWithCorrection(span,text,finish);
  }
  setTimeout(addLine,240);

  function appendResponse(text,cls){const line=document.createElement('span');line.className='cmd-line '+cls;line.textContent=text;out.appendChild(line);line.scrollIntoView({block:'nearest'});}
  function key(e){
    if(prompt.hidden)return;
    const k=e.key.toLowerCase();if(k!=='y'&&k!=='n')return;e.preventDefault();answer.textContent=k.toUpperCase();
    if(k==='n'){
      appendResponse('[ACCESS DENIED] A bold choice. Unfortunately, this terminal only accepts courage.','err');
      setTimeout(()=>appendResponse('[SYSTEM] Please type Y before the fake virus gets bored.','warn'),300);
      setTimeout(()=>{answer.textContent='';},900);
    }else{
      removeEventListener('keydown',key);
      appendResponse('[ACCESS GRANTED] Excellent decision. Loading portfolio...','ok');
      setTimeout(()=>{box.classList.add('done');intro.classList.add('cmd-ready');setTimeout(()=>document.getElementById('portal-enter')?.focus({preventScroll:true}),520);},520);
    }
  }
  addEventListener('keydown',key);
})();
