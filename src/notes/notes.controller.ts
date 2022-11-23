import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NotesService } from './notes.service';
import { CreateNoteDto, FindNoteDto, UpdateNoteDto } from './dto';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findOne(@Query() findNoteDto: FindNoteDto) {
    return this.notesService.findOne(findNoteDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }
}
