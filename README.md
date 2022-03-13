# Grupo 1 - UniGether

<p>Projeto voltado para a disciplina de Eng de Software 2022.1 do Prof. Dr. Paulo Meirelles<p>

<strong>Equipe composta por</strong>:

1. Igor Milhomens dos Santos
1. Guilherme Rocha Muzi Franco
1. Thales Cunha da Paixão
1. Beatriz Freitas
1. Paloma Cristina Santana
1. Gustavo Mantovani Fonseca

<h2 class="code-line" data-line-start=6 data-line-end=7 ><a id="Descrio_do_projeto_6"></a>Descrição do projeto:</h2>
<p class="has-line-data" data-line-start="8" data-line-end="9">Tendo em vista um ambiente fragmentado de disciplinas, de pandemia Covid-19, adoção do sistema EAD na Universidade Federal do ABC, o app visa conectar os alunos em atividades acadêmicas, extracurriculares, festas, grupos e comunidades, chat para trocas e transmitir o maior número de informações, com funcionalidade de "Superlike" e "Dislike de aplicativos" de relacionamento.
 
Por exemplo, matriculados na disciplina Engenharia de Software: link para grupos do WhatsApp, Moodle, Bibliografia, Grupos de estudos, Resoluções de listas de exercícios, alunos matriculados com seus respectivos contatos e descrições."</p>
<p class="has-line-data" data-line-start="12" data-line-end="13">

<strong>Tecnologias Usadas:</strong></p>
<ul>
<li class="has-line-data" data-line-start="18" data-line-end="20">Angular</li>
<li class="has-line-data" data-line-start="17" data-line-end="18">Node.js</li>
<li class="has-line-data" data-line-start="19" data-line-end="20">Sequelize</li>
<li class="has-line-data" data-line-start="21" data-line-end="20">JWT - Json Web Token</li>
<li class="has-line-data" data-line-start="21" data-line-end="20">Express</li>
<li class="has-line-data" data-line-start="21" data-line-end="20">JWT</li>
<li class="has-line-data" data-line-start="21" data-line-end="20">Módulo -  Nodemon</li>
<li class="has-line-data" data-line-start="21" data-line-end="20">Sucrase</li>
<li class="has-line-data" data-line-start="21" data-line-end="20">MySql2</li>
</ul>

<p align="left"> <a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>
------------------------------------------------------------------------
<h2 class="code-line" data-line-start=20 data-line-end=21 ><a id="CRIAR_PROJETO"></a>Criando o projeto</h2>
<p> Instalar <a href="https://nodejs.org/en/">Node</a>, criar a pasta em que criá-lo, no caso backend</p>
<p class="has-line-data" data-line-start="29" data-line-end="30"><strong>Para instalar todas as dependências necessárias para o projeto rodar</strong></p>
<p> Instalar <a href="https://nodejs.org/en/">Node</a></p>
<pre><code>npm init -y
</code></pre>
<p> Instalar o Angular 
<pre><code>npm install -g @angular/cli
</code></pre>
<pre><code> ng new frontend
</code></pre>

<h2 class="code-line" data-line-start=20 data-line-end=21 ><a id="ANTES_DE_COMEAR_A_DESENVOLVER_20"></a>Após clonar o repositório</h2>
<pre><code>npm install
</code></pre>
<p class="has-line-data" data-line-start="29" data-line-end="30"><strong>Crie um Banco de Dados no MySql</strong></p>
<pre><code>CREATE DATABASE db_unigether;
</code></pre>
<p class="has-line-data" data-line-start="29" data-line-end="30"><strong>Agora crie as tabelas no banco de dados, rode esse comando no seu terminal
</strong></p>
<pre><code>npx sequelize-cli migration:generate --name migration-users
</code></pre>
<pre><code> npx sequelize-cli db:migrate
</code></pre>
<p class="has-line-data" data-line-start="29" data-line-end="30"><strong>Não se esqueça de logar na sessão</strong></p>
<pre><code>npm start
</code></pre>

<p>Para demais informações, consultar <a href="https://plume-lodge-46a.notion.site/Projeto-MVC-Node-Angular-bc305f55ab064c75ac5897c7f00b0437">Notion</a></p>

## License

MIT



