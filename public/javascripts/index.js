(async () => {
  document.addEventListener("DOMContentLoaded", async () => {
    if (token) {
      localStorage.setItem('token', token);
      // Hacer una petición a una ruta que renderice o redirija

      try {
        const rta=await fetch("http://localhost:3000/users/inicio", {
          headers: { "token": token },
          redirect: "follow"
        });
        if( rta.redirected ){
          window.location=rta.url;//redirecciono
        }
      } catch (err) {
        console.log(err);
      }
    }

    formu.addEventListener("click", (e) => {
      const campoEnfocado = e.target;

      if (campoEnfocado.id === "usuario") {
        const p = document.getElementById("errorEmail");
        if (p) p.remove();
      } else if (campoEnfocado.id === "contrasena") {
        const p = document.getElementById("errorPass");
        if (p) p.remove();
      }
    });
  });
})();