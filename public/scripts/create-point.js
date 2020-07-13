function populateUFs() {
    
    const $ufSelect = document.querySelector("select[name=uf]")
   
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        
        for (const state of states) {
            $ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCities(event) {
    
    const $citySelect = document.querySelector("select[name=city]")
    const $stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    $stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    $citySelect.innerHTML = "<option value = >Selecione a Cidade</option>"
    $citySelect.disabled = false
    
    
    fetch(url)
    .then( res => res.json())
    .then( cities => {
        
        for (const city of cities) {
            $citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        $citySelect.disabled = false
    })
}



document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// Itens de coleta

const $itemsToCollect = document.querySelectorAll(".items-grid li")

for (item of $itemsToCollect) {
    item.addEventListener("click", handleSelectItem)
}

const $collectedItems = document.querySelector("input[name=items]") 

let selectedItems = []

function handleSelectItem(event) {
    // adicionar ou remover uma classe

    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem items selecionados
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => item == itemId )

    
    // se já estiver selecionado, tirar da seleção

    if (alreadySelected >= 0) {

        const filteredItems = selectedItems.filter( item => item != itemId )

        selectedItems = filteredItems

    } else {
        // se não estiver selecionado, adicionar a seleção
        // atualizar campos escondidos
        selectedItems.push(itemId)
    }

    //atualziar o campo escondio com os itens selecionados
    $collectedItems.value = selectedItems


}