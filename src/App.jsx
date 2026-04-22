import { useState, useRef } from "react";

const T = {
  bg:"#080808", surface:"#111111", surfaceAlt:"#181818",
  border:"#222222", borderLight:"#2a2a2a", accent:"#C4956A",
  accentDim:"#8a6345", white:"#F5F0EB", muted:"#555555",
  mutedLight:"#888888", danger:"#c0392b", success:"#2ecc71",
  info:"#3498db", purple:"#9b59b6",
};

const CHORDS = {
  midnight:{
    Dm:{prog:"Dm9 — Bbmaj7#11 — Am11 — Gm9",voicing:"Dm9: D-F-A-C-E. Bbmaj7#11: Bb-D-E-A (E es el #11). Am11: A-E-G-B-D spread voicing.",bass:"Camina D-Bb-A-G cromáticamente. Slides entre Bb y A.",texture:"Profundo e introspectivo. Pad con reverb larga, filtro apenas abierto. Deja respirar el silencio.",dna:"Ambigüedad armónica de Tems — mayores que se sienten agridulces, nunca completamente felices."},
    Am:{prog:"Am9 — Fmaj7 — Cmaj9 — G13",voicing:"Am9: A-C-E-G-B. Fmaj7: F-A-C-E close voicing. G13: G-B-F-A-E mano derecha.",bass:"Sincopado: A en beat 1, C fantasma en 'and' del 2, E en beat 3.",texture:"Melancólico y suspendido. Sensación de 3am con luces bajas. Pad con attack lento.",dna:"9nas sostenidas de Odeal — la tensión sin resolver es completamente intencional."},
    Fm:{prog:"Fm9 — Dbmaj7 — Bbm11 — Eb9sus4",voicing:"Fm9: F-Ab-Eb-G. Dbmaj7: Db-F-Ab-C. Eb9sus4: Eb-Bb-D-F (sus4 retrasa la resolución indefinidamente).",bass:"Pedal F por 2 compases, luego desciende Db-Bb-Eb.",texture:"Peso cinemático. Kick lento, pad aéreo, hi-hats muy lejanos.",dna:"Técnica de Daniel Caesar — suspender resolución para extender la tensión emocional."},
  },
  early_morning:{
    Am:{prog:"Am7 — Dmaj9 — Gmaj7 — Cmaj9#11",voicing:"Dmaj9: D-F#-A-C#-E brillante y abierto. Cmaj9#11: C-E-G-B-D-F# muy open voicing, las dos manos.",bass:"Walking quarter-note: A-A-D-D-G-G-C-C. Ligeramente adelante del beat.",texture:"Esperanzador pero cansado. Primera luz del día. Piano acústico, percusión suave, mucho espacio.",dna:"Mezcla de brillo West African con introspección UK soul — Amaarae en su esencia."},
    Dm:{prog:"Dm7 — G9 — Cmaj7 — Am9",voicing:"G9: G-B-F-A (sin 5ta, énfasis en 9na). Cmaj7: C-E-G-B posición abierta.",bass:"Feel ii-V-I pero soul, no jazz. Bajo respira, no está ocupado.",texture:"Cálido y suave. Luz de mañana por la ventana. Timbre tipo Rhodes.",dna:"Intimidad de Odeal — canciones que se sienten personales, como si no estuvieran hechas para salir del cuarto."},
    Gm:{prog:"Gm9 — Ebmaj7 — Cm7 — F13",voicing:"Ebmaj7: Eb-G-Bb-D amplio. F13: F-A-Eb-D mano derecha.",bass:"F13 anticipa el 1 por una corchea — técnica soul clásica.",texture:"Nostálgico y suave. Hi-end aéreo, sin compresión agresiva.",dna:"Sensibilidad melódica de Adekunle Gold filtrada por producción UK limpia."},
  },
  deep_soul:{
    Dm:{prog:"Dm11 — Bb9 — Am7b9 — Gm7 — C13sus4",voicing:"Dm11: D-F-C-E-G (apilar la 11na). Am7b9: A-C-E-G-Bb — la b9 crea tensión que resuelve a Gm.",bass:"Línea melódica: D-C-A-G-C. Más contrapunto que ritmo puro.",texture:"Pesado, soulful, con peso de góspel. Pads gruesos, textura coral subyacente.",dna:"El góspel debajo de todo Afro-soul serio — Tems, Simisola, Asa."},
    Fm:{prog:"Fm9 — Dbmaj9 — Ab13 — Eb9 — Fm7",voicing:"Ab13: Ab-C-Gb-F. Eb9: Eb-G-D-F. Dejar sonar las 9nas sin apuro.",bass:"Bajo y kick trabados en Fm y Ab. Bass slide en Db.",texture:"Rico, ancho, lento. Esta progresión necesita espacio — el silencio es parte del soul.",dna:"Directness emocional de Omah Lay — producciones que no se esconden detrás de la complejidad."},
    Bm:{prog:"Bm11 — Gmaj7 — F#m9 — Em9 — A13",voicing:"Bm11: B-D-F#-A-E. F#m9: F#-A-C#-E-G#. A13: A-C#-G-B-F#.",bass:"Descenso de B a E por grados conjuntos en 4 compases. Muy melódico.",texture:"Meditativo y profundo. BPM lento, reverb larga, percusión mínima hasta el drop.",dna:"R&B introspectivo de Daniel Caesar — despojado al núcleo emocional."},
  },
  golden_hour:{
    C:{prog:"Cmaj9 — Am9 — Fmaj7#11 — G13",voicing:"Cmaj9: C-E-G-B-D. Fmaj7#11: F-A-E-B (el tritono #11 da brillo inesperado).",bass:"Bouncy: C en 1, A en 3 para Am. Movimiento suave y continuo.",texture:"Cálido, dorado. Atardecer en azotea. Timbre Rhodes, shaker, snare con escobillas.",dna:"Brillo Alt-Afro de Amaarae — alegre pero sofisticado, nunca superficial."},
    F:{prog:"Fmaj9 — Dm9 — Bbmaj7 — C9sus4",voicing:"Bbmaj7: Bb-D-F-A. C9sus4: C-F-G-D — flota sin resolver completamente.",bass:"Bajo en F pedal a través de Dm, luego mueve Bb-C.",texture:"Exuberante y cálido. Guitarra acústica sampleada, percusión Afro suave.",dna:"Afropop melódica de Burna Boy — exitoso pero con raíces verdaderas."},
    G:{prog:"Gmaj9 — Em11 — Cmaj7 — D9sus4 — D9",voicing:"Em11: E-G-D-A (abierto, sin 3ra). La 11na (A) es la extensión clave aquí.",bass:"Pedal G por 2 compases, sube E-D-C-D.",texture:"Eufórico y liviano. Puede llevar más percusión — patrón kick afrobeats acá.",dna:"Mezcla de Rema de Afropop comercial con profundidad melódica genuina."},
  },
  "3am":{
    Gm:{prog:"Gm9 — Eb9#11 — Dm11 — Cm9 — F7b9",voicing:"Eb9#11: Eb-G-Bb-D-A (la #11 es A — disonante, sin resolver). F7b9: F-A-Eb-Gb.",bass:"Desciende: G-F-Eb-D-C-F. Lento. Cada nota tiene peso.",texture:"Paranoico, pesado, insomnio. Pad oscuro, mucho room, hi-hats lejanos y esporádicos.",dna:"Sonido nocturno de Lagos — Victony, Lojay — cuando el Afropop se vuelve introspectivo y oscuro."},
    Em:{prog:"Em9 — Cmaj7#11 — Bm11 — Am9 — D13",voicing:"Cmaj7#11: C-E-F#-B — la #11 flota sobre todo. Bm11: B-D-A-E spread.",bass:"Muy lento. Em en 1, sostiene 3 tiempos. C por 1 tiempo. B-A descienden.",texture:"Solitario, cinemático. Swells de pad largos, percusión mínima o inexistente.",dna:"Las producciones más vulnerables de Odeal — UK soul meets noches sin dormir."},
    Dm:{prog:"Dm9 — Bbmaj9 — Am7b9 — Gm11 — A7#9",voicing:"A7#9: A-C#-G-C (el acorde Hendrix — tensión máxima antes de volver a Dm). Am7b9: A-C-E-G-Bb.",bass:"Circular: D-Bb-A-G-A. Regresa a D con peso inevitable.",texture:"Pesado, cíclico, sensación de estar atrapado. Esta progresión loopea perfectamente.",dna:"El groove de ansiedad — las producciones más oscuras de Tems y Omah Lay."},
  },
};

