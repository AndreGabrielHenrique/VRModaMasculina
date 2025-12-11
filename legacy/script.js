// legacy\script.js
// Arquivo JavaScript principal da aplicação VR Moda Masculina (versão legacy)
// Contém toda a lógica de interatividade da página, incluindo carrossel, carrinho, formulário, etc.

// ==================================================
// SELEÇÃO DE ELEMENTOS DO DOM
// ==================================================

// Obtém referência ao elemento do fundo da construção (modal de "em construção")
const fundoconstrucao = document.getElementById("fundoconstrucao")

// Obtém referência ao formulário de busca
const busca = document.getElementById('busca')

// Obtém referência ao menu de perfil do usuário
const menu = document.getElementById("menu")

// Obtém referência ao submenu de perfil (dentro do menu)
const perfil = document.getElementById("perfil")

// Obtém uma coleção de elementos com a classe "favoritar" (ícones de favorito nos produtos)
const favoritar = document.getElementsByClassName("favoritar")

// Obtém uma coleção de elementos com a classe "removerproduto" (botões para remover produto do carrinho)
const removerproduto = document.getElementsByClassName("removerproduto")

// Obtém uma coleção de elementos com a classe "adicionaraocarrinho" (botões para adicionar produto ao carrinho)
const adicionaraocarrinho = document.getElementsByClassName("adicionaraocarrinho")

// Obtém referência à seção do carrinho
const carrinho = document.getElementById("carrinho")

// Obtém referência ao elemento que exibe a mensagem de carrinho vazio
const carrinhovazio = document.querySelector(".carrinhovazio")

// Obtém uma coleção de elementos com a classe "quantidade" (inputs de quantidade no carrinho)
const quantidade = document.getElementsByClassName("quantidade")

// Obtém referência à lista de produtos no carrinho
const listacarrinho = document.getElementById("listacarrinho")

// Obtém referência ao formulário de cadastro
const cadastro = document.getElementById("cadastro")

// Obtém referência ao campo de primeiro nome no formulário
const primeironome = document.getElementById("primeironome")

// Obtém referência ao campo de segundo nome no formulário
const segundonome = document.getElementById("segundonome")

// Obtém referência ao campo de e-mail no formulário
const email = document.getElementById("email")

// Obtém referência ao campo de cidade no formulário
const cidade = document.getElementById("cidade")

// Obtém referência ao campo de estado no formulário
const estado = document.getElementById("estado")

// Obtém referência ao campo de CEP no formulário
const cep = document.getElementById("cep")

// Obtém referência ao checkbox de termos e condições no formulário
const termos = document.getElementById("termos")

// Obtém referência ao elemento que exibirá mensagem de sucesso após envio do formulário
const enviado = document.getElementById("enviado")

// Obtém referência ao elemento que conterá a lista de estados para autocomplete
const listaestados = document.getElementById("listaestados")

// Array de objetos com os estados brasileiros (incluindo 'Estrangeiro')
const estados =
[
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
    { value: 'EX', label: 'Estrangeiro' }
]

// Obtém referência ao botão de rolar a página (scroll)
const scrollpagina = document.querySelector('.scrollpagina')

// ==================================================
// EVENT LISTENERS GLOBAIS
// ==================================================

// Adiciona um event listener ao formulário de busca para prevenir o comportamento padrão de submit
busca.addEventListener("click", (event) =>
{
    event.preventDefault()
})

// ==================================================
// FUNÇÕES DE CONTROLE DE MENU E PERFIL
// ==================================================

// Função para abrir/fechar o menu de perfil
abrirmenu=(event)=>
{
    // Impede a propagação do evento para não fechar imediatamente
    event.stopPropagation()
    // Alterna a classe 'mostrarmenu' no elemento menu (mostra/oculta)
    menu.classList.toggle("mostrarmenu")
}

// Função para mostrar/ocultar o submenu de perfil
verperfil=(event)=>
{
    event.stopPropagation()
    perfil.classList.toggle("mostrarperfil")
}

