const INTEGRANTES = "Luiz Otávio e Ryan";
const TURMA = "3º Tec";
const NUMERO_CHAMADA = 17;
const DESCONTO = 0.25;
const LIMITE = 150.00;

function ItemBase(nome) {
  this.nome = nome;
}

ItemBase.prototype.gerarEtiqueta = function (numeroChamada) {
  return `[ITEM: ${this.nome.toUpperCase()} | CHAMADA: #${numeroChamada}]`;
};


class ContaCantina {
  #saldo = 0;

  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  get saldo() {
    return this.#saldo;
  }

  set saldo(valor) {
    if (valor < 0) {
      console.error(`[ERRO] Operação bloqueada para ${this.titular}: saldo negativo não permitido (R$ ${valor.toFixed(2)}).`);
      return;
    }
    this.#saldo = valor;
  }

  calcularTaxa(valor) {
    return valor;
  }
}


class ContaAluno extends ContaCantina {
  constructor(titular, saldoInicial, turma) {
    super(titular, saldoInicial);
    this.turma = turma;
  }

  calcularTaxa(valor) {
    return valor * (1 - DESCONTO);
  }
}

class ContaProfessor extends ContaCantina {
  constructor(titular, saldoInicial, disciplina) {
    super(titular, saldoInicial);
    this.disciplina = disciplina;
  }

  calcularTaxa(valor) {
    return valor < LIMITE ? 0 : valor;
  }
}


console.log("--- 1. TESTE DE PROTÓTIPO ---");
const item = new ItemBase("Salgado Assado");
console.log(item.gerarEtiqueta(NUMERO_CHAMADA));

console.log("\n--- 2. TESTE DE ENCAPSULAMENTO (#saldo) ---");
const aluno = new ContaAluno(INTEGRANTES, 100.00, TURMA);
console.log(`Titular: ${aluno.titular} (${aluno.turma}) | Saldo inicial: R$ ${aluno.saldo.toFixed(2)}`);

aluno.saldo = -50;
console.log(`Saldo após tentativa inválida: R$ ${aluno.saldo.toFixed(2)}`);


console.log("\n--- 3. TESTE DE POLIMORFISMO (calcularTaxa) ---");
const professor = new ContaProfessor("Prof. Orientação a Objetos", 200.00, "Desenvolvimento de Sistemas");

const compraAbaixoLimite = 80.00;
const compraAcimaLimite = 160.00;

console.log(`Compra de R$ ${compraAbaixoLimite.toFixed(2)}:`);
console.log(`- Aluno (${aluno.titular}): R$ ${aluno.calcularTaxa(compraAbaixoLimite).toFixed(2)}`);
console.log(`- Professor (${professor.titular}): R$ ${professor.calcularTaxa(compraAbaixoLimite).toFixed(2)}`);

console.log(`\nCompra de R$ ${compraAcimaLimite.toFixed(2)}:`);
console.log(`- Aluno (${aluno.titular}): R$ ${aluno.calcularTaxa(compraAcimaLimite).toFixed(2)}`);
console.log(`- Professor (${professor.titular}): R$ ${professor.calcularTaxa(compraAcimaLimite).toFixed(2)}`);
