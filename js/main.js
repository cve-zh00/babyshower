// Función que hace la solicitud a la API
function fetchProducts() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        "accion": 1
            });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        

        fetch("https://us-central1-responsive-sun-371200.cloudfunctions.net/function-1", requestOptions)
        .then(response => response.json()) // convertir la respuesta a JSON
        .then(result => {
            createCards(result.productos); 
            var title  = document.getElementsByClassName("title")[0];
            title.innerText = "Regalos disponibles para el Baby Shower"
            var img = new Image();
            img.onload = function() {
            if (window.innerWidth < 600) {
                document.body.style.backgroundImage = 'url("https://storage.googleapis.com/imagenbabe/images/sinelefantemobile.svg")';
            } else {
                document.body.style.backgroundImage = 'url("https://storage.googleapis.com/imagenbabe/images/sinelefante.svg")';
            }
                // Mostrar el contenido de la página una vez que la imagen se haya cargado
            document.body.style.visibility = "visible";
        };
        console.log(window.innerWidth)
        if (window.innerWidth < 600) {
            
            img.src = 'https://storage.googleapis.com/imagenbabe/images/sinelefantemobile.svg';
        }else{
            img.src = 'https://storage.googleapis.com/imagenbabe/images/sinelefante.svg';
        }}
        
        )
        .catch(error => console.log('error', error));
}

// Función que crea las tarjetas de productos
function createCards(productos) {
    var cardsContainer = document.getElementById("cardsContainer");
    productos.forEach(producto => {
        var card = document.createElement("div");
        card.className = "card";

        var content = document.createElement("div");
        content.className = "content";

        var img = document.createElement("img");
        img.src = "https://storage.googleapis.com/imagenbabe/images/" + producto.imagen;
        content.appendChild(img);

        var textContent = document.createElement("div");
        textContent.className = "text-content";

        var h3 = document.createElement("h3");
        h3.innerText = producto.titulo;
        textContent.appendChild(h3);

        
       

        var linksDiv = document.createElement("div");
        linksDiv.id = 'links_' + producto.titulo;
        linksDiv.style.display = "none";
        var disclaimer_links = document.createElement("p");
        disclaimer_links.innerText = "Los links son solo sugerencias, puedes comprar el producto en cualquier tienda de tu preferencia";
        linksDiv.appendChild(disclaimer_links);
        producto.links.forEach(link => {
            var a = document.createElement("a");
            a.href = link;
            a.innerText = link;
            //añadimos la clase link para que se vea como un link
            a.className = "link";
            var br = document.createElement("br");
            linksDiv.appendChild(a);
            
            linksDiv.appendChild(br);
        });

        var backButton = document.createElement("button");
        backButton.innerText = "Volver";
        
        backButton.onclick = function() { 
            textContent.style.display = "block";
            linksDiv.style.display = "none";
        };
        linksDiv.appendChild(backButton);
        if (producto.titulo == "Fular de apego") {
            var disclaimer = document.createElement("p");
            disclaimer.innerText = "** Mi polola dice que prefiere el color mostaza.";
            textContent.appendChild(disclaimer);
        } else if (producto.titulo == "Pañales Emu Baby talla G") {
            var disclaimer = document.createElement("p");
            disclaimer.innerText = "** Les pedimos que los pañales sean de la marca Emu Baby por favor. ";
            /* le añadimos un link a disclaimer */
            var a = document.createElement("a");
            a.href = "https://www.sernac.cl/portal/604/w3-article-58674.html";
            a.innerText = "Enterate el por qué";
            /* eliminamos el formato de link */
            a.className = "";
            a.style.color = "black";
            /* eliminamos el subrayado */
            
            disclaimer.appendChild(a);
            textContent.appendChild(disclaimer);
        }
        var showLinksButton = document.createElement("button");
        showLinksButton.innerText = "Mostrar Links";
        showLinksButton.className = "button-base button-55";
        showLinksButton.role = "button";
        showLinksButton.onclick = function() { 
            textContent.style.display = "none";
            linksDiv.style.display = "block";
        };
        textContent.appendChild(showLinksButton);
        
        var buyproductButton = document.createElement("button");
        buyproductButton.innerText = "Compré este regalo";
        buyproductButton.className = "button-base button-56";
        buyproductButton.role = "button";
        
        textContent.appendChild(buyproductButton);

        content.appendChild(textContent);
        content.appendChild(linksDiv);

        card.appendChild(content);
        cardsContainer.appendChild(card);
    });
}

function elephant() {
    var elephantImage = document.getElementById("elephant");

// Definir la velocidad de desplazamiento (ajusta este valor según tus necesidades)
    var scrollSpeed = 0.55; // Un valor menor disminuirá la velocidad

// Manejar el evento de desplazamiento (scroll)
    window.addEventListener("scroll", function() {
  // Calcular la cantidad de desplazamiento vertical
    var scrollY = window.scrollY || window.pageYOffset;

  // Ajustar la posición vertical del elefante según el desplazamiento y la velocidad
    var displacement = -scrollY * scrollSpeed;
    elephantImage.style.transform = "translate3d(0, " + displacement + "px, 0)";
    });
}



// Iniciamos la solicitud
document.addEventListener('DOMContentLoaded', fetchProducts);
document.addEventListener('DOMContentLoaded', elephant);
