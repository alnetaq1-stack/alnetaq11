const WHATSAPP_NUMBER="966532921615";
document.getElementById("year").textContent=new Date().getFullYear();
const select=document.getElementById("serviceSelect");
document.querySelectorAll("[data-service]").forEach(a=>a.addEventListener("click",()=>select.value=a.dataset.service));
document.getElementById("bookingForm").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.currentTarget);const msg=["مرحباً مركز النطاق العربي 6، أرغب في حجز موعد / الاستفسار.","",`الاسم: ${d.get("name")}`,`رقم التواصل: ${d.get("phone")}`,`السيارة: ${d.get("car")}`,`الخدمة: ${d.get("service")}`,`التفاصيل: ${d.get("details")||"لا توجد تفاصيل إضافية"}`].join("\n");window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");});
const menu=document.getElementById("menu"),nav=document.getElementById("nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));

// Balanced scroll reveals: content remains visible if IntersectionObserver is unavailable.
const revealTargets=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target);}
  }),{threshold:0.12,rootMargin:"0px 0px -45px 0px"});
  revealTargets.forEach(el=>revealObserver.observe(el));
}else{revealTargets.forEach(el=>el.classList.add("is-visible"));}

// Hero video controls and respects the visitor's reduced-motion preference.
const heroVideo=document.querySelector(".hero-video");
const motionToggle=document.getElementById("motionToggle");
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
function setMotionPaused(paused){
  if(!heroVideo||!motionToggle)return;
  if(paused){heroVideo.pause();motionToggle.setAttribute("aria-pressed","true");motionToggle.setAttribute("aria-label","تشغيل فيديو الواجهة");motionToggle.innerHTML='تشغيل الحركة <span>▶</span>';}
  else if(!reducedMotion.matches){heroVideo.play().catch(()=>{});motionToggle.setAttribute("aria-pressed","false");motionToggle.setAttribute("aria-label","إيقاف فيديو الواجهة");motionToggle.innerHTML='إيقاف الحركة <span>Ⅱ</span>';}
}
if(reducedMotion.matches){setMotionPaused(true);motionToggle.hidden=true;}
motionToggle?.addEventListener("click",()=>setMotionPaused(motionToggle.getAttribute("aria-pressed")!=="true"));
reducedMotion.addEventListener?.("change",event=>{if(event.matches){setMotionPaused(true);motionToggle.hidden=true;}else{motionToggle.hidden=false;setMotionPaused(false);}});
