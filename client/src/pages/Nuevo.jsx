import React from 'react'

//Importes:
import "../pages-styles/Nuevo.css"

export const Nuevo = () => {
  return (
    <div className='nuevo-cont'>
      <div className="nuevo-encabezado">
        <h2>
          Explora los productos mas nuevos
        </h2>
        <p>
          Explora las diferentes categorias de productos que tenemos
        </p>
      </div>

      <div className="nuevo-contenido">
        <div className="categorias">
          <button>
            categoria 1
          </button>

          <button>
            categoria 2
          </button>

          <button>
            categoria 3
          </button>

          <button>
            categoria 4
          </button>

          <button>
            categoria 5
          </button>
        </div>

        <div className="productos">
          
        </div>
      </div>
    </div>
  )
}
