var idm = "pt-br";

const mq = window.matchMedia("(max-width: 767px)");
const tamimg = (mq.matches) ? `c-` : ``;
const cormenu = (mq.matches) ? `var(--bg-cor)` : `var(--font-cor2)`;

const meses = ["Janeiro", "Fevereiro", "MarÃ§o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const mesestres = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

const hoje = new Date();

const umdia = 86400000;




function trata(a) {
  var b = a.toLowerCase();
  var c = b.replace(/à|á|â|ã/g, "a");
  var d = c.replace(/è|é|ê|ẽ/g, "e");
  var e = d.replace(/ì|í|î|ĩ/g, "i");
  var f = e.replace(/ò|ó|ô|õ/g, "o");
  var g = f.replace(/ù|ú|û|ũ/g, "u");
  var h = g.replace(/ç/g, "c");
  h = h.replace(/\(|\)|\-|\{|\}|\[|\]|\?|\!|\./g, "");
  return h;
}

function trata2(a) {
  var b = trata(a);
  var c = b.replace(/ /g, "-");
  return c;
}


function npagina(a,titulo,url) {
  /* let stateObj = { foo: a };
  history.pushState(stateObj, titulo, url);
  document.title = titulo; */
  tnpagina();
}

function tnpagina(){
    if(mq.matches){
            desmostra('div-lis');
  }
  scroll(0,0);
}

/* window.onpopstate = function(event) {
    var onde = window.location.href;
    window.location.href=onde;
} */


function escreve(a,b) {
   var da = (b) ? b : "div-conteudo";
  document.getElementById(da).innerHTML = a;
}


function mostra(a,b){
    document.getElementById(a).style.display = "inline";
    if(b){
      document.getElementById(b).href = `javascript:desmostra('${a}','${b}')`;
    }
}

function desmostra(a,b){
    document.getElementById(a).style.display = "none";
    if(b){
      document.getElementById(b).href = `javascript:mostra('${a}','${b}')`;
    }
}

function mostramenu(){
  mostra('menu-cima-praticas');
  var mudar = document.getElementById('bt-menu');
  mudar.setAttribute('onclick', 'desmostramenu()');
  scroll(0,0);
}

function desmostramenu(){
  desmostra('menu-cima-praticas');
  var mudar = document.getElementById('bt-menu');
  mudar.setAttribute('onclick', 'mostramenu()');
}

function atvlink(a) {
  var b = a.replace(';a;','<a href="');
  var c = b.replace(';m;',' target="_blank" >');
  var d = c.replace(';d;','</a>');
  return d;
}

function mostrafiltro() {
    document.getElementById('acervo-div-filtro').style.display = "inline";
}

function escreveano(anovalendo) {
   let datarodape = (hoje.getFullYear() > anovalendo) ? `${anovalendo} / ${hoje.getFullYear()}` : anovalendo;

   escreve(datarodape,`datarodape`);
}

function chamaget(pg,funcao) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      funcao(this.responseText);
    }
  };
  xhttp.open("GET", pg, true);
  xhttp.send();
}

function chamapost(pg,parametros,funcao) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      funcao(this.responseText);
    }
  };
  xhttp.open("POST", pg, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(parametros);
}

lista = [];


/*       FUNÇÕES       */

// gerais

