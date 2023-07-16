productos = {'productos': [{'titulo': 'PACK PAÑALES EMU BABY (RN)', 'imagen': ' Emubaby-RN-optimized.webp', 'cantidad_links': 2, 'links': ['https://www.mercadolibre.cl/emubaby-panales-rn-pack-x-2-paquetes-total-80-panales/p/MLC20598991?', ' https://simple.ripley.cl/panales-emubaby-premium-recien-nacido-rn-40-uds-mpm10000024860']}, {'titulo': 'PACK PAÑALES EMU BABY (RN)', 'imagen': ' Emubaby-RN-optimized.webp', 'cantidad_links': 2, 'links': ['https://www.mercadolibre.cl/emubaby-panales-rn-pack-x-2-paquetes-total-80-panales/p/MLC20598991?', ' https://simple.ripley.cl/panales-emubaby-premium-recien-nacido-rn-40-uds-mpm10000024860']}, {'titulo': 'EXAMPLE', 'imagen': 'exaple.jpg', 'cantidad_links': 1, 'links': ['google.com']}]}
produ = productos['productos']
print(type(produ),type(productos))
for producto in produ:

    if producto['titulo'] == "example":
        productos.remove(producto)
        break

print(productos)