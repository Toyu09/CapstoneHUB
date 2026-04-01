import { Project } from '../../domain/project.entity';
import { ProjectType } from '../../domain/project-type.enum';
import { IProjectRepository } from '../../domain/ports/project.repository.port';
import {
  ProjectCodeAlreadyExistsError,
  ProjectPersistenceError,
} from '../../domain/exceptions/project.exceptions';

export class CreateProjectDto {
  projectCode: string;
  name: string;
  description: string;
  context: string;
  type: ProjectType;
  schools: string[];
  proposerName: string;
  proposerEmail?: string;
  directorName?: string;
  coordinatorName?: string;
  startDate: Date;
  estimatedCost?: number;
}

export class ProjectResponseDto {
  id: string;
  projectCode: string;
  name: string;
  description: string;
  context: string;
  type: ProjectType;
  status: string;
  schools: string[];
  proposerName: string;
  proposerEmail?: string;
  directorName?: string;
  coordinatorName?: string;
  assignedStudents: string[];
  startDate: Date;
  endDate?: Date;
  estimatedCost?: number;
  observations: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class CreateProjectUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(input: CreateProjectDto): Promise<ProjectResponseDto> {
    try {
      // Validar que no exista un proyecto con el mismo código
      const existingProject = await this.projectRepository.findByCode(input.projectCode);
      if (existingProject) {
        throw new ProjectCodeAlreadyExistsError(input.projectCode);
      }

      // Crear la entidad de dominio
      const project = Project.create({
        id: this.generateId(),
        projectCode: input.projectCode,
        name: input.name,
        description: input.description,
        context: input.context,
        type: input.type,
        schools: input.schools,
        proposerName: input.proposerName,
        proposerEmail: input.proposerEmail,
        directorName: input.directorName,
        coordinatorName: input.coordinatorName,
        startDate: input.startDate,
        estimatedCost: input.estimatedCost,
      });

      // Persistir
      await this.projectRepository.save(project);

      // Retornar DTO
      return this.mapToResponse(project);
    } catch (error) {
      if (error instanceof ProjectCodeAlreadyExistsError) {
        throw error;
      }
      throw new ProjectPersistenceError('Error creating project', error as Error);
    }
  }

  private generateId(): string {
    return `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private mapToResponse(project: Project): ProjectResponseDto {
    const props = project.toPrimitives();
    return {
      id: props.id,
      projectCode: props.projectCode,
      name: props.name,
      description: props.description,
      context: props.context,
      type: props.type,
      status: props.status,
      schools: props.schools,
      proposerName: props.proposerName,
      proposerEmail: props.proposerEmail,
      directorName: props.directorName,
      coordinatorName: props.coordinatorName,
      assignedStudents: props.assignedStudents || [],
      startDate: props.startDate,
      endDate: props.endDate,
      estimatedCost: props.estimatedCost,
      observations: props.observations,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
