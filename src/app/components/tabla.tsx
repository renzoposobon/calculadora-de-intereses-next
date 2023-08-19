"use client"
import React, { useState } from 'react';

export default function Tabla() {
  const [inversionInicial, setInversionInicial] = useState('0');
  const [tasaInteresMensual, setTasaInteresMensual] = useState('0');
  const [retiroMensual, setRetiroMensual] = useState('0');
  const [numMeses, setNumMeses] = useState('0');
  const [tablaResultados, setTablaResultados] = useState([]);

  const calcularPlazoFijo = (inversionInicial:any, tasaInteres:any, retiroMensual:any, numMeses:any) => {
    let saldo = parseFloat(inversionInicial);
    const tabla = [];

    for (let mes = 1; mes <= numMeses; mes++) {
      const interes = saldo * (parseFloat(tasaInteres) / 100);
      saldo += interes - parseFloat(retiroMensual);
      tabla.push([mes, saldo.toFixed(2), interes.toFixed(2)]);
    }

    return tabla;
  }

  const handleFormSubmit = (event:any) => {
    event.preventDefault();

    if (!isNaN(parseFloat(inversionInicial)) && !isNaN(parseFloat(tasaInteresMensual)) && !isNaN(parseFloat(retiroMensual)) && !isNaN(parseInt(numMeses))) {
      const tabla:any = calcularPlazoFijo(inversionInicial, tasaInteresMensual, retiroMensual, parseInt(numMeses));
      setTablaResultados(tabla);
    }
  }

  return (
    <div className='tabla text-center content-center gap-1'>
      <h2 className='text-5xl max-w-3xl'>¿No estás seguro de que tu inversión rinda frutos?</h2>
      <h3 className='text-4xl max-w-3xl'>Calculala introduciendo los siguientes datos: </h3>
      <form onSubmit={handleFormSubmit} className='form text-lg max-w-lg content-center'>
        <label htmlFor="inversionInicial">Inversión inicial:</label>
        <input
          type="text"
          id="inversionInicial"
          value={inversionInicial}
          className='text-center'
          onChange={(e) => setInversionInicial(e.target.value)}
        />
        <label htmlFor="tasaInteres">Tasa de interés mensual:</label>
        <input
          type="text"
          id="tasaInteres"
          value={tasaInteresMensual}
          className='text-center'
          onChange={(e) => setTasaInteresMensual(e.target.value)}
        />
        <label htmlFor="retiroMensual">Cuota mensual a pagar:</label>
        <input
          type="text"
          id="retiroMensual"
          value={retiroMensual}
          className='text-center'
          onChange={(e) => setRetiroMensual(e.target.value)}
        />
        <label htmlFor="numMeses">Cantidad de meses:</label>
        <input
          type="text"
          id="numMeses"
          value={numMeses}
          className='text-center'
          onChange={(e) => setNumMeses(e.target.value)}
        />
        <button type="submit" className='bg-white text-black'>Calcular</button>
      </form>

      {tablaResultados.length > 0 && (
        <div>
          <h2>Resultados:</h2>
          <table>
            <thead>
              <tr>
                <th>Mes</th>
                <th>Saldo Total</th>
                <th>Interés Ganado</th>
              </tr>
            </thead>
            <tbody>
              {tablaResultados.map(([mes, saldo, interes]) => (
                <tr key={mes}>
                  <td>{mes}</td>
                  <td>${parseFloat(saldo).toFixed(2)}</td>
                  <td>${parseFloat(interes).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
