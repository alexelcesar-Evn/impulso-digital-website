import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ChevronRight, ChevronUp, ChevronDown, Globe2, Hand, Mail, MonitorSmartphone, Mouse, Phone, MapPin,
  Sparkles, ShieldCheck, Clock3, UsersRound, BadgeCheck, Layers3, Rocket,
  Search, Palette, Code2, Send, BarChart3, Wrench, Share2, Image, Building2
} from 'lucide-react';
import './styles.css';

const sectionsEs = [
  { id: 'inicio', label: 'INICIO', Icon: Sparkles },
  { id: 'beneficios', label: '¿POR QUÉ UNA WEBSITE?', Icon: ShieldCheck },
  { id: 'paquetes', label: 'PAQUETES', Icon: Layers3 },
  { id: 'portafolio', label: 'PROYECTOS', Icon: MonitorSmartphone },
  { id: 'proceso', label: 'PROCESO', Icon: Rocket },
  { id: 'contacto', label: 'COTIZACIÓN', Icon: Mail },
];

const sectionsEn = [
  { id: 'inicio', label: 'HOME', Icon: Sparkles },
  { id: 'beneficios', label: 'WHY A WEBSITE?', Icon: ShieldCheck },
  { id: 'paquetes', label: 'PACKAGES', Icon: Layers3 },
  { id: 'portafolio', label: 'PROJECTS', Icon: MonitorSmartphone },
  { id: 'proceso', label: 'PROCESS', Icon: Rocket },
  { id: 'contacto', label: 'QUOTE', Icon: Mail },
];

const contentEs = {
  inicio: {
    kicker: 'WEBSITES PERSONALIZADAS PARA NEGOCIOS LOCALES',
    title: <>HAZ QUE TU NEGOCIO<br /><b>INSPIRE CONFIANZA</b><br />DESDE EL PRIMER CLIC.</>,
    description: <>Creamos websites modernas y únicas que reflejan la identidad de tu negocio y ayudan a convertir visitas en nuevos clientes.</>,
  },
  beneficios: {
    kicker: 'PRIMERA IMPRESIÓN DIGITAL',
    title: <>NO ES SOLO VERSE BIEN.<br />ES <b>INSPIRAR CONFIANZA.</b></>,
    description: <>Tu website trabaja por tu negocio todos los días: explica lo que haces, presenta tu valor y facilita que nuevos clientes den el siguiente paso.</>,
  },
  paquetes: {
    kicker: 'DOS FORMAS DE COMENZAR',
    title: <>ELIGE LA WEBSITE<br />QUE TU NEGOCIO <b>NECESITA.</b></>,
    description: <>Dos paquetes claros, sin complicaciones. Empezamos con lo necesario y dejamos espacio para crecer contigo.</>,
  },
  portafolio: {
    kicker: 'PROYECTOS Y CONCEPTOS',
    title: <>DISEÑOS QUE HACEN<br />QUE UN NEGOCIO <b>DESTAQUE.</b></>,
    description: <>Cada proyecto se diseña alrededor de la identidad, el cliente y la forma de vender de cada negocio. No usamos una fórmula genérica.</>,
  },
  proceso: {
    kicker: 'UN PROCESO CLARO',
    title: <>DE TU IDEA<br />A UNA WEBSITE <b>PUBLICADA.</b></>,
    description: <>Te guiamos paso a paso. Primero entendemos tu negocio, luego diseñamos, desarrollamos y publicamos una experiencia lista para recibir clientes.</>,
  },
  contacto: {
    kicker: 'EMPECEMOS TU PROYECTO',
    title: <>DALE A TU NEGOCIO<br />LA PRESENCIA QUE <b>MERECE.</b></>,
    description: <>Cuéntanos qué haces y qué necesitas. Te ayudaremos a elegir el paquete correcto o a preparar una solución personalizada.</>,
  },
};