const OUTREACH = [
  {
    title:"Post-escucha — más efectivo",tag:"Específico",tc:"#C4956A",
    text:(n)=>`Hey ${n||"[name]"} —\n\nBeen sitting with [song title] for a few days. The way [specific element: the vocal layering / the chord change before the bridge / the space in the production] lands — that's the kind of detail that shows you're thinking about sound, not just song structure.\n\nI work on custom productions in the Afro-R&B/Soul space. Not catalogue stuff — building something from scratch around a specific project. If you're in that conversation right now, I'd genuinely enjoy hearing what you're working toward.\n\nEither way — keep making that kind of music.\n\nMNCH`,
    note:"⚠ Reemplazá los corchetes con detalles reales del artista. Nunca mandés sin personalizar.",
  },
  {
    title:"Respuesta a contexto publicado",tag:"Timing",tc:"#3498db",
    text:(n)=>`Hey ${n||"[name]"} —\n\nSaw you mention [context: "working on the next chapter" / "looking for something new"]. That's exactly the kind of brief I work from.\n\nMy work is Soulful Afro-Fusion — custom built per project, not from a catalogue. The process starts with understanding what you're actually trying to say, not just what sounds good in the moment.\n\nIf that conversation is useful to you at any point, I'm around.\n\nMNCH`,
    note:"⚠ Usala cuando el artista publicó algo sobre su proceso creativo.",
  },
  {
    title:"Cold — fit artístico muy obvio",tag:"Cold",tc:"#9b59b6",
    text:(n)=>`Hey ${n||"[name]"} —\n\nYour project sits in a space I don't hear many people working in seriously — that intersection of [specific: Afro soul and introspective lyricism / textured production and emotional directness]. That's rare.\n\nI do custom production in that lane. If you're building something and need a collaborator who's thinking about it the same way — worth a conversation.\n\nMNCH`,
    note:"⚠ Solo cuando el fit es muy obvio. Nunca en volumen masivo.",
  },
];

const OBJECTIONS = [
  {
    q:`"That's too expensive / I can get a beat for $30"`,
    a:`That makes sense — the numbers are different. But so are the products.\n\nA catalogue beat is like renting furnished space: functional, but it's not yours. Someone else has the same key.\n\nWhat we'd build is specific to your project — your voice, your sound, your identity. When that track becomes part of what defines your artistry, the investment reads differently.\n\nThe question isn't really price. It's whether you want something that belongs to you.`,
    anchor:"Anchor follow-up: \"What does a day in a professional studio cost? How many finished tracks came from it?\"",
  },
  {
    q:`"I need to think about it"`,
    a:`Completely fair. Take your time.\n\nOne thing worth sitting with: this kind of project has a natural window — when you're in the headspace for it, when the concept is alive. That window doesn't always stay open.\n\nNo pressure. If you want to revisit, I'm here.`,
    anchor:"No sigas vendiendo después de esto. Silencio estratégico es la jugada correcta acá.",
  },
  {
    q:`"Can you send me some samples first?"`,
    a:`Sure — happy to share work that's relevant to your direction.\n\nTo point you to the right references, what's the mood or sound you're moving toward? Even a couple of artist names you've been listening to lately helps me send you something that actually makes sense for your project, not just my best work in general.`,
    anchor:"Convertís el pedido en una discovery call. Nunca mandes el portfolio sin contexto previo.",
  },
  {
    q:`"I'm working with another producer"`,
    a:`Respect that. Good collaborators are hard to find.\n\nIf at some point you're looking for something specific that sits outside what you're already working on — a different texture, a second perspective — feel free to reach out.\n\nNo rush, no pitch.`,
    anchor:"Salís limpio. Quedás en su radar sin crear presión innecesaria.",
  },
];

