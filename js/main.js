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
        })
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
        img.src = producto.imagen;
        content.appendChild(img);

        var textContent = document.createElement("div");
        textContent.className = "text-content";

        var h3 = document.createElement("h3");
        h3.innerText = producto.titulo;
        textContent.appendChild(h3);

        var p = document.createElement("p");
        p.innerText = "Presiona aquí para ver los lugares sugeridos para la compra";
        textContent.appendChild(p);

        var linksDiv = document.createElement("div");
        linksDiv.id = 'links_' + producto.titulo;
        linksDiv.style.display = "none";
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

        var showLinksButton = document.createElement("button");
        showLinksButton.innerText = "Mostrar Links";
        showLinksButton.className = "button-55";
        showLinksButton.role = "button";
        showLinksButton.onclick = function() { 
            textContent.style.display = "none";
            linksDiv.style.display = "block";
        };
        textContent.appendChild(showLinksButton);

        var buyproductButton = document.createElement("button");
        buyproductButton.innerText = "Compré este regalo";
        buyproductButton.className = "button-56";
        buyproductButton.role = "button";
        
        textContent.appendChild(buyproductButton);

        content.appendChild(textContent);
        content.appendChild(linksDiv);

        card.appendChild(content);
        cardsContainer.appendChild(card);
    });
}
// Obtener la referencia a la imagen del elefante
// Obtener la referencia a la imagen del elefante
// Obtener la referencia a la imagen del elefante
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



// Iniciamos la solicitud
document.addEventListener('DOMContentLoaded', fetchProducts);
