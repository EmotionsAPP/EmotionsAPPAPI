import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateNoteDto, FindNoteDto, UpdateNoteDto } from './dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {

  private readonly logger = new Logger("NoteService");

  constructor(
    @InjectModel( Note.name )
    private readonly noteModel: Model<Note>
  ) {}

  async create( createNoteDto: CreateNoteDto ) {

    try {
      return await this.noteModel.create( createNoteDto );
    } catch (error) {
      this.handleErrors( error );
    }
  }

  async findOne( findNoteDto: FindNoteDto ) {
    const { psychologist, patient } = findNoteDto;
    
    const note = await this.noteModel.findOne({ psychologist, patient });
    
    if (!note)
      throw new NotFoundException('Note not found');

    return note;
  }

  async update( id: string, updateNoteDto: UpdateNoteDto ) {
    const note = await this.noteModel.findById( id );

    if (!note)
      throw new NotFoundException('Note not found');

    try {
      await this.noteModel.updateOne( updateNoteDto );

      return { ...note.toObject(), ...updateNoteDto };
    } catch (error) {
      this.handleErrors( error );
    }
  }

  private handleErrors( error: any ) {

    this.logger.error( error );
    throw new InternalServerErrorException("Can't create or update Note - Check server logs");
  }
}