const WORKFLOW = [
  {n:"01",t:"Primer contacto",d:"Outreach personalizado. Sin links, sin catálogo, sin precio. Solo una observación real sobre su música y una pregunta abierta."},
  {n:"02",t:"Discovery",d:"\"¿Me mandás 2-3 referencias y en una oración qué tienen que querés en tu música?\" Guardá todo en tu CRM."},
  {n:"03",t:"Brief de alineación",d:"Antes del precio: describís lo que entendiste del proyecto y preguntás si resuena. Confirma alineación y demuestra expertise técnico."},
  {n:"04",t:"Propuesta + precio",d:"Después de confirmación. Incluí: precio, rondas de revisión, stems, licencia, timeline. 50% adelanto para arrancar."},
  {n:"05",t:"Contrato + anticipo",d:"HelloSign o DocuSign. Wise/Stripe para cobro internacional. No arrancás sin ambos confirmados."},
  {n:"06",t:"Demo inicial (3-5 días)",d:"Compartí por Splice o Drive. Mensaje: \"Focusé en X primero — quería que el feel esté bien antes de agregar textura.\""},
  {n:"07",t:"Revisiones (máx. 2 incluidas)",d:"Respondé cada punto técnicamente. Si algo no va a funcionar, decilo con criterio, no con obstinación."},
  {n:"08",t:"Aprobación + pago final",d:"50% restante antes de la entrega final. Sin excepciones, está en el contrato."},
  {n:"09",t:"Entrega de stems",d:"Carpeta: MNCH_[Artista]_[Proyecto]_STEMS. Mixdown, Drums, Bass, Chords, Melody, Extras + Contrato PDF."},
  {n:"10",t:"Post-entrega (2 semanas)",d:"\"How's the track landing?\" Si hay satisfacción, pedí el referido con sutileza: \"If you know anyone working in this space...\""},
];

const SHOTS = {
  reel:{title:"Process Reel — Faceless",shots:["MACRO teclado — luz lateral cálida, foco en tecla presionada, resto en bokeh suave","PANTALLA EN PENUMBRA — monitor encendido en cuarto oscuro, luz del DAW ilumina la superficie más cercana","CABLES — primer plano de XLR enrollado sobre madera oscura o tela con textura","MANOS EN MOVIMIENTO — desde atrás o costado sobre pad o teclado, sin mostrar cara","CAPTURA DAW — screenshot parcial del piano roll con grano fotográfico aplicado en Lightroom","PLANO CENITAL — escritorio desde arriba, superficie con textura + objeto de carácter (vinilo, libro, café)"],captions:["something i've been sitting with.","built this around a feeling, not a tempo.","the work before the result."],audio:"Loop de 15s del beat en proceso — incompleto, imperfecto. Eso es exactamente intencional."},
  dump:{title:"Carousel Dump — Studio Aesthetic",shots:["TEXTURA ABSTRACTA — tejido de los audífonos de cerca o la rejilla del speaker","LUZ FILTRADA — luz de ventana sobre superficie con polvo o textura visible","OBJETO CON HISTORIA — vinilo, libro abierto en página específica, partitura escrita a mano","FLASH URBANO — exterior de noche con flash forzado del celular. Look editorial duro.","SOMBRA GEOMÉTRICA — sombra de un objeto (no tuya) sobre pared o piso con patrón","DAW SCREENSHOT — región seleccionada, stack de plugins, waveform interesante. Desaturada con grano."],captions:["the work, not the result.","curation is a practice.","process over product."],audio:"No aplica — dump es visual. Si usás sonido, que sea tu música, no música externa."},
  story:{title:"IG Story Sequence — 4 frames",shots:["FRAME 1: Audio snippet — 15s de loop, fondo negro, nombre del beat en Helvetica pequeño abajo","FRAME 2: Poll de gusto — 'direction A or B?' con dos imágenes de referencia visual (no tuyas)","FRAME 3: Captura del proceso — screenshot parcial del DAW con caption de una sola línea","FRAME 4: Cierre — imagen de ambiente (luz, textura) + texto: 'more soon.'"],captions:["Cada frame es una micro-touchpoint. No vendés nada — generás presencia y curiosidad."],audio:"Podés usar un loop diferente en cada frame para crear continuidad sonora."},
};

const TIPS = [
  {t:"Tela de fondo",d:"Una tela oscura (negro, verde musgo, terracota) colgada detrás de tu posición tapa cualquier pared fea. Terciopelo o lino barato tienen textura fotogénica natural.",c:"$5–15"},
  {t:"Una planta",d:"Un pothos, monstera chico o cactus en el encuadre da vida orgánica inmediata. Rompe la frialdad de cualquier setup sin gastar en decoración.",c:"$3–10"},
  {t:"Luz cálida de acento",d:"Foco de bajo consumo 2700K–3000K en lámpara de escritorio, detrás o al costado del monitor. No el aro de luz frontal — eso es estética de type beats.",c:"$5–8"},
  {t:"Ordenar (mayor impacto, cero costo)",d:"La diferencia entre caótico y curado no es el equipamiento — es la posición intencional de cada objeto visible en el encuadre. Sacá todo lo que no vas a fotografiar.",c:"$0"},
  {t:"Flash nocturno urbano",d:"Exterior de noche con flash forzado del celular. Crea look editorial duro con sombras marcadas — completamente diferente a la foto de noche sin flash.",c:"$0"},
  {t:"Mat de escritorio",d:"Cuero sintético o madera sobre el escritorio cambia completamente el look de planos cenitales (fotos desde arriba). Son los planos más seguros para un estudio limitado.",c:"$8–20"},
];

