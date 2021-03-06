import React, {Fragment, useState } from 'react';
import styled from '@emotion/styled'

const Label = styled.label`
font-family:"inherit", cursive;
color: white;
text-transform: uppercase;
font-weight: bold;
font-size: 25px;
margin-top: 2rem;
display: block; 
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;`
    

const useMoneda = (label, stateInicial, opciones) => {
const [state, acutalizarState] = useState (stateInicial); 

    const seleccionar = () => (
<Fragment>
    <Label>{label}</Label>
    <Select
    onChange={ e => acutalizarState(e.target.value)}
    value={state}
    >
        <option value="">Seleccione</option>
        {
            opciones.map(opcion => (
                <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
            ))
        }
    </Select>
</Fragment>
    );
    //Retornar state, interfaz, y funcion que modifica el state
    return [state, seleccionar, acutalizarState];
}
 
export default useMoneda;