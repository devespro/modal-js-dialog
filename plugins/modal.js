Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div');
    }

    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');
    buttons.forEach(btn => {
        const $btn = document.createElement('button');
        $btn.classList.add('btn');
        $btn.classList.add(`btn-${btn.type}`);
        $btn.textContent = btn.text;
        $btn.onclick = btn.handler || noop;
        wrap.appendChild($btn);
    });
    return wrap;
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px';
    const close = options.closable ? '<span class="modal-close" data-close="true">&times;</span>' : ''
    const modal = document.createElement('div');
    modal.classList.add('custom-modal');
    modal.insertAdjacentHTML('afterbegin', `
            <div class="modal-overlay" data-close="true">
                <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                    <div class="modal-header">
                        <span class="modal-title">${options.title || 'Modal title'}</span>
                        ${close}
                    </div>
                    <div class="modal-body" data-content>
                        <p>${options.content || ''}</p>
                    </div>
                </div>
            </div>
    `);
    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal);
    return modal;
}

$.modal = function (options) {
    const ANIMATION_SPEED = 20;
    let closing = false;
    let destroyed = false;
    let $modal = _createModal(options);
    const modal = {
        open() {
            if (destroyed) {
                return console.log('The modal is destroyed');
            }
            options.onOpen ? options.onOpen() : null;
            !closing && $modal.classList.add('open');
        },
        close() {
            closing = true;
            options.onClose ? options.onClose() : null;
            setTimeout(() => {
                $modal.classList.remove('open');
                closing = false;
            }, ANIMATION_SPEED)
        },
        setContent(html){
           $modal.querySelector('[data-content]').innerHTML = html;
        }
    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close();
        }
    }

    $modal.addEventListener('click', listener);

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal); // remove a modal from the DOM
            $modal.removeEventListener('click', listener);
            destroyed = true;
        }
    });
}
