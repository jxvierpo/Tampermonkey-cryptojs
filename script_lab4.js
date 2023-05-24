// ==UserScript==
// @name         Cripto Lab4 Javier Ahumada
// @namespace    https://www.example.com/
// @version      1.0
// @description  Obtiene las mayúsculas al comienzo de cada oración en un párrafo de la página https://cripto.tiiny.site/ y descifra los IDs de los elementos div con la clase Mx utilizando CryptoJS y 3DES en modo ECB
// @author       CHATGPT
// @match        https://cripto.tiiny.site/

// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @integrity    sha384-S3wQ/l0OsbJoFeJC81UIr3JOlx/OzNJpRt1bV+yhpWQxPAahfpQtpxBSfn+Isslc
// @grant        none
// ==/UserScript==

(function() {

        'use strict';

        var body = document.querySelector('body');
        var parrafo = body.querySelector('div.Parrafo');
        var textoParrafo = parrafo.innerText;

        var mayusculas = textoParrafo.match(/(?:^|[.!?]\s+)([A-Z])/g);
        mayusculas = mayusculas.map(function(mayus) {
            return mayus.replace(/[^A-Z]/g, '');
        });
        var palabra = mayusculas.join('');

        console.log('La llave es:', palabra);

        var elementos = body.querySelectorAll('div[class^="M"]');
        var cantidad = elementos.length;

        console.log('Los mensajes cifrados son:', cantidad);

        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
        script.integrity = 'sha384-S3wQ/l0OsbJoFeJC81UIr3JOlx/OzNJpRt1bV+yhpWQxPAahfpQtpxBSfn+Isslc';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        var Key = CryptoJS.enc.Utf8.parse(palabra);

        script.onload = function() {
        elementos.forEach(function(elemento) {
            var idCifrado = elemento.id;
            var idDescifrado = CryptoJS.TripleDES.decrypt(idCifrado, Key, {
                mode: CryptoJS.mode.ECB
            }).toString(CryptoJS.enc.Utf8);

            console.log(idCifrado,' ',idDescifrado);
        });
        };
})();