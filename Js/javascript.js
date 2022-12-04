const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();
const agregar = document.querySelectorAll(".card button");

const carritoObjeto = {};

document.addEventListener("click", (e) => {
    
    if (e.target.matches(".list-group-item .btn-success")) {
        btnAumentar(e);
    }

    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
});

//Agregar Carrito
const agregarCarrito = (e) => {

    const producto = {
        titulo: e.target.dataset.product,
        id: e.target.dataset.product,
        cantidad: 1,
        precio: parseInt(e.target.dataset.price),
    };

    if(carritoObjeto.hasOwnProperty(producto.titulo)) {
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1;
    }

    carritoObjeto[producto.titulo] = producto

    pintarCarrito();

};

agregar.forEach((btn) => btn.addEventListener("click", agregarCarrito));

const pintarCarrito = () => {
    carrito.textContent = "";

    Object.values(carritoObjeto).forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;;
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;

        fragment.appendChild(clone);
    });

    carrito.appendChild(fragment);
};

const btnAumentar = (e) => {
    console.log(e.target.dataset.id);
    Object.values(carritoObjeto).forEach((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = (e) => {
    // console.log(e.target.dataset.id);
    Object.values(carritoObjeto).forEach((item) => {
        // console.log(item);
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                // console.log(item);
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });
    pintarCarrito();
};