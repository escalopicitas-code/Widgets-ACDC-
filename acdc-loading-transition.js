(function(){

if(window.acdcLoadingTransition) return;
window.acdcLoadingTransition = true;

// VERIFICA SE A ANIMAÇÃO JÁ RODOU NESTA SESSÃO
// Se já rodou, cancela a execução do script e não mostra nada.
if(sessionStorage.getItem('acdc_intro_played')) {
    return;
}

const style = document.createElement('style');

style.innerHTML = `
#acdc-transition{
    position:fixed;
    inset:0;
    background:#fff;
    z-index:999999999;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    transition:opacity .4s ease;
}

#acdc-transition.hide{
    opacity:0;
    pointer-events:none;
}

.acdc-stage{
    text-align:center;
    width:min(900px,90vw);
}

.acdc-logo{
    font-size:58px;
    font-weight:700;
    letter-spacing:12px;
    color:#1a1a1a;
    opacity:0;
    animation:acdcLogoReveal .8s ease forwards;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.acdc-tag{
    margin-top:14px;
    font-size:11px;
    letter-spacing:5px;
    color:#666;
    opacity:0;
    animation:acdcLogoReveal .8s ease .1s forwards;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.acdc-blueprint{
    width:100%;
    max-width:700px;
    margin:70px auto 40px;
}

.acdc-blueprint *{
    fill:none;
    stroke:#1a1a1a;
    stroke-width:1.5;
    stroke-dasharray:1400;
    stroke-dashoffset:1400;
}

.acdc-line1{animation:acdcDraw .6s ease .1s forwards;}
.acdc-line2{animation:acdcDraw .6s ease .2s forwards;}
.acdc-line3{animation:acdcDraw .6s ease .3s forwards;}
.acdc-line4{animation:acdcDraw .6s ease .4s forwards;}
.acdc-line5{animation:acdcDraw .6s ease .5s forwards;}
.acdc-line6{animation:acdcDraw .6s ease .6s forwards;}
.acdc-line7{animation:acdcDraw .6s ease .7s forwards;}

.acdc-progress{
    width:240px;
    height:1px;
    background:#ddd;
    margin:0 auto;
    overflow:hidden;
}

.acdc-progress::after{
    content:"";
    display:block;
    width:100%;
    height:100%;
    background:#1a1a1a;
    transform:translateX(-100%);
    animation:acdcProgress .8s ease forwards;
}

@keyframes acdcDraw{
    to{ stroke-dashoffset:0; }
}

@keyframes acdcProgress{
    to{ transform:translateX(0); }
}

@keyframes acdcLogoReveal{
    from{ opacity:0; transform:translateY(20px); }
    to{ opacity:1; transform:translateY(0); }
}

@media(max-width:768px){
    .acdc-logo{
        font-size:34px;
        letter-spacing:8px;
    }
    .acdc-tag{
        letter-spacing:3px;
        font-size:10px;
    }
    .acdc-blueprint{
        margin:40px auto 30px;
    }
}
`;

document.head.appendChild(style);

const overlay = document.createElement('div');
overlay.id = 'acdc-transition';

overlay.innerHTML = `
<div class="acdc-stage">
    <div class="acdc-logo">ACDC CASA</div>
    <div class="acdc-tag">PAPÉIS DE PAREDE • REVESTIMENTOS • DECORAÇÃO</div>
    <svg class="acdc-blueprint" viewBox="0 0 800 400">
        <!-- Parede principal -->
        <rect class="acdc-line1" x="100" y="100" width="600" height="220"/>
        
        <!-- Linhas de divisão dos rolos de papel de parede -->
        <line class="acdc-line2" x1="250" y1="100" x2="250" y2="320"/>
        <line class="acdc-line3" x1="400" y1="100" x2="400" y2="320"/>
        <line class="acdc-line4" x1="550" y1="100" x2="550" y2="320"/>
        
        <!-- Detalhes decorativos (padrão listrado) -->
        <line class="acdc-line5" x1="175" y1="160" x2="225" y2="160"/>
        <line class="acdc-line6" x1="325" y1="200" x2="375" y2="200"/>
        <line class="acdc-line7" x1="475" y1="240" x2="525" y2="240"/>
    </svg>
    <div class="acdc-progress"></div>
</div>
`;

function ensureOverlay(){
    if(!document.getElementById('acdc-transition')){
        document.body.appendChild(overlay);
    }
}

function hideTransition(){
    const el = document.getElementById('acdc-transition');
    if(!el) return;
    el.classList.add('hide');
    setTimeout(()=>{
        el.style.display='none';
        // REGISTRA QUE A ANIMAÇÃO FOI VISTA
        sessionStorage.setItem('acdc_intro_played', 'true');
    },400); 
}

function initialLoad(){
    // Adiciona um fade sutil no conteúdo da página
    document.body.style.animation = 'acdcPageFade .4s ease';
    
    // Injeta keyframe do fade da página se ainda não existir
    if(!document.getElementById('acdc-page-fade-style')){
        const fadeStyle = document.createElement('style');
        fadeStyle.id = 'acdc-page-fade-style';
        fadeStyle.innerHTML = `
            @keyframes acdcPageFade{
                from{ opacity:.85; }
                to{ opacity:1; }
            }
        `;
        document.head.appendChild(fadeStyle);
    }
    
    ensureOverlay();
    
    setTimeout(()=>{
        hideTransition();
    },1200); 
}

// Executa assim que possível
if(document.body){
    initialLoad();
}else{
    document.addEventListener('DOMContentLoaded', initialLoad);
}

})();