const contentEn = {
  inicio: { kicker: 'CUSTOM WEBSITES FOR LOCAL BUSINESSES', title: <>MAKE YOUR BUSINESS<br /><b>INSPIRE TRUST</b><br />FROM THE FIRST CLICK.</>, description: <>We create modern, unique websites that reflect your business identity and help turn visitors into new customers.</> },
  beneficios: { kicker: 'YOUR DIGITAL FIRST IMPRESSION', title: <>IT IS NOT JUST ABOUT LOOKING GOOD.<br />IT IS ABOUT <b>INSPIRING TRUST.</b></>, description: <>Your website works for your business every day: it explains what you do, presents your value, and makes it easier for new customers to take the next step.</> },
  paquetes: { kicker: 'TWO WAYS TO GET STARTED', title: <>CHOOSE THE WEBSITE<br />YOUR BUSINESS <b>NEEDS.</b></>, description: <>Two clear packages without complications. We begin with what you need now and leave room to grow with you.</> },
  portafolio: { kicker: 'PROJECTS AND CONCEPTS', title: <>DESIGNS THAT HELP<br />A BUSINESS <b>STAND OUT.</b></>, description: <>Every project is designed around the identity, customer, and sales process of each business. We do not use a generic formula.</> },
  proceso: { kicker: 'A CLEAR PROCESS', title: <>FROM YOUR IDEA<br />TO A <b>LIVE WEBSITE.</b></>, description: <>We guide you step by step. First we understand your business, then we design, develop, and launch an experience ready to receive customers.</> },
  contacto: { kicker: 'LET US START YOUR PROJECT', title: <>GIVE YOUR BUSINESS<br />THE PRESENCE IT <b>DESERVES.</b></>, description: <>Tell us what you do and what you need. We will help you choose the right package or prepare a custom solution.</> },
};

function Brand({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}>
    <div className="brand-glyph"><i /><b /><em /></div>
    <div><strong>IMPULSO</strong><span>DIGITAL</span></div>
  </div>;
}

function Header({ mobilePreview, onToggleMobile, lang, onLanguage, isMobileDevice, desktopMode, onToggleDesktop }) {
  return <header className="topbar">
    <Brand compact />
    <div className="utility-buttons" aria-label={lang === 'es' ? 'Opciones rápidas' : 'Quick options'}>
      <button type="button" className={lang === 'es' ? 'is-active' : ''} onClick={() => onLanguage('es')}>ES</button><button type="button" className={lang === 'en' ? 'is-active' : ''} onClick={() => onLanguage('en')}>EN</button>
      {isMobileDevice ? <button type="button" className={`desktop-mode ${desktopMode ? 'is-active' : ''}`} onClick={onToggleDesktop}>{desktopMode ? (lang === 'es' ? 'VERSIÓN CELULAR' : 'MOBILE VERSION') : (lang === 'es' ? 'VERSIÓN DESKTOP' : 'DESKTOP VERSION')}</button> : <button type="button" className={`mobile-mode ${mobilePreview ? 'is-active' : ''}`} onClick={onToggleMobile}>{lang === 'es' ? 'VERSIÓN CELULAR' : 'MOBILE VERSION'}</button>}
    </div>
  </header>;
}

function WheelItem({ section, index, active, wheelRotation, onSelect }) {
  const counterRotation = useTransform(wheelRotation, value => -value);
  const itemAngle = -72 + index * 36;
  const { id, label, Icon } = section;
  return <button className={`wheel-item ${id === active ? 'active' : ''}`} style={{ transform: `rotate(${itemAngle}deg) translateX(355px) rotate(${-itemAngle}deg)` }} onPointerDown={e => e.stopPropagation()} onClick={() => onSelect(index)}>
    <motion.span className="wheel-item-inner" style={{ rotate: counterRotation }}><Icon /><span>{label}</span>{id === active && <ChevronRight className="active-chevron" />}</motion.span>
  </button>;
}

