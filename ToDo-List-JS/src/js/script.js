const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
    localStorage.setItem("todoList", JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement("label");
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
        banco.push({ 'tarefa': texto.value, 'status': "" });
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
    filtered.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));        
};

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    setBanco(banco);
    atualizarTela();
};

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === "button") {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
};

const removerItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = 'removed'
    setBanco(banco);
    atualizarTela();
};

document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);
document.getElementById("filter").addEventListener("change", atualizarTela);
document.getElementById("adicionar-item").addEventListener("click", inserirItem);

atualizarTela();