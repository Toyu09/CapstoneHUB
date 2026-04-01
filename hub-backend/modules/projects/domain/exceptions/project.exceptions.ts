/**
 * Excepciones de dominio para el módulo de proyectos
 */

export class ProjectNotFoundError extends Error {
  constructor(id: string) {
    super(`Project with id ${id} not found`);
    this.name = 'ProjectNotFoundError';
  }
}

export class ProjectCodeAlreadyExistsError extends Error {
  constructor(code: string) {
    super(`Project with code ${code} already exists`);
    this.name = 'ProjectCodeAlreadyExistsError';
  }
}

export class InvalidProjectStatusTransitionError extends Error {
  constructor(currentStatus: string, requestedStatus: string) {
    super(`Cannot transition from ${currentStatus} to ${requestedStatus}`);
    this.name = 'InvalidProjectStatusTransitionError';
  }
}

export class ProjectPersistenceError extends Error {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'ProjectPersistenceError';
  }
}