function MechanicalWheel({ active, onChange, sections, lang }) {
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 30, damping: 28, mass: 2.6 });
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startIndex: 0, lastIndex: 0 });
  useEffect(() => {
    const index = sections.findIndex(section => section.id === active);
    if (index >= 0) { dragRef.current.lastIndex = index; rotation.set(72 - index * 36); }
  }, [active, rotation]);
  const start = event => {
    if (event.target.closest?.('.wheel-item')) return;
    const index = Math.max(0, sections.findIndex(section => section.id === active));
    dragRef.current = { active: true, startX: event.clientX, startY: event.clientY, startIndex: index, lastIndex: index };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const move = event => {
    const state = dragRef.current; if (!state.active) return;
    const dx = event.clientX - state.startX; const dy = event.clientY - state.startY;
    const dominant = Math.abs(dy) > Math.abs(dx) ? -dy : -dx;
    const next = Math.max(0, Math.min(sections.length - 1, state.startIndex + Math.round(dominant / 90)));
    if (next !== state.lastIndex) { state.lastIndex = next; onChange(sections[next].id); }
  };
  const end = event => { dragRef.current.active = false; event.currentTarget.releasePointerCapture?.(event.pointerId); };
  const stepWheel = direction => {
    const currentIndex = Math.max(0, sections.findIndex(section => section.id === active));
    const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
    onChange(sections[nextIndex].id);
  };
  return <div className="wheel-window">
    <motion.div className="mechanical-wheel guided-wheel" style={{ rotate: smoothRotation }} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <div className="outer-bezel"><span /><span /><span /></div><div className="bolt-ring">{Array.from({ length: 28 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div><div className="blue-conduit"><i /><i /><i /></div><div className="inner-gear" /><div className="wheel-core"><Brand /></div>
      <div className="wheel-items">{sections.map((section, index) => <WheelItem key={section.id} section={section} index={index} active={active} wheelRotation={smoothRotation} onSelect={i => onChange(sections[i].id)} />)}</div>
    </motion.div>
    <div className="wheel-control" aria-label={lang === 'es' ? 'Controles de la rueda' : 'Wheel controls'}>
      <button type="button" className="wheel-step wheel-step-up" aria-label={lang === 'es' ? 'Mover rueda hacia arriba' : 'Move wheel up'} onClick={() => stepWheel(-1)} disabled={active === sections[0].id}><ChevronUp /></button>
      <button type="button" className="wheel-drag-hand" aria-label={lang === 'es' ? 'Agarrar y arrastrar la rueda' : 'Grab and drag the wheel'} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}><Hand /></button>
      <button type="button" className="wheel-step wheel-step-down" aria-label={lang === 'es' ? 'Mover rueda hacia abajo' : 'Move wheel down'} onClick={() => stepWheel(1)} disabled={active === sections[sections.length - 1].id}><ChevronDown /></button>
    </div>
  </div>;
}

function Features({ active, lang }) {
  const setsEs = {
    inicio: [[MonitorSmartphone,'DISEÑO RESPONSIVE','Perfecta en celular, tablet y computadora.'],[Rocket,'RÁPIDA Y CLARA','Una experiencia fluida que facilita tomar acción.'],[Search,'LISTA PARA ENCONTRARSE','Estructura preparada para SEO y crecimiento.']],
    beneficios: [[ShieldCheck,'MÁS CONFIANZA','Una presencia profesional hace que te tomen en serio.'],[Clock3,'DISPONIBLE 24/7','Tu negocio informa y recibe contactos todo el día.'],[UsersRound,'MÁS OPORTUNIDADES','Facilita que nuevos clientes conozcan y contacten.']],
    paquetes: [[BadgeCheck,'DOS OPCIONES CLARAS','Starter para comenzar y Pro para destacar.'],[Layers3,'CRECE CONTIGO','La estructura puede ampliarse cuando lo necesites.'],[Wrench,'SIN COMPLICACIONES','Nos encargamos del diseño, desarrollo y publicación.']],
    portafolio: [[Palette,'IDENTIDAD PROPIA','Cada website se diseña alrededor del negocio.'],[MonitorSmartphone,'EXPERIENCIA PREMIUM','Diseño pensado para impresionar y funcionar.'],[Building2,'NEGOCIOS REALES','Proyectos para servicios locales y marcas emergentes.']],
    proceso: [[Search,'1. CONOCEMOS','Entendemos tu negocio, cliente y objetivos.'],[Palette,'2. DISEÑAMOS','Creamos la experiencia visual y estructura.'],[Code2,'3. DESARROLLAMOS','Construimos y optimizamos la website.']],
    contacto: [[Phone,'HABLEMOS','Revisamos tu proyecto sin hacerlo complicado.'],[Mail,'COTIZACIÓN CLARA','Te recomendamos el paquete adecuado.'],[MapPin,'NEGOCIOS LOCALES','Trabajamos desde Salinas, California.']],
  };
  const setsEn = {
    inicio: [[MonitorSmartphone,'RESPONSIVE DESIGN','Perfect on phones, tablets, and computers.'],[Rocket,'FAST AND CLEAR','A smooth experience that makes action easy.'],[Search,'READY TO BE FOUND','A structure prepared for SEO and growth.']],
    beneficios: [[ShieldCheck,'MORE TRUST','A professional presence helps people take you seriously.'],[Clock3,'AVAILABLE 24/7','Your business informs and receives leads all day.'],[UsersRound,'MORE OPPORTUNITIES','Makes it easier for new customers to discover and contact you.']],
    paquetes: [[BadgeCheck,'TWO CLEAR OPTIONS','Starter to begin and Pro to stand out.'],[Layers3,'GROWS WITH YOU','The structure can expand whenever you need it.'],[Wrench,'NO COMPLICATIONS','We handle design, development, and launch.']],
    portafolio: [[Palette,'A UNIQUE IDENTITY','Every website is designed around the business.'],[MonitorSmartphone,'PREMIUM EXPERIENCE','Design created to impress and perform.'],[Building2,'REAL BUSINESSES','Projects for local services and emerging brands.']],
    proceso: [[Search,'1. DISCOVERY','We understand your business, customer, and goals.'],[Palette,'2. DESIGN','We create the visual experience and structure.'],[Code2,'3. DEVELOPMENT','We build and optimize the website.']],
    contacto: [[Phone,'LET US TALK','We review your project without making it complicated.'],[Mail,'A CLEAR QUOTE','We recommend the right package.'],[MapPin,'LOCAL BUSINESSES','We work from Salinas, California.']],
  };
  const sets = lang === 'en' ? setsEn : setsEs;
  return <div className="features">{(sets[active] || sets.inicio).map(([Icon,title,text]) => <div className="feature" key={title}><div className="feature-icon"><Icon /></div><strong>{title}</strong><p>{text}</p></div>)}</div>;
}

function ContentPanel({ active, onNavigate, lang }) {
  const item = (lang === 'en' ? contentEn : contentEs)[active];
  return <main className={`content-panel content-${active}`}><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity:0,y:18,filter:'blur(4px)' }} animate={{ opacity:1,y:0,filter:'blur(0)' }} exit={{ opacity:0,y:-14 }} transition={{ duration:.55 }}>
    <p className="kicker">{item.kicker}</p><h1>{item.title}</h1><p className="description">{item.description}</p>{active !== 'inicio' && <Features active={active} lang={lang} />}
    {active === 'inicio' && <div className="hero-actions"><button onClick={() => onNavigate('paquetes')}>{lang === 'es' ? 'VER PAQUETES' : 'VIEW PACKAGES'} <ChevronRight /></button><button className="secondary" onClick={() => onNavigate('portafolio')}>{lang === 'es' ? 'VER PROYECTOS' : 'VIEW PROJECTS'}</button></div>}
  </motion.div></AnimatePresence></main>;
}

