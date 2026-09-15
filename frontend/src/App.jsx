import { useState,useEffect } from "react";

function App() {
  const [tela, setTela] = useState("login");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tarefas, setTarefas] = useState([]);


  // Fazer Login

  async function fazerLogin(e) {
    e.preventDefault();

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            senha
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.message || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", dados.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify(dados.usuario)
      );

      alert("Login realizado com sucesso!");

      setTela("tarefas");

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  }


  // Cadastrar usuário

  async function cadastrar(e) {
    e.preventDefault();

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome,
            email,
            senha
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.message || "Erro ao cadastrar");
        return;
      }

      alert("Usuário cadastrado com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");

      setTela("login");

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  
  // Carregar Tarefas

  async function carregarTarefas() {
    const token = localStorage.getItem("token");

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/tarefas",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || dados.message || "Erro ao buscar tarefas");
        return;
      }

      setTarefas(dados);

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  }


  // carregar tela de tarefas
  useEffect(() => {
    if (tela === "tarefas") {
      carregarTarefas();
    }
  }, [tela]);



  // Tela de cadastro

  if (tela === "cadastro") {
    return (
      <div>
        <h1>Plataforma de Tarefas</h1>

        <h2>Cadastro</h2>

        <form onSubmit={cadastrar}>

          <div>
            <label>Nome:</label>
            <br />

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <br />

          <div>
            <label>Email:</label>
            <br />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />

          <div>
            <label>Senha:</label>
            <br />

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <br />

          <button type="submit">
            Cadastrar
          </button>

        </form>

        <br />

        <button onClick={() => setTela("login")}>
          Já tenho uma conta
        </button>

      </div>
    );
  }


  //Tela de tarefas

  if (tela === "tarefas") {
    return (
      <div>
        <h1>Minhas tarefas</h1>

        <button onClick={carregarTarefas}>
          Atualizar
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            setTela("login");
          }}
        >
          Sair
        </button>

        <hr />

        {tarefas.length === 0 ? (
          <p>Você ainda não possui tarefas.</p>
        ) : (
          tarefas.map((tarefa) => (
            <div key={tarefa.id}>

              <h3>{tarefa.titulo}</h3>

              <p>
                {tarefa.descricao}
              </p>

              <p>
                Status: {tarefa.status}
              </p>

              <hr />

            </div>
          ))
        )}
      </div>
    );
  }

  // Tela de Login

  return (
    <div>
      <h1>Plataforma de Tarefas</h1>

      <h2>Login</h2>

      <form onSubmit={fazerLogin}>

        <div>
          <label>Email:</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Senha:</label>
          <br />

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Entrar
        </button>

      </form>

      <br />

      <button onClick={() => setTela("cadastro")}>
        Criar conta
      </button>

    </div>
  );
}

export default App;