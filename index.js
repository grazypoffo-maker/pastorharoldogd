/* Página inicial: tela de carregamento, cards da missão e revelação ao rolar */
(function () {
    'use strict';

    var html = document.documentElement;
    var DURACAO = 10000; // tempo da tela de carregamento (10 segundos)
    var SAIDA = 900;     // tempo da transição de saída

    /* ---------- Tela de carregamento ---------- */
    var tela = document.getElementById('carregamento');
    var bloqueados = [];

    function anunciarFim() {
        document.dispatchEvent(new Event('carregamento:fim'));
    }

    function finalizar() {
        try {
            bloqueados.forEach(function (el) { el.inert = false; });
            if (tela) { tela.hidden = true; }
        } finally {
            html.classList.remove('carregando', 'bloqueado');
            anunciarFim();
        }
    }

    if (tela && html.classList.contains('carregando')) {
        // O cronômetro é criado primeiro: mesmo que algo falhe depois, a tela sai
        setTimeout(function () {
            if (tela) { tela.classList.add('saindo'); }
            setTimeout(finalizar, SAIDA);
        }, DURACAO);

        try {
            html.classList.add('bloqueado');
            Array.prototype.forEach.call(document.body.children, function (el) {
                if (el !== tela && el.tagName !== 'SCRIPT') {
                    el.inert = true;
                    bloqueados.push(el);
                }
            });
        } catch (erro) { /* a tela continua funcionando sem o bloqueio */ }
    } else {
        anunciarFim();
    }

    /* ---------- Cards interativos ---------- */
    try {
        document.querySelectorAll('.info-card').forEach(function (card) {
            var botao = card.querySelector('.info-card__alternar');
            var ultimoPonteiro = '';

            function definir(aberto) {
                card.classList.toggle('is-aberto', aberto);
                botao.setAttribute('aria-expanded', String(aberto));
            }

            definir(false);

            card.addEventListener('pointerdown', function (e) { ultimoPonteiro = e.pointerType; });

            // Mouse: abre ao passar por cima
            card.addEventListener('pointerenter', function (e) {
                if (e.pointerType === 'mouse') { definir(true); }
            });
            card.addEventListener('pointerleave', function (e) {
                if (e.pointerType === 'mouse') { definir(false); }
            });

            // Toque e teclado (Enter / Espaço): alterna ao clicar
            card.addEventListener('click', function () {
                if (ultimoPonteiro === 'mouse') { ultimoPonteiro = ''; return; }
                definir(!card.classList.contains('is-aberto'));
                ultimoPonteiro = '';
            });

            card.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') { definir(false); }
            });
        });
    } catch (erro) {
        html.classList.remove('js');
    }

    /* ---------- Revelação ao rolar ---------- */
    try {
        var itens = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
        var menosMovimento = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (menosMovimento || !('IntersectionObserver' in window)) {
            itens.forEach(function (el) { el.classList.add('is-visible'); });
        } else {
            var observer = new IntersectionObserver(function (entradas, obs) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('is-visible');
                        obs.unobserve(entrada.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

            itens.forEach(function (el) { observer.observe(el); });
        }
    } catch (erro) {
        html.classList.remove('js');
    }
})();
