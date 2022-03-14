### Diagrama Entidade Relacionamento

#### Entidades
```mermaid
    %%{init: {'theme':'base'}}%%%%
    erDiagram

        Usuario{
            GUID id
            string nome
            int idade
            datetime createdAt
            datetime updatedAt
        }

        Grupo{
            GUID id
            string nome
            string descricao
            datetime createdAt
            datetime updatedAt
        }
        
        Post{
            GUID id
            GUID idUsuario
            GUID idGrupo
            string conteudo
            datetime createdAt
            datetime updatedAt
        }
        
        Evento{
            GUID id
            GUID idUsuarioAdm
            string nome
            string descricao
            datetime createdAt
            datetime updatedAt
        }
```

#### Entidades e Relacionamentos
```mermaid
    %%{init: {'theme':'base'}}%%%%
    erDiagram
        
        UsuarioEGrupo{
            GUID id
            GUID idUsuario
            GUID idGrupo
        }
        
        UsuarioEEvento{
            GUID id
            Guid idUsuario
            Guid idEvento
            datetime createdAt
            datetime updatedAt
        }

        Usuario{
            GUID id
            string nome
            int idade
            datetime createdAt
            datetime updatedAt
        }
        
        Grupo{
            GUID id
            string nome
            string descricao
            datetime createdAt
            datetime updatedAt
        }
        
        Post{
            GUID id
            GUID idUsuario
            GUID idGrupo
            string conteudo
        }
        
        Evento{
            GUID id
            GUID idUsuarioAdm
            string nome
            string descricao
            datetime createdAt
            datetime updatedAt
        }
        
        UsuarioEGrupo ||--o{ Grupo : contido
        Usuario }o--|| UsuarioEGrupo : contido
        Usuario }o--|| Post : escreve
        Usuario }o--|| UsuarioEEvento : participa
        Evento  }o--|| UsuarioEEvento : contido
        Grupo }o--|| Post : contem
```