const CHECKLIST = [
  {item:"¿El groove tiene micro-delays? (no todo perfectamente en la grilla)",critical:true},
  {item:"¿El bajo tiene melodía propia, no solo función rítmica?",critical:true},
  {item:"¿Los pads tienen movimiento interno (LFO en cutoff, filter sweep lento)?",critical:true},
  {item:"¿El rango 800Hz–2kHz está relativamente libre para que entre la voz?",critical:true},
  {item:"¿Hay un elemento 'inesperado' que funciona como firma sonora del track?",critical:false},
  {item:"¿El BPM está en rango del nicho? (82–100 Afro-R&B / 105–118 Afropop)",critical:false},
  {item:"¿La dinámica tiene movimiento? (no todo aplastado con compresión excesiva)",critical:false},
];

const STAGES = ["Brief","Producción","Demo","Revisión","Aprobado","Entregado"];
const SCOL = {Brief:"#C4956A",Producción:"#3498db",Demo:"#9b59b6",Revisión:"#e67e22",Aprobado:"#2ecc71",Entregado:"#555555"};

// ─── UI COMPONENTS ───────────────────────────────────────────────────────────
const Lbl = ({c}) => <div style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:T.muted,marginBottom:8}}>{c}</div>;

const TagBadge = ({c,col}) => (
  <span style={{padding:"2px 9px",borderRadius:20,fontSize:10,letterSpacing:"0.07em",textTransform:"uppercase",background:(col||T.accent)+"20",color:col||T.accent,border:`1px solid ${(col||T.accent)}35`}}>{c}</span>
);

const Btn = ({children,onClick,v="p",sm,disabled,full}) => {
  const vs = {p:{b:T.accent,cl:T.accent},g:{b:T.border,cl:T.mutedLight},d:{b:T.danger,cl:T.danger}};
  const s = vs[v]||vs.p;
  return (
    <button disabled={disabled} onClick={onClick} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,padding:sm?"5px 12px":"9px 20px",fontSize:sm?10:11,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",cursor:disabled?"not-allowed":"pointer",border:`1px solid ${s.b}`,borderRadius:2,background:"none",fontFamily:"inherit",color:s.cl,opacity:disabled?0.4:1,width:full?"100%":"auto",transition:"all 0.2s"}}>{children}</button>
  );
};

const Inp = ({val,set,ph,multi,rows=3}) => {
  const Tag = multi?"textarea":"input";
  return <Tag value={val} onChange={e=>set(e.target.value)} placeholder={ph} rows={multi?rows:undefined} style={{width:"100%",background:T.surfaceAlt,border:`1px solid ${T.border}`,borderRadius:2,padding:"9px 13px",color:T.white,fontSize:12,fontFamily:"inherit",fontWeight:300,resize:multi?"vertical":"none",outline:"none"}}/>;
};

