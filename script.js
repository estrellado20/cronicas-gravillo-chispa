document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos el contenedor donde se insertarán los capítulos
    const contenedorCapitulos = document.getElementById('contenedor-capitulos');

    // Función para cargar los capítulos
    async function cargarCapitulos() {
        try {
            // Hacemos una solicitud para obtener el archivo JSON
            const response = await fetch('chapters.json');
            // Verificamos si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            // Convertimos la respuesta a formato JSON
            const capitulos = await response.json();

            // Ordenar los capítulos por número antes de mostrarlos
            capitulos.sort((a, b) => a.numero - b.numero);

            // Iteramos sobre cada capítulo en el array JSON
            capitulos.forEach(capitulo => {
                // Creamos el div principal para cada entrada de capítulo
                const divEntrada = document.createElement('div');
                divEntrada.classList.add('lista-entrada');

                // Creamos el título del capítulo con su enlace
                const h3 = document.createElement('h3');
                const enlace = document.createElement('a');
                // La ruta es a la carpeta 'capitulos/' y luego el nombre del archivo
                enlace.href = `capitulos/${capitulo.archivo}`;
                enlace.textContent = `Capítulo ${capitulo.numero}: ${capitulo.titulo}`;
                h3.appendChild(enlace);

                // Creamos el párrafo de descripción
                const p = document.createElement('p');
                p.textContent = capitulo.descripcion;

                // Agregamos el título y la descripción al div de entrada
                divEntrada.appendChild(h3);
                divEntrada.appendChild(p);

                // Agregamos el div de entrada completo al contenedor de capítulos en el HTML
                contenedorCapitulos.appendChild(divEntrada);
            });
        } catch (error) {
            console.error('Error al cargar los capítulos:', error);
            // Muestra un mensaje al usuario si hay un error
            if (contenedorCapitulos) {
                contenedorCapitulos.innerHTML = '<p>Lo sentimos, no pudimos cargar los capítulos en este momento. Por favor, asegúrate de que el archivo chapters.json exista y sea válido.</p>';
            }
        }
    }

    // Llamamos a la función para que se ejecute cuando la página cargue
    cargarCapitulos();
});