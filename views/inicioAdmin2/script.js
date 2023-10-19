document.addEventListener("DOMContentLoaded", function() {
    const contenido = document.getElementById("contenido");
    const navLinks = document.querySelectorAll(".nav-link");
    const cerrarSesionButton = document.getElementById("cerrar-sesion");
  
    navLinks.forEach(function(navLink) {
      navLink.addEventListener("click", function(event) {
        event.preventDefault();
        const option = this.textContent;
        if (option === 'Inicio') {
          contenido.innerHTML = `
            h2 Novedades:
            ul
              li Mensaje 1 del desarrollador de la web
              li Mensaje 2 del desarrollador de la web
              li Mensaje 3 del desarrollador de la web
          `;
        } else if (option === 'Gestión de Usuarios') {
          contenido.innerHTML = `
            h2 Buscar Usuarios
            form
              label(for='busqueda-usuario') Nombre de Usuario:
              input(type='text', id='busqueda-usuario', name='busqueda-usuario')
              button(type='submit') Buscar
          `;
        } else if (option === 'Gestión de Órdenes') {
          contenido.innerHTML = `
            h2 Buscar Órdenes
            form
              label(for='busqueda-orden') Número de Orden:
              input(type='text', id='busqueda-orden', name='busqueda-orden')
              button(type='submit') Buscar
          `;
        } else if (option === 'Gestión de Datos') {
          contenido.innerHTML = `
            nav.navbar
              ul.nav
                li.nav-item
                  a.nav-link(href='#') Examenes
                li.nav-item
                  a.nav-link(href='#') Determinaciones
                li.nav-item
                  a.nav-link(href='#') Valores de Referencia
                li.nav-item
                  a.nav-link(href='#') Muestras
          `;
        }
      });
    });
  
    cerrarSesionButton.addEventListener("click", function() {
      if (confirm("¿Desea cerrar la sesión?")) {
        // ACA FALTA LOGICA PARA REDIRIGIR AL USUARIO A LA PAGINA PRINCIPAL
        alert("Sesión cerrada");
      }
    });
  });
  