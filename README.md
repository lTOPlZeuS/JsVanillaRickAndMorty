# Consumiendo The Rick and Morty API

Esta es una página web realizada con Html, JavaScript y Bootstrap la cual está realizada para una prueba técnica para el puesto de Desarrollador Back end - Java

![RYM](https://user-images.githubusercontent.com/22924166/139597723-a33c1904-951c-4446-a96f-cee5d462db1a.png)

# ¿Cómo comenzar a utilizar la aplicación?

1.  clonar el proyecto puede ser descargado como .zip o desde la consola`
    - `git clone https://github.com/lTOPlZeuS/JsVanillaRickAndMorty.git`
2.  ingresar a la carpeta
    - `cd /JsVanillaRickAndMorty`
3.  abrir el archivo index.html, si utilizan vscode puede utilizarel siguiente comando
    - `code .`

# Filtros y paginación

Cabe mencionar que todas las funcionalidades están escritas en Javascript vanilla y no es apoyado por un framework, por lo cual para los filtros utilizó un form con un evento Listener al submit el cual realiza una búsqueda con apoyo de ajax para evitar recargar la página el filtro aplica por nombre y status

En el lado de la paginación está realizado con promesas que me permite trabajar de una manera más sencilla la paginación que el api ya maneja
