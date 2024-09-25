import { Injectable } from "@nestjs/common";
import { Prisma, Song } from "libs/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SongCreateInput): Promise<Song> {
    return this.prisma.song.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.song.findMany();
  }

  async findOne(id: number) {
    return this.prisma.song.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Prisma.SongUpdateInput) {
    return this.prisma.song.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: number) {
    return this.prisma.song.delete({
      where:{
        id,
      }
    });
  }
}
