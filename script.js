document.addEventListener('DOMContentLoaded', function() {
    const valorImovelInput = document.getElementById('valorImovel');
    const valorEntradaInput = document.getElementById('valorEntrada');
    const percentualEntradaInput = document.getElementById('percentualEntrada');
    const valorFinanciadoInput = document.getElementById('valorFinanciado');
    const taxaJurosInput = document.getElementById('taxaJuros');
    const numPrestacoesInput = document.getElementById('numPrestacoes');
    const entradaValorRadio = document.getElementById('entradaValor');
    const entradaPorcentagemRadio = document.getElementById('entradaPorcentagem');
  
    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  
    function removerFormatacao(valor) {
        return parseFloat(valor.replace('R$', '').replace('.', '').replace(',', '.')) || 0;
    }
  
    function aplicarFormatacao(input) {
        const valor = removerFormatacao(input.value);
        input.value = formatarMoeda(valor);
    }
  
    function atualizarValorFinanciado() {
        const valorImovel = removerFormatacao(valorImovelInput.value);
        let valorEntrada = 0;
  
        if (entradaValorRadio.checked) {
            valorEntrada = removerFormatacao(valorEntradaInput.value);
        } else if (entradaPorcentagemRadio.checked) {
            const percentual = parseFloat(percentualEntradaInput.value) / 100;
            valorEntrada = valorImovel * percentual;
        }
  
        const valorFinanciado = valorImovel - valorEntrada;
        valorFinanciadoInput.value = formatarMoeda(Math.max(valorFinanciado, 0));
    }
  
    valorImovelInput.addEventListener('input', function() {
        atualizarValorFinanciado();
    });
  
    valorEntradaInput.addEventListener('input', function() {
        atualizarValorFinanciado();
    });
  
    percentualEntradaInput.addEventListener('input', function() {
        atualizarValorFinanciado();
    });
  
    entradaValorRadio.addEventListener('change', function() {
        document.getElementById('valorEntrada').style.display = 'block';
        document.getElementById('percentualEntrada').style.display = 'none';
        atualizarValorFinanciado();
    });
  
    entradaPorcentagemRadio.addEventListener('change', function() {
        document.getElementById('valorEntrada').style.display = 'none';
        document.getElementById('percentualEntrada').style.display = 'block';
        atualizarValorFinanciado();
    });
  
    valorImovelInput.addEventListener('blur', function() {
        aplicarFormatacao(valorImovelInput);
    });
  
    valorEntradaInput.addEventListener('blur', function() {
        aplicarFormatacao(valorEntradaInput);
    });
  
    valorFinanciadoInput.addEventListener('blur', function() {
        aplicarFormatacao(valorFinanciadoInput);
    });
  
    document.getElementById('calculator-form').addEventListener('reset', function() {
        valorImovelInput.value = '';
        valorEntradaInput.value = '';
        percentualEntradaInput.value = '';
        valorFinanciadoInput.value = '';
        taxaJurosInput.value = '';
        numPrestacoesInput.value = '';
        document.getElementById('prestacao').innerText = 'Valor da Prestação:\n R$ 0,00';
    });
  });
  
  function calcularPrestacao() {
    const valorFinanciado = removerFormatacao(document.getElementById('valorFinanciado').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100;
    const numPrestacoes = parseInt(document.getElementById('numPrestacoes').value);
  
    if (isNaN(valorFinanciado) || valorFinanciado <= 0 || isNaN(taxaJuros) || taxaJuros < 0 || isNaN(numPrestacoes) || numPrestacoes <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }
  
    const taxaMensal = taxaJuros;
    const prestacao = (valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -numPrestacoes));
    const prestacaoFormatada = formatarMoeda(prestacao);
  
    document.getElementById('prestacao').innerText = `Valor da Prestação: ${prestacaoFormatada}`;
  }
  
  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  
  function removerFormatacao(valor) {
    return parseFloat(valor.replace('R$', '').replace('.', '').replace(',', '.')) || 0;
  }
  