/* Código compartilhado: seletor de tema e aviso de cookies */
(function () {
    'use strict';

    var html = document.documentElement;
    var CHAVE_TEMA = 'ieadb-tema';
    var CHAVE_COOKIES = 'ieadb-cookies';

    function ler(chave) {
        try { return localStorage.getItem(chave); } catch (e) { return null; }
    }

    function gravar(chave, valor) {
        try { localStorage.setItem(chave, valor); } catch (e) { /* armazenamento indisponível */ }
    }

    /* ---------- Tema claro / escuro ---------- */

    var MODELO_TOGGLE =
        '<label class="tema-toggle">' +
        '<input type="checkbox" class="tema-toggle__input" role="switch" aria-label="Alternar entre tema claro e escuro">' +
        '<svg class="tema-toggle__svg" viewBox="0 0 69.667 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
        '<g transform="translate(3.5 3.5)">' +
        '<g transform="matrix(1, 0, 0, 1, -3.5, -3.5)"><rect class="tema-toggle__fundo" transform="translate(3.5 3.5)" rx="17.5" height="35" width="60.667"></rect></g>' +
        '<g class="tema-toggle__botao" transform="translate(2.333 2.333)">' +
        '<g class="tema-toggle__sol">' +
        '<g transform="matrix(1, 0, 0, 1, -5.83, -5.83)"><circle fill="#f8e664" transform="translate(5.83 5.83)" r="15.167" cy="15.167" cx="15.167"></circle></g>' +
        '<g transform="matrix(1, 0, 0, 1, -5.83, -5.83)"><path fill="rgba(246,254,247,0.29)" transform="translate(9.33 9.33)" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z"></path></g>' +
        '<circle fill="#fcf4b9" transform="translate(8.167 8.167)" r="7" cy="7" cx="7"></circle>' +
        '</g>' +
        '<g class="tema-toggle__lua">' +
        '<g transform="matrix(1, 0, 0, 1, -31.5, -5.83)"><circle fill="#cce6ee" transform="translate(31.5 5.83)" r="15.167" cy="15.167" cx="15.167"></circle></g>' +
        '<g fill="#a6cad0" transform="translate(-24.415 -1.009)">' +
        '<circle transform="translate(43.009 4.496)" r="2" cy="2" cx="2"></circle>' +
        '<circle transform="translate(39.366 17.952)" r="2" cy="2" cx="2"></circle>' +
        '<circle transform="translate(33.016 8.044)" r="1" cy="1" cx="1"></circle>' +
        '<circle transform="translate(51.081 18.888)" r="1" cy="1" cx="1"></circle>' +
        '<circle transform="translate(33.016 22.503)" r="1" cy="1" cx="1"></circle>' +
        '<circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5"></circle>' +
        '</g></g></g>' +
        '<g class="tema-toggle__nuvem" transform="matrix(1, 0, 0, 1, -3.5, -3.5)"><path fill="#fff" transform="translate(-3466.47 -160.94)" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z"></path></g>' +
        '<g class="tema-toggle__estrelas" fill="#def8ff" transform="translate(3.585 1.325)">' +
        '<path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z"></path>' +
        '<path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z"></path>' +
        '<path transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z"></path>' +
        '<path transform="translate(12.677 0.388) rotate(104)" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z"></path>' +
        '<path transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z"></path>' +
        '<path transform="translate(8.326 28.061) rotate(11)" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z"></path>' +
        '<path transform="translate(5.012 5.962) rotate(172)" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z"></path>' +
        '<path transform="translate(2.218 14.616) rotate(169)" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z"></path>' +
        '</g></g></svg></label>';

    function temaAtual() {
        return html.getAttribute('data-tema') === 'dark' ? 'dark' : 'light';
    }

    function sincronizarSeletores() {
        var escuro = temaAtual() === 'dark';
        document.querySelectorAll('.tema-toggle__input').forEach(function (input) {
            input.checked = escuro;
        });
    }

    function aplicarTema(tema) {
        html.setAttribute('data-tema', tema);
        sincronizarSeletores();
    }

    document.querySelectorAll('[data-tema-toggle]').forEach(function (host) {
        host.innerHTML = MODELO_TOGGLE;
        host.querySelector('input').addEventListener('change', function (e) {
            var tema = e.target.checked ? 'dark' : 'light';
            aplicarTema(tema);
            gravar(CHAVE_TEMA, tema);
        });
    });
    sincronizarSeletores();

    // Sem preferência salva, acompanha o tema do sistema
    if (window.matchMedia) {
        var sistema = window.matchMedia('(prefers-color-scheme: dark)');
        var aoMudar = function (e) {
            if (!ler(CHAVE_TEMA)) { aplicarTema(e.matches ? 'dark' : 'light'); }
        };
        if (sistema.addEventListener) { sistema.addEventListener('change', aoMudar); }
        else if (sistema.addListener) { sistema.addListener(aoMudar); }
    }

    // Mantém várias abas em sincronia
    window.addEventListener('storage', function (e) {
        if (e.key === CHAVE_TEMA && (e.newValue === 'dark' || e.newValue === 'light')) {
            aplicarTema(e.newValue);
        }
    });

    /* ---------- Aviso de cookies ---------- */

    if (ler(CHAVE_COOKIES) === 'aceito') { return; }

    var MODELO_COOKIES =
        '<div class="cookie-card__corpo">' +
        '<svg class="cookie-card__icone" xmlns="http://www.w3.org/2000/svg" fill="none" height="46" width="65" aria-hidden="true" focusable="false">' +
        '<path class="cookie-card__contorno" stroke="#000" fill="#EAB789" d="M49.157 15.69L44.58.655l-12.422 1.96L21.044.654l-8.499 2.615-6.538 5.23-4.576 9.153v11.114l4.576 8.5 7.846 5.23 10.46 1.96 7.845-2.614 9.153 2.615 11.768-2.615 7.846-7.846 1.96-5.884.655-7.191-7.846-1.308-6.537-3.922z"></path>' +
        '<path fill="#9C6750" d="M32.286 3.749c-6.94 3.65-11.69 11.053-11.69 19.591 0 8.137 4.313 15.242 10.724 19.052a20.513 20.513 0 01-8.723 1.937c-11.598 0-21-9.626-21-21.5 0-11.875 9.402-21.5 21-21.5 3.495 0 6.79.874 9.689 2.42z" clip-rule="evenodd" fill-rule="evenodd"></path>' +
        '<path fill="#634647" d="M64.472 20.305a.954.954 0 00-1.172-.824 4.508 4.508 0 01-3.958-.934.953.953 0 00-1.076-.11c-.46.252-.977.383-1.502.382a3.154 3.154 0 01-2.97-2.11.954.954 0 00-.833-.634 4.54 4.54 0 01-4.205-4.507c.002-.23.022-.46.06-.687a.952.952 0 00-.213-.767 3.497 3.497 0 01-.614-3.5.953.953 0 00-.382-1.138 3.522 3.522 0 01-1.5-3.992.951.951 0 00-.762-1.227A22.611 22.611 0 0032.3 2.16 22.41 22.41 0 0022.657.001a22.654 22.654 0 109.648 43.15 22.644 22.644 0 0032.167-22.847zM22.657 43.4a20.746 20.746 0 110-41.493c2.566-.004 5.11.473 7.501 1.407a22.64 22.64 0 00.003 38.682 20.6 20.6 0 01-7.504 1.404zm19.286 0a20.746 20.746 0 112.131-41.384 5.417 5.417 0 001.918 4.635 5.346 5.346 0 00-.133 1.182A5.441 5.441 0 0046.879 11a5.804 5.804 0 00-.028.568 6.456 6.456 0 005.38 6.345 5.053 5.053 0 006.378 2.472 6.412 6.412 0 004.05 1.12 20.768 20.768 0 01-20.716 21.897z"></path>' +
        '<path fill="#644647" d="M54.962 34.3a17.719 17.719 0 01-2.602 2.378.954.954 0 001.14 1.53 19.637 19.637 0 002.884-2.634.955.955 0 00-1.422-1.274z"></path>' +
        '<path stroke-width="1.8" stroke="#644647" fill="#845556" d="M44.5 32.829c-.512 0-1.574.215-2 .5-.426.284-.342.263-.537.736a2.59 2.59 0 104.98.99c0-.686-.458-1.241-.943-1.726-.485-.486-.814-.5-1.5-.5zm-30.916-2.5c-.296 0-.912.134-1.159.311-.246.177-.197.164-.31.459a1.725 1.725 0 00-.086.932c.058.312.2.6.41.825.21.226.477.38.768.442.291.062.593.03.867-.092s.508-.329.673-.594a1.7 1.7 0 00.253-.896c0-.428-.266-.774-.547-1.076-.281-.302-.471-.31-.869-.311zm17.805-11.375c-.143-.492-.647-1.451-1.04-1.78-.392-.33-.348-.255-.857-.31a2.588 2.588 0 10.441 5.06c.66-.194 1.064-.788 1.395-1.39.33-.601.252-.92.06-1.58zm-22 2c-.143-.492-.647-1.451-1.04-1.78-.391-.33-.347-.255-.856-.31a2.589 2.589 0 10.44 5.06c.66-.194 1.064-.788 1.395-1.39.33-.601.252-.92.06-1.58zM38.112 7.329c-.395 0-1.216.179-1.545.415-.328.236-.263.218-.415.611-.151.393-.19.826-.114 1.243.078.417.268.8.548 1.1.28.301.636.506 1.024.59.388.082.79.04 1.155-.123.366-.163.678-.438.898-.792.22-.354.337-.77.337-1.195 0-.57-.354-1.031-.73-1.434-.374-.403-.628-.415-1.158-.415zm-19.123.703c.023-.296-.062-.92-.219-1.18-.157-.26-.148-.21-.432-.347a1.726 1.726 0 00-.922-.159 1.654 1.654 0 00-.856.344 1.471 1.471 0 00-.501.73c-.085.285-.077.589.023.872.1.282.287.532.538.718a1.7 1.7 0 00.873.323c.427.033.793-.204 1.116-.46.324-.256.347-.445.38-.841z"></path>' +
        '<path fill="#634647" d="M15.027 15.605a.954.954 0 00-1.553 1.108l1.332 1.863a.955.955 0 001.705-.77.955.955 0 00-.153-.34l-1.331-1.861z"></path>' +
        '<path fill="#644647" d="M43.31 23.21a.954.954 0 101.553-1.11l-1.266-1.772a.954.954 0 10-1.552 1.11l1.266 1.772z"></path>' +
        '<path fill="#634647" d="M19.672 35.374a.954.954 0 00-.954.953v2.363a.954.954 0 001.907 0v-2.362a.954.954 0 00-.953-.954z"></path>' +
        '<path fill="#644647" d="M33.129 29.18l-2.803 1.065a.953.953 0 00-.053 1.764.957.957 0 00.73.022l2.803-1.065a.953.953 0 00-.677-1.783v-.003zm24.373-3.628l-2.167.823a.956.956 0 00-.054 1.764.954.954 0 00.73.021l2.169-.823a.954.954 0 10-.678-1.784v-.001z"></path>' +
        '</svg>' +
        '<p class="cookie-card__titulo" id="cookie-titulo">Sua privacidade é importante</p>' +
        '<p class="cookie-card__texto" id="cookie-descricao">Utilizamos cookies para lembrar suas preferências e melhorar sua experiência durante a navegação. ' +
        'Para saber mais, consulte nossa <button type="button" class="cookie-card__link" aria-controls="cookie-detalhes">Política de Privacidade</button>.</p>' +
        '<div class="cookie-card__detalhes" id="cookie-detalhes" tabindex="-1" hidden>' +
        '<p><strong>O que este site guarda no seu navegador:</strong></p>' +
        '<ul>' +
        '<li><strong>Tema claro ou escuro:</strong> salvo no armazenamento local (localStorage) quando você escolhe um tema.</li>' +
        '<li><strong>Sua resposta a este aviso:</strong> salva no armazenamento local para que ele não apareça de novo.</li>' +
        '<li><strong>Tela de carregamento:</strong> um registro no armazenamento da sessão (sessionStorage) só para não repetir a animação de abertura enquanto a aba estiver aberta.</li>' +
        '</ul>' +
        '<p>Este site não usa cookies de publicidade, de análise de acesso ou de rastreamento. Por isso, não há cookies opcionais para recusar.</p>' +
        '</div>' +
        '<div class="cookie-card__acoes">' +
        '<button type="button" class="cookie-card__mais" aria-expanded="false" aria-controls="cookie-detalhes">Mais opções</button>' +
        '<button type="button" class="cookie-card__aceitar">Aceitar</button>' +
        '</div>' +
        '</div>';

    var card = document.createElement('div');
    card.className = 'cookie-card';
    card.id = 'cookie-aviso';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'false');
    card.setAttribute('aria-labelledby', 'cookie-titulo');
    card.setAttribute('aria-describedby', 'cookie-descricao');
    card.hidden = true;
    card.innerHTML = MODELO_COOKIES;
    document.body.appendChild(card);

    var detalhes = card.querySelector('.cookie-card__detalhes');
    var botaoMais = card.querySelector('.cookie-card__mais');

    function alternarDetalhes(abrir) {
        detalhes.hidden = !abrir;
        botaoMais.setAttribute('aria-expanded', String(abrir));
    }

    botaoMais.addEventListener('click', function () {
        alternarDetalhes(detalhes.hidden);
    });

    card.querySelector('.cookie-card__link').addEventListener('click', function () {
        alternarDetalhes(true);
        detalhes.focus({ preventScroll: true });
    });

    card.querySelector('.cookie-card__aceitar').addEventListener('click', function () {
        gravar(CHAVE_COOKIES, 'aceito');
        card.classList.add('is-saindo');
        setTimeout(function () { card.remove(); }, 300);
    });

    // Aparece depois da tela de carregamento (se houver)
    var exibido = false;
    function exibir() {
        if (exibido) { return; }
        exibido = true;
        card.hidden = false;
    }

    if (html.classList.contains('carregando')) {
        document.addEventListener('carregamento:fim', exibir, { once: true });
        setTimeout(exibir, 13000);
    } else {
        setTimeout(exibir, 800);
    }
})();
