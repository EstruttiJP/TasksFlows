# TasksFlows

## Descrição

Um sistema de gerenciamento de tarefas que permite criar, gerenciar e acompanhar tarefas de projetos. O sistema envia notificações automatizadas por email quando tarefas são atribuídas.

## Funcionalidades Principais

### Cadastro de Usuários e Projetos

- Gerencie equipes e atribua membros a tarefas.
- Controle de permissões por função (admin, gerente, membro).

### Criação e Acompanhamento de Tarefas

- Cada tarefa terá título, descrição, criador, prazo, data de criação e status (pendente, em andamento, concluído).

### Notificações Automatizadas

- Quando uma tarefa é atribuída.
- Atualizações de status ou tarefa.

### Integrações Externas

- Envio de notificações por email usando Spring Mail.

## Fluxo Automatizado

### Criação da Tarefa

- O gerente cria uma tarefa e a atribui a um membro da equipe.
- O responsável recebe uma notificação por email.

### Atualização de Status

- O responsável atualiza o status da tarefa.
- Todos os envolvidos no projeto recebem uma notificação sobre a atualização.

## Tecnologias Usadas

### Backend

- **Spring Boot**: Desenvolvimento do sistema.
- **Spring Data JPA**: Persistência (usando banco de dados como MySQL).

### Notificações

- **Spring Mail**: Envio de emails.

### Frontend 

- **Angular**: Interface moderna e interativa.

### Autenticação

- **Spring Security**: Autenticação e autorização com JWT.

### Infraestrutura

- **Docker**: Containerização.

## Exemplo de Cenário Real

- João cria um projeto chamado Lançamento de Produto.
- Ele cria tarefas como:
  - "Criar campanha de marketing".
  - "Testar novo produto com clientes".
- As tarefas são atribuídas a Maria e Carlos.
- Carlos e Maria recebem um email avisando que foram atribuídos a uma tarefa.

## Demonstração em Vídeo

### Login 
[![Login](https://github.com/user-attachments/assets/93dfca26-54fc-4252-9155-4c9f378b4cd9)](https://github.com/user-attachments/assets/93dfca26-54fc-4252-9155-4c9f378b4cd9) 
*Explorando o site e acessando funcionalidades principais.* 
### Comentários nas Tarefas 
[![Comentários nas Tarefas](https://github.com/user-attachments/assets/45c06b6e-3340-4fc3-b933-0ed82412bdd2)](https://github.com/user-attachments/assets/45c06b6e-3340-4fc3-b933-0ed82412bdd2) 
*Acompanhe como adicionar e visualizar comentários em tarefas.* 
### Emails Automáticos 
#### Notificação de Boas vindas
[![Email de Notificação](https://github.com/user-attachments/assets/a644dec3-c745-46c4-bb92-a208106d779e)](https://github.com/user-attachments/assets/a644dec3-c745-46c4-bb92-a208106d779e) 
*Notificação por email de boas-vindas.* 
#### Notificação de Atribuição de Tarefa 
[![Email de Atualização](https://github.com/user-attachments/assets/ca83d2c2-a6cb-421c-8856-4c2d45fbbad1)](https://github.com/user-attachments/assets/ca83d2c2-a6cb-421c-8856-4c2d45fbbad1) 
*Email automático quando o status da tarefa é Atribuída.*



