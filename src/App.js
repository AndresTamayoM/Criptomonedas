import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import imagen from './cryptomonedas.png';
import styled from '@emotion/styled';
import Axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;
//grid-template-columns: repeat(2, 1fr); => para dividir en columna, 2 columnas, 50-50 

function App() {
    
  //useState

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [ cargando, guardarCargando ] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      //evitamos la ejecucion la primera vez
      if(moneda === '') return;
      
      //Consultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await Axios.get(url);

      // Mostrar el spinner
      guardarCargando(true);

      // Ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        //cambiar stado de cargando
        guardarCargando(false);

        //guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);

       /*Forma dinamica 
          console.log(resultado.data.DISPLAY[criptomoneda][moneda]); 
       */
       
    }

    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  //Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
        <div>
            <Imagen 
              src={imagen}
              alt="imagen cripto"
            />  
        </div>
        <div>
          <Heading>Cotiza Criptomonedas al instante</Heading>
          
          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />

          {componente}
          
        </div>
    </Contenedor>
  );
}

export default App;
