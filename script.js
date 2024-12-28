const fundoconstrucao = document.getElementById("fundoconstrucao")
const busca = document.getElementById('busca')
const menu = document.getElementById("menu")
const perfil = document.getElementById("perfil")
const favoritar = document.getElementsByClassName("favoritar")
const removerproduto = document.getElementsByClassName("removerproduto")
const adicionaraocarrinho = document.getElementsByClassName("adicionaraocarrinho")
const carrinho = document.getElementById("carrinho")
const carrinhovazio = document.querySelector(".carrinhovazio")
const quantidade = document.getElementsByClassName("quantidade")
const listacarrinho = document.getElementById("listacarrinho")
const cadastro = document.getElementById("cadastro")
const primeironome = document.getElementById("primeironome")
const segundonome = document.getElementById("segundonome")
const email = document.getElementById("email")
const cidade = document.getElementById("cidade")
const estado = document.getElementById("estado")
const cep = document.getElementById("cep")
const termos = document.getElementById("termos")
const enviado = document.getElementById("enviado")
const listaestados = document.getElementById("listaestados")
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
const scrollpagina = document.querySelector('.scrollpagina')

busca.addEventListener("click", (event) =>
{
    event.preventDefault()
})

abrirmenu=(event)=>
{
    event.stopPropagation()
    menu.classList.toggle("mostrarmenu")
}

verperfil=(event)=>
{
    event.stopPropagation()
    perfil.classList.toggle("mostrarperfil")
}

document.addEventListener('click', function(event)
{
    const abrirmenu = document.querySelector('.abrirmenu')
    const erros = document.querySelectorAll('.errocadastro')

    if (!menu.contains(event.target) && !abrirmenu.contains(event.target))
    {
        menu.classList.remove("mostrarmenu")
    }
    if (!perfil.contains(event.target))
    {
        perfil.classList.remove("mostrarperfil")
    }
    erros.forEach(function(erro)
    {
        if (!erro.contains(event.target))
        {
            erro.classList.remove("mostrarerrocadastro")
            erro.innerHTML = ''
        }
    })
    if (event.target == fundoconstrucao)
    {
        fundoconstrucao.style.display = "none"
    }
})

let imagematual = 1
let transicao = 4000
mostrarcarousel(imagematual)

controles=(numero)=>
{
    mostrarcarousel(imagematual += numero)
}

thumbnails=(numero)=>
{
    mostrarcarousel(imagematual = numero)
}

carouselautomatico=()=>
{
    imagematual++
    mostrarcarousel(imagematual)
}

let intervalocarousel = setInterval(carouselautomatico, transicao)
document.querySelector(".carousel").addEventListener("mouseover", ()=>
{
    clearInterval(intervalocarousel)
})
document.querySelector(".carousel").addEventListener("mouseout", ()=>
{
    intervalocarousel = setInterval(carouselautomatico, transicao)
})

