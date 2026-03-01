# Documentación de Arquitectura CapstoneHUB - arc42

# Introducción y Metas {#section-introduction-and-goals}

## Vista de Requerimientos {#_vista_de_requerimientos}

CapstoneHUB es un sistema web de gestión integral para proyectos Capstone que facilita la postulación, evaluación, seguimiento y cierre de proyectos de titulación. El sistema permite a empresas, docentes y organizaciones sociales proponer proyectos, mientras que estudiantes y profesores pueden gestionar el ciclo completo de desarrollo.

### Requerimientos Funcionales Principales

1. **Gestión de Postulaciones**
   - Permitir postulación de proyectos de ingeniería y consultoría
   - Formato flexible para propuestas de empresas, docentes y proyectos sociales
   - Flujo de evaluación con comité evaluador
   - Proceso de asignación de proyectos a estudiantes

2. **Banco de Proyectos**
   - Listado de proyectos disponibles
   - Seguimiento de proyectos en proceso
   - Hub/galería de proyectos (histórico y activos)
   - Gestión de estados de proyectos

3. **Gestión de Entregas**
   - Entregas parciales (weekly reports)
   - Hitos de entrega programados
   - Documento oficial de proyecto
   - Artículo final
   - Sistema de carga de archivos para estudiantes

4. **Gestión de Usuarios y Roles**
   - Single Sign-On (SSO)
   - Profesores con múltiples roles
   - Responsables internos y externos
   - Estudiantes con permisos de carga

5. **Automatización Administrativa**
   - Auto-generación de firmas
   - Generación de cartas de derecho
   - Documentación oficial automatizada

## Metas de Calidad {#_metas_de_calidad}

| Prioridad | Atributo de Calidad | Escenario |
|-----------|---------------------|-----------|
| 1 | **Usabilidad** | El sistema debe ser intuitivo, con manual de usuario completo. Usuarios nuevos deben poder postular proyectos en menos de 15 minutos. |
| 2 | **Mantenibilidad** | Arquitectura modular con NestJS y NextJS que permita actualizaciones independientes de frontend y backend. |
| 3 | **Portabilidad** | Todo el sistema debe ser desplegable mediante Docker en cualquier infraestructura. |
| 4 | **Seguridad** | Implementación de SSO, autenticación robusta y control de acceso basado en roles (RBAC). |
| 5 | **Escalabilidad** | El sistema debe soportar múltiples postulaciones simultáneas y gestión de +100 proyectos concurrentes. |
| 6 | **Disponibilidad** | Sistema disponible 99% del tiempo durante períodos de postulación y entrega. |

## Partes interesadas (Stakeholders) {#_partes_interesadas_stakeholders}

| Rol/Nombre | Contacto | Expectativas |
|------------|----------|--------------|
| **Profesores Coordinadores** | Profesora coordinadora del proyecto | Sistema que simplifique la gestión administrativa de proyectos Capstone, con trazabilidad completa del proceso. |
| **Profesor Técnico** | Profesor de especificaciones técnicas | Infraestructura moderna, escalable y fácil de mantener usando tecnologías específicas (NestJS, NextJS, PostgreSQL, Docker). |
| **Comité Evaluador** | Profesores evaluadores | Interfaz clara para revisar y evaluar postulaciones de proyectos según criterios establecidos. |
| **Estudiantes** | Alumnos de proyecto Capstone | Plataforma simple para visualizar proyectos disponibles, subir entregas y hacer seguimiento de su progreso. |
| **Empresas Postulantes** | Organizaciones externas | Proceso de postulación flexible y seguimiento del estado de sus propuestas. |
| **Docentes Postulantes** | Profesores con proyectos de investigación | Facilidad para proponer proyectos académicos y dar seguimiento. |
| **Organizaciones Sociales** | ONGs y proyectos comunitarios | Acceso simplificado para postular proyectos de impacto social. |
| **Administradores del Sistema** | IT de la institución | Sistema fácil de desplegar, mantener y monitorear. |