// Event listener global para fechar menus quando clicar fora
document.addEventListener('click', function(event)
{
    const abrirmenu = document.querySelector('.abrirmenu')
    const erros = document.querySelectorAll('.errocadastro')

    // Se o clique não foi no menu nem no botão que abre o menu, fecha o menu
    if (!menu.contains(event.target) && !abrirmenu.contains(event.target))
    {
        menu.classList.remove("mostrarmenu")
    }
    // Se o clique não foi no submenu de perfil, fecha o submenu
    if (!perfil.contains(event.target))
    {
        perfil.classList.remove("mostrarperfil")
    }
    // Para cada mensagem de erro, se o clique não foi nela, remove a mensagem
    erros.forEach(function(erro)
    {
        if (!erro.contains(event.target))
        {
            erro.classList.remove("mostrarerrocadastro")
            erro.innerHTML = ''
        }
    })
    // Se o clique foi no fundo da construção (modal), esconde o modal
    if (event.target == fundoconstrucao)
    {
        fundoconstrucao.style.display = "none"
    }
})

// ==================================================
// CARROSSEL DE IMAGENS
// ==================================================

// Variável que controla a imagem atual do carrossel (começa na 1)
let imagematual = 1
// Tempo de transição entre imagens (4 segundos)
let transicao = 4000

// Chama a função para mostrar a imagem inicial do carrossel
mostrarcarousel(imagematual)

// Função para controlar a navegação do carrossel (próximo/anterior)
controles=(numero)=>
{
    // Atualiza a imagem atual somando o número (1 para próximo, -1 para anterior)
    mostrarcarousel(imagematual += numero)
}

// Função para ir diretamente para uma imagem específica (pelos indicadores)
thumbnails=(numero)=>
{
    mostrarcarousel(imagematual = numero)
}

// Função para avançar automaticamente o carrossel
carouselautomatico=()=>
{
    imagematual++
    mostrarcarousel(imagematual)
}

// Inicia o carrossel automático com intervalo definido
let intervalocarousel = setInterval(carouselautomatico, transicao)

// Pausa o carrossel automático quando o mouse está sobre o carrossel
document.querySelector(".carousel").addEventListener("mouseover", ()=>
{
    clearInterval(intervalocarousel)
})

// Retoma o carrossel automático quando o mouse sai do carrossel
document.querySelector(".carousel").addEventListener("mouseout", ()=>
{
    intervalocarousel = setInterval(carouselautomatico, transicao)
})

// Função principal que controla a exibição do carrossel
function mostrarcarousel(numero)
{
    var contador;
    const imagem = document.getElementsByClassName("imagem")
    const indicador = document.getElementsByClassName("indicador")
    
    // Se o número for maior que a quantidade de imagens, volta para a primeira
    if (numero > imagem.length)
    {
        imagematual = 1
    }
    // Se o número for menor que 1, vai para a última imagem
    if (numero < 1)
    {
        imagematual = imagem.length
    }
    
    // Esconde todas as imagens
    for (contador = 0; contador < imagem.length; contador++)
    {
        imagem[contador].style.display = "none"
    }
    
    // Mostra a imagem atual
    imagem[imagematual - 1].style.display = "block"
    
    // Remove a classe 'ativo' de todos os indicadores
    for (contador = 0; contador < indicador.length; contador++)
    {
        indicador[contador].className = indicador[contador].className.replace(" ativo", "")
    }
    
    // Adiciona a classe 'ativo' ao indicador da imagem atual
    indicador[imagematual - 1].className += " ativo"
    
    // Obtém referência aos botões anterior e próximo
    const anterior = document.querySelector('.anterior')
    const proximo = document.querySelector('.proximo')
    
    // Remove classes de cor dos botões
    anterior.classList.remove('botaopreto', 'botaobranco')
    proximo.classList.remove('botaopreto', 'botaobranco')
    
    // Lógica para definir as cores dos botões baseado na imagem atual
    // Isso é para garantir contraste com a imagem de fundo
    if (imagematual === 1)
    {
        anterior.classList.add('botaopreto')
        proximo.classList.add('botaobranco')
    }
    else if (imagematual === 2)
    {
        anterior.classList.add('botaobranco')
        proximo.classList.add('botaopreto')
    }
    else
    {
        anterior.classList.add('botaopreto')
        proximo.classList.add('botaopreto')
    }  
}

