import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('interventions')
@UseGuards(JwtAuthGuard) // endpoints lkol lezemhom token 
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  @Post()
  async create(@Body() dto: CreateInterventionDto, @Req() req: any) {
    // Hna naffichiw luser eli jaya mel token pour debug
    console.log('Utilisateur extrait du Token dans le Controller:', req.user);
    
    // nabaathou les info mtaa user w akeka creation de lintervention tsir automatiquement
    return this.interventionsService.create(dto, req.user);
  }

  @Get()
  async findAll() {
    // naaytou méthode du service bech nrajou les intervention lkol
    return this.interventionsService.findAll();
  }
}