# Restricciones de la Arquitectura {#section-architecture-constraints}

## Restricciones Técnicas

| Restricción | Descripción |
|-------------|-------------|
| **Backend Framework** | Obligatorio usar **NestJS** (Node.js framework) |
| **Frontend Framework** | Obligatorio usar **NextJS** (React framework) |
| **Base de Datos** | Obligatorio usar **PostgreSQL** |
| **Containerización** | El sistema completo debe ser desplegable con **Docker** |
| **Tipo de Aplicación** | Aplicación **web** (no móvil nativa) |

## Restricciones Organizacionales

| Restricción | Descripción |
|-------------|-------------|
| **Equipo de Desarrollo** | Equipo estudiantil con supervisión de profesores |
| **Timeline MVP** | Definir y desarrollar MVP antes de la siguiente reunión de equipo |
| **Reunión de Validación** | Presentación con profesores responsables programada para la próxima semana |

## Restricciones de Convenciones

| Restricción | Descripción |
|-------------|-------------|
| **Documentación** | Utilizar plantilla arc42 para documentación de arquitectura |
| **Manual de Usuario** | Obligatorio proporcionar manual de usuario completo |
| **Formato de Postulación** | Debe ser más flexible que el formato actual en papel |

# Alcance y Contexto del Sistema {#section-context-and-scope}

## Contexto de Negocio {#_contexto_de_negocio}

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│    Empresas     │         │    Docentes     │         │  Organizaciones │
│   Postulantes   │         │   Postulantes   │         │    Sociales     │
└────────┬────────┘         └────────┬────────┘         └────────┬────────┘
         │                           │                           │
         │     Postulación de Proyectos                         │
         └───────────────────────────┼───────────────────────────┘
                                     ▼
                        ┌────────────────────────┐
                        │                        │
                        │   CapstoneHUB System   │
                        │                        │
                        └───────────┬────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
         ▼                          ▼                          ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Estudiantes   │      │    Profesores   │      │     Comité      │
│                 │      │   Coordinadores │      │   Evaluador     │
│ - Ver proyectos │      │                 │      │                 │
│ - Subir entregas│      │ - Seguimiento   │      │ - Evaluar       │
│ - Weekly reports│      │ - Gestionar     │      │ - Aprobar       │
└─────────────────┘      └─────────────────┘      └─────────────────┘
         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    ▼
                        ┌────────────────────────┐
                        │   Sistema SSO          │
                        │   (Autenticación)      │
                        └────────────────────────┘
```

### Interfases de Negocio

| Interfaz | Actor | Descripción |
|----------|-------|-------------|
| **Postulación de Proyectos** | Empresas, Docentes, ONGs | Formulario flexible para proponer proyectos de ingeniería o consultoría |
| **Evaluación de Propuestas** | Comité Evaluador | Sistema para revisar y aprobar/rechazar postulaciones |
| **Asignación de Proyectos** | Profesores Coordinadores | Proceso de matching entre proyectos aprobados y estudiantes |
| **Gestión de Entregas** | Estudiantes | Portal para subir weekly reports, hitos y entregables finales |
| **Seguimiento de Proyectos** | Profesores, Estudiantes | Dashboard con estados, avances y próximos hitos |
| **Generación de Documentos** | Sistema | Auto-generación de firmas, cartas y documentos oficiales |

## Contexto Técnico {#_contexto_t_cnico}

```
┌─────────────────────────────────────────────────────────────┐
│                      Internet/Intranet                       │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
                           ▼
                ┌──────────────────────┐
                │   Reverse Proxy      │
                │   (Nginx/Traefik)    │
                └──────────┬───────────┘
                           │
           ┌───────────────┴───────────────┐
           │                               │
           ▼                               ▼
