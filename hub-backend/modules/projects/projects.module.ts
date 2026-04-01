import { Module } from '@nestjs/common';
import { ProjectsController } from './infrastructure/http/projects.controller';
import { PROJECT_REPOSITORY } from './domain/ports/project.repository.port';
import { InMemoryProjectRepository } from './infrastructure/persistence/in-memory-project.repository';

@Module({
	controllers: [ProjectsController],
	providers: [
		{
			provide: PROJECT_REPOSITORY,
			useClass: InMemoryProjectRepository,
		},
	],
	exports: [PROJECT_REPOSITORY],
})
export class ProjectsModule {}

