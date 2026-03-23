import { Input } from "../ui/input"
import { useEffect, useState } from "react"

type NepaliDateInputProps = {
  id?: string
  placeholder?: string
  onValueChange: (value: string) => void
}

const NepaliDateInput = ({
  placeholder,
  id,
  onValueChange,
}: NepaliDateInputProps) => {
  const [inputDate, setInputDate] = useState<string>("")

  useEffect(() => {
    onValueChange(inputDate)
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

export default NepaliDateInput
