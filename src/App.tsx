import { useState,FormEvent } from 'react'
import './App.css'
import logoImg from './assets/logo.png'


interface InfoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const[gasolinaInput, setGasolinaInput] = useState()
  const[alcoolInput, setAlcoolInput] = useState()
  const[info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent){
    event.preventDefault();
    
    let calculo = (alcoolInput/gasolinaInput)

    if(calculo <= 0.7){
      setInfo({
        title: "Compensa usar Álcool!",
        gasolina: formatar(gasolinaInput),
        alcool: formatar(alcoolInput)
      })
    }else{
      setInfo({
        title: "Compensa usar Gasolina!",
        gasolina: formatar(gasolinaInput),
        alcool: formatar(alcoolInput)
      })
    }
  }

  function formatar(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br", {
      style:"currency",
      currency: "BRL"
    })
    return valorFormatado;
  }

  return (
      <div>
        <main className="container">
          <img className='logo' src={logoImg} alt="Logo da calculadora"/>
          <h1 className="title">Qual melhor opção?</h1>
          <form onSubmit={calcular}>
            <label htmlFor="">Alcool (preço por litro):</label>
            <input type="number" className="input" placeholder='4,90' min="1" step="0.01" required value={alcoolInput} onChange={(e) => setAlcoolInput(Number(e.target.value))}/>

            <label htmlFor="">Gasolina (preço por litro):</label>
            <input type="number" className="input" placeholder='4,90' min="1" step="0.01" required value={gasolinaInput} onChange={(e) => setGasolinaInput(Number(e.target.value))}/>

            <input type="submit" className="button" value="Calcular"/>
          </form>

          {info && Object.keys(info).length > 0 &&(
            <section className="result">
              <h2 className='result-title'>{info.title}</h2>

              <span>Alcool = {info.alcool}</span>
              <span>Gasolina = {info.gasolina}</span>
          </section>
          )}

        </main>      
      </div>
  )
}

export default App
