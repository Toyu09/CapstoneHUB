import { ProjectType } from './project-type.enum';
import { ProjectStatus } from './project-status.enum';

export interface ProjectProps {
  id: string;
  projectCode: string; // Código identificador único para búsqueda rápida
  name: string; // Nombre del proyecto
  description: string; // Descripción del proyecto
  context: string; // Contexto alrededor del proyecto
  type: ProjectType; // Tipo: engineering o consulting
  status: ProjectStatus; // Estado actual: proposed, under_review, approved, assigned, in_progress, closed, rejected
  schools: string[]; // Escuelas de la UTB involucradas
  proposerName: string; // Quien propone el proyecto
  proposerEmail?: string;
  directorName?: string; // Director del proyecto
  coordinatorName?: string; // Coordinador (profesor del curso)
  assignedStudents?: string[]; // IDs o nombres de estudiantes asignados
  startDate: Date; // Fecha de inicio
  endDate?: Date; // Fecha de fin (si existe)
  estimatedCost?: number; // Costo estimado
  observations: string[]; // Observaciones/comentarios acumulados
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectProps {
  id: string;
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

// reglas de negocio para transiciones de estado
const allowedStatusTransitions: Record<ProjectStatus, ProjectStatus[]> = {
  [ProjectStatus.PROPOSED]: [ProjectStatus.UNDER_REVIEW, ProjectStatus.REJECTED],
  [ProjectStatus.UNDER_REVIEW]: [ProjectStatus.APPROVED, ProjectStatus.REJECTED],
  [ProjectStatus.APPROVED]: [ProjectStatus.ASSIGNED, ProjectStatus.REJECTED],
  [ProjectStatus.ASSIGNED]: [ProjectStatus.IN_PROGRESS, ProjectStatus.REJECTED],
  [ProjectStatus.IN_PROGRESS]: [ProjectStatus.CLOSED, ProjectStatus.REJECTED],
  [ProjectStatus.CLOSED]: [],
  [ProjectStatus.REJECTED]: [],
};

export class Project {
  private constructor(private readonly props: ProjectProps) {}

  static create(props: CreateProjectProps): Project {
    const now = new Date();

    return new Project({
      ...props,
      status: ProjectStatus.PROPOSED,
      observations: [],
      assignedStudents: [],
      createdAt: now,
      updatedAt: now,
    });
  }

  static rehydrate(props: ProjectProps): Project {
    return new Project(props);
  }

  get id(): string {
    return this.props.id;
  }

  get projectCode(): string {
    return this.props.projectCode;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get context(): string {
    return this.props.context;
  }

  get type(): ProjectType {
    return this.props.type;
  }

  get status(): ProjectStatus {
    return this.props.status;
  }

  get schools(): string[] {
    return [...this.props.schools];
  }

  get proposerName(): string {
    return this.props.proposerName;
  }

  get proposerEmail(): string | undefined {
    return this.props.proposerEmail;
  }

  get directorName(): string | undefined {
    return this.props.directorName;
  }

  get coordinatorName(): string | undefined {
    return this.props.coordinatorName;
  }

  get assignedStudents(): string[] {
    return [...(this.props.assignedStudents || [])];
  }

  get startDate(): Date {
    return new Date(this.props.startDate);
  }

  get endDate(): Date | undefined {
    return this.props.endDate ? new Date(this.props.endDate) : undefined;
  }

  get estimatedCost(): number | undefined {
    return this.props.estimatedCost;
  }

  get observations(): string[] {
    return [...this.props.observations];
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  get updatedAt(): Date {
    return new Date(this.props.updatedAt);
  }

  changeStatus(nextStatus: ProjectStatus): void {
    if (this.props.status === nextStatus) {
      return;
    }

    const allowedTransitions = allowedStatusTransitions[this.props.status];
    if (!allowedTransitions.includes(nextStatus)) {
      throw new Error(
        `Invalid project status transition from ${this.props.status} to ${nextStatus}`
      );
    }

    this.props.status = nextStatus;
    this.props.updatedAt = new Date();
  }

  assignStudent(studentId: string): void {
    if (!this.props.assignedStudents) {
      this.props.assignedStudents = [];
    }

    if (!this.props.assignedStudents.includes(studentId)) {
      this.props.assignedStudents.push(studentId);
      this.props.updatedAt = new Date();
    }
  }

  removeStudent(studentId: string): void {
    if (this.props.assignedStudents) {
      const index = this.props.assignedStudents.indexOf(studentId);
      if (index > -1) {
        this.props.assignedStudents.splice(index, 1);
        this.props.updatedAt = new Date();
      }
    }
  }

  addObservation(observation: string): void {
    this.props.observations.push(observation);
    this.props.updatedAt = new Date();
  }

  updateDetails(input: {
    name?: string;
    description?: string;
    context?: string;
    directorName?: string;
    coordinatorName?: string;
    endDate?: Date;
  }): void {
    if (input.name !== undefined) {
      this.props.name = input.name;
    }

    if (input.description !== undefined) {
      this.props.description = input.description;
    }

    if (input.context !== undefined) {
      this.props.context = input.context;
    }

    if (input.directorName !== undefined) {
      this.props.directorName = input.directorName;
    }

    if (input.coordinatorName !== undefined) {
      this.props.coordinatorName = input.coordinatorName;
    }

    if (input.endDate !== undefined) {
      this.props.endDate = input.endDate;
    }

    this.props.updatedAt = new Date();
  }

  toPrimitives(): ProjectProps {
    return {
      ...this.props,
      schools: [...this.props.schools],
      assignedStudents: [...(this.props.assignedStudents || [])],
      observations: [...this.props.observations],
      startDate: new Date(this.props.startDate),
      endDate: this.props.endDate ? new Date(this.props.endDate) : undefined,
      createdAt: new Date(this.props.createdAt),
      updatedAt: new Date(this.props.updatedAt),
    };
  }
}