┌──────────────────────┐       ┌──────────────────────┐
│   Frontend Service   │       │   Backend Service    │
│                      │       │                      │
│   NextJS (React)     │◄─────►│   NestJS (Node.js)   │
│   - Server-Side      │  API  │   - REST/GraphQL     │
│     Rendering        │       │   - Business Logic   │
│   - Client UI        │       │   - Authentication   │
└──────────────────────┘       └──────────┬───────────┘
                                          │
                           ┌──────────────┴──────────────┐
                           │                             │
                           ▼                             ▼
                ┌──────────────────────┐     ┌──────────────────────┐
                │   PostgreSQL DB      │     │   File Storage       │
                │   - Relational Data  │     │   - Documents        │
                │   - User Management  │     │   - Reports          │
                │   - Project Data     │     │   - Deliverables     │
                └──────────────────────┘     └──────────────────────┘
                           │                             │
                           └──────────────┬──────────────┘
                                          │
                                          ▼
                              ┌──────────────────────┐
                              │   SSO Provider       │
                              │   (OAuth2/SAML)      │
                              └──────────────────────┘
```

### Interfases Técnicas

| Interfaz | Tecnología | Descripción |
|----------|------------|-------------|
| **Frontend ↔ Backend** | REST API / GraphQL | Comunicación mediante HTTP/HTTPS con JSON |
| **Backend ↔ Database** | TypeORM / Prisma | ORM para PostgreSQL con migraciones |
| **Backend ↔ SSO** | OAuth 2.0 / SAML | Autenticación delegada |
| **Backend ↔ File Storage** | S3-compatible API / Local FS | Almacenamiento de documentos |
| **Container Orchestration** | Docker Compose | Orquestación de servicios en desarrollo y producción |

### Mapeo de Entrada/Salida a Canales

| Entrada/Salida | Canal | Formato |
|----------------|-------|---------|
| Postulación de proyecto | HTTPS (Frontend → Backend) | JSON (multipart/form-data para archivos) |
| Carga de entregas | HTTPS (Frontend → Backend) | Multipart/form-data |
| Consultas de datos | HTTPS (Frontend ↔ Backend) | JSON (REST) o GraphQL |
| Notificaciones | Email / Push (Backend → SMTP) | HTML/Plain text |
| Generación de PDFs | Backend → File Storage | PDF binario |
| Autenticación | HTTPS (Backend ↔ SSO) | OAuth tokens / SAML assertions |

# Estrategia de solución {#section-solution-strategy}

## Decisiones Tecnológicas

### Stack Principal

1. **Frontend: NextJS**
   - Server-Side Rendering (SSR) para mejor SEO y performance
   - Rutas API integradas para BFF (Backend for Frontend) si es necesario
   - React para componentes reutilizables e interfaz intuitiva
   - TypeScript para type safety

2. **Backend: NestJS**
   - Arquitectura modular con inyección de dependencias
   - Decoradores y guards para autenticación/autorización
   - Soporte nativo para TypeScript
   - Integración fácil con TypeORM para PostgreSQL

3. **Base de Datos: PostgreSQL**
   - Base de datos relacional robusta
   - Soporte para transacciones ACID
   - Extensiones como JSONB para flexibilidad
   - Migraciones versionadas

4. **Containerización: Docker**
   - Docker Compose para orquestación local
   - Imágenes optimizadas para producción
   - Volúmenes para persistencia de datos
   - Network isolation entre servicios

## Enfoque Arquitectónico

### Patrón: Arquitectura en Capas con Microservicios Ligeros

```
┌─────────────────────────────────────────────────────────┐
│              Presentation Layer (NextJS)                 │
│  - Server Components     - Client Components             │
│  - Pages/Routes          - UI Components                 │
└────────────────────────┬────────────────────────────────┘
                         │ API Calls
┌────────────────────────▼────────────────────────────────┐
│              Application Layer (NestJS)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Projects  │  │    Users    │  │ Submissions │    │
│  │   Module    │  │   Module    │  │   Module    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│         Shared: Auth Guards, Validators, DTOs           │
└────────────────────────┬────────────────────────────────┘
                         │ ORM
