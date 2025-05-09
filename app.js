async function gerarLancamento() {
  const input = document.getElementById("descricao").value;
  const resultado = document.getElementById("resultado");
  resultado.textContent = "Processando...";

  try {
    const resposta = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",  // Substitua pelo seu token Hugging Face
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Converta isso em um lançamento contábil:\n${input}`
      }),
    });

    const data = await resposta.json();

    if (Array.isArray(data) && data[0]?.generated_text) {
      resultado.textContent = data[0].generated_text;
    } else if (data?.error) {
      resultado.textContent = `Erro: ${data.error}`;
    } else {
      resultado.textContent = JSON.stringify(data, null, 2);
    }
  } catch (err) {
    resultado.textContent = `Erro de rede: ${err.message}`;
  }
}
