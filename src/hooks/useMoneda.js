import React, { Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label `
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;


const useMoneda = (label, stateInicial, opciones) => {
    //antes de Seleccionar es el state y operaciones que se va  a hacer

    //State ded nuestro custom hook
    const [ state, actualizarState ] = useState(stateInicial);


    //Seleccionar es lo que se va a ver en pantalla
    const Seleccionar = () => ( //explicito el return
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => actualizarState(e.target.value)}
                value={state}
            >
                <option>--Seleccione--</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    ) 

    //retornar state, interfaz y funcion que modifica el state
    return [ state, Seleccionar ]
}
 
export default useMoneda;

