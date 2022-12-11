const cart = document.querySelector("#cart");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const template = document.querySelector("#template");
const fragment = document.createDocumentFragment();

let cartArray = [];


document.addEventListener("click", (e) => {

    if (e.target.matches(".card .btn-add")) {
        agregarCarrito(e);
    }

    if (e.target.matches(".list-group-item .btn-success")) {
        btnAumentar(e);
    }

    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
});

const agregarCarrito = (e) => {

    const product = {
        titulo: e.target.dataset.product,
        id: e.target.dataset.product,
        cantidad: 1,
        precio: parseInt(e.target.dataset.price),
        imagen: e.target.dataset.img,
    };

     // Searching the index
     const index = cartArray.findIndex((item) => item.id === product.id);

     // si no existe empujamos el nuevo elemento
     if (index === -1) {
        cartArray.push(product);
     } else {
         // en caso contrario aumentamos su cantidad
         cartArray[index].cantidad++;
     }

    pintarCarrito();

};

const pintarCarrito = () => {
    cart.textContent = "";

    cartArray.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;
        clone.querySelector("div .img-single-product").src=item.imagen;
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        fragment.appendChild(clone);
    });

    cart.appendChild(fragment);
    pintarFooter();
};

const btnAumentar = (e) => {
    // console.log(e.target.dataset.id);
    cartArray.forEach((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = (e) => {
    // console.log(e.target.dataset.id);
    cartArray.forEach((item) => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });
    pintarCarrito();
};

const pintarFooter = () => {
    footer.textContent = "";

    const total = cartArray.reduce(
        (acc, current) => acc + current.precio * current.cantidad,
        0
    );

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;

    footer.appendChild(clone);
};

function finalizarCompra() {

    window.confirm("Graciias, pronto actualizaremos más productos a la venta")

}