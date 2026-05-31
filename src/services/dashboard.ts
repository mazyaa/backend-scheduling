import * as dashboardRepository from '../repositories/dashboard';

export const getDashboard = async (year?: number) => {
    const currentYear = year || new Date().getFullYear();

    const [
        totalSertifikat,
        totalPeserta,
        totalInstruktur,
        totalAsesor,
        sertifikatPerBulan,
    ] = await Promise.all([
        dashboardRepository.countTotalSertifikat(),
        dashboardRepository.countTotalPeserta(),
        dashboardRepository.countTotalInstruktur(),
        dashboardRepository.countTotalAsesor(),
        dashboardRepository.getSertifikatPerBulan(currentYear),
    ]);

    return {
        totalSertifikat,
        totalPeserta,
        totalInstruktur,
        totalAsesor,
        sertifikatPerBulan,
    };
};