// ==================================================
// FAVORITAR PRODUTOS
// ==================================================

// Adiciona event listener a cada botão de favoritar
for (var produto = 0; produto < favoritar.length; produto++)
{
    favoritar[produto].addEventListener("click", favoritarproduto)
}

// Função que alterna o estado de favorito (preenche ou esvazia o coração)
function favoritarproduto(event)
{
    // Obtém o elemento pai do ícone clicado (o parágrafo com classe 'favoritar')
    const favoritando = event.target.parentElement
    // Obtém o elemento 'path' dentro do SVG do coração
    const favorito = favoritando.querySelector(".favorito path")
    // Alterna o atributo 'fill' entre 'none' e 'currentColor'
    favorito.setAttribute("fill", favorito.getAttribute("fill") === "none" ? "currentColor" : "none")
}

// ==================================================
// CARRINHO DE COMPRAS
// ==================================================

// Adiciona event listeners para os botões de remover produto (se existirem na inicialização)
for (var produto = 0; produto < removerproduto.length; produto++)
{
    removerproduto[produto].addEventListener("click", removeproduto)
}

// Adiciona event listeners para os inputs de quantidade (se existirem na inicialização)
for (var produto = 0; produto < quantidade.length; produto++)
{
    quantidade[produto].addEventListener("change", sevazio)
}

// Adiciona event listeners para os botões de adicionar ao carrinho
for (var produto = 0; produto < adicionaraocarrinho.length; produto++)
{
    adicionaraocarrinho[produto].addEventListener("click", carrinhodecompras)
}

// Função principal para adicionar produto ao carrinho
function carrinhodecompras(event)
{
    event.preventDefault()       
    // Obtém o elemento pai do botão clicado (o div com classe 'produto')
    const informacoes = event.target.parentElement
    
    // Extrai as informações do produto
    const imagemdoproduto = informacoes.getElementsByClassName("imagemdoproduto")[0].src
    const nomedoproduto = informacoes.getElementsByClassName("descricao")[0].innerText
    const tamanhodoproduto = informacoes.getElementsByClassName("descricaotamanho")[0].innerText
    const precodoproduto = informacoes.getElementsByClassName("preco")[0].innerText.replace("R$ ", "").replace(",", ".")
    
    // Abre a seção do carrinho, oculta a mensagem de vazio e abre o formulário de cadastro
    abrircarrinho()
    alocarcarrinho()
    abrircadastro()

    // Verifica se o produto já está no carrinho
    const nomecarrinho = document.getElementsByClassName("nomecarrinho")
    for (var produto = 0; produto < nomecarrinho.length; produto++)
    {
        if (nomecarrinho[produto].innerText === nomedoproduto)
        {
            // Se o produto já está no carrinho, incrementa a quantidade
            const quantidade = nomecarrinho[produto].parentElement.getElementsByClassName("quantidade")[0]
            const erroquantidade = nomecarrinho[produto].parentElement.getElementsByClassName("erroquantidade")[0]
            const quantidadeatualizada = parseInt(quantidade.value) + 1
            
            // Verifica se não ultrapassou o limite máximo (99)
            if (quantidadeatualizada > 99)
            {
                erroquantidade.innerHTML = 'Número máximo atingido'
                quantidade.value = 99
            }
            else
            {
                quantidade.value = quantidadeatualizada
                erroquantidade.innerHTML = ''
            }
            // Atualiza o preço total do produto
            atualizarprecototal(nomecarrinho[produto].parentElement)
            // Rola a página até o carrinho
            window.location.href = "#carrinho"
            return
        }
    }

    // Se o produto não está no carrinho, cria um novo elemento para ele
    const novoproduto = document.createElement("span")
    novoproduto.classList.add("produtocarrinho")
    // Template HTML para o produto no carrinho
    novoproduto.innerHTML =
        `
            <nav class="removerproduto">
                <svg xmlns="http://www.w3.org/2000/svg" class="remover" viewBox="0 0 512 512">
                    <path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none"/>
                    <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z"/>
                </svg>
            </nav>
            <nav class="imagemcarrinho">
                <img src="${imagemdoproduto}">
            </nav>
            <nav class="nomecarrinho">${nomedoproduto}</nav>
            <nav class="produtoquantidade">
                <h3>Quantidade</h3>
                <input type="number" value="1" minlength="0" maxlength="99" class="quantidade">
                <div class="erroquantidade"></div>
            </nav>
            <nav class="tamanhoproduto">
                <h3>Tamanho</h3>
                <p class="tamanho">${tamanhodoproduto}</p>
            </nav>
            <nav class="precounidadecarrinho">
                <h3>Preço Unid.</h3>
                <p class="precounidade">R$ ${precodoproduto}</p>
            </nav>
            <nav class="precototalcarrinho">
                <h3>Preço Total</h3>
                <p class="produtoprecototal">R$ ${precodoproduto}</p>
            </nav>
        `
    // Adiciona o novo produto à lista do carrinho
    const adicionandoproduto = document.querySelector(".listacarrinho")
    adicionandoproduto.append(novoproduto)
    
    // Adiciona event listeners aos novos elementos
    novoproduto.getElementsByClassName("removerproduto")[0].addEventListener("click", removeproduto)
    novoproduto.getElementsByClassName("quantidade")[0].addEventListener("change", sevazio)
    
    // Limpa a mensagem de envio (se houver) e rola até o carrinho
    enviado.innerHTML = ''
    window.location.href = "#carrinho"
}

