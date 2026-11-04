const DAYS=["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];
// cada exercício: "Nome|Músculo trabalhado|Equipamento"
const G=[
["🦵","Quadríceps",["Agachamento livre|Quadríceps e glúteos|Barra e anilhas","Agachamento no Smith|Quadríceps e glúteos|Smith machine","Leg press 45°|Quadríceps e glúteos|Leg press 45°","Cadeira extensora|Quadríceps|Cadeira extensora","Agachamento búlgaro|Quadríceps e glúteos|Banco e halteres","Afundo|Quadríceps e glúteos|Halteres ou barra"]],
["🍑","Posterior de coxa e glúteos",["Stiff|Posterior de coxa e glúteos|Barra ou halteres","Levantamento terra romeno|Posterior de coxa e glúteos|Barra","Mesa flexora|Posterior de coxa|Mesa flexora","Cadeira flexora|Posterior de coxa|Cadeira flexora","Hip thrust / Elevação pélvica|Glúteos|Banco e barra","Cadeira abdutora|Glúteo médio|Cadeira abdutora","Cadeira adutora|Adutores|Cadeira adutora"]],
["🦶","Panturrilha",["Panturrilha em pé|Gastrocnêmio|Máquina de panturrilha em pé","Panturrilha sentado|Sóleo|Máquina de panturrilha sentado","Panturrilha no leg press|Panturrilha|Leg press"]],
["🟥","Peito",["Supino reto com barra|Peitoral maior, tríceps e ombros|Barra e banco reto","Supino reto com halteres|Peitoral maior|Halteres e banco reto","Supino inclinado com barra|Peitoral superior|Barra e banco inclinado","Supino inclinado com halteres|Peitoral superior|Halteres e banco inclinado","Peck deck / Crucifixo máquina|Peitoral maior|Peck deck","Crucifixo com halteres|Peitoral maior|Halteres e banco","Crossover|Peitoral maior|Polias (crossover)","Flexão de braço|Peitoral, tríceps e ombros|Peso do corpo"]],
["🟦","Costas",["Barra fixa|Dorsais e bíceps|Barra fixa","Puxada frontal|Dorsais|Polia alta","Puxada supinada|Dorsais e bíceps|Polia alta com barra","Remada curvada|Dorsais e trapézio|Barra","Remada unilateral com halter|Dorsais|Halter e banco","Remada baixa|Dorsais e romboides|Polia baixa","Remada máquina|Dorsais e romboides|Máquina de remada","Pullover na polia|Dorsais|Polia alta"]],
["🟨","Ombros",["Desenvolvimento com barra|Deltoides|Barra","Desenvolvimento com halteres|Deltoides|Halteres e banco","Desenvolvimento na máquina|Deltoides|Máquina de desenvolvimento","Elevação lateral|Deltoide lateral|Halteres","Elevação frontal|Deltoide anterior|Halteres ou barra","Crucifixo inverso|Deltoide posterior|Halteres ou peck deck","Face pull|Deltoide posterior e trapézio|Polia com corda"]],
["💪","Bíceps",["Rosca direta com barra|Bíceps|Barra reta ou W","Rosca alternada com halteres|Bíceps|Halteres","Rosca martelo|Bíceps e braquial|Halteres","Rosca Scott|Bíceps|Banco Scott e barra","Rosca concentrada|Bíceps|Halter e banco","Rosca na polia|Bíceps|Polia baixa"]],
["🔱","Tríceps",["Tríceps pulley|Tríceps|Polia alta com barra","Tríceps pulley com corda|Tríceps|Polia alta com corda","Tríceps testa|Tríceps|Barra W e banco","Tríceps francês|Tríceps|Halter","Tríceps unilateral na polia|Tríceps|Polia","Mergulho nas paralelas|Tríceps e peitoral|Paralelas","Supino fechado|Tríceps e peitoral|Barra e banco"]],
["🧱","Abdômen",["Abdominal tradicional|Reto abdominal|Colchonete","Crunch|Reto abdominal|Colchonete","Abdominal na máquina|Reto abdominal|Máquina de abdominal","Abdominal na polia|Reto abdominal|Polia alta com corda","Elevação de pernas|Abdômen inferior|Barra fixa ou banco","Elevação de joelhos|Abdômen inferior|Barra fixa ou paralelas","Prancha|Core|Colchonete","Abdominal oblíquo|Oblíquos|Colchonete"]]
];

const sel=new Set(),plan={};DAYS.forEach(d=>plan[d]=[]);
const $=id=>document.getElementById(id);
const msg=t=>$('msg').textContent=t;

$('days').innerHTML=DAYS.map(d=>`<button class="day" data-d="${d}">${d}</button>`).join('');
$('days').onclick=e=>{const b=e.target.closest('.day');if(!b)return;const d=b.dataset.d;
  sel.has(d)?sel.delete(d):sel.add(d);b.classList.toggle('on');msg('')};

$('groups').innerHTML=G.map(([ic,t,l],gi)=>`<section id="g${gi}"><div class="gh"><span class="ico">${ic}</span><h3>${t}</h3></div><div class="grid">${l.map(s=>{const[n,m,q]=s.split('|');
  return `<div class="card neon"><h4>${n}</h4><p><b>Músculo:</b> ${m}</p><p><b>Equipamento:</b> ${q}</p><button class="btn add" data-n="${n}">+ Adicionar</button></div>`}).join('')}</div></section>`).join('');

$('groups').onclick=e=>{const b=e.target.closest('.add');if(!b)return;
  if(!sel.size)return msg('Selecione pelo menos um dia da semana primeiro.');
  const n=b.dataset.n;
  sel.forEach(d=>{if(!plan[d].some(x=>x.n===n))plan[d].push({n,sr:"3x12"})});
  msg('');render();
  b.textContent='✓ Adicionado';setTimeout(()=>b.textContent='+ Adicionar',900)};

function render(){
  const ds=DAYS.filter(d=>plan[d].length);
  $('order').innerHTML=ds.length?ds.map(d=>`<div class="dayblk"><h4>${d}</h4>${plan[d].map((x,i)=>`<div class="item"><span>${x.n}</span><input value="${x.sr}" data-d="${d}" data-i="${i}" aria-label="Séries x repetições"><button class="x" data-d="${d}" data-i="${i}" aria-label="Remover">×</button></div>`).join('')}</div>`).join(''):'<span class="empty">Nenhum exercício adicionado ainda.</span>';
}
$('order').oninput=e=>{if(e.target.matches('input'))plan[e.target.dataset.d][e.target.dataset.i].sr=e.target.value};
$('order').onclick=e=>{const b=e.target.closest('.x');if(!b)return;plan[b.dataset.d].splice(b.dataset.i,1);render()};
render();

$('f').onsubmit=e=>{
  e.preventDefault();
  const ds=DAYS.filter(d=>plan[d].length);
  if(!ds.length)return msg('Adicione exercícios ao seu treino antes de enviar.');
  let n=$('tel').value.replace(/\D/g,'');
  if(n.length<10||n.length>13)return msg('Digite um número de WhatsApp válido com DDD.');
  if(n.length<=11)n='55'+n;
  const txt='🏋️ *MEU TREINO DA SEMANA*\n\n'+ds.map(d=>`🔥 *${d}*\n`+plan[d].map(x=>`• ${x.n} — ${x.sr}`).join('\n')).join('\n\n');
  window.open(`https://wa.me/${n}?text=${encodeURIComponent(txt)}`,'_blank');
  msg('Abrindo o WhatsApp...');
};

// menu hambúrguer (mobile): dias da semana > grupos musculares > enviar treino
const menu=$('menu'),burger=$('burger'),shade=$('shade');
const items=[["📅","Dias da semana","sec-dias"],...G.map(([ic,t],i)=>[ic,t,"g"+i]),["📲","Enviar treino","sec-enviar"]];
menu.innerHTML=items.map(([ic,t,id])=>`<a href="#${id}"><span class="ico">${ic}</span>${t}</a>`).join('');
const toggle=open=>{
  open=open===undefined?!menu.classList.contains('open'):open;
  menu.classList.toggle('open',open);shade.classList.toggle('show',open);
  document.body.classList.toggle('lock',open);burger.classList.toggle('on',open);
  burger.setAttribute('aria-expanded',open);
};
burger.onclick=()=>toggle();
shade.onclick=()=>toggle(false);
menu.onclick=e=>{if(e.target.closest('a'))toggle(false)};
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
