import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Center,
    Stack,
    Collapse,
    Dialog,
    TextInput,
    Checkbox
  } from '@mantine/core'
import { useEffect, useState } from 'react'
import { ValidEmail } from './utils';


function EmailListPopup() {

    const [currentWindow,setWindow] = useState({width: 0, height: 0} as any)
    const [open,setOpen] = useState(false)
    const [email, setEmail] = useState('');
    const [checked,setChecked] = useState(false)
    const [error,setError] = useState(null as any)

    const submitContact = async () => {
        try {
            const body = JSON.stringify({
                "email": email,
                "listIds": [2]
            })
            const response = await fetch("https://api.sendinblue.com/v3/contacts", {
                body,
                headers: {
                  Accept: "application/json",
                  "Api-Key": process.env.NEXT_PUBLIC_SEND_IN_BLUE as any,
                  "Content-Type": "application/json"
                },
                method: "POST"
              })
              if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log("EMAIL ADDED",email)
            return true
        }
        catch(e) {
            if (typeof e === "string") {
                setError(e)
            } else if (e instanceof Error) {
                console.log("ERROR",e.message)
                setError("There was an error subscribing, use another email or try later!")
            }
  
            return false
        }
    }
    const handleButtonClick = async () => {
      setError(null as any)
      const success = await submitContact() 
      if(success) {
        setEmail('')
        handleClose()
      }

    }
    const handleClose = () => {
        
        setOpen(false)
    }
    const handleOpen = () => {
        const timer =  setTimeout(() => {
             setOpen(true);
         }, 60000)
          return () => clearTimeout(timer);
     }
    

    useEffect(() => {
    handleOpen()
    setWindow({width: window.innerWidth, height: window.innerHeight})

     window.addEventListener('resize', () => setWindow({width: window.innerWidth, height: window.innerHeight}))
   }, [])
    return (
<Dialog withCloseButton p="md"  style={{background: "#ccccc0",marginTop: "20px"}} transitionDuration={1000} opened={open}>
    
        <Stack>
        
<Text align="center" weight="700" size="md">Want to subscribe to our email list?</Text>
{error && <Text align="center" color="red">{error}</Text>}
<TextInput
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      placeholder="Your email"
      label="Email"
      withAsterisk
    />
      <Checkbox
    checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}
      label="I would like to subscribe to content."
    />
<Button fullWidth={false} disabled={!checked || !ValidEmail(email) } onClick={() => {handleButtonClick()
}}   variant="gradient" gradient={{ from: 'red', to: 'blue', deg: 120 }}>Yeah!</Button>
<Button fullWidth={false} onClick={() => handleClose()}  variant="gradient" gradient={{ from: 'red', to: 'blue', deg: 120 }}><Text>No, your content sucks :(</Text></Button>
</Stack>
  </Dialog>)
}

export default EmailListPopup