function dinamicorespblog(indc,mnt,npg,div,pg,geral,unica) {
  var txt = '';
  var min = pg * npg;
  var tam = indc.length;
  var max = (min + npg >  tam ? tam : (min + npg));
  if (!mq.matches && !unica) {
    var cont = 0;
    var col1 = '<div class="triplo" >';
    var col2 = '<div class="triplo" >';
    var col3 = '<div class="triplo" >';
    for(var i = min; i < max; i++) {
      var n = indc[i];
      var val = mnt(n);
      if(cont == 0) {
        col1 += val;
        cont = 1;
      }
      else if(cont == 1) {
        col2 += val;
        cont = 2;
      }
      else if(cont == 2) {
        col3 += val;
        cont = 0;
      }
    }
    col1 += '</div>';
    col2 += '</div>';
    col3 += '</div>';

    txt += col1 + col2 + col3;
  }

  else {
    for(var i = min; i < max; i++) {
      var n = indc[i];
      txt += mnt(n);
    }
  }
  var ver = Math.ceil(tam/npg);
  if(ver > 1) {
    txt += '<div class="central" >';
    for(var pgn = 0; pgn < ver; pgn++ ) {
      let pgclass = (pgn === pg) ? 'npg-atual' : 'npg-outro';
      txt += `<a href="javascript:dinamicorespblog(${geral},${npg},'${div}',${pgn},'${geral}')" class="${pgclass}" >${(pgn + 1)}</a>`;
    }

    txt += '</div>';
  }
  escreve(txt,div);
}

// copia
divcopia = '';

function copiar(id,div,msg) {
  let copiaurl = document.getElementById(id);
  copiaurl.select();
  document.execCommand("copy");
  divcopia = div;
  escreve(msg,div);
  const corta = setTimeout(limpa, 5000);
}

function limpa(){
    escreve("",divcopia);
}


// tema

function mudatema(t){
  let muda = (t === `d`) ? `l` : `d`;
  let mudanome = (t === `d`) ? `light` : `dark`;
  document.getElementById(`div-conteudo`).className = `central-${t}`;
  let lk = document.getElementById(`lk-tema`);
  lk.href = `javascript:mudatema('${muda}')`;
  lk.innerHTML = `<svg  viewBox="0 0 200 200" style="width: 20px;" >${desenhatema(t)}`;
}

