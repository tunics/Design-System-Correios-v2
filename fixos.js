const barraAcessibilidade = `
  <div id="barra-usuario-acess">
      <button
        id="btn-altocontraste"
        class="btn-txt so-icone"
        title="Alto contraste">
        <i class="ic-alto-contraste"></i>
      </button>

      <button
        id="btn-tema"
        class="btn-txt so-icone"
        title="Tema Claro / Escuro">
        <i class="ic-lua"></i>
      </button>

      <button id="btn-acess" class="btn-txt so-icone" title="Acessibilidade">
        <i class="ic-acessibilidade"></i>
      </button>

      <nav id="menu-acessibilidade">
        <a
          href="#conteudo-principal"
          class="link-btn btn-txt"
          data-atalho="1"
          accesskey="1">
          Ir para o conteúdo
        </a>

        <a href="#topo" class="link-btn btn-txt" data-atalho="2" accesskey="2">
          Ir para o topo
        </a>

        <a href="#busca" class="link-btn btn-txt" data-atalho="3" accesskey="3">
          Ir para a busca
        </a>

        <a href="#menu" class="link-btn btn-txt" data-atalho="4" accesskey="4">
          Ir para o menu
        </a>

        <a
          href="#rodape"
          class="link-btn btn-txt"
          data-atalho="5"
          accesskey="5">
          Ir para o rodapé
        </a>

        <a
          href="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/vlibras"
          class="link-btn btn-txt"
          target="_blank"
          rel="noopener">
          <img
            src="imgs/marcas/ic-vlibras.svg"
            alt="V-Libras"
            class="ic-traco" />
          V-libras
        </a>
        <a
          href="https://www.correios.com.br/acessibilidade"
          class="link-btn btn-txt"
          target="_blank"
          rel="noopener">
          <i class="ic-acessibilidade"></i>
          Saiba mais sobre acessibilidade
        </a>

        <button
          id="btn-fechar-acess"
          class="btn-txt so-icone"
          title="Fechar barra de acessibilidade">
          <i class="ic-excluir"></i>
        </button>
      </nav>

      <div id="login-usuario" data-aut="deslogado">
        <button id="btn-cadastrar" class="btn-txt btn-responsivo">
          <i class="ic-usuario-adicionar"></i><span>Cadastrar</span>
        </button>

        <button id="btn-entrar" class="btn-txt btn-responsivo">
          <i class="ic-entrar"></i><span>Entrar</span>
        </button>

        <button
          id="btn-logado"
          class="link-btn btn-txt btn-usuario btn-responsivo btn-menu-temp"
          data-menu-temp="usuario"
          aria-expanded="false">
          <img src="imgs/avatar-placeholder.svg" alt="Imagem do usuário" />
          <span id="nome-usuario">José da Silva Pereira Santos</span>
          <i class="ic-marcador-abaixo"></i>
        </button>

        <nav
          class="menu-temp bg-fundo elev5"
          data-menu-temp="usuario"
          tabindex="-1"
          hidden>
          <section class="">
            <h6>José da Silva</h6>
            <p class="pequeno"><b>CPF: </b>123.456.789-01</p>
          </section>

          <section>
            <p class="mini">Título de seção:</p>

            <a href="" class="link-btn btn-txt"
              ><i class="ic-escudo"></i>Item 1</a
            >
            <a href="" class="link-btn btn-txt"
              ><i class="ic-cadeado"></i>Item 2</a
            >
            <a href="" class="link-btn btn-txt"
              ><i class="ic-camera-seguranca"></i>Item 3</a
            >
          </section>

          <section>
            <p class="mini">Usuário:</p>

            <button class="btn-txt">
              <i class="ic-configuracoes"></i>
              Configurações
            </button>

            <button id="btn-sair" class="btn-txt">
              <i class="ic-sair"></i>Sair
            </button>
          </section>
        </nav>
      </div>
    </div>
`;

const topo = `
  <header id="topo" class="bg-fundo">
      <button id="btn-menu" class="btn-txt so-icone" title="Abrir menu">
        <i class="ic-menu-hamburguer"></i>
      </button>

      <a href="">
        <img
          class="marca-correios pos"
          src="imgs/marca-correios/correios-hor-vol-pos.svg"
          alt="Marca Correios" />

        <img
          class="marca-correios neg"
          src="imgs/marca-correios/correios-hor-vol-neg.svg"
          alt="Marca Corrieos Negativa" />
      </a>

      <nav class="nav-topo">
        <button
          class="btn-txt btn-responsivo btn-menu-temp"
          data-menu-temp="usuario">
          <i class="ic-conversa"></i>
          <span>Atendimento</span>
        </button>

        <button class="btn-txt btn-responsivo">
          <i class="ic-sacola"></i>
          <span>Pedidos</span>
        </button>

        <button class="btn-txt btn-responsivo">
          <i class="ic-carrinho"></i>
          <span>Carrinho</span>
        </button>
      </nav>

      <div id="busca">
        <div class="campo-txt">
          <div class="input-container input-com-btn">
            <input
              type="text"
              id="campo-busca"
              name="txt-input"
              placeholder="Pesquisar" />
            <button
              id="btn-busca"
              title="pesquisar"
              type="submit"
              class="btn-txt so-icone input-btn"
              value="pesquisar">
              <i class="ic-lupa"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
`;