const panelMotion = { initial:{opacity:0,x:28,filter:'blur(7px)'}, animate:{opacity:1,x:0,filter:'blur(0)'}, exit:{opacity:0,x:18,filter:'blur(5px)'}, transition:{duration:.65,ease:[.22,1,.36,1]} };

function HeroShowcase({ onNavigate, lang }) {
  const projects = [
    { name:'KT STUDIOS', type:'BEAUTY STUDIO', tone:'beauty', headline:'BEAUTY THAT EMPOWERS YOU', cta:'BOOK NOW' },
    { name:'LUIS LANDSCAPING', type:'LANDSCAPING', tone:'landscape', headline:'OUTDOOR SPACES BUILT TO LAST', cta:'FREE ESTIMATE' },
    { name:'MARIA’S HOUSEKEEPING', type:'CLEANING SERVICES', tone:'cleaning', headline:'A CLEANER HOME. MORE TIME FOR YOU.', cta:'GET A QUOTE' },
    { name:'COSTA PAINTING', type:'PAINTING', tone:'painting', headline:'COLOR THAT CHANGES THE ROOM', cta:'VIEW PROJECTS' },
    { name:'SÁNCHEZ LAWN SERVICE', type:'LAWN CARE', tone:'lawn', headline:'A BETTER LOOK FOR YOUR PROPERTY', cta:'CALL TODAY' },
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent(value => (value + 1) % projects.length), 4200);
    return () => clearInterval(timer);
  }, [projects.length]);
  const project = projects[current];
 return <motion.aside className="v3-panel hero-showcase hero-showcase-clean" {...panelMotion}>
    <div className="showcase-intro"><span>{lang === 'es' ? 'ASÍ PODRÍA VERSE TU NEGOCIO' : 'THIS IS HOW YOUR BUSINESS COULD LOOK'}</span><i>{String(current + 1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</i></div>
    <div className="showcase-monitor premium-monitor">
      <div className="showcase-top"><span/><span/><span/><small>{project.name.toLowerCase().replaceAll(' ','')}.com</small></div>
      <AnimatePresence mode="wait"><motion.div key={project.name} className={`showcase-screen website-preview ${project.tone}`} initial={{opacity:0,scale:.985}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1.01}} transition={{duration:.45}}>
        <div className="preview-nav"><b>{project.name}</b><div><span>HOME</span><span>SERVICES</span><span>ABOUT</span><span>CONTACT</span></div></div>
        <div className="preview-copy"><small>{project.type}</small><h2>{project.headline}</h2><button>{project.cta}</button></div>
        <div className="preview-art"><i/><i/><i/></div>
      </motion.div></AnimatePresence>
      <div className="showcase-base"/>
    </div>
    <div className="showcase-selector">{projects.map((item,index)=><button key={item.name} className={index===current?'active':''} onClick={() => setCurrent(index)} aria-label={`Mostrar ${item.name}`}><span/>{item.name}</button>)}</div>
  </motion.aside>;
}

