# MPN — agenda de serviços

**Português** · [English](README.en.md) · **Estado · legado e proposta de modernização**

O MPN reúne empresas, serviços, clientes, horários e agendamentos. A pergunta que orienta a evolução é o que acontece quando duas pessoas tentam reservar horários que se sobrepõem para o mesmo profissional.

## O que existe

A [API Laravel 7](api/routes/api.php) oferece rotas com JWT para empresas, serviços, horários e agendamentos. A [interface React 17](web/package.json) acompanha esse modelo. A criação da agenda registra empresa, cliente, serviço e horário. O repositório não apresenta um teste de integração que comprove a rejeição de duas reservas sobrepostas. O backend atual é referência para o domínio e precisa de um ambiente legado para ser reproduzido.

## O recorte que vale migrar

| Escolha proposta | O que ela demonstra |
| --- | --- |
| **Kotlin e Spring Boot** | Um backend JVM com validação, autorização por empresa e tratamento explícito do conflito de horário. |
| **PostgreSQL e Flyway** | Migrações reproduzíveis e uma restrição de exclusão que protege a agenda de intervalos sobrepostos, inclusive sob concorrência. |
| **React e TypeScript** | Uma única tela de disponibilidade e reserva para validar o comportamento com uma pessoa usando o produto. |
| **JUnit, testes com PostgreSQL, OpenAPI e Postman** | Um caminho para repetir o caso de sucesso, disputa pelo horário, cancelamento e isolamento entre empresas. |

O primeiro fluxo será consultar disponibilidade, reservar e cancelar. Dois clientes tentando reservar intervalos sobrepostos para o mesmo profissional devem receber um sucesso e um HTTP 409. O cancelamento libera o horário. Uma reserva de outra empresa permanece inacessível.

A primeira entrega precisa ter seed fictício, um comando de inicialização, testes rodando com PostgreSQL e uma coleção para repetir o fluxo. Os comandos serão documentados quando esse recorte estiver implementado.

[Spring Boot com Kotlin](https://docs.spring.io/spring-boot/reference/features/kotlin.html) · [Intervalos no PostgreSQL](https://www.postgresql.org/docs/current/rangetypes.html)
