import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { Song } from "libs/prisma/client";

@Controller("songs")
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  async create(@Body() songData: Song) {
    const { name, length } = songData;

    return this.songsService.create({
      name,
      length: parseFloat(length.toString()),
    });
  }

  @Get()
  async findAll() {
    return this.songsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const song = await this.songsService.findOne(+id);

    if (!song) {
      throw new NotFoundException(`Song with id:${id} doesn't exist.`);
    }

    return song;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() songData: Song) {
    return this.songsService.update(+id, songData);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.songsService.remove(+id);
  }
}