function BenefitsPanel({ lang }) {
  const cardsEs=[[ShieldCheck,'GENERA CONFIANZA','Una imagen profesional ayuda a que nuevos clientes crean en tu negocio.'],[Clock3,'TRABAJA 24/7','Explica tus servicios y recibe contactos incluso cuando estás ocupado.'],[UsersRound,'ATRAE CLIENTES','Facilita que las personas te encuentren, te entiendan y te contacten.'],[BadgeCheck,'FORTALECE TU MARCA','Tu negocio deja de depender únicamente de redes sociales.']];
  const cardsEn=[[ShieldCheck,'BUILDS TRUST','A professional image helps new customers believe in your business.'],[Clock3,'WORKS 24/7','Explains your services and receives leads even while you are busy.'],[UsersRound,'ATTRACTS CUSTOMERS','Makes it easier for people to find, understand, and contact you.'],[BadgeCheck,'STRENGTHENS YOUR BRAND','Your business no longer depends only on social media.']];
  const cards = lang === 'en' ? cardsEn : cardsEs;
  return <motion.aside className="v3-panel" {...panelMotion}><div className="v3-panel-head"><span>{lang === 'es' ? 'IMPULSO / BENEFICIOS' : 'IMPULSO / BENEFITS'}</span><i>04</i></div><div className="benefit-grid">{cards.map(([Icon,t,d],i)=><motion.div className="benefit-card" key={t} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.12+i*.08}}><Icon/><span>0{i+1}</span><h3>{t}</h3><p>{d}</p></motion.div>)}</div></motion.aside>;
}