function desenhatema(t,cor){
  let txt = {
    "d" : "<defs      id= \"defs8893 \" /><sodipodi:namedview      id= \"namedview8891 \"      pagecolor= \"#ffffff \"      bordercolor= \"#000000 \"      borderopacity= \"0.25 \"      inkscape:showpageshadow= \"2 \"      inkscape:pageopacity= \"0.0 \"      inkscape:pagecheckerboard= \"0 \"      inkscape:deskcolor= \"#d1d1d1 \" /><inkscape:clipboard      min= \"8604.5839,2753.747 \"      max= \"8795.2214,2944.6376 \"      geom-min= \"8604.5839,2753.747 \"      geom-max= \"8795.2214,2944.6376 \" /><g      id= \"g8895 \"      transform= \"matrix(3.7795276,0,0,3.7795276,-8604.584,-2753.747) \"><path        id= \"path1171 \"        style= \"fill:var(--font-cor-menu);stroke-width:2.82592 \"        d= \"m 2301.7709,728.59555 a 2.9146259,2.9146259 0 0 0 -2.9147,2.91471 2.9146259,2.9146259 0 0 0 2.9147,2.91469 2.9146259,2.9146259 0 0 0 2.9144,-2.91469 2.9146259,2.9146259 0 0 0 -2.9144,-2.91471 z m -15.9144,6.44673 a 2.9146259,2.9146259 0 0 0 -1.9519,0.85164 2.9146259,2.9146259 0 0 0 0,4.12181 2.9146259,2.9146259 0 0 0 4.1219,3.2e-4 2.9146259,2.9146259 0 0 0 0,-4.12213 2.9146259,2.9146259 0 0 0 -2.17,-0.85164 z m 31.679,0.0644 a 2.9146259,2.9146259 0 0 0 -1.9518,0.85164 2.9146259,2.9146259 0 0 0 0,4.12181 2.9146259,2.9146259 0 0 0 4.1218,0 2.9146259,2.9146259 0 0 0 0,-4.12181 2.9146259,2.9146259 0 0 0 -2.17,-0.85164 z m -15.7068,2.99136 c -4.1211,-1.9e-4 -8.2162,1.69611 -11.1304,4.61003 -2.9143,2.91391 -4.6113,7.00932 -4.6115,11.13043 -1e-4,4.12137 1.6959,8.21717 4.6101,11.13143 2.9143,2.91424 7.0104,4.61022 11.1318,4.61002 4.1211,-2.4e-4 8.2163,-1.69682 11.1301,-4.61102 2.9139,-2.91421 4.6101,-7.00934 4.61,-11.13043 -3e-4,-4.12084 -1.6961,-8.21656 -4.61,-11.13043 -2.9138,-2.91387 -7.0093,-4.60979 -11.1301,-4.61003 z m 0,3.38932 a 12.351532,12.351532 0 0 1 12.3514,12.35147 12.351532,12.351532 0 0 1 -12.3514,12.35147 12.351532,12.351532 0 0 1 -12.3515,-12.35147 12.351532,12.351532 0 0 1 12.3515,-12.35147 z m 22.3259,9.44374 a 2.9146259,2.9146259 0 0 0 -2.9147,2.9147 2.9146259,2.9146259 0 0 0 2.9147,2.9147 2.9146259,2.9146259 0 0 0 2.9144,-2.9147 2.9146259,2.9146259 0 0 0 -2.9144,-2.9147 z m -44.6104,0.14172 a 2.9146259,2.9146259 0 0 0 -2.9147,2.91503 2.9146259,2.9146259 0 0 0 2.9147,2.91438 2.9146259,2.9146259 0 0 0 2.9144,-2.91438 2.9146259,2.9146259 0 0 0 -2.9144,-2.91503 z m 6.3621,15.68237 a 2.9146259,2.9146259 0 0 0 -1.9518,0.85164 2.9146259,2.9146259 0 0 0 0,4.12213 2.9146259,2.9146259 0 0 0 4.1218,0 2.9146259,2.9146259 0 0 0 2e-4,-4.12213 2.9146259,2.9146259 0 0 0 -2.1702,-0.85164 z m 31.5526,0.0541 a 2.9146259,2.9146259 0 0 0 -1.9522,0.85131 2.9146259,2.9146259 0 0 0 0,4.12214 2.9146259,2.9146259 0 0 0 4.1222,0 2.9146259,2.9146259 0 0 0 0,-4.12214 2.9146259,2.9146259 0 0 0 -2.17,-0.85131 z m -15.6013,6.46333 a 2.9146259,2.9146259 0 0 0 -2.9148,2.91471 2.9146259,2.9146259 0 0 0 2.9148,2.9147 2.9146259,2.9146259 0 0 0 2.9147,-2.9147 2.9146259,2.9146259 0 0 0 -2.9147,-2.91471 z \" /><path        style= \"fill:var(--font-cor-menu);stroke-width:10.2468 \"        d= \"m 2296.0448,764.97412 c -3.6575,-1.85174 -5.4707,-4.05135 -6.6963,-8.1237 -1.113,-3.6983 -0.5304,-7.01243 1.8517,-10.53287 6.0537,-8.9469 19.9851,-6.8205 23.0843,3.52342 1.078,3.59843 0.8563,5.68698 -0.9911,9.33013 -3.4448,6.7932 -10.5628,9.18796 -17.2486,5.80302 z \"        id= \"path8887 \" /></g></svg>",
  "l" : " <defs      id=\"defs3373\" /><sodipodi:namedview      id=\"namedview3371\"      pagecolor=\"#ffffff\"      bordercolor=\"#000000\"      borderopacity=\"0.25\"      inkscape:showpageshadow=\"2\"      inkscape:pageopacity=\"0.0\"      inkscape:pagecheckerboard=\"0\"      inkscape:deskcolor=\"#d1d1d1\" /><inkscape:clipboard      style=\"font-variation-settings:normal;opacity:1;vector-effect:none;fill:var(--font-cor-menu);fill-opacity:1;stroke-width:16.62988346;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;-inkscape-stroke:none;stop-color:#000000;stop-opacity:1\"      min=\"8881.8127,2755.3207\"      max=\"9062.2836,2940.2132\"      geom-min=\"8881.8127,2755.3207\"      geom-max=\"9062.2836,2940.2132\" /><g      id=\"g3375\"      transform=\"matrix(3.7795276,0,0,3.7795276,-8881.8128,-2755.3207)\"><path        id=\"path1067\"        style=\"fill:var(--font-cor-menu);stroke-width:4.39999\"        d=\"m 2373.2681,729.01204 v 5.1e-4 c -1.2121,7e-5 -2.4228,0.0952 -3.6199,0.27906 1.3942,1.46271 2.5493,3.13602 3.4225,4.95835 0.036,-0.002 0.072,-0.003 0.1075,-0.005 1.1554,2.51242 1.7554,5.24448 1.7591,8.00985 -1e-4,10.62099 -8.6099,19.23106 -19.2309,19.23138 -0.055,-0.002 -0.1099,-0.004 -0.1648,-0.007 0.083,0.009 -5.1961,-0.49101 -5.562,-0.60409 1.1875,3.70688 3.2402,7.13925 5.9935,9.89242 4.5276,4.5279 10.8915,7.16358 17.295,7.1639 6.4038,3.1e-4 12.7687,-2.63387 17.2972,-7.16184 4.5282,-4.52795 7.1636,-10.89331 7.1639,-17.29713 3e-4,-6.40425 -2.6356,-12.76813 -7.1639,-17.29662 -4.5285,-4.52848 -10.893,-7.16421 -17.2972,-7.1639 z m 5.8224,6.14536 c 7.9802,2.53503 13.403,9.94203 13.409,18.31516 -10e-5,10.62118 -8.6102,19.23134 -19.2314,19.23138 -5.381,-0.009 -10.5122,-2.27195 -14.1474,-6.23941 5.2025,-0.75283 10.1625,-3.19187 13.8828,-6.91172 4.5284,-4.52797 7.1636,-10.8933 7.1639,-17.29714 2e-4,-2.40366 -0.3735,-4.80091 -1.0769,-7.09827 z\"        sodipodi:nodetypes=\"cccccccccsssssscccccssc\" /></g></svg>"
  };

  return(txt[t]);
}