const nav = `
<nav id="menu" data-menu-inicial="aberto">
      <div class="menu-container">
        <header>
          <button
            id="btn-menu-dentro"
            class="btn-txt so-icone"
            title="Abrir menu">
            <i class="ic-menu-hamburguer-aberto"></i>
          </button>

          <a href="">
            <img
              class="marca-correios pos"
              src="imgs/marca-correios/correios-hor-vol-pos.svg"
              alt="Marca Correios" />

            <img
              class="marca-correios neg"
              src="imgs/marca-correios/correios-hor-vol-neg.svg"
              alt="Marca Corrieos Negativa" />
          </a>
        </header>

        <section id="nome-sistema">
          <p class="subtitulo-p">Nome do Sistema</p>
        </section>

        <section class="bg-superficie">
          <p class="mini titulo-secao">Base e estilos</p>

          <a href="index.html#tipografia" class="link-btn btn-txt"
            ><i class="ic-a-a-z"></i>Tipografia</a
          >
          <a href="index.html#cores" class="link-btn btn-txt"
            ><i class="ic-tema"></i>Cores</a
          >
          <a href="index.html#formas" class="link-btn btn-txt"
            ><i class="ic-categorias"></i>Formas</a
          >
          <a href="index.html#espacamentos" class="link-btn btn-txt"
            ><i class="ic-regua"></i>Espaçamentos</a
          >
          <a href="index.html#elevacoes" class="link-btn btn-txt"
            ><i class="ic-copiar"></i>Elevações</a
          >
        </section>

        <section class="bg-superficie">
          <p class="mini titulo-secao">Visão geral</p>
          <a href="./marca-correios.html" class="link-btn btn-txt">
            <img
              src="imgs/marca-correios/ic-correios.svg"
              class="ic-traco"
              alt="Marca Correios" />
            Marca Correios
          </a>

          <button class="btn-txt" data-sub="icones">
            <i class="ic-imagem"></i>
            <span>Ícones</span>
            <i class="ic-marcador-direita"></i>
          </button>

          <section class="subitens" data-sub="icones">
            <a href="./icones-traco.html" class="link-btn btn-txt">Ícones traço</a>
            <a href="./icones-outline.html" class="link-btn btn-txt">Ícones outline</a>
            <a class="link-btn btn-txt">Ícones personalizados</a>
          </section>

          <button class="btn-txt" data-sub="componentes">
            <i class="ic-janela"></i>
            <span>Componentes</span>
            <i class="ic-marcador-direita"></i>
          </button>

          <!-- Para iniciar um submenu já aberto, adicione a classe "Aberto" -->
          <section class="subitens" data-sub="componentes">
            <a class="link-btn btn-txt">Botões</a>
            <a class="link-btn btn-txt">Formulários</a>
            <a class="link-btn btn-txt">Cards</a>
            <a class="link-btn btn-txt">Caixa de diálogos</a>
            <a class="link-btn btn-txt">Abas</a>
            <a class="link-btn btn-txt">Chips</a>
            <a class="link-btn btn-txt">Passo a passo</a>
          </section>

          <button class="btn-txt" data-sub="exemplos">
            <i class="ic-tv"></i>
            <span>Exemplos</span>
            <i class="ic-marcador-direita"></i>
          </button>

          <section class="subitens" data-sub="exemplos">
            <a class="link-btn btn-txt">Exemplo 1</a>
            <a class="link-btn btn-txt">Exemplo 2</a>
            <a class="link-btn btn-txt">Exemplo 3</a>
          </section>
        </section>

        <section class="bg-superficie">
          <p class="mini titulo-secao">Frameworks</p>
          <a class="link-btn btn-txt"><i class="ic-caixa"></i>Bootstrap</a>
          <a class="link-btn btn-txt"><i class="ic-caixa"></i>DataTables</a>
        </section>
      </div>
    </nav>
`;