┌────────────────────────▼────────────────────────────────┐
│              Data Layer (PostgreSQL)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Projects   │  │    Users    │  │ Submissions │    │
│  │   Table     │  │   Table     │  │   Table     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Módulos Principales del Backend

1. **Auth Module**: SSO, JWT, Guards, Role-based access control
2. **Projects Module**: CRUD de proyectos, estados, asignaciones
3. **Submissions Module**: Entregas, weekly reports, hitos
4. **Users Module**: Gestión de usuarios, roles, perfiles
5. **Evaluation Module**: Comité evaluador, scoring, aprobaciones
6. **Documents Module**: Generación de PDFs, firmas, cartas
7. **Notifications Module**: Emails, alertas de deadline

## Enfoque para Alcanzar Metas de Calidad

| Meta de Calidad | Estrategia de Solución |
|-----------------|------------------------|
| **Usabilidad** | - Diseño con Material UI / Tailwind CSS<br>- Flujos guiados con wizards<br>- Feedback visual inmediato<br>- Manual de usuario integrado |
| **Mantenibilidad** | - Arquitectura modular<br>- Separación frontend/backend<br>- TypeScript en todo el stack<br>- Testing automatizado (Jest, Cypress) |
| **Portabilidad** | - Docker Compose para desarrollo<br>- Imágenes multi-stage builds<br>- Variables de entorno para configuración<br>- Documentación de deployment |
| **Seguridad** | - SSO corporativo<br>- JWT con refresh tokens<br>- RBAC (Role-Based Access Control)<br>- Validación en cada capa<br>- HTTPS obligatorio |
| **Escalabilidad** | - Stateless backend (horizontal scaling)<br>- Connection pooling en DB<br>- Caché con Redis (opcional)<br>- File storage externo (S3-compatible) |
| **Disponibilidad** | - Health checks en contenedores<br>- Logs centralizados<br>- Backups automatizados de DB<br>- Manejo de errores robusto |

## Decisiones Organizacionales

### Definición de MVP (Pre-MVP)

El MVP debe permitir:
1. **Postular proyectos** con formato flexible
2. **Gestionar proyectos** (visualización, estados, asignación)
3. **Cierre básico** (subir entregable final)

**Fuera del MVP inicial:**
- Generación automática de documentos complejos
- Weekly reports completos
- Sistema de notificaciones avanzado
- Galería pública de proyectos históricos

### Próximos Pasos

1. Completar levantamiento de requerimientos detallados
2. Validar alcance del MVP en reunión con profesores
3. Modelar base de datos (diagrama ER)
4. Crear prototipos de UI/UX para validación
5. Setup inicial de repositorio y Docker Compose

---

# Vista de Bloques {#section-building-block-view}

## Sistema General de Caja Blanca {#_sistema_general_de_caja_blanca}

