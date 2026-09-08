import HealthRepository from "./health.repository"

const HealthService = {
    getDbCheck: async() => {
        return await HealthRepository.getCheckDb()
    }
}

export default HealthService