//  ESPERA

function pgespera(cor1,cor2){
  let tame = (mq.matches) ? `50%` : `200px`;
  return `<div class="central" >
  <svg  viewBox="0 0 460 460" style="width: ${tame}" class="espera-img" ><defs
  <defs
    id="defs1"><linearGradient
      inkscape:collect="always"
      xlink:href="#linearGradient4"
      id="linearGradient15"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-1,0,0,1,-422.9946,135.33696)"
      x1="-160.21399"
      y1="228.76225"
      x2="-38.798149"
      y2="228.76225" /><linearGradient
      id="linearGradient4"
      inkscape:collect="always"><stop
        style="stop-color:${cor1};stop-opacity:1;"
        offset="0"
        id="stop4" /><stop
        style="stop-color:${cor2};stop-opacity:0.19476686;"
        offset="1"
        id="stop5" /></linearGradient><linearGradient
      inkscape:collect="always"
      xlink:href="#linearGradient4"
      id="linearGradient6"
      gradientUnits="userSpaceOnUse"
      x1="-160.21399"
      y1="228.76225"
      x2="-38.798149"
      y2="228.76225"
      gradientTransform="translate(-223.98193,135.33696)" /><linearGradient
      id="linearGradient2"
      inkscape:collect="always"><stop
        style="stop-color:#ffffff;stop-opacity:1;"
        offset="0"
        id="stop1" /><stop
        style="stop-color:#ffffff;stop-opacity:0.19476686;"
        offset="1"
        id="stop2" /></linearGradient></defs><sodipodi:namedview
    id="namedview1"
    pagecolor="#ffffff"
    bordercolor="#000000"
    borderopacity="0.25"
    inkscape:showpageshadow="2"
    inkscape:pageopacity="0.0"
    inkscape:pagecheckerboard="0"
    inkscape:deskcolor="#d1d1d1" /><inkscape:clipboard
    min="-1451.1524,1147.6035"
    max="-993.65038,1604.6426"
    geom-min="-1451.1524,1147.6035"
    geom-max="-993.65038,1604.6426" /><g
    id="g2"
    transform="matrix(3.7795276,0,0,3.7795276,1451.1524,-1147.6035)"><path
      id="path15"
      style="fill:url(#linearGradient15);stroke-width:3.29999"
      d="m -263.02581,367.5295 a 60.707909,60.707909 0 0 1 -14.58308,36.32492 60.707909,60.707909 0 0 1 -0.63666,0.63665 l -14.37587,-14.37586 a 40.376289,40.376289 0 0 0 9.20874,-22.58571 z m -100.6755,0 a 40.376289,40.376289 0 0 0 9.3524,22.57847 l -14.38311,14.3831 a 60.707909,60.707909 0 0 1 -0.46198,-0.46147 60.707909,60.707909 0 0 1 -0.33332,-0.38654 60.707909,60.707909 0 0 1 -4.90357,-6.55154 60.707909,60.707909 0 0 1 -0.25167,-0.39687 60.707909,60.707909 0 0 1 -3.94342,-7.22127 60.707909,60.707909 0 0 1 -0.16899,-0.38085 60.707909,60.707909 0 0 1 -2.89904,-7.77265 60.707909,60.707909 0 0 1 -0.0853,-0.30799 60.707909,60.707909 0 0 1 -1.78542,-8.20726 60.707909,60.707909 0 0 1 -0.0222,-0.185 60.707909,60.707909 0 0 1 -0.3638,-5.09013 z m 14.20378,27.42985 a 40.376289,40.376289 0 0 0 22.57847,9.35189 v 20.25044 a 60.707909,60.707909 0 0 1 -5.09013,-0.3638 60.707909,60.707909 0 0 1 -0.185,-0.0227 60.707909,60.707909 0 0 1 -8.20725,-1.78542 60.707909,60.707909 0 0 1 -0.308,-0.0853 60.707909,60.707909 0 0 1 -7.77265,-2.89905 60.707909,60.707909 0 0 1 -0.38085,-0.16898 60.707909,60.707909 0 0 1 -7.22127,-3.94343 60.707909,60.707909 0 0 1 -0.39687,-0.25115 60.707909,60.707909 0 0 1 -6.55619,-4.90771 60.707909,60.707909 0 0 1 -0.37827,-0.3266 60.707909,60.707909 0 0 1 -0.46509,-0.46508 z m 52.02473,0.007 14.37587,14.37587 a 60.707909,60.707909 0 0 1 -0.63666,0.63665 60.707909,60.707909 0 0 1 -6.93446,5.1909 60.707909,60.707909 0 0 1 -29.39045,9.39167 v -20.38635 a 40.376289,40.376289 0 0 0 22.5857,-9.20874 z" /><path
      id="path11"
      style="fill:url(#linearGradient6);stroke-width:3.29999"
      d="m -326.91803,303.63676 a 60.707909,60.707909 0 0 0 -36.96157,15.21923 l 14.37587,14.37587 a 40.376289,40.376289 0 0 1 22.5857,-9.20874 z m 6.86056,0.008 v 20.2427 a 40.376289,40.376289 0 0 1 22.57847,9.35188 l 14.40119,-14.40119 a 60.707909,60.707909 0 0 0 -36.97966,-15.19339 z m -48.67351,20.06286 a 60.707909,60.707909 0 0 0 -15.21974,36.96157 h 20.38687 a 40.376289,40.376289 0 0 1 9.20874,-22.5857 z m 90.4167,0.0698 -14.31334,14.31333 a 40.376289,40.376289 0 0 1 9.3524,22.57847 h 20.37189 a 60.707909,60.707909 0 0 0 -2.49081,-14.1919 60.707909,60.707909 0 0 0 0,-5.1e-4 60.707909,60.707909 0 0 0 -0.93482,-2.82877 60.707909,60.707909 0 0 0 0,-5.2e-4 60.707909,60.707909 0 0 0 -11.98532,-19.8701 z" /></g></svg>


  </div>`;
}

