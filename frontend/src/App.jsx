import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function fazerLogin(e) {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.message || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", dados.token);
      localStorage.setItem("usuario", JSON.stringify(dados.usuario));

      alert("Login realizado com sucesso!");

      console.log("Token:", dados.token);
      console.log("Usuário:", dados.usuario);

    } catch (error) {
      console.error(error);
      alert("Não foi possível conectar ao servidor.");
    }
  }

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
    </div>
  );
}

export default App;