const footer = `
<footer id="rodape">
      <section class="links-uteis">
        <section id="fale-conosco">
          <h5 class="titulo-rodape" data-esconde="links">
            Fale conosco
            <button class="btn-txt so-icone" title="expandir">
              <i class="ic-marcador-abaixo"></i>
            </button>
          </h5>

          <div class="esconde" data-esconde="links">
            <a
              class="link-btn btn-txt"
              href="https://faleconosco.correios.com.br/faleconosco/app/index.php">
              <i class="ic-monitor"></i>
              Registro de manifestações
            </a>

            <a
              class="link-btn btn-txt"
              href="https://www.correios.com.br/falecomoscorreios/central-de-atendimento">
              <i class="ic-telefone"></i>
              Central de atendimento
            </a>

            <a
              class="link-btn btn-txt"
              href="https://www.correios.com.br/acesso-a-informacao/institucional/identidade-corporativa">
              <i class="ic-identidade"></i>
              Sobre os Correios
            </a>

            <a
              class="link-btn btn-txt"
              href="https://www.correios.com.br/acesso-a-informacao/institucional/identidade-corporativa">
              <i class="ic-cadeado"></i>
              Privacidade
            </a>
          </div>
        </section>

        <section>
          <h5 class="titulo-rodape" data-esconde="pagamentos">
            Formas de pagamento
            <button class="btn-txt so-icone" title="expandir">
              <i class="ic-marcador-abaixo"></i>
            </button>
          </h5>

          <div class="esconde" data-esconde="pagamentos">
            <h6 class="titulo-rodape">Cartões de crédito</h6>
            <div class="pagamentos icones-row">
              <img
                src="imgs/marcas/Mastercard.svg"
                alt="Mastercard"
                title="Mastercard" />
              <img src="imgs/marcas/Visa.svg" alt="Visa" title="Visa" />
              <img src="imgs/marcas/Elo.svg" alt="Elo" title="Elo" />
            </div>

            <h6 class="titulo-rodape">Pix</h6>
            <div class="pagamentos icones-row">
              <i class="ic-pix" title="Pix"></i>
            </div>
          </div>
        </section>

        <section id="apps-social">
          <h5 class="titulo-rodape">Siga os Correios</h5>

          <div class="redes-sociais icones-row">
            <a
              class="txt-link so-icone"
              href="https://www.youtube.com/@correiosoficial">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-youtube.svg"
                alt="Youtube" />
            </a>

            <a
              class="txt-link so-icone"
              href="https://www.instagram.com/correiosoficial/">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-instagram.svg"
                alt="Instagram" />
            </a>

            <a
              class="txt-link so-icone"
              href="https://www.facebook.com/correios/?locale=pt_BR">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-facebook.svg"
                alt="Facebook" />
            </a>

            <a
              class="txt-link so-icone"
              href="https://br.linkedin.com/company/correios">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-linkedin.svg"
                alt="LinkedIn" />
            </a>

            <a
              class="txt-link so-icone"
              href="https://www.tiktok.com/@correiosoficialbr">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-tiktok.svg"
                alt="TikTok" />
            </a>

            <a
              class="txt-link so-icone"
              href="https://www.flickr.com/photos/correiosoficial/">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-flikr.svg"
                alt="Flikr" />
            </a>

            <a
              class="txt-link so-icone"
              href="https://br.pinterest.com/correios/">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-pinterest.svg"
                alt="Pinterest" />
            </a>
          </div>

          <h5 class="titulo-rodape">Aplicativos Correios</h5>
          <div class="apps-correios icones-row">
            <a
              class="txt-link so-icone"
              href="https://apps.apple.com/br/developer/ect-empresa-brasileira-de-correios-e-telegrafos/id866480129">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-apple.svg"
                alt="Android" />
            </a>

            <a
              class="txt-link so-icone"
              href="https://play.google.com/store/apps/developer?id=Empresa+Brasileira+de+Correios+e+Telegrafos&amp;amp;hl=pt">
              <img
                class="ic-traco"
                src="imgs/marcas/ic-android.svg"
                alt="IOS" />
            </a>
          </div>
        </section>

        <section>
          <h5 class="titulo-rodape">Endereço</h5>
          <p class="pequeno">
            Avenida Doutor Antonio João Abdalla, 2727 - Empresarial Colina -
            Cajamar/SP
          </p>
          <p class="pequeno"><b>CEP:</b> 07750-983</p>
          <p class="pequeno"><b>CNPJ:</b> 34.028.316/0001-03</p>
        </section>
      </section>

      <section id="copyright">
        <p class="pequeno txt-copyright">© Copyright 2026 Correios</p>

        <div class="marca-correios-gov">
          <img
            src="imgs/marca-correios/correios-gov.svg"
            alt="Correios Governo Federal Brasil União e Reconstrução" />
        </div>
      </section>
    </footer>
`;

document.body.innerHTML += barraAcessibilidade + topo + nav + footer;
