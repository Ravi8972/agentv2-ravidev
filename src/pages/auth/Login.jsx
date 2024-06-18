import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Image,
  Text,
  Loader,
  Center,
} from "@mantine/core";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APILoginUser } from "../../helpers/apis/LoginAPI";
import classes from "./Login.module.css";
import { UserContext } from "../../contexts/UserContext";
import sideImg from "../../assets/images/logInBG.png";
import lockImg from "../../assets/images/LockSimple.png";
import idImg from "../../assets/images/IdentificationBadge.png";
import usa from "../../assets/images/Usa.png";
import { useMediaQuery } from "@mantine/hooks";

export function Login() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const screenDim = useMediaQuery("(max-width : 768px)");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // DAGA552
    // @2#H&6Eo*qbo

    

    setLoader(true);
    const x = await APILoginUser(code, password);
    if (x && x.token) {
      localStorage.setItem("token_gasv", x.token);
      localStorage.setItem("agent_id", x?.user.id);

      setUser(x["user"]);
      navigate("/home");
    } else if (x === "wrongAgentCode") {
      setError("Wrong Agent Code");
    } else if (x === "passwordDoesNotMatch") {
      setError("Wrong Password");
    } else {
      setError("Incorrect agent name or password");
    }
    setLoader(false);
  };

  return (
    <div className={classes.mainClass}>
      <div className={classes.mainContainer}>
        <div className={classes.wrapper}>
          <img
            src={usa}
            alt="countryImage"
            className={classes.Country}
            style={{
              width: "25.5px",
              height: "25.5px",
              margin: "20px",
              radius: "50%",
              objectFit: "cover",
              //   paddingRight: screenDim ?  "15px"  :  "35px"
            }}
          />
          <Paper
            className={classes.form}
            radius={0}
            style={
              screenDim ? { paddingRight: "15px" } : { paddingRight: "35px" }
            }
          >
            <div style={screenDim ? { width: "270px" } : { width: "350px" }}>
              <Title order={3} className={classes.title}>
                Agent
              </Title>
              <form onSubmit={handleSubmit}>
                <div className={classes.textContainer}>
                  <img src={idImg} alt="idImg" />
                  <TextInput
                    value={code}
                    onChange={(e) => setCode(e.currentTarget.value)}
                    placeholder="Agent ID"
                    size="md"
                    radius="xl"
                    styles={() => ({
                      input: {
                        flex: "1",
                        border: "none",
                        width: screenDim ? "225px" : "300px",
                      },
                    })}
                  />
                </div>
                <div className={classes.passwordContainer}>
                  <img src={lockImg} alt="lockImg" />
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    placeholder="Password"
                    size="md"
                    radius="xl"
                    styles={() => ({
                      input: {
                        flex: "1",
                        border: "none",
                        width: screenDim ? "225px" : "300px",
                      },
                    })}
                  />
                </div>

                <Text c="red">{error}</Text>
                {loader ? (
                  <Center>
                    <Loader color="blue" mt="xl" />
                  </Center>
                ) : (
                  <Button
                    className={classes.loginBtn}
                    fullWidth
                    variant="filled"
                    mt="xl"
                    size="md"
                    radius="xl"
                    type="submit"
                    styles={{
                      root: {
                        height: "50px",
                        backgroundColor: "#9F82E1",
                        borderRadius: "4px",
                        color: "#FFF",
                        textAlign: "center",
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "22px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      },
                    }}
                  >
                    Login
                  </Button>
                 
                )}
              </form>
            </div>
          </Paper>
        </div>
        <div className={classes.sideImage}>
          <img
            src={sideImg}
            alt="sideImage"
            className={classes.sideImageContent}
            style={{
              // marginLeft: screenDim ? "10px" : "",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}
