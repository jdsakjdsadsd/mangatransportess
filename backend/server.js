const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// CONECTAR AO MONGODB ATLAS
mongoose.connect("mongodb+srv://nataemanuelreis_db_user:V9e9OyrTfbT4YKWx@formcontmt.2r84nwn.mongodb.net/?appName=formcontmt")
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.log("Erro ao conectar ao MongoDB:", err));

// MODEL (estrutura dos dados)
const Contato = mongoose.model("Contato", {
  name: String,
  email: String,
  message: String,
  data_envio: {
    type: Date,
    default: Date.now,
  },
});

// ENDPOINT PARA RECEBER FORMULÁRIO
app.post("/enviar-formulario", async (req, res) => {
  try {
    const novoContato = new Contato(req.body);
    await novoContato.save();
    res.json({ sucesso: true, mensagem: "Mensagem enviada com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: true, mensagem: "Erro ao enviar", error });
  }
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});
