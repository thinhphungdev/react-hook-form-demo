# React Hook Form Project Demo

- To Install React hook form Dev tools: `npm i -D @hookform/devtools`

################################################################
#ReactHookForm to Manage Form state
`register(filedName: string) method allow us to register a form field, its state will be managed and tracked by RHF`

- return all the props like (ref, onChange, onBlur, name) to pass to an <input /> element
  ################################################################

#ReactHookForm for Form Validaton
#Form Validation

#Form fields state

1. Touched: when user clicks to the field and then click outside => will be set to true
2. Dirty: whether user has modified the input or not

#Form Submission State

1. isSubmitting: whether the form is in the process of submitting - return boolean value
   after the form finished the submitting process - return true, otherwise return falses

2. isSubmitted: false default value, set to true after the form submission completed

3. isSubmitSuccessful: is the form submit success without any error

#Validation mode

- onBlur, onSubmit
- onChange (need to be careful with performance issues)