```
┌─────────────────────────────────────────────────────────────────┐
│                        CapstoneHUB System                        │
│                                                                   │
│  ┌────────────────────┐           ┌─────────────────────────┐  │
│  │                    │           │                         │  │
│  │  Frontend Service  │◄─────────►│   Backend Service       │  │
│  │     (NextJS)       │   REST    │      (NestJS)           │  │
│  │                    │   API     │                         │  │
│  └────────────────────┘           └──────────┬──────────────┘  │
│                                               │                  │
│                                    ┌──────────┴──────────┐      │
│                                    │                     │      │
│                         ┌──────────▼─────────┐  ┌───────▼──────┐
│                         │                    │  │              │
│                         │  Database Service  │  │  SSO Service │
│                         │   (PostgreSQL)     │  │   (OAuth2)   │
│                         │                    │  │              │
│                         └────────────────────┘  └──────────────┘
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Motivación

El sistema se divide en cuatro componentes principales desacoplados que se comunican mediante interfaces bien definidas, permitiendo desarrollo, testing y deployment independiente.

### Bloques de construcción contenidos

| Componente | Responsabilidad |
|------------|-----------------|
| **Frontend Service** | Interfaz de usuario, renderizado, interacción con usuarios |
| **Backend Service** | Lógica de negocio, validaciones, orquestación de datos |
| **Database Service** | Persistencia de datos, integridad referencial |
| **SSO Service** | Autenticación y autorización de usuarios |

### Interfases importantes

- **Frontend ↔ Backend**: REST API (JSON sobre HTTPS)
- **Backend ↔ Database**: TypeORM (SQL)
- **Backend ↔ SSO**: OAuth 2.0 / SAML

---

*[El resto del documento arc42 con Nivel 2, Nivel 3, Vista de Ejecución, Vista de Despliegue, Conceptos Transversales, etc., se completará en iteraciones futuras una vez validados los requerimientos en la reunión con profesores]*

---

# Decisiones de Diseño {#section-design-decisions}

| ID | Decisión | Justificación | Consecuencias |
|----|----------|---------------|---------------|
| **DD-001** | Usar NextJS para frontend | Requerimiento del profesor. SSR mejora SEO y performance. | Curva de aprendizaje moderada, pero buen soporte de comunidad. |
| **DD-002** | Usar NestJS para backend | Requerimiento del profesor. Arquitectura modular escalable. | Estructura de proyecto más compleja que Express simple. |
| **DD-003** | PostgreSQL como base de datos | Requerimiento del profesor. Relacional, robusto, open-source. | Necesidad de modelar schema cuidadosamente. |
| **DD-004** | Implementar SSO | Mayor seguridad, mejor UX, integración con sistemas institucionales. | Dependencia de proveedor SSO externo. |
| **DD-005** | Arquitectura monolítica modular | Simplicidad para MVP, fácil de desplegar con Docker. | Puede requerir refactor a microservicios en el futuro. |
| **DD-006** | TypeScript en todo el stack | Type safety, mejor mantenibilidad, menos errores en runtime. | Overhead inicial de configuración y tipado. |

---

# Riesgos y deuda técnica {#section-technical-risks}

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **Integración SSO no disponible a tiempo** | Media | Alto | Implementar autenticación básica con JWT como fallback temporal |
| **Alcance del MVP no claro** | Alta | Alto | Realizar reunión de validación con profesores ASAP |
| **Formato de postulación flexible muy complejo** | Media | Medio | Usar formularios dinámicos con react-hook-form + JSON schema |
| **Generación de documentos oficiales compleja** | Media | Medio | Dejar para post-MVP, priorizar funcionalidad core |
| **Equipo sin experiencia en NestJS/NextJS** | Alta | Medio | Dedicar tiempo a capacitación inicial y POCs |
| **Infraestructura de deployment no definida** | Media | Medio | Documentar deployment con Docker Compose desde el inicio |

---

# Glosario {#section-glossary}

| Término | Definición |
|---------|------------|
| **Capstone** | Proyecto de titulación que culmina la carrera de ingeniería |
| **MVP** | Minimum Viable Product - Producto mínimo viable para validación |
| **SSO** | Single Sign-On - Sistema de autenticación única |
| **Weekly Report** | Reporte semanal de avance del proyecto |
| **Hito** | Entrega parcial programada en el cronograma del proyecto |
| **Comité Evaluador** | Grupo de profesores que evalúan y aprueban postulaciones |
| **Postulación** | Propuesta de proyecto presentada por empresas, docentes u ONGs |
| **Asignación** | Proceso de matching entre proyecto aprobado y estudiantes |
| **RBAC** | Role-Based Access Control - Control de acceso basado en roles |
| **ORM** | Object-Relational Mapping - Mapeo objeto-relacional |
| **Docker Compose** | Herramienta para definir y ejecutar aplicaciones Docker multi-contenedor |

---

**Próximos pasos:**
1. Validar este draft con el equipo y profesores en la reunión programada
2. Completar secciones faltantes después de la definición final del MVP
3. Crear diagramas detallados de componentes y flujos
4. Definir modelo de datos completo
5. Establecer cronograma de desarrollo