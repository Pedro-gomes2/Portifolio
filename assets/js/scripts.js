// seçao About
const about = document.querySelector('#about')

//seçao project
const swiperWrapper = document.querySelector('.swiper-wrapper')


//Formulario
const formulario = document.querySelector('#formulario');

//Expressão regular de validação do email
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função de preenchimento da Seção about
async function getAboutGitHub() {
    try {

        const resposta = await fetch('https://api.github.com/users/Pedro-gomes2');//requisição do tipo GEt para API do GitHub

        const perfil = await resposta.json()  //converte o função para json

        about.innerHTML = '';

        about.innerHTML = `
           

            <!-- Imagem da Seção About -->

            <figure class="about-image">
                <img src="${perfil.avatar_url}" alt="${perfil.name}">
            </figure>



            <!-- Conteúdo da seção about -->

            <article>

                <h2>Sobre mim</h2>
                <p>Sou um Desenvolvedor Full Stack Júnior com foco em JavaScript, em constante evolução técnica e
                    construção de projetos práticos. Possuo diversos repositórios públicos no GitHub,
                    onde aplico na prática conceitos de desenvolvimento web, incluindo criação de aplicações como
                    sistemas de gestão, blogs e soluções voltadas para organização de dados.
                    Tenho experiência com tecnologias modernas como JavaScript, TypeScript, Node.js, além de fundamentos
                    em desenvolvimento front-end e back-end, trabalhando com lógica de programação, consumo de APIs e
                    estruturação de aplicações. </p>

                <!-- Botões imediatamente abaixo do p -->
                <div class="button-container">
                    <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
                    <a href="https://drive.google.com/file/d/1SzAaPHvl5fUQxJn08vs9XtWjdicjypNC/view?usp=drive_link" target="_blank" class="botao-outline">Currículo</a>
                </div>

                <!-- Dados/Stats abaixo dos botões -->
                <div class="data-container">
                    <div class="data-item">
                        <span class="data-number">${perfil.followers}</span>
                        <span class="data-label">Seguidores</span>
                    </div>


                    <div class="data-item">
                        <span class="data-number">${perfil.public_repos}</span>
                        <span class="data-label">Repositórios</span>
                    </div>
                </div>
            </article>

        `




    } catch (error) {
        console.error('Erro ao buscar dados no GitHub', error)
    }



}
// função Buscar dados dos Projeto

async function getProjectGitHub() {

    try {
        const resposta = await fetch('https://api.github.com/users/Pedro-gomes2/repos?sort=updated&per_page=6');//requisição do tipo GEt para API do GitHub

        const repositorios = await resposta.json()  //converte o função para json

        swiperWrapper.innerHTML = '';

        // Cores e ícones das linguagens
        const linguagens = {
            'JavaScript': { icone: 'javascript' },
            'TypeScript': { icone: 'typescript' },
            'Python': { icone: 'python' },
            'Java': { icone: 'java' },
            'HTML': { icone: 'html' },
            'CSS': { icone: 'css' },
            'PHP': { icone: 'php' },
            'C#': { icone: 'csharp' },
            'Go': { icone: 'go' },
            'Kotlin': { icone: 'kotlin' },
            'Swift': { icone: 'swift' },
            'GitHub': { icone: 'github' },
        };

        repositorios.forEach(repositorio => {

            //identificar a linguagem padrão do seu repositorio 
            const linguagem = repositorio.language || 'GitHub';

            //selecionar o icone da linguagem padrão
            const config = linguagens[linguagem] || linguagens['GitHub'];

            //mostar a url que aponta para o iconne da linguagem padrao
            const urlIcone = `./assets/icons/languages/${config.icone}.svg`;

            // formatar o nome do repositorio
            const nomeFormatado = repositorio.name

                .replace(/[-_]/g, ' ')//substitui hifens e underline por espaços em branco 

                .replace(/[^a-zA-Z0-9\s]/g, '')// remove caracteres especiais 

                .toUpperCase();//converte a string em letras maiusculas

            const descricao = repositorio.description ?
                (repositorio.description.length > 100// se descrição maior que 100
                    ? repositorio.description.substring(0, 97) + '...'// escreva ate 100 caract
                    : repositorio.description)// escreva a descrição do git
                : 'Projeto Desenvolvido no Github'// senao escreva isso

            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')//condição verdade
                : `<span class="tag">${linguagem}</span>`;

            //botões de Açao
            const botaoAcao = `
                <!-- Links do Projeto-->
                     <div class="project-buttons">
                         <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">GitHub</a>
                         ${repositorio.homepage ?//se existir
                    `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`//escreva isso
                    : ''}  
                    </div>

                `
            //construção o card
            swiperWrapper.innerHTML += `
                    <div class="swiper-slide">

                        <article class="project-card">

                            <!-- Icone da Tecnologia Padrão do Projeto -->
                            <figure class="project-image">
                                <img src="${urlIcone}" alt="icone ${linguagem}">
                            </figure>

                            <!-- Conteudo do Projeto -->
                            <div class="project-content">

                                <h3>${nomeFormatado}</h3>
                                <p>${descricao}</p>

                                <!-- tags do Projetos -->
                                <div class="project-tags">
                                    ${tags}
                                </div>

                                ${botaoAcao}
                                
                            </div>

                        </article>
                    </div>`


        })

        iniciarSwiper();

    } catch (error) {
        console.error('Erro ao buscar dados no GitHub', error)
    }
}


function iniciarSwiper() {
    new Swiper('.project-swiper', {
        slidesPerGroup: 3,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    });
}

//Processo de validação
formulario.addEventListener('submit', function (event) {

    event.preventDefault();

    document.querySelectorAll('form span').forEach(span => span.innerHTML = '');

    let isValid = true;


    const nome = document.querySelector('#nome');

    const erroNome = document.querySelector('#erro-nome');

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector('#email');

    const erroEmail = document.querySelector('#erro-email')



    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um endereço de e-mail válido';
        if (isValid) email.focus();
        isValid = false;
    }


    const assunto = document.querySelector('#assunto');

    const erroAssunto = document.querySelector('#erro-assunto');



    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = 'Digite o Asunto deve ter no mínimo 5 caracteres';
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector('#mensagem');

    const erroMensagem = document.querySelector('#erro-mensagem')



    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = 'A Mensagem não pode ser vazia!'
        if (isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid) {
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        formulario.submit();
    }






})







//executar a função getAboutGitHub
getAboutGitHub();

//executar a função getProjectGitHub
getProjectGitHub();