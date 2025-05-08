async function gerarLancamento() {
  const input = document.getElementById("descricao").value;
  const resultado = document.getElementById("resultado");
  resultado.textContent = "Processando...";

  const resposta = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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", // Coloque aqui seu token
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: `Transforme isso em um lançamento contábil: ${input}` }),
  });

  const data = await resposta.json();
  if (data && Array.isArray(data) && data[0]?.generated_text) {
    resultado.textContent = data[0].generated_text;
  } else {
    resultado.textContent = "Erro ao gerar lançamento.";
  }
}