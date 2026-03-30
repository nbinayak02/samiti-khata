// this component directly converts the input date to ISO format and passes it to the parent component

import NepaliDate from "nepali-date-converter"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"

type NepaliDateInputProps = {
  id?: string
  placeholder?: string
  onValueChange: (value: string) => void
}

const NepaliDateInputFilter = ({
  placeholder,
  id,
  onValueChange,
}: NepaliDateInputProps) => {
  const [inputDate, setInputDate] = useState<string>("")

  useEffect(() => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
      const isoDate = new NepaliDate(inputDate)
        .toJsDate()
        .toISOString()
        .toString()
      onValueChange(isoDate)
    }
  }, [inputDate])

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value
    let keyPressed = (event.nativeEvent as InputEvent).inputType

    setInputDate((prevValue) => {
      if (
        (value.length === 4 || value.length === 7) &&
        keyPressed !== "deleteContentBackward"
      ) {
        return value + "-"
      }

      if (value.length > 10) {
        return prevValue
      }

      return value
    })
  }
  return (
    <Input
      id={id}
      value={inputDate}
      placeholder={placeholder}
      onChange={(event) => handleDateChange(event)}
    />
  )
}

export default NepaliDateInputFilter