const Sel = ({val,set,opts}) => (
  <select value={val} onChange={e=>set(e.target.value)} style={{width:"100%",background:T.surfaceAlt,border:`1px solid ${T.border}`,borderRadius:2,padding:"9px 13px",color:T.white,fontSize:12,fontFamily:"inherit",cursor:"pointer",outline:"none"}}>
    {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
  </select>
);

function CopyBtn({text,small}) {
  const [ok,setOk] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(text); setOk(true); setTimeout(()=>setOk(false),2000); };
  return (
    <button onClick={copy} style={{padding:small?"3px 9px":"5px 12px",fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",borderRadius:2,border:`1px solid ${ok?T.success:T.border}`,background:ok?T.success+"20":"none",color:ok?T.success:T.muted,fontFamily:"inherit",whiteSpace:"nowrap"}}>{ok?"✓ copied":"copy"}</button>
  );
}

// ─── MODULE 1: CHORD ENGINE ───────────────────────────────────────────────────
function ChordEngine() {
  const [mood,setMood] = useState("midnight");
  const [key,setKey] = useState("Dm");
  const [res,setRes] = useState(null);

  const moodKeys = {midnight:["Am","Dm","Fm"],early_morning:["Am","Dm","Gm"],deep_soul:["Dm","Fm","Bm"],golden_hour:["C","F","G"],"3am":["Gm","Em","Dm"]};
  const keys = moodKeys[mood]||["Dm"];
  const k = keys.includes(key)?key:keys[0];

  const generate = () => {
    const d = CHORDS[mood]?.[k];
    if(d) setRes({...d,mood,key:k});
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <p style={{color:T.mutedLight,fontSize:12,lineHeight:1.75}}>Base de datos curada de progresiones con extensiones 7ma/9na/11na para Soulful Afro-R&B. Sin API necesaria.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div><Lbl c="Mood"/><Sel val={mood} set={v=>{setMood(v);setRes(null);}} opts={[{v:"midnight",l:"Midnight"},{v:"early_morning",l:"Early Morning"},{v:"deep_soul",l:"Deep Soul"},{v:"golden_hour",l:"Golden Hour"},{v:"3am",l:"3AM Spiral"}]}/></div>
        <div><Lbl c="Root Key"/><Sel val={k} set={setKey} opts={keys.map(x=>({v:x,l:x}))}/></div>
      </div>
      <Btn onClick={generate}>↗ Generate Progression</Btn>
      {res && (
        <div style={{background:T.surface,border:`1px solid ${T.borderLight}`,borderRadius:3,overflow:"hidden"}}>
          <div style={{padding:"12px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:10,color:T.accent,letterSpacing:"0.1em",textTransform:"uppercase"}}>Result</span>
            <div style={{display:"flex",gap:7}}><TagBadge c={res.mood}/><TagBadge c={res.key} col={T.info}/></div>
          </div>
          {[["Progression",res.prog,true],["Voicing Notes",res.voicing,false],["Bass Line",res.bass,false],["Mood & Texture",res.texture,false],["Artist DNA",res.dna,false]].map(([l,v,big])=>(
            <div key={l} style={{padding:"12px 18px",borderBottom:`1px solid ${T.border}`}}>
              <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:T.muted,marginBottom:6}}>{l}</div>
              <div style={{fontSize:big?15:12,color:big?T.accent:T.white,fontWeight:big?400:300,lineHeight:1.75,fontFamily:big?"'Cormorant Garamond',serif":"inherit"}}>{v}</div>
            </div>
          ))}
          <div style={{padding:"10px 18px",background:T.surfaceAlt,display:"flex",justifyContent:"flex-end"}}>
            <CopyBtn text={`PROGRESSION: ${res.prog}\n\nVOICING NOTES: ${res.voicing}\n\nBASS LINE: ${res.bass}\n\nMOOD & TEXTURE: ${res.texture}\n\nARTIST DNA: ${res.dna}`}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MODULE 2: NEGOTIATOR ─────────────────────────────────────────────────────
function Negotiator() {
  const [tab,setTab] = useState("out");
  const [name,setName] = useState("");
  const [oi,setOi] = useState(0);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <p style={{color:T.mutedLight,fontSize:12,lineHeight:1.75}}>Plantillas de outreach, manejo de objeciones y flujo de ventas 1-a-1. Todo listo para copiar y adaptar.</p>
      <div style={{display:"flex",gap:6}}>
        {[{v:"out",l:"Outreach"},{v:"obj",l:"Objeciones"},{v:"flow",l:"Flujo 1-a-1"}].map(t=>(
          <button key={t.v} onClick={()=>setTab(t.v)} style={{padding:"7px 16px",fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",borderRadius:2,border:`1px solid ${tab===t.v?T.accent:T.border}`,background:tab===t.v?T.accent+"15":"none",color:tab===t.v?T.accent:T.mutedLight,fontFamily:"inherit",transition:"all 0.2s"}}>{t.l}</button>
        ))}
      </div>

      {tab==="out" && (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div><Lbl c="Nombre del artista (personaliza la plantilla)"/><Inp val={name} set={setName} ph="Ej: Komi, Zara, Jay..."/></div>
          {OUTREACH.map((o,i)=>(
            <div key={i} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:3,overflow:"hidden"}}>
              <div style={{padding:"11px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:9,alignItems:"center"}}>
                  <span style={{fontSize:12,color:T.white}}>{o.title}</span>
                  <TagBadge c={o.tag} col={o.tc}/>
                </div>
                <CopyBtn text={o.text(name)} small/>
              </div>
              <pre style={{padding:"14px 16px",fontSize:11,lineHeight:1.9,color:T.mutedLight,whiteSpace:"pre-wrap",fontFamily:"inherit",fontWeight:300}}>{o.text(name)}</pre>
              <div style={{padding:"9px 16px",background:T.surfaceAlt,borderTop:`1px solid ${T.border}`,fontSize:11,color:T.muted}}>{o.note}</div>
            </div>
          ))}
        </div>
      )}

      {tab==="obj" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {OBJECTIONS.map((_,i)=>(
              <button key={i} onClick={()=>setOi(i)} style={{padding:"6px 14px",fontSize:10,cursor:"pointer",borderRadius:2,border:`1px solid ${oi===i?T.accent:T.border}`,background:oi===i?T.accent+"15":"none",color:oi===i?T.accent:T.mutedLight,fontFamily:"inherit"}}>Objeción {i+1}</button>
            ))}
          </div>
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:3,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:T.white,flex:1}}>{OBJECTIONS[oi].q}</span>
              <CopyBtn text={OBJECTIONS[oi].a} small/>
            </div>
            <pre style={{padding:"14px 16px",fontSize:11,lineHeight:1.9,color:T.mutedLight,whiteSpace:"pre-wrap",fontFamily:"inherit",fontWeight:300}}>{OBJECTIONS[oi].a}</pre>
            <div style={{padding:"10px 16px",background:T.surfaceAlt,borderTop:`1px solid ${T.border}`,fontSize:11,color:T.accent}}>→ {OBJECTIONS[oi].anchor}</div>
          </div>
        </div>
      )}

      {tab==="flow" && (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {WORKFLOW.map((w,i)=>(
            <div key={i} style={{display:"flex",gap:16,padding:"13px 16px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:2}}>
              <span style={{fontSize:20,color:T.border,flexShrink:0,fontFamily:"'Cormorant Garamond',serif",lineHeight:1,minWidth:28}}>{w.n}</span>
              <div>
                <div style={{fontSize:12,color:T.white,marginBottom:5,fontWeight:400}}>{w.t}</div>
                <div style={{fontSize:11,color:T.mutedLight,lineHeight:1.7}}>{w.d}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MODULE 3: CREATIVE DIRECTOR ─────────────────────────────────────────────
function CreativeDir() {
  const [fmt,setFmt] = useState("reel");
  const [tips,setTips] = useState(false);
  const d = SHOTS[fmt];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <p style={{color:T.mutedLight,fontSize:12,lineHeight:1.75}}>Shot lists curadas por formato. Ejecutable con smartphone, diseñadas para espacios no fotogénicos.</p>
      <div><Lbl c="Formato"/><Sel val={fmt} set={setFmt} opts={[{v:"reel",l:"Instagram Reel — Faceless Process"},{v:"dump",l:"Carousel Dump — Studio Aesthetic"},{v:"story",l:"IG Story Sequence"}]}/></div>

      {d && (
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:3,overflow:"hidden"}}>
          <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`}}>
            <div style={{fontSize:15,fontFamily:"'Cormorant Garamond',serif",fontWeight:400,marginBottom:4}}>{d.title}</div>
            <div style={{fontSize:10,color:T.muted}}>{d.shots.length} shots · {d.captions.length} caption options</div>
          </div>
          <div style={{padding:"16px 18px",borderBottom:`1px solid ${T.border}`}}>
            <Lbl c="Shot List"/>
            {d.shots.map((s,i)=>(
              <div key={i} style={{display:"flex",gap:12,marginBottom:10,paddingBottom:10,borderBottom:i<d.shots.length-1?`1px solid ${T.border}`:"none"}}>
                <span style={{fontSize:10,color:T.accent,flexShrink:0,paddingTop:1,minWidth:16}}>{String(i+1).padStart(2,"0")}</span>
                <span style={{fontSize:12,color:T.white,lineHeight:1.7}}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`}}>
            <Lbl c="Caption Options"/>
            {d.captions.map((c,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:T.surfaceAlt,borderRadius:2,marginBottom:6}}>
                <span style={{fontSize:12,color:T.white,fontStyle:"italic"}}>"{c}"</span>
                <CopyBtn text={c} small/>
              </div>
            ))}
          </div>
          <div style={{padding:"12px 18px",background:T.surfaceAlt}}>
            <Lbl c="Audio Pairing"/>
            <div style={{fontSize:11,color:T.mutedLight,lineHeight:1.7}}>{d.audio}</div>
          </div>
        </div>
      )}

      <button onClick={()=>setTips(!tips)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"12px 16px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:2,cursor:"pointer",fontFamily:"inherit",color:T.mutedLight,fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase"}}>
        <span>Mejoras de estudio sin gastar fortunas</span>
        <span style={{fontSize:16}}>{tips?"−":"+"}</span>
      </button>
      {tips && (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {TIPS.map((t,i)=>(
            <div key={i} style={{padding:"12px 16px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:2}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <span style={{fontSize:12,color:T.white,fontWeight:400}}>{t.t}</span>
                <TagBadge c={t.c} col={T.success}/>
              </div>
              <div style={{fontSize:11,color:T.mutedLight,lineHeight:1.7}}>{t.d}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MODULE 4: BEAT AUDITOR ───────────────────────────────────────────────────
function BeatAuditor() {
  const [bpm,setBpm] = useState("");
  const [key,setKey] = useState("");
  const [notes,setNotes] = useState("");
  const [checks,setChecks] = useState(CHECKLIST.map(()=>null));
  const [file,setFile] = useState(null);
  const [audioUrl,setAudioUrl] = useState(null);
  const fileRef = useRef();

  const toggle = (i,v) => setChecks(c=>{const n=[...c];n[i]=n[i]===v?null:v;return n;});
  const score = checks.filter(c=>c===true).length;
  const crit = CHECKLIST.filter((c,i)=>c.critical&&checks[i]===true).length;
  const critT = CHECKLIST.filter(c=>c.critical).length;

  const handleFile = f => {
    if(!f)return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setAudioUrl(url);
  };

  const diagColor = score>=6?T.success:score>=4?T.accent:T.danger;
  const diagMsg = score>=6?"El beat cumple con el estándar boutique. Si los 4 críticos están en verde, estás listo para presentarlo.":score>=4?"Base sólida. Revisá los puntos críticos marcados en rojo antes de seguir adelante.":"Trabajá los fundamentos primero. Los puntos ★ son no negociables en este nicho.";

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <p style={{color:T.mutedLight,fontSize:12,lineHeight:1.75}}>Checklist técnico contra el estándar del micro-nicho. Cargá tu beat y marcá cada punto mientras escuchás.</p>

      <div onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files[0]);}} onDragOver={e=>e.preventDefault()} onClick={()=>fileRef.current.click()} style={{border:`1px dashed ${file?T.accentDim:T.border}`,borderRadius:3,padding:"26px 20px",textAlign:"center",cursor:"pointer",background:file?T.accent+"08":"transparent",transition:"all 0.2s"}}>
        <input ref={fileRef} type="file" accept=".mp3,.wav,audio/*" onChange={e=>handleFile(e.target.files[0])} style={{display:"none"}}/>
        {file
          ?<div><div style={{color:T.accent,fontSize:12,marginBottom:4}}>✓ {file.name}</div><div style={{color:T.muted,fontSize:11}}>{(file.size/1024/1024).toFixed(2)}MB</div></div>
          :<div><div style={{color:T.muted,fontSize:26,marginBottom:6}}>↑</div><div style={{color:T.mutedLight,fontSize:12}}>Drop tu beat acá o click para buscar</div><div style={{color:T.muted,fontSize:11,marginTop:4}}>MP3 o WAV</div></div>
        }
      </div>

      {audioUrl && <audio controls src={audioUrl} style={{width:"100%",height:36}}/>}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div><Lbl c="BPM (identificado por oído)"/><Inp val={bpm} set={setBpm} ph="ej. 94"/></div>
        <div><Lbl c="Tonalidad / Escala"/><Inp val={key} set={setKey} ph="ej. Dm Dorian"/></div>
      </div>
      <div><Lbl c="Notas del productor (opcional)"/><Inp val={notes} set={setNotes} multi rows={2} ph="Ej: pad con LFO lento, bassline sincopada, referencia: Odeal..."/></div>

      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:3,overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:T.muted}}>Checklist Técnico</span>
          <div style={{display:"flex",gap:8}}>
            <TagBadge c={`${score}/7 pass`} col={score>=5?T.success:score>=3?T.accent:T.danger}/>
            <TagBadge c={`${crit}/${critT} critical`} col={crit===critT?T.success:T.danger}/>
          </div>
        </div>
        {CHECKLIST.map((c,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 18px",borderBottom:i<CHECKLIST.length-1?`1px solid ${T.border}`:"none",background:checks[i]===true?T.success+"08":checks[i]===false?T.danger+"08":"none",transition:"background 0.2s"}}>
            <div style={{display:"flex",gap:9,alignItems:"flex-start",flex:1}}>
              {c.critical&&<span style={{fontSize:9,color:T.accent,flexShrink:0,paddingTop:2}}>★</span>}
              <span style={{fontSize:12,color:T.white,lineHeight:1.65}}>{c.item}</span>
            </div>
            <div style={{display:"flex",gap:6,flexShrink:0,marginLeft:12}}>
              <button onClick={()=>toggle(i,true)} style={{padding:"4px 11px",fontSize:11,cursor:"pointer",borderRadius:2,border:`1px solid ${checks[i]===true?T.success:T.border}`,background:checks[i]===true?T.success+"20":"none",color:checks[i]===true?T.success:T.muted,fontFamily:"inherit",transition:"all 0.2s"}}>✓</button>
              <button onClick={()=>toggle(i,false)} style={{padding:"4px 11px",fontSize:11,cursor:"pointer",borderRadius:2,border:`1px solid ${checks[i]===false?T.danger:T.border}`,background:checks[i]===false?T.danger+"20":"none",color:checks[i]===false?T.danger:T.muted,fontFamily:"inherit",transition:"all 0.2s"}}>✗</button>
            </div>
          </div>
        ))}
      </div>

      {score>0 && (
        <div style={{padding:"14px 18px",background:diagColor+"10",border:`1px solid ${diagColor}30`,borderRadius:2}}>
          <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:diagColor,marginBottom:6}}>Diagnóstico</div>
          <div style={{fontSize:12,color:T.white,lineHeight:1.75}}>{diagMsg}</div>
        </div>
      )}
    </div>
  );
}

// ─── MODULE 5: PROJECT MANAGER ────────────────────────────────────────────────
const EF = {artist:"",genre:"",stage:"Brief",refs:"",deadline:"",budget:"",notes:""};

function Projects() {
  const [projects,setProjects] = useState([
    {id:1,artist:"Demo Artist",genre:"Soulful Afro-R&B",stage:"Demo",refs:"spotify.com/track/...",deadline:"2025-06-01",budget:"350",notes:"Mood: madrugada íntima. Quiere algo con espacio para la voz. Referencia: Odeal — See Me Now. Pad texturizado, bajo melódico."}
  ]);
  const [show,setShow] = useState(false);
  const [eid,setEid] = useState(null);
  const [form,setForm] = useState(EF);
  const F = v => setForm(f=>({...f,...v}));

  const save = () => {
    if(!form.artist.trim())return;
    if(eid) setProjects(p=>p.map(pr=>pr.id===eid?{...pr,...form}:pr));
    else setProjects(p=>[...p,{...form,id:Date.now()}]);
    setShow(false);setEid(null);setForm(EF);
  };

  const advance = id => setProjects(p=>p.map(pr=>pr.id!==id?pr:{...pr,stage:STAGES[Math.min(STAGES.indexOf(pr.stage)+1,STAGES.length-1)]}));
  const remove = id => setProjects(p=>p.filter(pr=>pr.id!==id));
  const edit = p => { setForm({artist:p.artist,genre:p.genre,stage:p.stage,refs:p.refs,deadline:p.deadline,budget:p.budget,notes:p.notes});setEid(p.id);setShow(true); };

  const sc = STAGES.reduce((a,s)=>{a[s]=projects.filter(p=>p.stage===s).length;return a;},{});
  const total = projects.reduce((a,p)=>a+(parseFloat(p.budget)||0),0);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:4}}>
        {STAGES.map(s=>(
          <div key={s} style={{flex:"0 0 auto",padding:"8px 12px",borderRadius:2,textAlign:"center",border:`1px solid ${SCOL[s]}40`,background:sc[s]?SCOL[s]+"12":"transparent",minWidth:72,transition:"all 0.2s"}}>
            <div style={{fontSize:19,fontWeight:300,color:sc[s]?SCOL[s]:T.border,fontFamily:"'Cormorant Garamond',serif"}}>{sc[s]}</div>
            <div style={{fontSize:9,letterSpacing:"0.07em",color:T.muted,textTransform:"uppercase"}}>{s}</div>
          </div>
        ))}
      </div>

      {total>0 && (
        <div style={{padding:"10px 16px",background:T.success+"10",border:`1px solid ${T.success}30`,borderRadius:2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:T.muted}}>Pipeline Total</span>
          <span style={{fontSize:16,color:T.success,fontFamily:"'Cormorant Garamond',serif"}}>${total.toLocaleString()} USD</span>
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:T.muted,fontSize:11}}>{projects.length} project{projects.length!==1?"s":""}</span>
        <Btn sm onClick={()=>{setShow(!show);setEid(null);setForm(EF);}}>{show?"✕ Cancel":"+ New Project"}</Btn>
      </div>

      {show && (
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:3,padding:18}}>
          <div style={{fontSize:10,color:T.accent,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>{eid?"Edit":"New"} Project</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div><Lbl c="Artist *"/><Inp val={form.artist} set={v=>F({artist:v})} ph="Artist name"/></div>
            <div><Lbl c="Genre"/><Inp val={form.genre} set={v=>F({genre:v})} ph="Soulful Afro-R&B"/></div>
            <div><Lbl c="Stage"/><Sel val={form.stage} set={v=>F({stage:v})} opts={STAGES.map(s=>({v:s,l:s}))}/></div>
            <div>
              <Lbl c="Deadline"/>
              <input type="date" value={form.deadline} onChange={e=>F({deadline:e.target.value})} style={{width:"100%",background:T.surfaceAlt,border:`1px solid ${T.border}`,borderRadius:2,padding:"9px 13px",color:T.white,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
            </div>
            <div><Lbl c="Budget USD"/><Inp val={form.budget} set={v=>F({budget:v})} ph="350"/></div>
            <div><Lbl c="References"/><Inp val={form.refs} set={v=>F({refs:v})} ph="Spotify, Drive, YouTube..."/></div>
          </div>
          <div style={{marginBottom:14}}><Lbl c="Notes / Brief"/><Inp val={form.notes} set={v=>F({notes:v})} multi rows={3} ph="Mood, referencias, lo que busca el artista, particularidades del proyecto..."/></div>
          <div style={{display:"flex",gap:9}}>
            <Btn onClick={save} disabled={!form.artist.trim()}>{eid?"Update Project":"Add Project"}</Btn>
            <Btn v="g" onClick={()=>{setShow(false);setForm(EF);}}>Cancel</Btn>
          </div>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {projects.length===0 && <div style={{textAlign:"center",padding:"36px",color:T.muted,fontSize:12}}>No hay proyectos todavía. Agregá el primero arriba.</div>}
        {projects.map(p=>(
          <div key={p.id} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:3,padding:16,transition:"border-color 0.2s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <div style={{fontSize:15,fontFamily:"'Cormorant Garamond',serif",fontWeight:400,marginBottom:6,color:T.white}}>{p.artist}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <TagBadge c={p.stage} col={SCOL[p.stage]}/>
                  {p.genre&&<TagBadge c={p.genre}/>}
                  {p.budget&&<TagBadge c={`$${p.budget}`} col={T.success}/>}
                </div>
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0,marginLeft:12}}>
                {p.stage!=="Entregado"&&<Btn sm v="g" onClick={()=>advance(p.id)}>→ Avanzar</Btn>}
                <Btn sm v="g" onClick={()=>edit(p)}>Edit</Btn>
                <Btn sm v="d" onClick={()=>remove(p.id)}>✕</Btn>
              </div>
            </div>
            {p.deadline&&<div style={{fontSize:11,color:T.muted,marginBottom:4}}>📅 {p.deadline}</div>}
            {p.refs&&<div style={{fontSize:11,color:T.mutedLight,marginBottom:4,wordBreak:"break-all"}}>🔗 {p.refs}</div>}
            {p.notes&&<div style={{fontSize:11,color:T.mutedLight,lineHeight:1.7,borderTop:`1px solid ${T.border}`,paddingTop:10,marginTop:8}}>{p.notes}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
const MODS = [
  {id:"chord",l:"Chord Engine",i:"♩",s:"Harmonic Generator"},
  {id:"neg",l:"Negotiator",i:"◈",s:"Outreach & Sales"},
  {id:"dir",l:"Creative Dir.",i:"◻",s:"Visual Direction"},
  {id:"audit",l:"Beat Auditor",i:"◎",s:"Technical Checklist"},
  {id:"proj",l:"Projects",i:"≡",s:"Client Manager"},
];

export default function App() {
  const [active,setActive] = useState("chord");
  const cur = MODS.find(m=>m.id===active);
  const render = () => ({chord:<ChordEngine/>,neg:<Negotiator/>,dir:<CreativeDir/>,audit:<BeatAuditor/>,proj:<Projects/>}[active]);

  return (
    <div style={{minHeight:"100vh",background:T.bg,color:T.white,fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",fontWeight:300,fontSize:13,lineHeight:1.6,WebkitFontSmoothing:"antialiased"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#080808;}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}
        select option{background:#181818;color:#F5F0EB;}
        ::placeholder{color:#444;}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.4);}
      `}</style>

      <div style={{padding:"15px 22px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#080808f8",backdropFilter:"blur(12px)",zIndex:100}}>
        <div style={{display:"flex",alignItems:"baseline",gap:13}}>
          <span style={{fontWeight:500,fontSize:16,letterSpacing:"0.3em",color:T.white}}>MNCH</span>
          <span style={{width:1,height:12,background:T.border,display:"inline-block",verticalAlign:"middle"}}/>
          <span style={{fontSize:9,letterSpacing:"0.14em",color:T.muted,textTransform:"uppercase"}}>Studio Suite</span>
        </div>
        <span style={{fontSize:9,color:T.muted,letterSpacing:"0.08em"}}>not (only) for the club</span>
      </div>

      <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,overflowX:"auto",padding:"0 14px"}}>
        {MODS.map(m=>(
          <button key={m.id} onClick={()=>setActive(m.id)} style={{padding:"11px 16px",background:"none",cursor:"pointer",border:"none",borderBottom:`2px solid ${active===m.id?T.accent:"transparent"}`,color:active===m.id?T.white:T.muted,transition:"all 0.2s",display:"flex",flexDirection:"column",alignItems:"center",gap:3,flex:"0 0 auto",fontFamily:"inherit"}}>
            <span style={{fontSize:14}}>{m.i}</span>
            <span style={{fontSize:9,letterSpacing:"0.07em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{m.l}</span>
          </button>
        ))}
      </div>

      <div style={{maxWidth:740,margin:"0 auto",padding:"22px 18px"}}>
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:3}}>
            <span style={{fontSize:18,color:T.accent}}>{cur?.i}</span>
            <h1 style={{fontSize:20,fontWeight:400,fontFamily:"'Cormorant Garamond',serif",letterSpacing:"0.02em",color:T.white}}>{cur?.l}</h1>
          </div>
          <div style={{fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:T.muted}}>{cur?.s}</div>
        </div>
        {render()}
      </div>

      <div style={{padding:"13px 22px",borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",fontSize:9,color:T.muted,letterSpacing:"0.06em",marginTop:40}}>
        <span>MNCH Studio Suite — Boutique Production Tools</span>
        <span>local · no API required</span>
      </div>
    </div>
  );
}
