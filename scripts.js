//Pagina  JavaScript.

// Função do LocalStorage.
const getDados = () => JSON.parse(localStorage.getItem('todaAtiv')) ?? [];
const setDados = (dados) => localStorage.setItem('todaAtiv', JSON.stringify(dados));


// Função cadastrar a atividade da lista no HTML.
function criarAtividade(atividade, status, indice){
        const item = document.createElement('div');
        item.classList.add('item')
        item.innerHTML = ` 
                        <label class="check-item">
                            <input type="checkbox" class="bt-check" ${status} data-indice=${indice}> 
                            <div class="ativ">${atividade}</div>                                                      
                            <input type="button" value="X" class="botao" data-indice=${indice}>
                        </label>`
                   

        document.getElementById('todaAtiv').appendChild(item)
}

// Função limpa lista
function limparLista(){
    const dados = getDados();
    const todaAtiv = document.getElementById('todaAtiv');
    while (todaAtiv.firstChild) {
        todaAtiv.removeChild(todaAtiv.lastChild);
    }
}

// Função carregar lista ao reabrir a página.
function carregarLista(){
    limparLista();
    const dados = getDados();
    dados.forEach((item, indice) => criarAtividade(item.atividade, item.status, indice));
}

// Função capturar texto digitado.
function cadastrarItem(evento){
    const textoDig = document.getElementById('dig').value;
    const tecla = evento.key;
    if (textoDig.length <= 0){
        alert("O campo da tarefa está vazio, por favor, preencha com o nome da tarefa.");
        return;

    } 
    const dados = getDados();
    dados.push({'atividade': textoDig, 'status': ''})
    setDados(dados);
    carregarLista();
}
function cadtecla(evento){
    const tecla = evento.key;
    const textoDig = evento.target.value;
    if(tecla == 'Enter'){
        if (textoDig.length <= 0){
            alert("O campo da tarefa está vazio, por favor, preencha com o nome da tarefa.");
            return;
        } 
        const dados = getDados();
        dados.push({'atividade': textoDig, 'status': ''})
        setDados(dados);
        carregarLista();
    }
}


// Função excluir a atividade da lista.
function excluirAtividade(indice){
    const dados = getDados();
    dados.splice(indice,1);
    setDados(dados);
    carregarLista();

}

function atualizarAtividade(indice){
    const dados = getDados();
    if (dados[indice].status === ''){
        dados[indice].status = 'checked';
        setDados(dados);
        carregarLista();
        return;
    } else{
        dados[indice].status = '';
        setDados(dados);
        carregarLista();
    }

}


// Função capturar click de marcação.
// Solicitar confirmação do usuário antes de excluir.
function cliqItem(evento){
    const clique = evento.target;
    const tecla = evento.key
    const indice = clique.dataset.indice;
    if(clique.type === 'button'){
        var permissao = confirm("Deseja excluir a tarefa?");
        if(permissao == true){
            excluirAtividade(indice);
        }
        
    }
    else if(clique.type === 'checkbox'){
        atualizarAtividade(indice);


    } 

    


}

document.getElementById('btn-adicionar').addEventListener('click', cadastrarItem);
document.getElementById('dig').addEventListener('keypress', cadtecla);
document.getElementById('todaAtiv').addEventListener('click', cliqItem);
carregarLista();