// Função para atualizar o preço total de um produto no carrinho
atualizarprecototal=(produto)=>
{
    // Obtém o preço unitário (remove "R$ " e substitui vírgula por ponto)
    const precounidade = parseFloat(produto.getElementsByClassName("precounidade")[0].innerText.replace("R$ ", "").replace(",", "."))
    // Obtém a quantidade do produto
    const quantidadeproduto = parseInt(produto.getElementsByClassName("quantidade")[0].value)
    // Calcula o preço total
    const precototal = precounidade * quantidadeproduto
    // Atualiza o elemento que exibe o preço total
    const atualizar = produto.getElementsByClassName("produtoprecototal")[0]
    atualizar.innerText = `R$ ${precototal}`
}

// Função para remover um produto do carrinho
removeproduto=(event)=>
{
    // Remove o elemento mais próximo 'span' (o produto inteiro)
    event.target.closest("span").remove()
    // Se a lista do carrinho ficou vazia, fecha a seção do carrinho e do formulário
    if (listacarrinho.innerText === "")
    {
        fecharcarrinho()
        fecharcadastro()
    }
    // Atualiza o preço total (embora não esteja claro o que atualizar sem parâmetro)
    atualizarprecototal()
}

// Função chamada quando a quantidade de um produto é alterada
sevazio=(event)=>
{
    // Obtém o elemento do produto (o span pai)
    const produto = event.target.closest("span")
    // Obtém o novo valor da quantidade
    const quantidade = event.target.value
    // Obtém o elemento de erro para este produto
    const erroquantidade = produto.getElementsByClassName("erroquantidade")[0]
    erroquantidade.innerHTML = ''
    
    // Se a quantidade for menor que 1 ou não for um número, remove o produto
    if (quantidade < 1 || isNaN(quantidade))
    {
        produto.remove()
        if (listacarrinho.innerText === "")
        {
            fecharcarrinho()
            fecharcadastro()
        }
    }
    // Se a quantidade for maior que 99, exibe erro e ajusta para 99
    else if (quantidade > 99)
    {
        erroquantidade.innerHTML = 'Número máximo atingido'
        event.target.value = 99
        atualizarprecototal(produto)
        return
    }
    // Se estiver tudo ok, atualiza o preço total
    erroquantidade.innerHTML = ''
    atualizarprecototal(produto)
}

