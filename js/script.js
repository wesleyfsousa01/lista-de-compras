let minhaLista = {
    titulo : "",
    itens : []
}


function adicionarLista(){
    var lista = document.getElementById('listaItens');
    const elemento = document.createElement('li');


    // elemento.className += 'li_element';

    var nomeInput = document.getElementById('itemName').value;
    const texto = document.createTextNode(nomeInput);
    
    elemento.appendChild(adicionarElementosLista(nomeInput))
    lista.appendChild(elemento)
    minhaLista.itens.push(nomeInput)


    //limpando input item
    const inputForm = document.getElementById('itemName');
    inputForm.value = "";

    event.preventDefault();
}


function adicionarElementosLista (item) {
    //adicionando elementos a li
    var div = document.createElement('div');
    var span = document.createElement('span')
    var buttonCheck = document.createElement('button');
    var buttonEdit = document.createElement('button');
    var buttonDelete = document.createElement('button');

    buttonCheck.classList.add('btn');
    buttonCheck.classList.add('btn-primary');
    buttonCheck.classList.add('check-item');
    buttonCheck.innerHTML = '<i class="fa-solid fa-check">';

    buttonEdit.classList.add('btn');
    buttonEdit.classList.add('btn-primary');
    buttonEdit.classList.add('edit-item')
    buttonEdit.innerHTML = '<i class="fas fa-edit"></i>';

    buttonDelete.classList.add('btn');
    buttonDelete.classList.add('btn-primary');
    buttonDelete.classList.add('remove-item');
    buttonDelete.innerHTML = '<i class="fa-solid fa-x"></i>';

    span.textContent = item;

    div.classList.add('div_container_li');
    div.appendChild(span);
    div.appendChild(buttonCheck);
    div.appendChild(buttonEdit);
    div.appendChild(buttonDelete);

    return div;
    
}

function carregarNaPagina() {

    let dadosalvo = localStorage.getItem('titulo')

    if(dadosalvo) {
        minhaLista = JSON.parse(dadosalvo);
    }

    document.getElementById('titulo').innerHTML = minhaLista.titulo;
    listaItens = document.getElementById('listaItens');
    listaItens.innerHTML = '';


    for(item of minhaLista.itens){
        const li = document.createElement('li');
        li.appendChild(adicionarElementosLista(item));
        listaItens.appendChild(li)///
    }
}

function esconderFormTitulo () {
    var formTitle = document.getElementById('formTitle');
    formTitle.classList.toggle('hidden');
}

function salvarTitulo() {
    var containerH1 = document.getElementById('container_h1');
    var titulo = document.getElementById('titulo');
    var novoTitulo = document.getElementById('titleName').value;


    if (novoTitulo !== "") {
        minhaLista.titulo = novoTitulo;
        titulo.innerHTML = novoTitulo;

        esconderFormTitulo();

    } else {
        // Exibir uma mensagem de erro ou tomar outra ação, conforme necessário
        alert("Por favor, insira um título válido.");
    }
}

// TODO

function esconderFormItem() {}

// Done


function excluirItem (elementoPai) {
    const elementoAvo = elementoPai.parentNode;
    elementoAvo.remove();

    //excluindo também do localStorage
    const itemName = elementoAvo.querySelector('span').textContent;
    const intemIndice = minhaLista.itens.indexOf(itemName);
    if (intemIndice !== -1){
        minhaLista.itens.splice(intemIndice, 1);
        salvarDados()
    }
}


function alternarElementosItem(elementoPai){
    elementoPai.id = 'id-teste'
    elementoPai.classList.toggle('hidden');
    console.log(elementoPai.classList)

}

function editarItem(elementoPai){
    const li_element = elementoPai.parentNode;

    const div = document.createElement('div');
    div.classList.add('d-flex');

    const input  = document.createElement('input');
    input.classList.add('form-control');

    const btnSalvar = document.createElement('button');
    btnSalvar.classList.add('btn');
    btnSalvar.classList.add('btn-primary');
    btnSalvar.classList.add('salvar');
    btnSalvar.textContent = "Salvar";

    const btnCancelar = document.createElement('button');
    btnCancelar.classList.add('btn');
    btnCancelar.classList.add('btn-primary');
    btnCancelar.classList.add('cancelar')
    btnCancelar.textContent = "Cancelar";


    div.appendChild(input);
    div.appendChild(btnSalvar)
    div.appendChild(btnCancelar);

    li_element.appendChild(div);

    alternarElementosItem(elementoPai);

}

function checarItemLista(elementoPai){
    const li_element = elementoPai.parentNode;
    li_element.classList.toggle('checked-item')
    console.log(li_element.classList)
}


// Eventos

const lista = document.getElementById('listaItens'); 


lista.addEventListener("click", (e) =>{
    console.log('Evento de click acionado')
    const elementoClicado = e.target;
    const elementoPai = elementoClicado.closest('.div_container_li');

    if(elementoClicado.classList.contains("remove-item") || elementoClicado.closest('.remove-item')){
        excluirItem(elementoPai);
    }


    if(elementoClicado.classList.contains('edit-item') || elementoClicado.closest('.edit-item')){
        editarItem(elementoPai);
        
    }
    if(elementoClicado.classList.contains('check-item')  || elementoClicado.closest('.fa-check')){
        checarItemLista(elementoPai);
    }

    //editar item
    if(elementoClicado.classList.contains('cancelar')){
        const div_container_li = document.getElementById('id-teste');
        alternarElementosItem(div_container_li)
        const div_alterar = elementoClicado.closest('.d-flex');
        alternarElementosItem(div_alterar);
        console.log(div_alterar.classList);
    }

})


function salvarDados() {
    localStorage.setItem('titulo', JSON.stringify(minhaLista))
}

