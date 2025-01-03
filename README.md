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

### Frontend (Opcional)

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

- **Login**: [home.mp4](./assets/home.mp4)
- **Cadastro de Funcionário e Email de Boas-Vindas**: [criar-user.mp4](./assets/criar-user.mp4)
- **Criação de Tarefa**: [criar-task.mp4](./assets/criar-task.mp4)
