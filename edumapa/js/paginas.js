/*      VARIAVEIS       */

var map;
var consultajson;
var ctx;
var ctxq;
var chart;
var icones = {};
var markerArray = [];

var listainfra = [];

const apinomes = {
  "enderecoantes" : "https://opencep.com/v1/",
  "enderecodepois" : "",
  "estado" : "uf",
  "cidade" : "localidade",
  "bairro" : "bairro",
  "ibge" : "ibge"
}

var mediaideb = {
  "br" : 4.3,
  "sp" : 6.3,
  "municipio" : 0
};


/*      FUNÇÕES       */

function conf(){
  pgindex();
}

function enulo(str){
  return (str === null) ? `` : str;
}


/*
"enderecoantes" : "https://brasilapi.com.br/api/cep/v1/",
"enderecodepois" : "",
"estado" : "state",
"cidade" : "city",
"bairro" : "neighborhood"
*/

function consultacep(){
  let cep = document.getElementById(`index-cep`).value;
  if(cep !== ``){
    chamaget(`${apinomes.enderecoantes}${cep}${apinomes.enderecodepois}`,terconsultacep);
  }
  else {
    escreve(`Digite um número válido`,`index-span`);
  }

}



function terconsultacep(resp){
  if(JSON.parse(resp)){
    consultajson = JSON.parse(resp);
    listainfra = [];
      escrevelista();
  }
  else {
    escreve(`Digite um número válido`,`index-span`);
  }
}

function escrevelista(){
  let txt = `<div class="container" >
  <h1>Consulta para ${consultajson[apinomes.cidade]} - ${consultajson[apinomes.estado]}</h1>
  <div class="corpo" >
    <div class="corpo" >
      <div id="map" class="corpo" style="height: 300px; margin-bottom: 30px;" ></div><br><br></div>
    </div>
    <div class="central" id="div-lista-escolas" ></div>
  </div>
  `;

  escreve(txt);

  map = L.map('map').setView([-22.2443, -45.7230], 12);

  icones['verde'] = L.icon({
   iconUrl: 'images/pin-verde.png',
   shadowUrl: 'images/sombra.png',

   iconSize:     [21, 30], // size of the icon
   shadowSize:   [36, 20], // size of the shadow
   iconAnchor:   [11, 34], // point of the icon which will correspond to marker's location
   shadowAnchor: [10, 16],  // the same for the shadow
   popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor
 });

   icones['vermelho'] = L.icon({
     iconUrl: 'images/pin-vermelho.png',
     shadowUrl: 'images/sombra.png',

     iconSize:     [21, 30], // size of the icon
     shadowSize:   [36, 20], // size of the shadow
     iconAnchor:   [11, 34], // point of the icon which will correspond to marker's location
     shadowAnchor: [10, 16],  // the same for the shadow
     popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor
 });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);



  let txtescolas = ``;
  let bairrocep = trata(consultajson[apinomes.bairro]);
  let tampop = 0;
  let qqcoisa = `${consultajson[apinomes.ibge]}05`;
  if(cidadesjs[qqcoisa]){
    tampop = parseInt(cidadesjs[`${consultajson[apinomes.ibge]}05`][`pop_2010`]);
  }

  for(let i in dados){
    for(let l in dados[i].LISTA_INFRAESTRUTURAS){
      if(listainfra.indexOf(dados[i].LISTA_INFRAESTRUTURAS[l]) === -1){
        listainfra.push(dados[i].LISTA_INFRAESTRUTURAS[l]);
      }
    }
    if(tampop < 100000){
      if(dados[i].NO_MUNICIPIO === `${consultajson[apinomes.cidade]}` && dados[i].SG_UF === `${consultajson[apinomes.estado]}`) {
        txtescolas += `<a href="javascript:pgescola(${i})" class="bt-download-pq" style="color: #000000;" >${dados[i].NO_ENTIDADE}</a><br>`;
      }
    }
    else{
      if(dados[i].NO_MUNICIPIO === `${consultajson[apinomes.cidade]}` && dados[i].SG_UF === `${consultajson[apinomes.estado]}` && trata(dados[i].NO_BAIRRO) === bairrocep) {
        txtescolas += `<a href="javascript:pgescola(${i})" class="bt-download-pq" style="color: #000000;" >${dados[i].NO_ENTIDADE}</a><br>`;
        console.log(dados[i].longitude);
        if(dados[i].longitude !== null){
          let txtpopup = `<h1>${dados[i].NO_ENTIDADE}</h1>
          <p></p>
          <p><a href="javascript:pgescola(${i})" >Veja mais</a></p>
          `;
          L.marker([dados[i].latitude, dados[i].longitude], {icon: icones['verde']}).addTo(map).bindPopup(txtpopup);
            map.setView([dados[i].latitude, dados[i].longitude], 12);
        //  markerArray.push(marker);
        }
      }
    }
    }

  if(txtescolas === ``) {
    txtescolas = `<h2>Desculpe! Não há escolas cadastradas na nossa base dados para o seu CEP.</h2>`;
  }
  else{

  }

  group = L.featureGroup(markerArray);
//  map.fitBounds(group.getBounds());

  escreve(txtescolas,`div-lista-escolas`);
}

/*      PÁGINAS       */

