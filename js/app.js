// Array para armazenar os contatos
let contatos = [];
// ariel raio
// Função para adicionar um contato
function adicionarContato(nome, telefone) {
    const contato = { nome, telefone };
    contatos.push(contato);
    exibirContatos();
    salvarContatos(); // Salvar contatos no localStorage
}

// Função para exibir os contatos
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

// Inicialização e configuração de eventos
document.addEventListener('DOMContentLoaded', function() {
    // Carregar contatos do localStorage
    carregarContatos();
    
    // Exibir contatos ao carregar a página
    exibirContatos();
    
    // Evento de submit do formulário
    document.getElementById('formulario-contato').addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        
        if (nome && telefone) {
            adicionarContato(nome, telefone);
            document.getElementById('nome').value = '';
            document.getElementById('telefone').value = '';
        }
    });
    
    // Evento de busca
    document.getElementById('busca').addEventListener('input', buscarContato);
});