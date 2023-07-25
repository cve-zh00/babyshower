// Función que hace la solicitud a la API
window.onload = function() {
  var img = new Image();
  img.src = "https://storage.googleapis.com/imagenbabe/images/elephant.png";
};

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
        
        if (window.innerWidth < 600) {
            img.src = 'https://storage.googleapis.com/imagenbabe/images/sinelefantemobile.svg';
        }else{
            img.src = 'https://storage.googleapis.com/imagenbabe/images/sinelefante.svg';
        }}
        
        )
        .catch(error => console.log('error', error));
}
function createElement(type, className) {
  var element = document.createElement(type);
  if (className) element.className = className;
  return element;
}

function createImage(producto) {
  var img = createElement("img");
  img.src = "https://storage.googleapis.com/imagenbabe/images/" + producto.imagen;
  return img;
}

function createTitle(producto) {
  var h3 = createElement("h3");
  h3.innerText = producto.titulo;
  return h3;
}

function createButton(text, className, onClickFunc) {
  var button = createElement("button", className);
  button.innerText = text;
  button.role = "button";
  button.onclick = onClickFunc;
  return button;
}

function createDisclaimer(producto) {
  var disclaimer = createElement("p");
  var a, disclaimerText;

  if (producto.titulo == "Fular de apego") {
    disclaimerText = "** Mi polola dice que prefiere el color mostaza.";
    a = createElement("a");
    disclaimer.appendChild(a);
    return disclaimer
    
  } else if (producto.titulo == "Pañales Emu Baby talla G") {
    disclaimerText = "** Les pedimos que los pañales sean de la marca Emu Baby por favor. ";
    a = createElement("a");
    a.href = "https://www.sernac.cl/portal/604/w3-article-58674.html";
    a.innerText = "¿Por qué Emu baby?"
    disclaimer.appendChild(a);

    return disclaimer;
  }else{
    return null
  }

  
  
}

function createProductLinks(producto) {
  var div_back = createElement("div", "grid-b");
  var linksDiv = createElement("div", "grid-b1");
  div_back.id = "back_" + producto.titulo;
  linksDiv.id = 'links_' + producto.titulo;
  div_back.style.display = "none";

  var disclaimer_links = createElement("p");
  disclaimer_links.innerText = "Links de referencia";
  linksDiv.appendChild(disclaimer_links);
  var ul = createElement("ul");
  producto.links.forEach(link => {
    var li = createElement("li", "link");
    var a = createElement("a");

    a.href = link;
    a.innerText = link;
    li.appendChild(a);
    ul.appendChild(li);
    
  });
  linksDiv.appendChild(ul);
  var div_buttons = createElement("div");
  var backButton = createButton("Volver", "button-77", function() {
    div_back.style.display = "none";
    var divB1 = document.getElementById("frontal_text_"+producto.titulo);
    divB1.style.display = "block";

  });
  div_buttons.id= "div_buttons";
  div_buttons.appendChild(backButton);
  
  div_back.appendChild(linksDiv);
  div_back.appendChild(div_buttons);
  return div_back
}

function createCards(productos) {
  var cardsContainer = document.getElementById("cardsContainer");
  productos.forEach(producto => {
    var card = createElement("div", "card");

    var content = createElement("div", "content");

    var divA = createElement("div", "grid-a");
    var img = createImage(producto);
    divA.appendChild(img);

    var divB = createElement("div", "grid-b");
    divB.id = "frontal_text_" + producto.titulo;
    var divB1 = createElement("div", "grid-b1");
    var title = createTitle(producto);
    divB1.appendChild(title);

    var divB2 = createElement("div", "grid-b2");

    var showLinksButton = createButton("Mostrar Links", "button-74", function() {
      divB.style.display = "none";
      var div_back = document.getElementById("back_"+producto.titulo);
      div_back.style.display = "flex";
      var div_buttons = document.getElementById("div_buttons");
      
      div_buttons.className = "grid-b2";

    });
    divB2.appendChild(showLinksButton);
    var buttons_front = createElement("div", "buttons_front");
    buttons_front.appendChild(showLinksButton);
    
    
    var buyProductButton = createButton("Compré este regalo", "button-75", null);
    /* cuando se haga click sde debe mandar a la pagina de gracias */
    /* le agregamos la funcion buyProductt() */
    buyProductButton.onclick = function() {
      buyProductt(producto.titulo);
  };
    buttons_front.appendChild(buyProductButton);
    divB2.appendChild(buttons_front);
    var disclaimer = createDisclaimer(producto);

    if (disclaimer != undefined){
      divB1.appendChild(disclaimer);
      buttons_front.style.marginTop = "0px";
    }
    divB.appendChild(divB1);
    divB.appendChild(divB2);

    var linksDiv = createProductLinks(producto);

    content.appendChild(linksDiv);
    content.appendChild(divA);
    content.appendChild(divB);

    card.appendChild(content);
    cardsContainer.appendChild(card);

    // CALCULAMOS EL TAMAÑO DE LA PAGINA
    
    
    
  });
  
  
}

function buyProductt(name_product) {
  // Lanzamos un alert para confirmar la compra con 2 botones
  console.log(name_product);
  var r = confirm("¿Estás seguro que deseas confirmar la compra del regalo? El regalo se eliminará de la lista.");

  if (r == true) {
      /* enviamos una solicitud a la API para que elimine el producto de la lista */
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
          "accion": 3,
          "nombre": name_product
      });

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch("https://us-central1-responsive-sun-371200.cloudfunctions.net/function-1", requestOptions)// convertir la respuesta a JSON
          .then(response => {
              console.log(response);
              window.location.href = "thanks.html";
          })
  }
}



function elephant() {
  var elephantImage = document.getElementById("elephant");
  // Alineamos inicialmente el elefante en la parte inferior de la ventana
  elephantImage.style.position = 'fixed';
  elephantImage.style.bottom = '0px';
  elephantImage.style.right = '0px';

  window.addEventListener("scroll", function() {
      // Obtenemos la posición de scroll actual
      var scrollY = window.scrollY || window.pageYOffset;

      // Mover el elefante hacia arriba a medida que desplazamos hacia abajo
      elephantImage.style.transform = "translateY(" + -(scrollY * 0.5) + "px)";
  });
}







// Iniciamos la solicitud
document.addEventListener('DOMContentLoaded', fetchProducts);
document.addEventListener('DOMContentLoaded', elephant);
