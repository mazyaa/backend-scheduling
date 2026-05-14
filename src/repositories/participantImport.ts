import { prisma } from '../utils/client';
import { RoleUser } from '@prisma/client';

export const participantImportRepository = {
  findDuplicateUsers: async (emails: string[], noWas: string[]) => {
    return prisma.user.findMany({
      where: {
        OR: [
          { email: { in: emails.filter(Boolean) } },
          { noWa: { in: noWas.filter(Boolean) } }
        ]
      },
      select: { email: true, noWa: true }
    });
  },

  commitImport: async (jadwalTrainingId: string, participants: any[]) => {
    return prisma.$transaction(async (tx) => {
      const createdUsers = [];
      for (const p of participants) {
        const user = await tx.user.create({
          data: {
            name: p.name,
            email: p.email,
            noWa: p.noWa,
            role: RoleUser.peserta,
            profilPeserta: {
              create: {
                instansi: p.instansi,
                fileCv: p.fileCv,
                fileIjazah: p.fileIjazah,
                fileSuratRekomendasi: p.fileSuratRekomendasi,
                fileKtp: p.fileKtp,
                fileFoto: p.fileFoto,
                fileBuktiBayar: p.fileBuktiBayar,
                fileBuktiFollow: p.fileBuktiFollow,
              }
            },
            pesertaTraining: {
              create: {
                jadwalTrainingId: jadwalTrainingId
              }
            }
          },
          include: {
            profilPeserta: true,
            // we only map what needs to be created
          }
        });
        createdUsers.push(user);
      }
      return createdUsers;
    });
  }
};
