const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        erro: "Token não informado"
      });
    }

    const partes = authHeader.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
      return res.status(401).json({
        erro: "Token inválido"
      });
    }

    const token = partes[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuarioId = decoded.usuarioId;

    next();
  } catch (error) {
    return res.status(401).json({
      erro: "Token inválido ou expirado"
    });
  }
}

module.exports = autenticar;