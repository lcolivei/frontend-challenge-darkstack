import { useState } from 'react';
import './App.css';

function App() {
  // --- DECLARAÇÃO DE ESTADOS ---
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState(null);
  const [isResult, setIsResult] = useState(false);

  // --- FUNÇÕES DE LÓGICA ---
  const appendNumber = (number) => {
    // Limita a 12 digitos ---
    if (currentOperand.length >= 12 && currentOperand !== '0' && currentOperand !== 'Erro') return;
    
    if (isResult) {
        setCurrentOperand(number);
        setIsResult(false); // Reseta o estado
        return;
    }

    // Evita múltiplos pontos e substitui o '0' inicial
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        setCurrentOperand(number);
        return;
    }

    // Se estiver escrito "Error", substitui pelo novo número
    if (currentOperand === "error") {
        setCurrentOperand(number);
        return;
    }

    
    // Lógica básica de anexar
    setCurrentOperand(currentOperand + number);
  };

  const chooseOperation = (op) => {
    if (currentOperand === '') return;
    if (isResult) {
        setPreviousOperand(currentOperand);
        setOperation(op);
        setCurrentOperand('');
        setIsResult(false); // Reseta o estado
        return;
    }

    // 1. Move o número para a memória
    setPreviousOperand(currentOperand); 
    // 2. Salva o operador
    setOperation(op); 
    // 3. Limpa a tela
    setCurrentOperand(''); 
  };

  const compute = () => {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
  
    // Lógica de Cálculo (if/else if)
    if (operation === '+') {
      result = prev + current;
    } else if (operation === '-') {
      result = prev - current;
    } else if (operation === '*') {
      result = prev * current;
    } else if (operation === '/') {

        if (current === 0) {
            setCurrentOperand("error"); 
            setOperation(null);
            setPreviousOperand('');
            return; // Encerra a função aqui para não continuar o cálculo
        }
       result = prev / current;
    } else {
      return;
    }
    
    
    // Finalização e Limpeza
    setCurrentOperand(result.toString()); 
    setPreviousOperand('');            
    setOperation(null);     
    setIsResult(true); // MARCA O NÚMERO NA TELA COMO UM RESULTADO
  };

  const clear = () => {  
    setCurrentOperand('0');  
    setPreviousOperand('');
    setOperation(null);   
  };

  const deleteLastDigit = () => {
    // Remove o último caractere ou retorna '0' se ficar vazio
    setCurrentOperand(currentOperand.slice(0, -1) || '0'); 
  };

    // --- JSX E INTERFACE ---
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      
      {/* Linha 1: C, ÷ */}
      <button onClick={deleteLastDigit}>DEL</button>
      <button onClick={clear} className="span-two">C</button>
      <button onClick={() => chooseOperation('/')}>÷</button>
      {/* Linha 2: 7, 8, 9, * */}
      <button onClick={() => appendNumber('7')}>7</button>
      <button onClick={() => appendNumber('8')}>8</button>
      <button onClick={() => appendNumber('9')}>9</button>
      <button onClick={() => chooseOperation('*')}>x</button>
      {/* Linha 3: 4, 5, 6, - */}
      <button onClick={() => appendNumber('4')}>4</button>
      <button onClick={() => appendNumber('5')}>5</button>
      <button onClick={() => appendNumber('6')}>6</button>
      <button onClick={() => chooseOperation('-')}>-</button>
      {/* Linha 4: 1, 2, 3, + */}
      <button onClick={() => appendNumber('1')}>1</button>
      <button onClick={() => appendNumber('2')}>2</button>
      <button onClick={() => appendNumber('3')}>3</button>
      <button onClick={() => chooseOperation('+')}>+</button>
      {/* Linha 5: 0, ., = */}
      <button onClick={() => appendNumber('0')} className="span-two">0</button>
      <button onClick={() => appendNumber('.')}>.</button>
      <button onClick={compute}>=</button>

    </div>
  );
}

export default App;
