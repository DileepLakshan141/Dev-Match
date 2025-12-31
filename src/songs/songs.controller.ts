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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song-dto';
import { UpdateResult } from 'typeorm/browser';
import { Pagination } from 'nestjs-typeorm-paginate';

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
  findAllSongs(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit });
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
