const busca = document.getElementById('busca')
busca.addEventListener("click", (event) =>
{
    event.preventDefault()
})

function abrirmenu()
{
    var menu = document.getElementById("menu")
    menu.classList.toggle("mostrarmenu")
}

function verperfil()
{
    var perfil = document.getElementById("perfil")
    perfil.classList.toggle("mostrarperfil")
}

let ImagemAtual = 1
MostrarCarousel(ImagemAtual)

function Controles(numero)
{
    MostrarCarousel(ImagemAtual += numero)
}

function Thumbnails(numero)
{
    MostrarCarousel(ImagemAtual = numero)
}

function MostrarCarousel(numero)
{
    var contador;
    var imagem = document.getElementsByClassName("imagem")
    var indicador = document.getElementsByClassName("indicador")
    if (numero > imagem.length)
    {
        ImagemAtual = 1
    }
    if (numero < 1)
    {
        ImagemAtual = imagem.length
    }
    for (contador = 0; contador < imagem.length; contador++)
    {
        imagem[contador].style.display = "none"
    }
    for (contador = 0; contador < indicador.length; contador++)
    {
        indicador[contador].className = indicador[contador].className.replace(" ativo", "")
    }
    imagem[ImagemAtual-1].style.display = "block"
    indicador[ImagemAtual-1].className += " ativo"
}

var favoritar = document.getElementsByClassName("favoritar")
for (var i = 0; i < favoritar.length; i++)
{
    favoritar[i].addEventListener("click", favoritarproduto)
}

function favoritarproduto(event)
{
    let favoritando = event.target.parentElement
    let favorito = favoritando.querySelector(".favorito path")
    favorito.setAttribute("fill", favorito.getAttribute("fill") === "none" ? "currentColor" : "none")
}

const removerproduto = document.getElementsByClassName("removerproduto")
for (var i = 0; i < removerproduto.length; i++)
{
    removerproduto[i].addEventListener("click", removeproduto)
}

const quantidade = document.getElementsByClassName("quantidade")
for (var i = 0; i < quantidade.length; i++)
{
    quantidade[i].addEventListener("change", sevazio)
}

const adicionaraocarrinho = document.getElementsByClassName("adicionaraocarrinho")
for (var i = 0; i < adicionaraocarrinho.length; i++)
{
    adicionaraocarrinho[i].addEventListener("click", carrinhodecompras)
}

function carrinhodecompras(event)
{       
    const informacoes = event.target.parentElement
    const imagemdoproduto = informacoes.getElementsByClassName("imagemdoproduto")[0].src
    const nomedoproduto = informacoes.getElementsByClassName("descricao")[0].innerText
    const tamanhodoproduto = informacoes.getElementsByClassName("descricaotamanho")[0].innerText
    const precodoproduto = informacoes.getElementsByClassName("preco")[0].innerText
    
    const nomecarrinho = document.getElementsByClassName("nomecarrinho")
    for (var i = 0; i < nomecarrinho.length; i++)
    {
        if (nomecarrinho[i].innerText === nomedoproduto)
        {
            nomecarrinho[i].parentElement.getElementsByClassName("quantidade")[0].value++
            atualizarprecototal()
            return
        }
    }

    let novoproduto = document.createElement("span")
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
            <input type="number" value="1" min="0" class="quantidade">
        </nav>
        <nav class="tamanhoproduto">
            <h3>Tamanho</h3>
            <p class="tamanho">${tamanhodoproduto}</p>
        </nav>
        <nav class="precounidadecarrinho">
            <h3>Preço Unid.</h3>
            <p class="precounidade">${precodoproduto}</p>
        </nav>
        <nav class="precototalcarrinho">
            <h3>Preço Total</h3>
            <p class="produtoprecototal"></p>
        </nav>
        `
    const adicionandoproduto = document.querySelector(".listacarrinho")
    adicionandoproduto.append(novoproduto)
    novoproduto.getElementsByClassName("removerproduto")[0].addEventListener("click", removeproduto)
    novoproduto.getElementsByClassName("quantidade")[0].addEventListener("change", sevazio)
    atualizarprecototal()
}

function enviando()
{
    alert("Compra concluída")        
    document.querySelector(".listacarrinho").innerHTML = ""
    atualizarprecototal()
}

function atualizarprecototal()
{
    const produtocarrinho = document.getElementsByClassName("produtocarrinho")
    for (var i = 0; i < produtocarrinho.length; i++)
    {
        produtocarrinho[i].atualizandoprecototal()
    }
}

function atualizandoprecototal()
{
    let precototal = 0
    const precounidade = document.getElementsByClassName("precounidade").innerText.replace("R$ ", "")
    const quantidadeproduto = document.getElementsByClassName("quantidade").value
    precototal += precounidade * quantidadeproduto
    const atualizar = document.querySelector(".produtoprecototal")
    atualizar.innerText = "R$ " + precototal
}

function removeproduto(event)
{
    let listacarrinho = document.getElementById("listacarrinho")
    event.target.closest("span").remove()
    if (listacarrinho.innerText === "")
    {
        fecharcarrinho()
    }
    atualizarprecototal()
}

function sevazio(event)
{
    let listacarrinho = document.getElementById("listacarrinho")
    if (event.target.value === "0")
    {
        event.target.closest("span").remove()
        if (listacarrinho.innerText === "")
        {
            fecharcarrinho()
        }
    }
    atualizarprecototal()
}

const finalizarcompra = document.getElementById('cadastro')
finalizarcompra.addEventListener("submit", (event) =>
{
    event.preventDefault()
    enviando()
})

const carrinho = document.getElementById("carrinho")
abrircarrinho=()=>
{
    carrinho.style.display = "block"
}

fecharcarrinho=()=>
{
    carrinho.style.display = "none"
}