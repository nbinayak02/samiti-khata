const formatNepaliCurrency = (currency: number) => {
  const npr = new Intl.NumberFormat("en-IN").format(currency)
  return `Rs. ${npr}`
}

export default formatNepaliCurrency
