/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet) {
  str = str.toUpperCase();

  let letters = alphabet.split('');//splitta alphabet til að gera það nothæft
  let output = '';

  //debugger;
  for(var i = 0; i < str.length; i++){
    let stafur = str[i];
    
    if(stafur === ' '){//ef það eru einhvervegin bil
      output += stafur;
      continue;
    }

    let staf_index = letters.indexOf(stafur)

    let nytt_index = staf_index + parseInt(n);//mikilvægt að hafa parseint

    if(nytt_index > letters.length -1)
      nytt_index = nytt_index - letters.length;

    if(nytt_index < 0)
      nytt_index = nytt_index + letters.length;

    output += letters[nytt_index];
  }
  //debugger;
  return output;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet) {
  str = str.toUpperCase();

  let letters = alphabet.split('');//splitta alphabet til að gera það nothæft
  let output = '';

  
  for(var i = 0; i < str.length; i++){
    //debugger;
    let stafur = str[i];

    if(stafur === ' '){//ef það eru einhvervegin bil
      output += stafur;
      continue;
    }

    let staf_index = letters.indexOf(stafur)

    let nytt_index = staf_index - parseInt(n);

    if(nytt_index > letters.length -1)
      nytt_index = nytt_index - letters.length;

    if(nytt_index < 0)
      nytt_index = nytt_index + letters.length;

    output += letters[nytt_index];
  }
  //debugger;
  return output;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';
  //let type = document.querySelectorAll('input[type=radio]'); 

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  let input = '';
  let output = '';
  let n = 0;//núllstilling til að setja tölurnar saman rétt

  let inputElement;
  let shiftElement;
  let resultElement;

  // todo rest
  
  //let radioElement;//type
  //let type;//radioElement

  function writeResult() {
    eshElement.textContent = shift;
    debugger;
    if (type === 'encode') {
      // skrifa út encode(input, shift, alphabet);
      output = encode(input, shift, alphabet);
    } else {
      output = decode(input, shift, alphabet);
    }
    
    resultElement.textContent = output;
  
    //debugger;
  }


  function inputEvent() {
    input = inputElement.value;
    
    /*shift = shiftElement.value;
    alphabet = alphaElement.value;
      */
    writeResult();
  }

  function radioEvent() {
    type = typeElement.value;

    debugger;
    writeResult();
  }

  function shiftEvent() {
    shift = shiftElement.value;

    writeResult();
  }

  function alphabetEvent() {
    alphabet = alphaElement.value;

    writeResult();
  }

  

  

  function init(el) {
    // Setja event handlera á viðeigandi element

    inputElement = el.querySelector('#input');
    shiftElement = el.querySelector('#shift');
    resultElement = el.querySelector('.result');
    eshElement = el.querySelector('.shiftValue');//synir hlidrunar tölu
    alphaElement = el.querySelector('#alphabet');
    typeElement = el.querySelector('.radio'); //encode/decode

    typeElement.addEventListener('change', radioEvent);
    alphaElement.addEventListener('input', alphabetEvent);
    inputElement.addEventListener('input', inputEvent);
    shiftElement.addEventListener('input', shiftEvent);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
