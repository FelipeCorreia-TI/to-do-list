// Importa o React e os hooks useState e useEffect da biblioteca React
import React, { useState, useEffect } from "react";

// Importa o arquivo de estilos CSS e aplica globalmente ao componente
import "./App.css";

// Declara o componente funcional App, que é o componente raiz da aplicação
function App() {
  // Declara o estado "tasks" como um array vazio
  // useState retorna o valor atual e a função que o atualiza (setTasks)
  const [tasks, setTasks] = useState([]);

  // Declara o estado "input" como string vazia
  // Armazena o valor atual do campo de texto controlado pelo React
  const [input, setInput] = useState("");

  // useEffect com dependência vazia [] — executa apenas na montagem do componente
  // Responsável por hidratar o estado "tasks" com dados persistidos no localStorage
  useEffect(() => {
    // Recupera a string JSON salva no localStorage e converte de volta para array
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    // Se existirem dados salvos, atualiza o estado com eles
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []); // <- array vazio: efeito roda somente uma vez, na montagem

  // useEffect com "tasks" como dependência — executa sempre que o estado "tasks" for atualizado
  // Mantém o localStorage sincronizado com o estado atual da aplicação
  useEffect(() => {
    // Serializa o array de tarefas para JSON e persiste no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // <- roda novamente sempre que "tasks" sofrer alteração

  // Função responsável por criar e adicionar uma nova tarefa ao estado
  const addTask = () => {
    // Validação: ignora a operação se o campo estiver vazio ou conter só espaços
    if (input.trim() === "") return;

    // Cria um novo objeto de tarefa com o texto atual do input e status não concluído
    const newTask = { text: input, completed: false };

    // Atualiza o estado usando spread operator para preservar as tarefas existentes
    // e adiciona a nova ao final do array
    setTasks([...tasks, newTask]);

    // Reseta o campo de texto após a inserção
    setInput("");
  };

  // Função que alterna o status "completed" de uma tarefa específica pelo seu índice
  const toggleComplete = (index) => {
    // Percorre o array com map e inverte a propriedade "completed" apenas da tarefa alvo
    // As demais tarefas são retornadas sem alteração
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );

    // Substitui o estado pelo novo array com a tarefa atualizada
    setTasks(newTasks);
  };

  // Função que remove uma tarefa do estado pelo seu índice
  const removeTask = (index) => {
    // Usa filter para retornar um novo array excluindo a tarefa do índice recebido
    const newTasks = tasks.filter((_, i) => i !== index);

    // Atualiza o estado com o array sem a tarefa removida
    setTasks(newTasks);
  };

  // Retorna o JSX que define a estrutura visual do componente
  return (
    // Elemento raiz do componente com a classe "App" para estilização
    <div className="App">
      <h1>To-Do List</h1>

      {/* Input controlado pelo React — seu valor é sempre espelho do estado "input" */}
      {/* onChange dispara setInput a cada keystroke, mantendo estado e UI sincronizados */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nova tarefa"
      />

      {/* Ao clicar, dispara addTask que valida, cria e insere a nova tarefa no estado */}
      <button onClick={addTask}>Adicionar</button>

      {/* Renderiza a lista de tarefas de forma dinâmica a partir do estado */}
      <ul>
        {/* map itera sobre o array "tasks" e retorna um <li> para cada item */}
        {/* A prop "key" é obrigatória para o React identificar e reconciliar os elementos da lista */}
        {tasks.map((task, index) => (
          <li key={index} className="todo-item">
            {/* Aplica a classe "completed" condicionalmente com base na propriedade task.completed */}
            {/* O clique chama toggleComplete passando o índice do item clicado */}
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => toggleComplete(index)}
            >
              {task.text}
            </span>

            {/* Botão que chama removeTask com o índice do item, excluindo-o do estado */}
            <button onClick={() => removeTask(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exporta o componente como default para ser importado pelo index.js
export default App;