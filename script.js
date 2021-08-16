window.onload = function() {
    //productos en array de objetos
    const zapatillas = [{
            id: 1,
            nombre: 'Nike Air Force 1',
            precio: 13500,
            imagen: 'img/airforce1.jpg'
        },
        {
            id: 2,
            nombre: 'Adidas SuperStar',
            precio: 10800,
            imagen: 'img/adidassuperstar.jpg'
        },
        {
            id: 3,
            nombre: 'Puma Smash',
            precio: 8100,
            imagen: 'img/pumasmash.jpg'
        },
        {
            id: 4,
            nombre: 'Converse Chuck Taylor',
            precio: 7740,
            imagen: 'img/converse.jpg'
            
        },
        {
            id: 5,
            nombre: 'Reef Byron Bay',
            precio: 6300,
            imagen: 'img/reefbyron.jpg'
           
        },
        {
            id: 6,
            nombre: 'Vans Old Skool',
            precio: 9900,
            imagen: 'img/vansoldskool.jpg'
        },
        {
            id: 7,
            nombre: 'DC Pure',
            precio: 16200,
            imagen: 'img/dcpure.jpg'
        },
        {
            id: 8,
            nombre: 'New Balance 574',
            precio: 13140,
            imagen: 'img/newbalance574.jpg'
        }


    ];
    
    //cards con los productos del array utilizando forEach
    const catalogoProductos = document.querySelector('#productos');
    function cardsProductos() {
         zapatillas.forEach((datos) => {

            const card = document.createElement('div');
            card.classList.add('col-sm-3');

            const cardBody = document.createElement('div');
            cardBody.classList.add('bordes', 'colorCard');


            const cardNom = document.createElement('h4');
            cardNom.textContent = datos.nombre;

            const cardImg = document.createElement('img');
            cardImg.classList.add('img-fluid');
            cardImg.setAttribute('src', datos.imagen);

            const cardPrecio = document.createElement('p');
            cardPrecio.classList.add('card-text');
            cardPrecio.textContent = '$' + datos.precio;

            const cardBot = document.createElement('button');
            cardBot.classList.add('btn', 'btn-primary');
            cardBot.textContent = 'COMPRAR';
            cardBot.setAttribute('caract', datos.id);
            cardBot.addEventListener('click', anadirCarrito);

            cardBody.appendChild(cardImg, );
            cardBody.appendChild(cardNom);
            cardBody.appendChild(cardPrecio);
            cardBody.appendChild(cardBot);
            card.appendChild(cardBody);
            catalogoProductos.appendChild(card);
        });
    }
    cardsProductos();

    let carro = [];

    //function para añadir productos al carrito de compras
    function anadirCarrito(e) {
        carro.push(e.target.getAttribute('caract'))
        calcularTotal();
        actualizarCarrito();
        carroLocalStorage();
        swal({
            title: "Genial!",
            text: "Tu producto fue añadido al carrito!",
            icon: "success",
            button: false,
            timer: 1500,
          });   
    }
    
    //carrito con productos seleccionados y boton para quitar producto
    const carritoConProductos = document.querySelector('#carro');
    
    function actualizarCarrito() {
        carritoConProductos.textContent = '';
        const r = [...new Set(carro)];
        r.forEach((producto) => {
            const miZapa = zapatillas.filter((itemZapatillas) => {
                return itemZapatillas.id === parseInt(producto);
            });

            const unidadesZapas = carro.reduce((total, zapatillaId) => {
                return zapatillaId === producto ? total += 1 : total;
            }, 0);

            const carroLi = document.createElement('li');
            carroLi.classList.add('text-center', 'mx-2', "list-group-item", "list-group-item-success");
            carroLi.textContent = `${unidadesZapas} x ${miZapa[0].nombre} - ${miZapa[0].precio}$`;

            const botCancelar = document.createElement('button');
            botCancelar.classList.add('btn', 'btn-danger', 'mx-5');
            botCancelar.textContent = 'CANCELAR COMPRA';
            botCancelar.dataset.item = producto;
            botCancelar.addEventListener('click', borrarItemCarrito);

            carroLi.appendChild(botCancelar);
            carritoConProductos.appendChild(carroLi);
        });
    }
    actualizarCarrito();

    //function para quitar productos del carro
    function borrarItemCarrito(f) {
        const id = f.target.dataset.item;
        carro = carro.filter((carritoId) => {
            return carritoId !== id;
        });
        actualizarCarrito();
        calcularTotal();
        carroLocalStorage();     
    }

    //function calcula el total de los productos en el carrito
    const totalCompra = document.querySelector('#total');
    let total = 0;
    function calcularTotal() {
        total = 0;
        carro.forEach((c) => {
            const cZapas = zapatillas.filter((cZapatilla) => {
                return cZapatilla.id === parseInt(c);

            });
            total = total + cZapas[0].precio;
        });
        totalCompra.textContent = total.toFixed(2);
    }
    calcularTotal();

    //boton para simular compra finalizada
    $("#botonComprar").click(finalizarCompra)    
    function finalizarCompra(){
        carro = [];
        actualizarCarrito();  
        calcularTotal();
        swal({
            title: "Excelente",
            text: "Tu compra fue realizada con éxito, gracias por elegirnos!",
            icon: "success",
            button: false,
            timer: 2000,
          });  
    }    
    
    //boton para cancelar compra
    $("#botonCancelarCompra").click(cancelarCompra)
    function cancelarCompra() {
        carro = [];
        actualizarCarrito();
        calcularTotal();
        localStorage.clear();
        swal({
            title: "Atención!",
            text: "Tu compra fue cancelada con éxito!",
            icon: "error",
            button: false,
            timer: 2000,
          });  
    }

    //guardar id de productos en local storage
    const lStorage = window.localStorage;

    function carroLocalStorage() {
        lStorage.setItem('carrito', JSON.stringify(carro));
    }

    function getCarroLocalStorage() {
        if (lStorage.getItem('carro') !== null) {
            carro = JSON.parse(lStorage.getItem('carro'));
        }
    }
    getCarroLocalStorage();
}
    //carrusel
    $("#carrusel").append(`<div id="carouselExampleSlidesOnly" class="carousel slide tamanoCarrusel centrarImg" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
          <img src="img/airforce1.jpg" class="d-block w-100" alt="nike air force 1">
          <div class="carousel-caption d-none d-md-block">
            <p>Nike Air Force 1</p>
          </div>
      </div>
      <div class="carousel-item">
        <img src="img/adidassuperstar.jpg" class="d-block w-100" alt="adidas superstar">
        <div class="carousel-caption d-none d-md-block">
            <p>Adidas Superstar</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="img/newbalance574.jpg" class="d-block w-100" alt="new balnce 574">
        <div class="carousel-caption d-none d-md-block">
            <p>New Balance 574</p>
        </div>
      </div>
    </div>
    </div>`)