//  ERRO

function pgerro(erro){
  let tame = (mq.matches) ? `50%` : `300px`;
  return `<div class="central" >
  <h1>Ops!</h1>
  <svg  viewBox="0 0 300 100" style="width: ${tame}" ><defs
  <defs
    id="defs1" /><sodipodi:namedview
    id="namedview1"
    pagecolor="#ffffff"
    bordercolor="#000000"
    borderopacity="0.25"
    inkscape:showpageshadow="2"
    inkscape:pageopacity="0.0"
    inkscape:pagecheckerboard="0"
    inkscape:deskcolor="#d1d1d1" /><inkscape:clipboard
    min="-1271.3226,-34.409537"
    max="-983.00421,62.600659"
    geom-min="-1271.3226,-34.409537"
    geom-max="-983.00421,62.600659" /><g
    id="g1"
    transform="matrix(3.7795276,0,0,3.7795276,1271.3226,34.409537)"><path
      style="fill:#aa0000;fill-opacity:1;stroke-width:2.80002"
      d="m -324.90628,11.546951 -11.33709,-5.0053797 -0.0637,-1.5554 -0.0637,-1.55541 11.34528,-5.66855 c 6.23991,-3.11771 11.39875,-5.66855 11.46407,-5.66855 0.0653,0 0.0904,1.18032 0.0555,2.62291 l -0.0632,2.62291 -7.63291,3.54855997 c -4.19809,1.95172003 -7.73392,3.59238003 -7.8574,3.64592003 -0.3986,0.17285 0.24382,0.46494 7.98918,3.6324 l 7.61338,3.1134897 v 2.642 c 0,1.45309 -0.0253,2.63939 -0.0561,2.63622 -0.0309,-0.003 -5.15782,-2.25819 -11.39323,-5.01112 z"
      id="path45" /><path
      style="fill:#aa0000;fill-opacity:1;stroke-width:2.80002"
      d="m -282.99728,13.926001 0.002,-2.63785 7.57608,-3.0961797 c 7.68338,-3.14003 8.42333,-3.47813 8.02131,-3.66503 -0.12347,-0.0574 -3.6593,-1.70034 -7.85739,-3.65098003 l -7.63291,-3.54659997 -0.0632,-2.61785 c -0.0348,-1.43983 -0.01,-2.61785 0.0555,-2.61785 0.0653,0 5.22417,2.55084 11.46408,5.66855 l 11.34528,5.66855 -0.0637,1.55771 -0.0637,1.55769 -11.3371,5.0080897 c -6.2354,2.75446 -11.36236,5.00842 -11.39322,5.00884 -0.0309,0 -0.055,-1.18629 -0.0535,-2.63709 z"
      id="path46" /><text
      xml:space="preserve"
      style="font-weight:bold;font-size:32.0136px;font-family:Sans;-inkscape-font-specification:'Sans Bold';fill:var(--font-cor2);fill-opacity:1;stroke-width:33.2738"
      x="-302.26538"
      y="13.75352"
      id="text46"
      inkscape:export-filename="indexl.png"
      inkscape:export-xdpi="66.59304"
      inkscape:export-ydpi="66.59304"><tspan
        sodipodi:role="line"
        id="tspan46"
        style="fill:var(--font-cor2);fill-opacity:1;stroke-width:33.274"
        x="-302.26538"
        y="13.75352">!</tspan></text></g></svg>
  </div>`;
}