function PackagesPanel({ onNavigate, lang }) {
  const plansEs=[{name:'WEBSITE STARTER',tag:'PARA COMENZAR',items:['Diseño personalizado','Hasta 5 secciones','Responsive','Formulario de contacto','SEO básico','Publicación de la website']},{name:'WEBSITE PRO',tag:'PARA DESTACAR',featured:true,items:['Todo lo del Starter','Más secciones','Animaciones premium','Diseño EvoNova','Galería y testimonios','SEO avanzado','Google Analytics']}];
  const plansEn=[{name:'WEBSITE STARTER',tag:'TO GET STARTED',items:['Custom design','Up to 5 sections','Responsive design','Contact form','Basic SEO','Website launch']},{name:'WEBSITE PRO',tag:'TO STAND OUT',featured:true,items:['Everything in Starter','More sections','Premium animations','EvoNova design','Gallery and testimonials','Advanced SEO','Google Analytics']}];
  const plans = lang === 'en' ? plansEn : plansEs;
  return <motion.aside className="v3-panel packages-v3" {...panelMotion}><div className="v3-panel-head"><span>{lang === 'es' ? 'IMPULSO / PAQUETES' : 'IMPULSO / PACKAGES'}</span><i>{lang === 'es' ? '2 OPCIONES' : '2 OPTIONS'}</i></div><div className="package-grid">{plans.map((p,i)=><div className={`package-card ${p.featured?'featured':''}`} key={p.name}><div className="package-top"><span>0{i+1}</span><em>{p.tag}</em></div><h2>{p.name}</h2><ul>{p.items.map(x=><li key={x}><BadgeCheck/>{x}</li>)}</ul><button onClick={() => onNavigate('contacto')}>{lang === 'es' ? 'SOLICITAR COTIZACIÓN' : 'REQUEST A QUOTE'} <ChevronRight /></button></div>)}</div><div className="custom-note"><strong>{lang === 'es' ? '¿NECESITAS ALGO DIFERENTE?' : 'NEED SOMETHING DIFFERENT?'}</strong><span>{lang === 'es' ? 'También desarrollamos soluciones personalizadas para proyectos especiales.' : 'We also develop custom solutions for special projects.'}</span></div></motion.aside>;
}

function PortfolioPanel({ lang }) {
 const projects=[['KT STUDIOS','BEAUTY • BOOKING','gold'],['LUIS LANDSCAPING','LANDSCAPING • ESTIMATES','green'],['MARIA’S HOUSEKEEPING','CLEANING • BOOKING','pink'],['COSTA PAINTING','PAINTING • PORTFOLIO','red'],['SÁNCHEZ LAWN SERVICE','LAWN CARE • LOCAL','lime'],['GAVILÁN PEST CONTROL','PEST CONTROL • LEADS','blue']];
 return <motion.aside className="v3-panel" {...panelMotion}><div className="v3-panel-head"><span>{lang === 'es' ? 'IMPULSO / PORTAFOLIO' : 'IMPULSO / PORTFOLIO'}</span><i>PROJECTS</i></div><div className="portfolio-v3-grid">{projects.map(([n,t,c],i)=><motion.div className={`portfolio-v3-card ${c}`} key={n} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.08+i*.06}}><div className="mini-browser"><span/><span/><span/><b>{n}</b></div><h3>{n}</h3><p>{t}</p><button>{lang === 'es' ? 'VER PROYECTO' : 'VIEW PROJECT'} <ChevronRight /></button></motion.div>)}</div></motion.aside>;
}

