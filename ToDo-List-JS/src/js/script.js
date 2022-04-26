const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
    localStorage.setItem("todoList", JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement("label");
    item.addEventListener('click', clickItem)
    item.classList.add("todo-item");
    item.innerHTML = `
    <input  type="checkbox"  ${status} data-indice= ${indice} >
    <div>${tarefa}</div>
    <button onClick="removerItem(${indice})"><img src="assets/remove.svg" /></button data-indice = ${indice}>
    `;
    document.getElementById("todoList").appendChild(item);
};

const limparTarefas = () => {
    const todoList = document.getElementById("todoList");
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
};

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = document.getElementById('newItem');
    if (!tecla || tecla === "Enter") {
        const banco = getBanco();
        banco.push({ id: Math.random(), 'tarefa': texto.value, 'status': "" });
        setBanco(banco);
        atualizarTela();

        texto.value = "";
    }
};

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    const filter = document.getElementById('filter').value

    const filtered = banco.filter(item =>  {    
        
        if (filter === 'filter-empty' && item.status !== 'removed') {
            return true
        } else if (filter === 'filter-list-completed' && item.status === 'checked') {
            return true
        } else if (filter === 'filter-list-in-progress' && item.status === '') {
            return true
        } else if (filter === 'filter-list-removed' && item.status === 'removed'){
            return true
        } 
        return false
    }) 
    filtered.forEach((item) => criarItem(item.tarefa, item.status, item.id));        
};

const atualizarItem = (indice) => {
    const banco = getBanco();
    const index = banco.findIndex(item => item.id == indice)
    if(index != -1){
        banco[index].status = banco[index].status === '' ? 'checked' : ''
        setBanco(banco);
        atualizarTela();
    }
};

const clickItem = (evento) => {
    const elemento = evento.target;
    const indice = elemento.dataset.indice;
    if(indice) {
     atualizarItem(indice)
    }
};

const removerItem = (indice) => {
    
    const banco = getBanco();
    const index = banco.findIndex(item => item.id == indice)
    if(index != -1){
        banco[index].status = 'removed'
        setBanco(banco);
        atualizarTela();
    }
};

document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("filter").addEventListener("change", atualizarTela);
document.getElementById("adicionar-item").addEventListener("click", inserirItem);

atualizarTela();