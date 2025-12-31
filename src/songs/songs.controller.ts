import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Body,
  ParseIntPipe,
  Inject,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song-dto';
import { UpdateResult } from 'typeorm/browser';

type Connection = {
  CONN_STRING: string;
  DB: string;
  DB_NAME: string;
};

@Controller({
  path: 'songs',
  scope: Scope.REQUEST,
})
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(this.connection);
  }

  @Get()
  findAllSongs(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get(':id')
  findSpecificSong(@Param('id', ParseIntPipe) id: number) {
    const song = this.songsService.findOne(id);
    return song;
  }

  @Put(':id')
  updateSong(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.updateOne(id, updateSongDTO);
  }

  @Delete(':id')
  deleteSong(@Param('id', ParseIntPipe) id: number) {
    return this.songsService.delete(id);
  }

  @Post()
  createSong(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }
}