// ==================================================
// AUTOCOMPLETE DE ESTADOS
// ==================================================

// Variável para controlar a seleção no autocomplete
let selecao = -1
// Array que conterá os estados filtrados conforme o usuário digita
let filtrarestados = estados

// Função para renderizar a lista de estados filtrados
renderizarestados=()=>
{
    // Limpa a lista atual
    listaestados.innerHTML = ''
    // Para cada estado filtrado, cria um elemento div
    filtrarestados.forEach((estado, index)=>
    {
        const opcaoestado = document.createElement('div')
        opcaoestado.textContent = estado.label
        opcaoestado.dataset.index = index
        // Adiciona event listeners para clique e mouseenter
        opcaoestado.addEventListener('click', ()=> selecionarestado(index))
        opcaoestado.addEventListener('mouseenter', ()=> apontarestado(index))
        listaestados.appendChild(opcaoestado)
    })
    // Mostra ou esconde a lista dependendo se há estados filtrados
    if (filtrarestados.length > 0)
    {
        listaestados.style.display = 'block'
    }
    else
    {
        listaestados.style.display = 'none'
    }
}

// Função para selecionar um estado da lista
selecionarestado=(index)=>
{
    const opcaoestado = filtrarestados[index]
    // Define o valor do input como o label do estado selecionado
    estado.value = opcaoestado.label
    // Esconde a lista
    listaestados.style.display = 'none'
    selecao = index
}

