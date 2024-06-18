import { Box, Button, Flex, Select, Text, TextInput, Alert } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const AddAgentForm = ({ close }) => {

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState();
  const [uniquecode, setUniquecode] = useState();
  const [phone, setPhone] = useState();
  const [uplineAgent, setUplineAgent] = useState();
  const [usernameError, setUsernameError]=useState('');
  const [passwordError, setPasswordError] = useState('');
  const [uniquecodeError, setUniqueCodeError] = useState('');
   const {t} = useTranslation()

  // Fetching api
  const fetchUplineAgent = async (customPage = null) => {
    const path = '/admin/agents/superior';
    const params = {};

    //sending api request
    const res = await GetApi.sendApiRequest(path, {}, params);

    if (res && res.data && res.data.length) {
      const finalArray = res.data.map((agent, index) => ({
        key: index,
        id: agent.id,
        name: agent.user.user_name
      }));
      setseniordata(finalArray);
    } else {
      setseniordata([]);
    }
  };


  const modalLabelStyle = {
    color: " #666",
    textAlign: "left",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  }

  const inputLabelStyle = {
    color: "#666",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  }

  //username input change and validation
  const onInputChange = (username) => {
    const re = /^(?:[a-z0-9]{8,12})$/;

    if (username === '' || re.test(username)) {
      setUsernameError('');
    } else {
      setUsernameError(t(`Please Enter 8 - 12 char, accept only Numbers and Lowercase Alphabets`));
    }
  };

  useEffect(() => {
    onInputChange(username);
  }, [username]);

  //password input onchange
  const onChangePassword = (password) => {
    const re = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};\'":\\|,.<>\/?]{6,16}$/;
    
    if (password === '' || re.test(password)) {
      setPasswordError("");
    } else {
      setPasswordError(t("Please Enter Minimum 6, Maximum 16 Characters and can include letters, numbers, and special characters."));
    }
  }

  useEffect(()=>{
    onChangePassword(password)
  },[password])

  
  const onCodeChange = (uniquecode) => {
    
    const re = /^(?:[a-z]|[0-9]){1,10}$/;
    if (uniquecode === '' || re.test(uniquecode)) {
     setUniqueCodeError("");
    } else {
      setUniqueCodeError(t("Please Enter min 1 to 10 char, Only Numbers and Lowercase Alphabets"))
    }
  };

  useEffect(()=>{
    onCodeChange(uniquecode)
  },[uniquecode])

  const onSelect = (value) => {
    setUplineAgent(value);
  };
  return (
    <>
      <Text style={modalLabelStyle}>{t("Fill all information as below")}</Text>
      <Flex style={{ width: "100%", flexDirection: 'column', gap: '20px'}}>
        <Flex style={{ gap: '20px' }}>
          <Box style={{ width: '50%' }}>
            <TextInput label="Name" required styles={{ label: inputLabelStyle }} placeholder= {t("Enter Agent Name")} name="name" onChange={(e) => setName(e.target.value)} value={name} type='text' />
          </Box>
          <Box style={{ width: '50%' }}>
            <TextInput label="Username" required styles={{ label: inputLabelStyle }} placeholder={t("Enter Username")} name="username" onChange={(e) => setUserName(e.target.value)} value={username} type='text' />
              {usernameError && <Text fz={12} c={'#F24E4E'}>{usernameError}</Text>}
          </Box>
        </Flex>
        <Flex style={{ gap: '20px' }}>
          <Box style={{ width: '50%' }}>
            <TextInput label="Password" required styles={{ label: inputLabelStyle }} placeholder= {t("Enter Password")} name="password" value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
            {passwordError && <Text fz={12} c={'#F24E4E'}>{passwordError}</Text>}
          </Box>
          <Box style={{ width: '50%' }}>
            <TextInput label="Unique Code" required styles={{ label: inputLabelStyle }} placeholder= {t("Enter Unique Code")} name="uniquecode" onChange={(e) => setUniquecode(e.target.value)} value={uniquecode} />
            {uniquecodeError && <Text fz={12} c={'#F24E4E'}>{uniquecodeError}</Text>}
          </Box></Flex>
        <Flex style={{ gap: '20px' }}>
          <Box style={{ width: '50%' }}>
            <TextInput label="Phone Number" required styles={{ label: inputLabelStyle }} placeholder={t("Enter Phone Number")} name="phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
          </Box>
          <Box style={{ width: '50%' }}>
            <Select label="Upline Agent" required styles={{ label: inputLabelStyle }} placeholder={t("Select a upline agent")} data={['upline1', 'upline2', 'upline3', 'ipline4']} onChange={onSelect} />
          </Box></Flex>
      </Flex>
      <Box mt={15} style={{ display: 'flex', gap: 14, justifyContent: 'end' }}>
        <Button style={{ border: '1px solid #7947E8', borderRadius: '5px', background: '#FFF', color: '#7947E8', textAlign: 'center', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }} onClick={close}>Cancel</Button>
        <Button style={{ border: '1px solid #A6A6A6', borderRadius: '5px', background: '#7947E8', color: '#FFF', textAlign: 'center', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>Submit</Button>
      </Box>
    </>
  )
}

export default AddAgentForm
