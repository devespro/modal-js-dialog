let fruits = [
    {
        id: 1,
        title: 'Apple',
        price: 20,
        img: 'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png'
    },
    {
        id: 2,
        title: 'Orange',
        price: 30,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-ElBK-s3mDUKCvuo4naP191o92qERwIDYJg&usqp=CAU'
    },
    {id: 3, title: 'Mango', price: 40, img: 'https://exoticfruitbox.com/wp-content/uploads/2015/10/mango.jpg'}
]

const priceModal = $.modal({
    title: 'Product price',
    width: '400px',
    closable: true,
    footerButtons: [
        {
            text: 'Close',
            type: 'primary',
            handler() {
                priceModal.close();
            }
        }

    ],
    onClose(result) {
        console.log('The modal has been closed!' + result)
    },
    onOpen() {
        console.log('The modal has been opened!')
    }
});

function toHtml(fruit) {
    return `
     <div class="col">
            <div class="card">
                <img class="card-img-top"
                     src="${fruit.img}"
                     alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Show price</a>
                    <a href="#" class="btn btn-danger" data-btn="delete" data-id="${fruit.id}">Delete</a>
                </div>
            </div>
     </div>
    `;
}

function render() {
    const container = document.querySelector('#fruits');
    container.innerHTML = fruits.map(fruit => toHtml(fruit)).join('');

}

document.addEventListener('click', $event => {
    $event.preventDefault();
    const btn = $event.target.dataset.btn;
    const id = $event.target.dataset.id;
    const fruit = fruits.find(item => item.id === +id);
    if (btn === 'price') {
        priceModal.open();
        priceModal.setContent(`The price for ${fruit.title} is ${fruit.price}`);
    }

    if (btn === 'delete') {
        $.confirm({
            title: 'Delete the product?',
            content: `Do you want to delete ${fruit.title} with the price ${fruit.price}`
        }).then(() => {
            fruits = fruits.filter(it => it.id !== +id);
            render();
        }).catch(() => {
            //do nothing
        })
    }
})

render();