// Função para filtrar os estados conforme o texto digitado
filtrandoestados=(inputValue)=>
{
    filtrarestados = estados.filter(estado =>
        estado.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    selecao = -1
    renderizarestados()
}

// Função para destacar um estado na lista (quando o mouse passa por cima)
apontarestado=(index)=>
{
    const opcoesestado = listaestados.querySelectorAll('div')
    opcoesestado.forEach(div => div.classList.remove('selecionado'))
    if (index !== -1)
    {
        opcoesestado[index].classList.add('selecionado')
        selecao = index
    }
}

// Event listener para o input de estado: filtra estados conforme digitação
estado.addEventListener('input', (event)=>
{
    filtrandoestados(event.target.value)
})

// Event listener para teclas no input de estado (navegação com setas, Enter, etc.)
estado.addEventListener('keydown', (event)=>
{
    const contagemestados = filtrarestados.length
    // Seta para baixo: move a seleção para baixo
    if (event.key === 'ArrowDown')
    {
        if (selecao < contagemestados - 1)
        {
            selecao++
            realcarestado(selecao)
            irparaestadoselecionado()
        }
    }
    // Seta para cima: move a seleção para cima
    else if (event.key === 'ArrowUp')
    {
        if (selecao > 0)
        {
            selecao--
            realcarestado(selecao)
            irparaestadoselecionado()
        }
    }
    // Enter ou Tab: seleciona o estado atualmente destacado
    else if (event.key === 'Enter' || event.key === 'Tab')
    {
        if (selecao !== -1)
        {
            selecionarestado(selecao)
        }
    }
    // Escape: esconde a lista
    else if (event.key === 'Escape')
    {
        listaestados.style.display = 'none'
    }
})

// Função para destacar visualmente um estado na lista
realcarestado=(index)=>
{
    const opcoesestado = listaestados.querySelectorAll('div')
    opcoesestado.forEach(div => div.classList.remove('selecionado'))
    if (index !== -1)
    {
        opcoesestado[index].classcionado.add('selecionado')
    }
}

// Função para rolar a lista até o estado selecionado (se necessário)
irparaestadoselecionado=()=>
{
    const opcoesestado = listaestados.querySelectorAll('div')
    const estadoselecionado = opcoesestado[selecao]
    if (estadoselecionado)
    {
        const tamanholista = listaestados.clientHeight
        const topolista = estadoselecionado.offsetTop
        const tamanhoestados = estadoselecionado.offsetHeight
        // Se o estado selecionado está acima da área visível, rola para cima
        if (topolista < listaestados.scrollTop)
        {
            listaestados.scrollTop = topolista
        }
        // Se o estado selecionado está abaixo da área visível, rola para baixo
        else if (topolista + tamanhoestados > listaestados.scrollTop + tamanholista)
        {
            listaestados.scrollTop = topolista + tamanhoestados - tamanholista
        }
    }
}

// Quando o input de estado recebe foco, mostra todos os estados
estado.addEventListener('focus', ()=>
{
    filtrarestados = estados
    renderizarestados()
})

// Fecha a lista de estados se clicar fora
document.addEventListener('click', (event)=>
{
    if (!estado.contains(event.target) && !listaestados.contains(event.target))
    {
        listaestados.style.display = 'none'
    }
})

// ==================================================
// VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
// ==================================================

// Adiciona event listener para o submit do formulário
cadastro.addEventListener("submit", (event) =>
{
    event.preventDefault()
    checarinputs()
})

// Função que valida todos os campos do formulário
checarinputs=()=>
{
    // Obtém valores e elementos de erro de cada campo
    const valorprimeironome = primeironome.value
    const erroprimeironome = document.getElementById("erroprimeironome")
    const valorsegundonome = segundonome.value
    const errosegundonome = document.getElementById("errosegundonome")
    const valoremail = email.value
    const erroemail = document.getElementById("erroemail")
    const valorcidade = cidade.value
    const errocidade = document.getElementById("errocidade")
    const valorestado = estado.value
    const erroestado = document.getElementById("erroestado")
    const valorcep = cep.value
    const errocep = document.getElementById("errocep")
    const errotermos = document.getElementById("errotermos")

    // Validação do primeiro nome
    if (valorprimeironome === "")
    {
        erroprimeironome.innerHTML = '<p class="errado">Não preenchido</p>'
        erroprimeironome.classList.add("mostrarerrocadastro")
        return
    }
    else
    {
        validar(primeironome)
        erroprimeironome.classList.remove("mostrarerrocadastro")
        erroprimeironome.innerHTML = ''
    }

    // Validação do segundo nome
    if (valorsegundonome === "")
    {
        errosegundonome.innerHTML = '<p class="errado">Não preenchido</p>'
        errosegundonome.classList.add("mostrarerrocadastro")
        return
    }
    else
    {
        validar(segundonome)
        errosegundonome.classList.remove("mostrarerrocadastro")
        errosegundonome.innerHTML = ''
    }

    // Validação do e-mail (não vazio e formato válido)
    if (valoremail === "" || !emailvalido(valoremail))
    {
        erroemail.innerHTML = '<p class="errado">E-mail incorreto</p>'
        erroemail.classList.add("mostrarerrocadastro")
        return
    }
    else
    {
        validar(email)
        erroemail.classList.remove("mostrarerrocadastro")
        erroemail.innerHTML = ''
    }

    // Validação da cidade
    if (valorcidade === "")
    {
        errocidade.innerHTML = '<p class="errado">Não preenchido</p>'
        errocidade.classList.add("mostrarerrocadastro")
        return
    }
    else
    {
        validar(cidade)
        errocidade.classList.remove("mostrarerrocadastro")
        errocidade.innerHTML = ''
    }

    // Validação do estado (deve estar na lista de estados)
    const validarestado = estados.some(estado => estado.label.toLowerCase() === valorestado.toLowerCase())
    if (!validarestado)
    {
        erroestado.innerHTML = '<p class="errado">Estado não selecionado ou inválido</p>'
        erroestado.classList.add("mostrarerrocadastro")
        return
    }
    else
    {
        validar(estado)
        erroestado.classList.remove("mostrarerrocadastro")
        erroestado.innerHTML = ''
    }

    // Validação do CEP (apenas se não está vazio, não valida formato)
    if (valorcep === "")
    {
        errocep.innerHTML = '<p class="errado">Não preenchido</p>'
        errocep.classList.add("mostrarerrocadastro")
        return
    }
    else
    {
        validar(cep)
        errocep.classList.remove("mostrarerrocadastro")
        errocep.innerHTML = ''
    }

    // Validação do checkbox de termos
    if (!termos.checked)
    {
        errotermos.innerHTML = '<p class="errado">É necessário aceitar os termos e condições</p>'
        errotermos.classList.add("mostrarerrocadastro")
        return
    }
    else
    {
        validar(termos)
        errotermos.classList.remove("mostrarerrocadastro")
        errotermos.innerHTML = ''
    }

    // Se todas as validações passaram, envia o formulário
    enviarcadastro()
}

// Previne o comportamento padrão do Enter em inputs (para não submeter o formulário prematuramente)
document.querySelectorAll('input').forEach(input =>
{
    input.addEventListener('keydown', (event)=>
    {
        if (event.key === 'Enter')
        {
            event.preventDefault()
        }
    })
})

// ==================================================
// FUNÇÕES AUXILIARES DO FORMULÁRIO E CARRINHO
// ==================================================

// Mostra o formulário de cadastro
abrircadastro=()=>
{
    cadastro.style.display = "flex"
}

// Esconde o formulário de cadastro e reseta os campos
fecharcadastro=()=>
{
    cadastro.style.display = "none"
    resetarcadastro()
}

// Exibe mensagem de sucesso após envio do formulário
enviarcadastro=()=>
{
    enviado.innerHTML = '<p class="correto">Muito obrigado, logo daremos retorno</p>'
    enviando()
}

// Função para validar formato de e-mail com regex
emailvalido=(email)=>
{
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

// Adiciona classe 'validado' ao campo (para estilização visual de sucesso)
validar=(input)=>
{
    const validacao = input.parentElement
    validacao.className = "input validado"
}

// Reseta todos os campos do formulário
resetarcadastro=()=>
{
    primeironome.value = ""
    segundonome.value = ""
    email.value = ""
    cidade.value = ""
    estado.value = ""
    cep.value = ""
    termos.checked = false
}

// Processa o envio do formulário: limpa o carrinho, fecha seções, etc.
enviando=()=>
{
    listacarrinho.innerHTML = ""
    fecharcarrinho()
    fecharcadastro()
    atualizarprecototal()
}

// Função para alternar a visibilidade da seção do carrinho (usada no ícone do carrinho no header)
carrinhodecompras=()=>
{
    enviado.innerHTML = ''
    carrinho.style.display = carrinho.style.display === 'block' ? 'none' : 'block'
}

// Abre a seção do carrinho
abrircarrinho=()=>
{
    enviado.innerHTML = ''
    carrinho.style.display = "block"
}

// Fecha a seção do carrinho
fecharcarrinho=()=>
{
    carrinho.style.display = "none"
    carrinhovazio.style.display = "block"
}

// Oculta a mensagem de carrinho vazio (quando há produtos)
alocarcarrinho=()=>
{
    enviado.innerHTML = ''
    carrinhovazio.style.display = 'none'
}

// ==================================================
// FUNÇÕES GLOBAIS E UTILITÁRIAS
// ==================================================

// Exibe o modal de "em construção"
construcao=(event)=>
{
    event.preventDefault()
    fundoconstrucao.style.display = "flex"
}

// Controla a aparência do botão de scroll (seta para cima/baixo)
scrollmovimento=()=>
{
    if (window.scrollY >= 100)
    {
        scrollpagina.classList.remove('inferior')
        scrollpagina.classList.add('topo')
    }
    else
    {
        scrollpagina.classList.remove('topo')
        scrollpagina.classList.add('inferior')
    }
}

// Event listener para o botão de scroll: rola para o topo ou para o final
scrollpagina.addEventListener('click', ()=> 
{
    if (window.scrollY >= 100)
    {
        window.scrollTo
        (
            {top: 0}
        )
    }
    else
    {
        window.scrollTo
        (
            {top: document.body.scrollHeight}
        )        
    }
})

// Adiciona event listener para o scroll da janela
window.addEventListener('scroll', scrollmovimento)