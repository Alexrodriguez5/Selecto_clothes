document.addEventListener('DOMContentLoaded', function () {
  const carrito = [];
  const listaCarrito = document.getElementById('lista-carrito');
  const totalElement = document.getElementById('total');
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  const productos = [
    { id: 1, nombre: 'Camisa Casual Hombre', precio: 89900 },
    { id: 2, nombre: 'Vestido Elegante Mujer', precio: 129900 },
    { id: 3, nombre: 'Pantalón Jeans Hombre', precio: 119900 },
    { id: 4, nombre: 'Chaqueta Deportiva Hombre', precio: 159900 },
    { id: 5, nombre: 'Blusa Moderna Mujer', precio: 79900 },
    { id: 6, nombre: 'Falda Casual Mujer', precio: 99900 }
  ];

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
  });

  hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });

  function agregarAlCarrito(e) {
    const productoId = parseInt(e.target.closest('.producto').dataset.id);
    const producto = productos.find(p => p.id === productoId);
    const enCarrito = carrito.find(item => item.id === productoId);

    if (enCarrito) {
      enCarrito.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
  }

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString()}`;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'X';
      btnEliminar.classList.add('eliminar-item');
      btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.id));

      li.appendChild(btnEliminar);
      listaCarrito.appendChild(li);

      total += item.precio * item.cantidad;
    });

    totalElement.textContent = `Total: $${total.toLocaleString()}`;
  }

  function eliminarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
      carrito.splice(index, 1);
    }
    actualizarCarrito();
  }
});