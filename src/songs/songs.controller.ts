import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Post,
  Body,
  ParseIntPipe,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

const songs = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    year: 1975,
    genre: 'Rock',
    duration: '5:55',
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
  },
  {
    id: 2,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    year: 2019,
    genre: 'Synth-pop',
    duration: '3:22',
    youtubeLink: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
  },
  {
    id: 3,
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    year: 2017,
    genre: 'Pop',
    duration: '3:54',
    youtubeLink: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
  },
  {
    id: 4,
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    year: 2019,
    genre: 'Electropop',
    duration: '3:14',
    youtubeLink: 'https://www.youtube.com/watch?v=DyDfgMOUjCI',
  },
  {
    id: 5,
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    year: 2019,
    genre: 'Pop',
    duration: '3:29',
    youtubeLink: 'https://www.youtube.com/watch?v=q0hyYWKXF0Q',
  },
  {
    id: 6,
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    album: 'Uptown Special',
    year: 2014,
    genre: 'Funk/Pop',
    duration: '4:30',
    youtubeLink: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
  },
  {
    id: 7,
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    year: 1991,
    genre: 'Grunge',
    duration: '5:01',
    youtubeLink: 'https://www.youtube.com/watch?v=hTWKbfoikeg',
  },
  {
    id: 8,
    title: 'Rolling in the Deep',
    artist: 'Adele',
    album: '21',
    year: 2010,
    genre: 'Soul/Pop',
    duration: '3:48',
    youtubeLink: 'https://www.youtube.com/watch?v=rYEDA3JcQqw',
  },
  {
    id: 9,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    year: 1982,
    genre: 'Pop/Funk',
    duration: '4:54',
    youtubeLink: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
  },
  {
    id: 10,
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    year: 1976,
    genre: 'Rock',
    duration: '6:30',
    youtubeLink: 'https://www.youtube.com/watch?v=09839DpTctU',
  },
  {
    id: 11,
    title: 'Despacito',
    artist: 'Luis Fonsi ft. Daddy Yankee',
    album: 'Vida',
    year: 2017,
    genre: 'Reggaeton/Pop',
    duration: '3:47',
    youtubeLink: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  },
  {
    id: 12,
    title: 'Hey Jude',
    artist: 'The Beatles',
    album: 'Hey Jude',
    year: 1968,
    genre: 'Rock',
    duration: '7:11',
    youtubeLink: 'https://www.youtube.com/watch?v=A_MjCqQoLLA',
  },
  {
    id: 13,
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    year: 1971,
    genre: 'Rock',
    duration: '8:02',
    youtubeLink: 'https://www.youtube.com/watch?v=QkF3oxziUI4',
  },
  {
    id: 14,
    title: 'Old Town Road',
    artist: 'Lil Nas X ft. Billy Ray Cyrus',
    album: '7',
    year: 2019,
    genre: 'Country Rap',
    duration: '2:37',
    youtubeLink: 'https://www.youtube.com/watch?v=r7qovpFAGrQ',
  },
  {
    id: 15,
    title: 'Havana',
    artist: 'Camila Cabello ft. Young Thug',
    album: 'Camila',
    year: 2017,
    genre: 'Pop',
    duration: '3:37',
    youtubeLink: 'https://www.youtube.com/watch?v=BQ0mxQXmLsk',
  },
  {
    id: 16,
    title: 'Thriller',
    artist: 'Michael Jackson',
    album: 'Thriller',
    year: 1982,
    genre: 'Pop/Funk',
    duration: '5:57',
    youtubeLink: 'https://www.youtube.com/watch?v=sOnqjkJTMaA',
  },
  {
    id: 17,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: 'Appetite for Destruction',
    year: 1987,
    genre: 'Hard Rock',
    duration: '5:56',
    youtubeLink: 'https://www.youtube.com/watch?v=1w7OgIMMRc4',
  },
  {
    id: 18,
    title: 'Someone Like You',
    artist: 'Adele',
    album: '21',
    year: 2011,
    genre: 'Soul/Pop',
    duration: '4:45',
    youtubeLink: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0',
  },
  {
    id: 19,
    title: 'Take On Me',
    artist: 'a-ha',
    album: 'Hunting High and Low',
    year: 1985,
    genre: 'Synth-pop',
    duration: '3:48',
    youtubeLink: 'https://www.youtube.com/watch?v=djV11Xbc914',
  },
  {
    id: 20,
    title: 'Wonderwall',
    artist: 'Oasis',
    album: "(What's the Story) Morning Glory?",
    year: 1995,
    genre: 'Britpop',
    duration: '4:18',
    youtubeLink: 'https://www.youtube.com/watch?v=bx1Bh8ZvH84',
  },
];

type Connection = {
  CONN_STRING: string;
  DB: string;
  DB_NAME: string;
};

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(this.connection);
  }

  @Get()
  findAllSongs(@Query('artist') artist?: string) {
    if (artist) {
      const filteredSongs = songs.filter((song) =>
        song.artist.toLowerCase().includes(artist.toLowerCase()),
      );
      return filteredSongs;
    }
    return this.songsService.findAll();
  }

  @Get(':id')
  findSpecificSong(@Param('id') id: number) {
    const song = songs.find((item) => item.id == id);
    return song;
  }

  @Put(':id')
  updateSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Updated song ${id} and its type is ${typeof id}`;
  }

  @Delete(':id')
  deleteSong(@Param('id') id: number) {
    return `Deleted song ${id}`;
  }

  @Post()
  createSong(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }
}