// imagens

function desrss(cor,tam){
  return txt = `<svg  viewBox="0 0 200 200" style="width: ${tam};" >
  <defs
     id="defs694" /><sodipodi:namedview
     id="namedview692"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1" /><inkscape:clipboard
     style="font-variation-settings:normal;opacity:1;vector-effect:none;fill:${cor};fill-opacity:1;stroke-width:29.37309963;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;-inkscape-stroke:none;paint-order:markers fill stroke;stop-color:#000000;stop-opacity:1"
     min="-349.44336,230.82813"
     max="-161.71289,420.4082"
     geom-min="-349.44336,230.82813"
     geom-max="-161.71289,420.4082" /><g
     id="g696"
     transform="matrix(3.7795276,0,0,3.7795276,349.44336,-230.82813)"><path
       id="path371"
       style="fill:${cor};stroke-width:29.3731;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke"
       d="m -349.44336,230.82813 v 16.89844 16.89648 l 17.74023,2.42188 c 36.33415,4.95824 65.76314,19.41207 90.81836,44.60351 8.32376,8.36902 18.84899,21.49375 23.38867,29.16602 10.38434,17.54998 20.06477,46.19369 21.99414,65.07812 l 1.48243,14.51563 h 16.15429 16.15235 l -1.33594,-18.81641 c -3.22343,-45.38418 -31.1298,-97.1492 -68.67774,-127.39453 -26.84196,-21.62154 -67.56595,-38.13804 -103.20117,-41.85547 z m 0,67.00586 v 15.74805 15.74804 l 13.43945,2.49219 c 27.29252,5.05877 54.41019,24.76235 66.38672,48.23828 3.54175,6.94238 10.29856,31.97374 10.45508,38.73438 0.0205,0.88705 7.29359,1.61328 16.16406,1.61328 h 16.12891 v -8.15039 c 0,-11.95898 -5.57593,-31.84466 -13.39258,-47.76172 -17.65023,-35.94116 -64.54797,-66.66211 -101.76172,-66.66211 z m 25.41992,75.26367 c -5.17597,0 -11.5658,1.51152 -14.20117,3.35742 -7.25896,5.08437 -11.80662,15.41265 -10.30664,23.40821 1.24774,6.65108 9.64031,16.50561 16.29101,19.1289 1.7741,0.69977 6.6124,0.85489 10.75195,0.34375 18.15815,-2.24211 25.96841,-25.79923 13.11524,-39.55859 -5.14103,-5.50349 -7.89549,-6.67969 -15.65039,-6.67969 z"
       transform="scale(0.26458333)" /></g></svg>
`;
}

function desfiltro(cor,tam){
  return txt = `<svg  viewBox="0 0 200 200" style="width: ${tam};" >
  <defs
     id="defs2355" /><sodipodi:namedview
     id="namedview2353"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1" /><inkscape:clipboard
     style="font-variation-settings:normal;opacity:1;vector-effect:none;fill:${cor};fill-opacity:1;stroke-width:10.87487244;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;-inkscape-stroke:none;paint-order:markers fill stroke;stop-color:#000000;stop-opacity:1"
     min="-314.21649,-69.429366"
     max="-186.8389,131.70939"
     geom-min="-314.21649,-69.429366"
     geom-max="-186.8389,131.70939" /><g
     id="g2357"
     transform="matrix(3.7795276,0,0,3.7795276,314.21649,69.429366)"><path
       id="path676"
       style="fill:${cor};fill-opacity:1;stroke-width:2.87731;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke"
       d="m -83.136446,-18.369853 12.81049,25.6209771 V 27.79395 l 7.898838,7.05416 0.137586,-27.5078169 12.855073,-25.7101461 z" /></g></svg>

`;
}
