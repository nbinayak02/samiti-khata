import NepaliDate from "nepali-date-converter"

const getTodayInBs = () => {
  return new NepaliDate().format("YYYY-MM-DD")
}

export default getTodayInBs
