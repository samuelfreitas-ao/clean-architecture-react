import React from 'react'

type DataProps = {
  username: string
  password: string
}

type ContextProps = {
  data: DataProps
  isLoading: boolean
  errorMessage: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

const formData = {}

export const FormContext = React.createContext(formData as ContextProps)

type FormContextLayerProps = {
  children: React.ReactElement
}

export const FormContextLayer = ({ children }: FormContextLayerProps): React.ReactElement => {
  const initialData = {}
  const [data, setData] = React.useState<DataProps>(initialData as DataProps)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    console.log(name, value)
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('Preencha os campos')
  }

  return (
    <FormContext.Provider value={{ data, isLoading, handleInputChange, handleSubmit, errorMessage }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = (): ContextProps => {
  return React.useContext(FormContext)
}