function ProcessPanel({ onNavigate, lang }) {
 const stepsEs=[[Search,'CONOCEMOS TU NEGOCIO','Objetivos, cliente y servicios.'],[Palette,'DISEÑAMOS TU WEBSITE','Estructura, estilo y experiencia.'],[Code2,'LA DESARROLLAMOS','Responsive, velocidad y funciones.'],[Send,'LA PUBLICAMOS','Dominio, lanzamiento y revisión final.']];
 const stepsEn=[[Search,'WE LEARN ABOUT YOUR BUSINESS','Goals, customers, and services.'],[Palette,'WE DESIGN YOUR WEBSITE','Structure, style, and experience.'],[Code2,'WE DEVELOP IT','Responsive design, speed, and functions.'],[Send,'WE LAUNCH IT','Domain, launch, and final review.']];
 const steps = lang === 'en' ? stepsEn : stepsEs;
 const extrasEs=[[Palette,'Branding'],[Image,'Logos y flyers'],[Globe2,'Google Business'],[Wrench,'Hosting y mantenimiento'],[Share2,'Redes sociales'],[BarChart3,'Analítica']];
 const extrasEn=[[Palette,'Branding'],[Image,'Logos and flyers'],[Globe2,'Google Business'],[Wrench,'Hosting and maintenance'],[Share2,'Social media'],[BarChart3,'Analytics']];
 const extras = lang === 'en' ? extrasEn : extrasEs;
 return <motion.aside className="v3-panel" {...panelMotion}><div className="v3-panel-head"><span>{lang === 'es' ? 'IMPULSO / PROCESO' : 'IMPULSO / PROCESS'}</span><i>04 STEPS</i></div><div className="process-flow">{steps.map(([Icon,t,d],i)=><React.Fragment key={t}><div className="process-step"><span>0{i+1}</span><Icon/><h3>{t}</h3><p>{d}</p></div>{i<3&&<ChevronRight className="process-arrow"/>}</React.Fragment>)}</div><div className="extras-block"><div><small>{lang === 'es' ? 'SERVICIOS ADICIONALES' : 'ADDITIONAL SERVICES'}</small><strong>{lang === 'es' ? 'También podemos ayudarte con:' : 'We can also help you with:'}</strong></div><div className="extra-chips">{extras.map(([Icon,x])=><span key={x}><Icon/>{x}</span>)}</div></div><button className="v3-primary" onClick={() => onNavigate('contacto')}>{lang === 'es' ? 'COMENZAR MI PROYECTO' : 'START MY PROJECT'} <ChevronRight /></button></motion.aside>;
}

function ContactPanel({ lang }) {
 return <motion.aside className="v3-panel contact-v3" {...panelMotion}><div className="contact-glow"/><div className="contact-orb"><Brand /></div><div className="v3-panel-head centered"><span>{lang === 'es' ? 'IMPULSO / COTIZACIÓN' : 'IMPULSO / QUOTE'}</span><strong>{lang === 'es' ? 'HABLEMOS DE TU WEBSITE' : 'LET US TALK ABOUT YOUR WEBSITE'}</strong></div><p className="contact-copy">{lang === 'es' ? 'Cuéntanos sobre tu negocio y te ayudaremos a elegir la mejor forma de comenzar.' : 'Tell us about your business and we will help you choose the best way to get started.'}</p><div className="contact-list"><a href="tel:+18318698753"><Phone/><span>(831) 869-8753</span></a><a href="mailto:contacto@impulsodigital.com"><Mail/><span>contacto@impulsodigital.com</span></a><div><MapPin/><span>Salinas, California</span></div></div><button className="contact-cta">{lang === 'es' ? 'SOLICITAR COTIZACIÓN' : 'REQUEST A QUOTE'} <ChevronRight /></button></motion.aside>;
}

function RightPanel({ active, onNavigate, lang }) {
 return <AnimatePresence mode="wait">{active==='inicio'?<HeroShowcase key="hero" onNavigate={onNavigate} lang={lang}/>:active==='beneficios'?<BenefitsPanel key="benefits" lang={lang}/>:active==='paquetes'?<PackagesPanel key="packages" onNavigate={onNavigate} lang={lang}/>:active==='portafolio'?<PortfolioPanel key="portfolio" lang={lang}/>:active==='proceso'?<ProcessPanel key="process" onNavigate={onNavigate} lang={lang}/>:<ContactPanel key="contact" lang={lang}/>}</AnimatePresence>;
}

function MobileNavigation({ active, onChange, sections, lang }) {
 const activeIndex = Math.max(0, sections.findIndex(section => section.id === active));
 const total = sections.length;
 const slotFor = index => {
   let delta = index - activeIndex;
   if (delta > total / 2) delta -= total;
   if (delta < -total / 2) delta += total;
   return delta;
 };

 return <nav className="mobile-orbit-nav" aria-label={lang === 'es' ? 'Navegación móvil' : 'Mobile navigation'}>
   <div className="mobile-orbit-bg"><i/><i/><i/></div>
   <div className="mobile-orbit-track">
     {sections.map(({id,label,Icon}, index)=>{
       const slot = slotFor(index);
       return <button key={id} data-slot={slot} className={`mobile-orbit-button ${active===id?'active':''}`} onClick={()=>onChange(id)} aria-label={label}>
         <span className="mobile-orbit-button-glow"/>
         <span className="mobile-orbit-button-face"><Icon/><small>{label}</small></span>
       </button>;
     })}
   </div>
   <div className="mobile-orbit-instruction">{lang === 'es' ? 'TOCA UNA SECCIÓN' : 'TAP A SECTION'}</div>
 </nav>;
}

