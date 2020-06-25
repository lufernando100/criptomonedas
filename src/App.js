import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import axios from "axios";
import Spinner from "./components/Spinner";

const Div = styled.div`
 font-family: "inherit", cursive;
  color: orangered;
  text-align: left;
  font-weight: 700;
  font-size: 35px;
  margin-bottom: 180px;
  margin-top: 180px;
`;

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 98px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 35%;
  margin-top: -6rem;
  background-position-x: 10px;
`;

const Heading = styled.div`
  font-family: "inherit", cursive;
  color: white;
  text-align: left;
  font-weight: 700;
  font-size: 35px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      // Evitamos la ejecucion la primera vez
      if (moneda === "") return;
      // consultar la API para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      // Mostrar el Spinner
      guardarCargando(true);
      // Ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        // Cambiar el estado de la cotizacion
        guardarCargando(false);
        //Guardar Cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar Sppiner o resultado

  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div className="center">
        <Heading>Bienvenidos a la cripta</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
      </div>
      <Div>
      <Imagen src={imagen} alt="Imagen Cripto" className="center" />
        {componente}
      </Div>
      
    </Contenedor>
  );
}

export default App;
