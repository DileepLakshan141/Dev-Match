import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { song } from 'src/types';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}

  private readonly songs: song[] = [];

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.releasedDate = songDTO.released;
    song.duration = songDTO.duration;
    song.artists = songDTO.artists;
    song.lyrics = songDTO.lyrics;

    return await this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async findOne(id: number): Promise<Song | null> {
    return await this.songRepository.findOneBy({ id });
  }

  async updateOne(id: number, songDetails: UpdateSongDTO) {
    return await this.songRepository.update(id, songDetails);
  }

  async delete(id: number): Promise<void> {
    await this.songRepository.delete({ id });
  }
}
