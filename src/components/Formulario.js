import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda"
import useCriptomoneda from "../hooks/useCriptomoneda"
import axios from "axios";
import Error from "./Error"


const Boton = styled.input`
font-family:   cursive;
  margin-top: 20px;
  font-weight: 500;
  font-size: 18px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

  // Listar criptomonedas

  const [listarCripto, guardarCriptomonedas] = useState([])
  const [error, guardarError] =  useState(false);

  const MONEDAS = [
    {codigo: "USD", nombre: "Dolar de USA"},
    {codigo: "MXN", nombre: "Peso Mexicano"},
    {codigo: "EUR", nombre: "Euro"},
    {codigo: "GBP", nombre: "Libra"}

  ]

  // Utilizar Moneda
const [moneda, SeleccionarMonedas, actualizarState ] = useMoneda("Elige tu moneda dormilon", "", MONEDAS);
  // Utilizar CriptoMoneda
  const [criptoMoneda, SeleccionarCripto,  ] = useCriptomoneda("Elige tu Cripto dormilon", "", listarCripto);

  // Ejecutar Llamado a la API
   useEffect(() => {
     const consultarAPI = async () => {
       const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
       const resultado = await axios.get(url);
       guardarCriptomonedas(resultado.data.Data);
       
     }
     consultarAPI();
   }, [])
// cuando el usuario hace submit

const cotizarMoneda = e => {
  e.preventDefault();
  // Validar si ambosca campos estan llenos
  if(moneda === "" || criptoMoneda === "")
  {
    guardarError(true);
    return;
  }
//pasar Error al componente principal

guardarError(false);
guardarMoneda(moneda);
guardarCriptomoneda(criptoMoneda);

}
  return (
    <form
    onSubmit={cotizarMoneda}
    >
      {error ? <Error mensaje= "Todos los mensajes son obligatorios, sopenco "/>: null}
      <SeleccionarMonedas/>
      <SeleccionarCripto/>
      <Boton type="submit" value="calcular" />
    </form>
  );
};

export default Formulario;
