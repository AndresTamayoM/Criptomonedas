import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';

//importar el custom hook
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;
    
    &:hover {
        background-color: #326AC0;
        cursor: pointer;

    }
`;


const Formulario = ({ guardarMoneda,guardarCriptomoneda }) => {

    //State de listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError] = useState(false);

    const monedas = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'COP', nombre: 'Peso Colombiano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    //Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', monedas);

    //Utilizar useCriptomoneda
    const [ criptomoneda, SelectCriptoMoneda ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //Ejecutar llamado a la API
    useEffect (() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        
            const resultado = await Axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    //Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //Validar si los campos estan llenos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        //Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />

            <SelectCriptoMoneda />

            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;