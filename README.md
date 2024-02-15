# Lotchats
![Home](/public/home.png)
![Drawer](/public/drawer.png)
## Introdução

Lotchats é um projeto de aplicação de chat em tempo real, construído com React e TypeScript. O projeto utiliza o Firebase para autenticação, armazenamento de dados em tempo real. O design é realizado com o Material-UI para React, proporcionando uma interface de usuário limpa e responsiva, componentizado de forma modular diminuindo a complexidade na componentização e na escalabilidade do projeto.

## Índice

- [Lotchats](#lotchats)
  - [Introdução](#introdução)
  - [Índice](#índice)
  - [Firebase](#firebase)
    - [Crie um projeto Firebase:](#crie-um-projeto-firebase)
    - [Adicione um Aplicativo Web ao seu Projeto Firebase:](#adicione-um-aplicativo-web-ao-seu-projeto-firebase)
    - [Configure as Variáveis de Ambiente no Projeto:](#configure-as-variáveis-de-ambiente-no-projeto)
    - [Ferramentas que devem ser ativadas no console do Firebase](#ferramentas-que-devem-ser-ativadas-no-console-do-firebase)
  - [Instalação](#instalação)
  - [Funcionalidade](#funcionalidade)
    - [Internacionalização (i18n)](#internacionalização-i18n)
    - [Hooks Personalizados](#hooks-personalizados)
    - [Utilitários (Utils)](#utilitários-utils)
  - [Uso](#uso)
  - [To-dos](#to-dos)


## Firebase
![Home](/public/discover.png)
![Drawer](/public/modal.png)
> As váriaveis de ambiente serão enviadas via e-mail mas aqui também será disponibilizado como fazer a replicação dentro do Firebase Console.

Caso você não tenha acesso as váriaveis de ambiente, você precisará seguir alguns passos importantes para garantir a comunicação da aplicação com o Firebase.

### Crie um projeto Firebase:
- Acesse o [Console do Firebase](https://console.firebase.google.com/) e crie um novo projeto, seguindo as instruções fornecidas.

### Adicione um Aplicativo Web ao seu Projeto Firebase:
- Dentro do seu projeto Firebase, adicione um aplicativo web (</>). Ao configurar seu aplicativo, o Firebase fornecerá um snippet de configuração com suas chaves de API e outras informações necessárias.

### Configure as Variáveis de Ambiente no Projeto:
- No diretório raiz do  projeto, crie um arquivo chamado **.env** para armazenar suas variáveis de ambiente locais.
- Adicione as seguintes variáveis ao arquivo **.env**, substituindo os valores de exemplo pelos reais fornecidos pelo seu projeto Firebase:
  ```
  # .env
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_firebase_app_id
  ```
### Ferramentas que devem ser ativadas no console do Firebase
- Authentication: Provedor email/senha
- Firestore Database
- Storage

No firebase é necessário regras para o uso do **Firestore Databe** `src/firebase/db.rules` e no **Storage** `src/firebase/storage.rules`. Copie e cole os códigos em casa um dos serviços e já estará tudo pronto.

## Instalação
Para iniciar o `projeto`, siga os passos abaixo:

```bash
git clone https://github.com/rafaeldellaquila/lotchats.git
cd lotchats
npm install
npm run dev
```

## Funcionalidade

![Home](/public/group.png)
![Drawer](/public/private.png)
### Internacionalização (i18n)
O projeto suporta múltiplos idiomas, facilitando a expansão global e a personalização do usuário. A configuração e as traduções são gerenciadas através do diretório src/i18n.

### Hooks Personalizados
A aplicação utiliza uma variedade de hooks personalizados para encapsular funcionalidades específicas, melhorando a reusabilidade e a organização do código. Aqui estão alguns exemplos:

`useChatMessages`: Gerencia o estado das mensagens de chat em tempo real.

`useContacts`: Administra a lista de contatos do usuário, permitindo operações como adicionar ou remover contatos.

`useCreateGroup`: Facilita a criação de grupos, incluindo adição de membros e configuração inicial.

`useGroupMessages`: Similar ao useChatMessages, focado em mensagens de grupo.

`useToggle`: Fornece uma maneira simples de alternar entre estados booleanos.

`useUserName`: Recupera e mantém os dados do usuário autenticado.

### Utilitários (Utils)
O diretório `src/utils` contém funções úteis que apoiam operações comuns no app, como gerenciamento de contatos e grupos.

## Uso
Após a instalação, o projeto pode ser executado localmente com ```npm run dev```, iniciando o servidor de desenvolvimento e permitindo testes em tempo real.

## To-dos
- Implementar bloqueio, exclusão de usuários e grupos
- Exclusão dos próprios dados
- Implementar loadings e feedbacks de erros e sucesso
