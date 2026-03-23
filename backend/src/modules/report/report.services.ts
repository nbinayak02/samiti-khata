import ReportRepository from "./report.repository";
import { TSearchByDocument, TSearchByName } from "./report.type";

const ReportService = {
  searchByDocument: async (payload:TSearchByDocument) => {
    return await ReportRepository.searchByDocument(payload);
  },
  searchByName: async (payload:TSearchByName) => {
    return await ReportRepository.searchByName(payload);
  },
};
export default ReportService;
