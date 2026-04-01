import { Project } from '../project.entity';

export interface IProjectRepository {
  /**
   * Guarda un proyecto nuevo en la persistencia
   */
  save(project: Project): Promise<void>;

  /**
   * Actualiza un proyecto existente
   */
  update(project: Project): Promise<void>;

  /**
   * Obtiene un proyecto por su ID
   */
  findById(id: string): Promise<Project | null>;

  /**
   * Obtiene un proyecto por su código
   */
  findByCode(code: string): Promise<Project | null>;

  /**
   * Obtiene todos los proyectos
   */
  findAll(): Promise<Project[]>;

  /**
   * Obtiene proyectos por su estado
   */
  findByStatus(status: string): Promise<Project[]>;

  /**
   * Obtiene proyectos por escuela
   */
  findBySchool(school: string): Promise<Project[]>;

  /**
   * Obtiene proyectos por tipo
   */
  findByType(type: string): Promise<Project[]>;

  /**
   * Obtiene proyectos por proponente
   */
  findByProposer(proposerName: string): Promise<Project[]>;

  /**
   * Elimina un proyecto por su ID (soft delete)
   */
  delete(id: string): Promise<void>;

  /**
   * Existe un proyecto con este código?
   */
  existsByCode(code: string): Promise<boolean>;

  /**
   * Existe un proyecto con este ID?
   */
  existsById(id: string): Promise<boolean>;
}

export const PROJECT_REPOSITORY = Symbol('ProjectRepository');