function pgteste(){

  let cont = 0;

  let txt = `dados = [
    `;

  for(let i in dados){
    if(dados[i].SG_UF === `SP`){
      if(cont !== 0) { txt += `, `; }
      txt += JSON.stringify(dados[i]);
      cont++;
    }
  }

  txt += `
];`;

escreve(txt);
}

function pgtestemapa(){
  let txt = `<div class="container" ><h2>Mapa</h2>
  <div id="map" class="corpo" style="height: 300px; margin-bottom: 30px;" ></div><br><br></div>`;

  escreve(txt);
  map = L.map('map').setView([-22.2443, -45.7230], 12);

  icones['verde'] = L.icon({
   iconUrl: 'images/pin-verde.png',
   shadowUrl: 'images/sombra.png',

   iconSize:     [21, 30], // size of the icon
   shadowSize:   [36, 20], // size of the shadow
   iconAnchor:   [11, 34], // point of the icon which will correspond to marker's location
   shadowAnchor: [10, 16],  // the same for the shadow
   popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor
 });

   icones['vermelho'] = L.icon({
     iconUrl: 'images/pin-vermelho.png',
     shadowUrl: 'images/sombra.png',

     iconSize:     [21, 30], // size of the icon
     shadowSize:   [36, 20], // size of the shadow
     iconAnchor:   [11, 34], // point of the icon which will correspond to marker's location
     shadowAnchor: [10, 16],  // the same for the shadow
     popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor
 });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  L.marker([-22.2465, -45.7265], {icon: icones['vermelho']}).addTo(map).bindPopup("I am a green leaf.");
  L.marker([-22.3465, -45.6265], {icon: icones['verde']}).addTo(map).bindPopup("I am a green leaf.");

  // markerArray.push(marker);
  // group = L.featureGroup(markerArray);
  // map.fitBounds(group.getBounds());

}

function pgindex(){
  let txt = `<div class="container" style="margin-top: 3%;" >

    <h1> Para consultar as escolas da sua região insira o seu CEP na caixa de texto abaixo. </h1>
    <h2>Digite seu CEP (apenas números)</h2>
    <input type="number" id="index-cep" class="blog-input-texto" ><br>
    <a href="javascript:consultacep()" class="bt-download-pq" style="color: #000000;" >Enviar</a>
    <span style="clor: #500000; font-size: 1.8em;" id="index-span" ></span>
    <h3> Fazendo a pesquisa você conseguirá acessar dados dos colegios da sua região, podendo também ter um comparativo dos seus índices em relação aos outros colegios. </h3>
  </div>`;

  escreve(txt);
}

function pgescola(i){

  let acessivel = (dados[i].TAXA_DE_ACESSIBILIDADE > 0) ? `Adaptada`: `Não adaptada`;

  let txtinfra = `<ol>`;

  for(let acessivel in dados[i].TAXA_DE_ACESSIBILIDADE){
    console.log(dados[i]['TAXA_DE_ACESSIBILIDADE'][acessivel]);
    txtinfra += `<li>${dados[i].TAXA_DE_ACESSIBILIDADE[acessivel]};</li>`;
  }

  txtinfra += `</ol>`;

  console.log(dados[i].IDEB_2023);

  let notaideb = (dados[i].IDEB_2023 !== null) ? `<h2>Nota IDEB</h2><p>Média escola: <b>${parseFloat(dados[i].IDEB_2023.replace(',','.'))}</b>;<br>Média Brasil: <b>${mediaideb['br']}</b> </p>` : ``;

  let txt = `<div class="container" >
    <button class="botao">
    <a href="javascript:escrevelista()"style="color:black" >Voltar</a></button>
    <h1>${enulo(dados[i].NO_ENTIDADE)}</h1>
    <h2>Endereço</h2>
    <p>${enulo(dados[i].DS_ENDERECO)} ${enulo(dados[i].NU_ENDERECO)} ${enulo(dados[i].DS_COMPLEMENTO)} ${enulo(dados[i].NO_BAIRRO)};</p>
    <h2>Atributos</h2>
    <p>Acessibilidade: <b>${acessivel}</b></p>
    <p>Infraestrutura: <b>${dados[i].LISTA_INFRAESTRUTURAS.length}/${listainfra.length}</b></p>
    ${notaideb}

  </div>`;

  escreve(txt);
}

function pgsobre(){

  let txt = `<div class= "sobreNos"><h1> <p>No EduMapa, acreditamos que a transparência e o acesso à informação são fundamentais para a melhoria da educação pública. Nosso objetivo é fornecer uma visão clara e acessível sobre a situação estrutural e o desempenho acadêmico das escolas públicas em todo o país.
</p>
<p>
Com base em dados coletados de fontes governamentais, nossa plataforma oferece informações que ajudam familias, gestores, educadores e a sociedade a identificar desafios e buscar soluções.
</p>
<p>
Somos uma equipe comprometida com a educação, a inovação e o impacto social. Por meio de tecnologia e dados, buscamos promover um futuro onde todos os estudantes tenham acesso a escolas seguras, bem estruturadas e com ensino de qualidade.
</p>
<p>
Junte-se a nós nessa missão e faça parte da transformação da educação pública!
</h1></div>`;

  escreve(txt);
}
