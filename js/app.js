// Array para armazenar os contatos
let contatos = [];

// Função para adicionar um contato
function adicionarContato(nome, telefone) {
    // Remove caracteres não numéricos para validação
    const telefoneNumeros = telefone.replace(/\D/g, "");

    // Validação: telefone deve ter 10 ou 11 dígitos (DDD + número)
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
        alert("Número de telefone inválido! Use o formato (99) 99999-9999");
        return;
    }

    // Adiciona o contato com o telefone já formatado
    const contato = { nome, telefone };
    contatos.push(contato);
    exibirContatos();
    salvarContatos(); // Salvar contatos no localStorage
}

// Função para exibir os contatoss
function exibirContatos() {
    const listaContatos = document.getElementById('lista-contatos');
    listaContatos.innerHTML = '';
    
    if (contatos.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum contato cadastrado';
        listaContatos.appendChild(li);
        return;
    }
    
    contatos.forEach((contato, index) => {
        const li = document.createElement('li');
        const spanInfo = document.createElement('span');
        spanInfo.textContent = `${contato.nome} - ${contato.telefone}`;
        
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('delete');
        botaoExcluir.onclick = () => excluirContato(index);
        
        li.appendChild(spanInfo);
        li.appendChild(botaoExcluir);
        listaContatos.appendChild(li);
    });
}

// Função para excluir um contato
function excluirContato(index) {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
        contatos.splice(index, 1);
        exibirContatos();
        salvarContatos(); // Atualizar localStorage após exclusão
    }
}

// Função para buscar um contato
function buscarContato() {
    const termoBusca = document.getElementById('busca').value.toLowerCase();
    
    if (termoBusca === '') {
        exibirContatos();
        return;
    }
    
    const contatosFiltrados = contatos.filter(contato => 
        contato.nome.toLowerCase().includes(termoBusca)
    );
    
    const listaContatos = document.getElementById('lista-contatos');
    listaContatos.innerHTML = '';
    
    if (contatosFiltrados.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum contato encontrado';
        listaContatos.appendChild(li);
        return;
    }
    
    contatosFiltrados.forEach((contato) => {
        const li = document.createElement('li');
        const spanInfo = document.createElement('span');
        spanInfo.textContent = `${contato.nome} - ${contato.telefone}`;
        li.appendChild(spanInfo);
        listaContatos.appendChild(li);
    });
}

// Funções para persistência de dados usando localStorage
function salvarContatos() {
    localStorage.setItem('contatos', JSON.stringify(contatos));
}

function carregarContatos() {
    const contatosSalvos = localStorage.getItem('contatos');
    if (contatosSalvos) {
        contatos = JSON.parse(contatosSalvos);
    }
}

// Função para aplicar máscara de telefone (formatar enquanto digita)
function mascaraTelefone(event) {
    let input = event.target;
    let valor = input.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    if (valor.length > 10) {
        // (99) 99999-9999
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (valor.length > 5) {
        // (99) 9999-9999
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (valor.length > 2) {
        // (99) 9999
        valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (valor.length > 0) {
        // (99
        valor = valor.replace(/^(\d{0,2})/, "($1");
    }

    input.value = valor;
}

// Inicialização e configuração de eventos
document.addEventListener('DOMContentLoaded', function() {
    // Carregar contatos do localStorage
    carregarContatos();
    
    // Exibir contatos ao carregar a página
    exibirContatos();
    
    // Evento de submit do formulário
    document.getElementById('formulario-contato').addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        
        if (nome && telefone) {
            adicionarContato(nome, telefone);
            document.getElementById('nome').value = '';
            document.getElementById('telefone').value = '';
        }
    });
    
    // Evento de busca
    document.getElementById('busca').addEventListener('input', buscarContato);

    // Evento para aplicar máscara no input telefone
    document.getElementById('telefone').addEventListener('input', mascaraTelefone);
});