//header con logo 
$("header").append('<img id="logo" src="img/zapatos.png" class="centrarImg" alt="zapatilla">')
    //div>Iconos diseñados por <a href="https://www.flaticon.es/autores/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>

//menu lateral deplegable con el carrito 
$("main").append('<input type="checkbox" class="checkbox" id="check">')
$("main").append('<label class="menu" for="check"><img src="img/carrito.png" alt="carro compras"></label>')
$("main").append(`<div class="left-panel">
    <h2>Tus compras:</h2>
    <ul id="carro" class="list-group list-group-flush"></ul>
    <p class="margenes">Total: <span id="total"></span></p>    
    <button id="botonComprar" class="btn btn-primary margenes">FINALIZAR COMPRA</button>
    <button id="botonCancelarCompra" class="btn btn-danger margenes">CANCELAR COMPRA</button>
</div>`)

//animaciones para los botones de finalizar y cancelar compra
$("#botonCancelarCompra").mouseenter(function() {
    $("#botonCancelarCompra").css({
        "height": "40px",
        "width": "158px",
    });
});

$("#botonCancelarCompra").mouseleave(function() {
    $("#botonCancelarCompra").css({
        "height": "38px",
        "width": "150",
    });
});

$("#botonComprar").mouseenter(function() {
    $("#botonComprar").css({
        "height": "48px",
        "width": "180px",
    });
});

$("#botonComprar").mouseleave(function() {
    $("#botonComprar").css({
        "height": "38px",
        "width": "150",
    });
});

const APIURL = 'https://jsonplaceholder.typicode.com/posts';
const infoPost = { descuento: "%10", asunto:"hotsale", envio:"gratis" }
$(".card-text").append(
    $.ajax({
        method: "POST",
        url: APIURL,
        data: infoPost,
        success: function(respuesta) {
            console.log(respuesta);
            $(".card-text").append(`<span class="badge badge-pill badge-danger">${respuesta.descuento} ${respuesta.asunto}, envío ${respuesta.envio} </span>`)
        }
    })
)