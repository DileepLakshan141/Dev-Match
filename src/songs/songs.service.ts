import { Injectable, Scope } from '@nestjs/common';
import { song } from 'src/types';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  private readonly songs: song[] = [];

  create(song: song) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    return this.songs;
  }
}
