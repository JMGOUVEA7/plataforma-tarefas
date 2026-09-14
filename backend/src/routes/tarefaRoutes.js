const express = require("express");
const prisma = require("../lib/prisma");
const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(autenticar);


router.get("/", autenticar, async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      where: {
        usuarioId: req.usuarioId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);

    res.status(500).json({
      erro: "Erro ao buscar tarefas"
    });
  }
});


/* Criar tarefa */

router.post("/", async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo) {
      return res.status(400).json({
        message: "O título é obrigatório"
      });
    }

    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        usuarioId: req.usuario.id
      }
    });

    res.status(201).json(tarefa);

  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar tarefa"
    });
  }
});



/* Atualizar tarefa */

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { titulo, descricao, status } = req.body;

    const tarefa = await prisma.tarefa.findFirst({
      where: {
        id,
        usuarioId: req.usuario.id
      }
    });

    if (!tarefa) {
      return res.status(404).json({
        message: "Tarefa não encontrada"
      });
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: {
        titulo,
        descricao,
        status
      }
    });

    res.json(tarefaAtualizada);

  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar tarefa"
    });
  }
});


/* Excluir tarefa */

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const tarefa = await prisma.tarefa.findFirst({
      where: {
        id,
        usuarioId: req.usuario.id
      }
    });

    if (!tarefa) {
      return res.status(404).json({
        message: "Tarefa não encontrada"
      });
    }

    await prisma.tarefa.delete({
      where: { id }
    });

    res.json({
      message: "Tarefa excluída com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao excluir tarefa"
    });
  }
});


module.exports = router;