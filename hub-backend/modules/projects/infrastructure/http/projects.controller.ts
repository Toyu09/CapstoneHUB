import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateProjectDto,
  CreateProjectUseCase,
  GetProjectByIdUseCase,
  ListProjectsUseCase,
  ProjectResponseDto,
  UpdateProjectStatusUseCase,
} from '../../application/use-cases';
import { ProjectStatus } from '../../domain/project-status.enum';
import { ProjectType } from '../../domain/project-type.enum';
import {
  InvalidProjectStatusTransitionError,
  ProjectCodeAlreadyExistsError,
  ProjectNotFoundError,
} from '../../domain/exceptions/project.exceptions';
import {
  PROJECT_REPOSITORY,
} from '../../domain/ports/project.repository.port';
import type { IProjectRepository } from '../../domain/ports/project.repository.port';

class CreateProjectRequest {
  projectCode: string;
  name: string;
  description: string;
  context: string;
  type: 'engineering' | 'consulting';
  schools: string[];
  proposerName: string;
  proposerEmail?: string;
  directorName?: string;
  coordinatorName?: string;
  startDate: string;
  estimatedCost?: number;
}

class UpdateProjectStatusRequest {
  status: ProjectStatus;
}

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateProjectRequest): Promise<ProjectResponseDto> {
    try {
      this.validateCreateRequest(body);

      const useCase = new CreateProjectUseCase(this.projectRepository);
      const input: CreateProjectDto = {
        ...body,
        type:
          body.type === 'engineering'
            ? ProjectType.ENGINEERING
            : ProjectType.CONSULTING,
        startDate: new Date(body.startDate),
      };

      return await useCase.execute(input);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get()
  async list(): Promise<ProjectResponseDto[]> {
    try {
      const useCase = new ListProjectsUseCase(this.projectRepository);
      return await useCase.execute();
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProjectResponseDto> {
    try {
      const useCase = new GetProjectByIdUseCase(this.projectRepository);
      return await useCase.execute(id);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateProjectStatusRequest,
  ): Promise<ProjectResponseDto> {
    try {
      if (!body.status || !Object.values(ProjectStatus).includes(body.status)) {
        throw new BadRequestException('Invalid status value');
      }

      const useCase = new UpdateProjectStatusUseCase(this.projectRepository);
      return await useCase.execute({
        projectId: id,
        newStatus: body.status,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private validateCreateRequest(body: CreateProjectRequest): void {
    if (!body.projectCode || !body.name || !body.description || !body.context) {
      throw new BadRequestException(
        'projectCode, name, description and context are required',
      );
    }

    if (!body.type || !['engineering', 'consulting'].includes(body.type)) {
      throw new BadRequestException('type must be engineering or consulting');
    }

    if (!body.schools || !Array.isArray(body.schools) || body.schools.length === 0) {
      throw new BadRequestException('schools is required and must be a non-empty array');
    }

    if (!body.proposerName) {
      throw new BadRequestException('proposerName is required');
    }

    const parsedDate = new Date(body.startDate);
    if (Number.isNaN(parsedDate.getTime())) {
      throw new BadRequestException('startDate must be a valid ISO date string');
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof BadRequestException) {
      throw error;
    }

    if (error instanceof ProjectCodeAlreadyExistsError) {
      throw new ConflictException(error.message);
    }

    if (error instanceof ProjectNotFoundError) {
      throw new NotFoundException(error.message);
    }

    if (error instanceof InvalidProjectStatusTransitionError) {
      throw new BadRequestException(error.message);
    }

    throw new InternalServerErrorException('Unexpected error while processing project request');
  }
}