function Footer({ active, onChange, sections, lang }) { return <footer className="bottom-bar"><div className="drag-hint"><Mouse/><p><b>{lang === 'es' ? 'GIRA LA RUEDA' : 'TURN THE WHEEL'}</b><span>{lang === 'es' ? 'PARA NAVEGAR' : 'TO NAVIGATE'}</span></p></div><div className="section-progress"><div className="progress-line"/>{sections.map(s=><button key={s.id} className={active===s.id?'active':''} onClick={()=>onChange(s.id)}/>)}</div><div className="socials"/></footer>; }

function Starfield() { const ref=useRef(null); useEffect(()=>{const c=ref.current,ctx=c.getContext('2d');let f;const stars=Array.from({length:95},()=>({x:Math.random(),y:Math.random(),a:Math.random()*.45+.1,s:Math.random()*1.1+.25}));const resize=()=>{c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio};const draw=()=>{ctx.clearRect(0,0,c.width,c.height);stars.forEach(st=>{ctx.globalAlpha=st.a;ctx.fillStyle='#9ed7ff';ctx.beginPath();ctx.arc(st.x*c.width,st.y*c.height,st.s*devicePixelRatio,0,Math.PI*2);ctx.fill()});f=requestAnimationFrame(draw)};resize();draw();addEventListener('resize',resize);return()=>{cancelAnimationFrame(f);removeEventListener('resize',resize)}},[]);return <canvas className="starfield" ref={ref}/>; }

function App(){const[active,setActive]=useState('inicio');const[mobilePreview,setMobilePreview]=useState(false);const[lang,setLang]=useState('es');const[isRealMobile]=useState(()=>typeof window!=='undefined'&&(window.innerWidth<=760||((navigator.maxTouchPoints||0)>0&&window.matchMedia('(pointer: coarse)').matches&&(screen.width<=932||screen.height<=932))));const[desktopMode,setDesktopMode]=useState(false);const scrollStageRef=useRef(null);const sections=lang==='en'?sectionsEn:sectionsEs;useEffect(()=>{document.documentElement.lang=lang},[lang]);useEffect(()=>{const viewport=document.querySelector('meta[name=\"viewport\"]');if(!viewport)return;viewport.setAttribute('content',desktopMode&&!isRealMobile?'width=1440':'width=device-width, initial-scale=1.0');requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));window.scrollTo({top:0,left:0,behavior:'auto'});},[desktopMode,isRealMobile]);const changeSection=id=>{setActive(id);if(typeof window!=='undefined'&&!desktopMode&&(isRealMobile||window.matchMedia('(max-width: 760px)').matches)){requestAnimationFrame(()=>scrollStageRef.current?.scrollTo({top:0,left:0,behavior:'smooth'}));}};return <div className={`system-shell ${mobilePreview?'mobile-preview':''} ${desktopMode&&!isRealMobile?'force-desktop':''} ${isRealMobile?'real-mobile':''}`}><Starfield/><div className="grain"/><div className="ambient-light"/><Header mobilePreview={mobilePreview} onToggleMobile={()=>setMobilePreview(v=>!v)} lang={lang} onLanguage={setLang} isMobileDevice={isRealMobile} desktopMode={false} onToggleDesktop={()=>{}}/><MechanicalWheel active={active} onChange={changeSection} sections={sections} lang={lang}/><MobileNavigation active={active} onChange={changeSection} sections={sections} lang={lang}/><div className="mobile-scroll-stage" ref={scrollStageRef}><ContentPanel active={active} onNavigate={changeSection} lang={lang}/><RightPanel active={active} onNavigate={changeSection} lang={lang}/></div><Footer active={active} onChange={changeSection} sections={sections} lang={lang}/></div>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
