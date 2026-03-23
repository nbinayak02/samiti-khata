import SelectForm from "@/components/common/select-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import billIssuerRepository from "@/features/bill-issuer/billIssuer.repository"
import committeeRepository from "@/features/committee/service/committee.service"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import useSearchForm from "../useSearchForm"

type SearchType = "name" | "document"

const SearchFilter = () => {
  const [searchType, setSearchType] = useState<SearchType>("document")

  const { data: committees } = useQuery({
    queryKey: ["committees"],
    queryFn: committeeRepository.fetchAllByOrganization,
  })

  const { data: billIssuers } = useQuery({
    queryKey: ["billIssuers"],
    queryFn: billIssuerRepository.getBillIssuersByOrganization,
  })

  const {
    control,
    register,
    handleSubmit,
    onSubmit,

    formState: { errors },
    setValue,
  } = useSearchForm()

  useEffect(() => {
    setValue("isSearchByDocument", searchType === "document")
  }, [searchType])

  return (
    <>
      <Card className="mt-8">
        <CardContent className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Field>
                <RadioGroup
                  defaultValue="document"
                  onValueChange={(value: SearchType) => setSearchType(value)}
                  className="w-full flex-col items-start gap-4"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value="document"
                      id="searchByDocument"
                      onChange={() => console.log(true)}
                    />
                    <Label htmlFor="searchByDocument">Search By Document</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="name" id="searchByName" />
                    <Label htmlFor="searchByName">Search By Name</Label>
                  </div>
                </RadioGroup>
              </Field>
              <Field>
                <Label htmlFor="committeeId">
                  Select Committee <span className="text-destructive">*</span>
                </Label>
                <SelectForm
                  name="committeeId"
                  control={control}
                  placeholder="Select a committee"
                  options={committees ? committees : []}
                  label="Committees"
                />
                {errors.committeeId && (
                  <FieldError>{errors.committeeId.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="state">
                  Name
                  {searchType === "name" && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  {...register("name")}
                  disabled={searchType !== "name"}
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>

              <Field>
                <Label htmlFor="documentType">
                  Document Type{" "}
                  {searchType === "document" && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <SelectForm
                  name="documentType"
                  control={control}
                  placeholder="Select a document type"
                  options={[
                    { id: "billNumber", name: "Bill Number" },
                    { id: "bookNumber", name: "Book Number" },
                  ]}
                  label="Document Type"
                  disabled={searchType !== "document"}
                />
                {errors.documentType && (
                  <FieldError>{errors.documentType.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="documentNumber">
                  Document Number
                  {searchType === "document" && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>
                <Input
                  id="documentNumber"
                  placeholder="Enter document number"
                  {...register("documentNumber")}
                  disabled={searchType !== "document"}
                />
                {errors.documentNumber && (
                  <FieldError>{errors.documentNumber.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="fromDate">From</Label>
                <Input id="fromDate" type="date" {...register("fromDate")} />
                {errors.fromDate && (
                  <FieldError>{errors.fromDate.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="toDate">To</Label>
                <Input id="toDate" type="date" {...register("toDate")} />
                {errors.toDate && (
                  <FieldError>{errors.toDate.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="billIssuer">Bill Issuer</Label>
                <SelectForm
                  name="billIssuerId"
                  control={control}
                  placeholder="Select a bill issuer"
                  options={billIssuers ? billIssuers : []}
                  label="Bill Issuers"
                />
              </Field>
              <Field></Field>
              <Field>
                <Button type="submit" className="mt-5">
                  Search
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default SearchFilter