function mostrarcarousel(numero)
{
    var contador;
    const imagem = document.getElementsByClassName("imagem")
    const indicador = document.getElementsByClassName("indicador")
    if (numero > imagem.length)
    {
        imagematual = 1
    }
    if (numero < 1)
    {
        imagematual = imagem.length
    }
    for (contador = 0; contador < imagem.length; contador++)
    {
        imagem[contador].style.display = "none"
    }
    imagem[imagematual - 1].style.display = "block"
    for (contador = 0; contador < indicador.length; contador++)
    {
        indicador[contador].className = indicador[contador].className.replace(" ativo", "")
    }
    indicador[imagematual - 1].className += " ativo"
    const anterior = document.querySelector('.anterior')
    const proximo = document.querySelector('.proximo')
    anterior.classList.remove('botaopreto', 'botaobranco')
    proximo.classList.remove('botaopreto', 'botaobranco')
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

for (var produto = 0; produto < favoritar.length; produto++)
{
    favoritar[produto].addEventListener("click", favoritarproduto)
}

function favoritarproduto(event)
{
    const favoritando = event.target.parentElement
    const favorito = favoritando.querySelector(".favorito path")
    favorito.setAttribute("fill", favorito.getAttribute("fill") === "none" ? "currentColor" : "none")
}

for (var produto = 0; produto < removerproduto.length; produto++)
{
    removerproduto[produto].addEventListener("click", removeproduto)
}

for (var produto = 0; produto < quantidade.length; produto++)
{
    quantidade[produto].addEventListener("change", sevazio)
}

for (var produto = 0; produto < adicionaraocarrinho.length; produto++)
{
    adicionaraocarrinho[produto].addEventListener("click", carrinhodecompras)
}

function carrinhodecompras(event)
{
    event.preventDefault()       
    const informacoes = event.target.parentElement
    const imagemdoproduto = informacoes.getElementsByClassName("imagemdoproduto")[0].src
    const nomedoproduto = informacoes.getElementsByClassName("descricao")[0].innerText
    const tamanhodoproduto = informacoes.getElementsByClassName("descricaotamanho")[0].innerText
    const precodoproduto = informacoes.getElementsByClassName("preco")[0].innerText.replace("R$ ", "").replace(",", ".")
    
    abrircarrinho()
    alocarcarrinho()
    abrircadastro()

    const nomecarrinho = document.getElementsByClassName("nomecarrinho")
    for (var produto = 0; produto < nomecarrinho.length; produto++)
    {
        if (nomecarrinho[produto].innerText === nomedoproduto)
        {
            nomecarrinho[produto].parentElement.getElementsByClassName("quantidade")[0].value++
            atualizarprecototal(nomecarrinho[produto].parentElement)
            window.location.href = "#carrinho"
            return
        }
    }

    const novoproduto = document.createElement("span")
    novoproduto.classList.add("produtocarrinho")
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
    const adicionandoproduto = document.querySelector(".listacarrinho")
    adicionandoproduto.append(novoproduto)
    novoproduto.getElementsByClassName("removerproduto")[0].addEventListener("click", removeproduto)
    novoproduto.getElementsByClassName("quantidade")[0].addEventListener("change", sevazio)
    enviado.innerHTML = ''
    window.location.href = "#carrinho"
}

atualizarprecototal=(produto)=>
{
    const precounidade = parseFloat(produto.getElementsByClassName("precounidade")[0].innerText.replace("R$ ", "").replace(",", "."))
    const quantidadeproduto = parseInt(produto.getElementsByClassName("quantidade")[0].value)
    const precototal = precounidade * quantidadeproduto
    const atualizar = produto.getElementsByClassName("produtoprecototal")[0]
    atualizar.innerText = `R$ ${precototal}`
}

removeproduto=(event)=>
{
    event.target.closest("span").remove()
    if (listacarrinho.innerText === "")
    {
        fecharcarrinho()
        fecharcadastro()
    }
    atualizarprecototal()
}

sevazio=(event)=>
{
    const produto = event.target.closest("span")
    const quantidade = event.target.value
    const erroquantidade = produto.getElementsByClassName("erroquantidade")[0]
    erroquantidade.innerHTML = ''
    if (quantidade < 1 || isNaN(quantidade))
    {
        produto.remove()
        if (listacarrinho.innerText === "")
        {
            fecharcarrinho()
            fecharcadastro()
        }
    }
    else if (quantidade > 99)
    {
        erroquantidade.innerHTML = 'Número máximo atingido'
        event.target.value = 99
        atualizarprecototal(produto)
        return
    }
    erroquantidade.innerHTML = ''
    atualizarprecototal(produto)
}

let selecao = -1
let filtrarestados = estados

renderizarestados=()=>
{
    listaestados.innerHTML = ''
    filtrarestados.forEach((estado, index)=>
    {
        const opcaoestado = document.createElement('div')
        opcaoestado.textContent = estado.label
        opcaoestado.dataset.index = index
        opcaoestado.addEventListener('click', ()=> selecionarestado(index))
        opcaoestado.addEventListener('mouseenter', ()=> apontarestado(index))
        listaestados.appendChild(opcaoestado)
    })
    if (filtrarestados.length > 0)
    {
        listaestados.style.display = 'block'
    }
    else
    {
        listaestados.style.display = 'none'
    }
}

selecionarestado=(index)=>
{
    const opcaoestado = filtrarestados[index]
    estado.value = opcaoestado.label
    listaestados.style.display = 'none'
    selecao = index
}

filtrandoestados=(inputValue)=>
{
    filtrarestados = estados.filter(estado =>
        estado.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    selecao = -1
    renderizarestados()
}

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

estado.addEventListener('input', (event)=>
{
    filtrandoestados(event.target.value)
})

estado.addEventListener('keydown', (event)=>
{
    const contagemestados = filtrarestados.length
    if (event.key === 'ArrowDown')
    {
        if (selecao < contagemestados - 1)
        {
            selecao++
            realcarestado(selecao)
            irparaestadoselecionado()
        }
    }
    else if (event.key === 'ArrowUp')
    {
        if (selecao > 0)
        {
            selecao--
            realcarestado(selecao)
            irparaestadoselecionado()
        }
    }
    else if (event.key === 'Enter' || event.key === 'Tab')
    {
        if (selecao !== -1)
        {
            selecionarestado(selecao)
        }
    }
    else if (event.key === 'Escape')
    {
        listaestados.style.display = 'none'
    }
})

realcarestado=(index)=>
{
    const opcoesestado = listaestados.querySelectorAll('div')
    opcoesestado.forEach(div => div.classList.remove('selecionado'))
    if (index !== -1)
    {
        opcoesestado[index].classList.add('selecionado')
    }
}

irparaestadoselecionado=()=>
{
    const opcoesestado = listaestados.querySelectorAll('div')
    const estadoselecionado = opcoesestado[selecao]
    if (estadoselecionado)
    {
        const tamanholista = listaestados.clientHeight
        const topolista = estadoselecionado.offsetTop
        const tamanhoestados = estadoselecionado.offsetHeight
        if (topolista < listaestados.scrollTop)
        {
            listaestados.scrollTop = topolista
        }
        else if (topolista + tamanhoestados > listaestados.scrollTop + tamanholista)
        {
            listaestados.scrollTop = topolista + tamanhoestados - tamanholista
        }
    }
}

estado.addEventListener('focus', ()=>
{
    filtrarestados = estados
    renderizarestados()
})

document.addEventListener('click', (event)=>
{
    if (!estado.contains(event.target) && !listaestados.contains(event.target))
    {
        listaestados.style.display = 'none'
    }
})

cadastro.addEventListener("submit", (event) =>
{
    event.preventDefault()
    checarinputs()
})

checarinputs=()=>
{
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

    enviarcadastro()
}

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

abrircadastro=()=>
{
    cadastro.style.display = "flex"
}

fecharcadastro=()=>
{
    cadastro.style.display = "none"
    resetarcadastro()
}

enviarcadastro=()=>
{
    enviado.innerHTML = '<p class="correto">Muito obrigado, logo daremos retorno</p>'
    enviando()
}

emailvalido=(email)=>
{
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

validar=(input)=>
{
    const validacao = input.parentElement
    validacao.className = "input validado"
}

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

enviando=()=>
{
    listacarrinho.innerHTML = ""
    fecharcarrinho()
    fecharcadastro()
    atualizarprecototal()
}

carrinhodecompras=()=>
{
    enviado.innerHTML = ''
    carrinho.style.display = carrinho.style.display === 'block' ? 'none' : 'block'
}

abrircarrinho=()=>
{
    enviado.innerHTML = ''
    carrinho.style.display = "block"
}

fecharcarrinho=()=>
{
    carrinho.style.display = "none"
    carrinhovazio.style.display = "block"
}

alocarcarrinho=()=>
{
    enviado.innerHTML = ''
    carrinhovazio.style.display = "none"
}

construcao=(event)=>
{
    event.preventDefault()
    fundoconstrucao.style.display = "flex"
}

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

window.addEventListener('scroll', scrollmovimento)