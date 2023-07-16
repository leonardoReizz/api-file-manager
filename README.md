<h2>Projeto "File Manager" - README</h2>


<h3>Descrição do Projeto</h3>
O projeto "File Manager" é uma aplicação em Node.js que utiliza Typescript e o framework Express para gerenciar arquivos de forma eficiente. 
A documentação da API é fornecida através do Swagger, e novas rotas podem ser geradas automaticamente utilizando o Swagger Auto-Gen. 
No entanto, algumas alterações manuais são necessárias, pois o Swagger Auto-Gen não obtém corretamente os valores do corpo (body) das requisições.
<br/>
<br/>
O projeto pode ser executado localmente na porta padrão 3333, mas você pode configurar a porta através do arquivo .env. 
Ele também utiliza o MongoDB como banco de dados para armazenar informações sobre os arquivos gerenciados.
<br/>
<br/>
<h3>Instalação</h3>
Siga os passos abaixo para instalar e executar o projeto localmente:
Certifique-se de que você tenha o Node.js instalado em sua máquina. Caso precise instalá-lo, você pode baixá-lo em https://nodejs.org/.
Clone o repositório do projeto para o seu ambiente local.
<br/>
<br/>


```bash
git clone https://github.com/leonardoReizz/file-manager.git
```
Acesse o diretório do projeto.

```bash
cd api-file-manager
```
Instale as dependências do projeto.

```bash
npm install
```
Configure as variáveis de ambiente necessárias. Copie o arquivo .env.example e renomeie-o para .env. Em seguida, edite o arquivo .env com as informações relevantes.
```ENV
DATABASE_URL="mongodb+srv://<USUARIO>:<SENHA>@<HOST>/<NOME_BANCO>"
NODE_ENV="production"
JWT_SECRET="123"
PORT="3333"
MAIN_DIR="/home/leonardo/Documents/levi-file-manager/"
```
**Nota**: Lembre-se de substituir "<USUARIO>", "<SENHA>", "<HOST>", "<NOME_BANCO>" pelas credenciais corretas para acessar o banco de dados MongoDB. Verifique também se o diretório definido em MAIN_DIR existe e tem as permissões adequadas para salvar e baixar arquivos.

Inicie o servidor.

```bash
npm start
```
A aplicação agora estará em execução e acessível em http://localhost:3333.

<br/>

<h3>Documentação da API</h3>
A documentação da API é fornecida através do Swagger e pode ser acessada em http://localhost:3333/docs Lá, você encontrará detalhes sobre as rotas disponíveis, os parâmetros necessários e as respostas esperadas para cada endpoint.

<h3>Docker</h3>
Você também pode executar o projeto utilizando o Docker. Certifique-se de que você tenha o Docker instalado e em execução em sua máquina.

Construa a imagem do Docker:

```bash
docker build -t file-manager-app .
```
Execute o container a partir da imagem:

```bash
docker run -p 3333:3333 --env-file .env file-manager-app
```
O projeto agora estará rodando dentro do container Docker e acessível em http://localhost:3333.
<br/><br/>
<h3>Contribuindo</h3>
Se você deseja contribuir com o projeto, fique à vontade para abrir issues e enviar pull requests. Sua colaboração é muito bem-vinda!

<h3>Licença</h3>
Este projeto está licenciado sob a MIT License. Sinta-se livre para usar, modificar e distribuir o código de acordo com os termos da licença.
<br/>
<br/>

**Observação**: Certifique-se de que o arquivo .env e outras informações sensíveis não sejam compartilhados no repositório público do GitHub para evitar expor credenciais e informações confidenciais. Utilize um arquivo .gitignore para ignorar esses arquivos durante o versionamento.
