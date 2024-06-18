import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Group,
  Image,
  NavLink,
  Paper,
  Popover,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHome2,
  IconList,
  IconLogout,
  IconUsersGroup,
  IconCoin,
  IconUserCircle,
} from "@tabler/icons-react";
import InactiveHome from "../../assets/Sidebar/Inactive - Home@2x.png";
import ActiveTransaction from "../../assets/svg/transactions.svg";
import InactiveTransaction from "../../assets/Sidebar/Inactive - Transactions@2x.png";
import ActivePlayers from "../../assets/svg/Users.svg";
import InactivePlayers from "../../assets/Sidebar/Inactive - Players@2x.png";
import ActiveSvenus from "../../assets/Sidebar/Active - SVenus Win Loss@2x.png";
import InactiveSvenus from "../../assets/Sidebar/Inactive - SVenus Win Loss@2x.png";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import agentLogo from "../../assets/images/logo.png";
import { UserContext } from "../../contexts/UserContext";
import { CopyLink } from "../my components/CopyLink";
import userIcon from "../../assets/images/User@2x.png";
import logoutIcon from "../../assets/images/Frame.png";
import menuIcon from "../../assets/images/Menu@2x.png";
import closeIcon from "../../assets/images/Close@2x.png";
import { TableTitle } from "../home/Table UI/TableTitle";
import bw9log from "../../assets/images/BW9-logo.png";
import usa from "../../assets/images/Usa.png";
import OverViewSvg from "../../assets/svg/overViewSvg";
import Transaction from "../../assets/svg/Transaction";
import Users from "../../assets/svg/Users";
import BettingRecord from "../../assets/svg/bettingRecord";
import BetSummarySvg from "../../assets/svg/bestWaySummery";
import LogOut from "../../assets/svg/logOut";

import AgentIconSvg from "../../assets/svg/agentIconSvg";
import ProfitLoss from "../../assets/svg/profitLoss";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import BaseUrl from "../../helpers/apis/BaseUrl";
import { useTranslation } from "react-i18next";

export function MainLayout({ children }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const urlLocation = useLocation();
  const [active, setActive] = useState(urlLocation.pathname);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [hover, setHover] = useState(false);
  const { user } = useContext(UserContext);
  const {t}  = useTranslation()
  const trimmedPath = urlLocation.pathname.replace(/^\//, "");
  const segments = trimmedPath.split("/");
  const desiredSegment = segments[0];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [isSmallScreen]);

  const setToogle = () => {
    setMobileToggle(!mobileToggle);
  };

  const LanguageInfo = async () => {
    try {
      const vi = 'vi'; 
      const path = `/api/translations/${vi}`;
      const res = await BaseUrl.get(path);
      if (res) {
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    setActive(urlLocation.pathname);
  }, [urlLocation]);
  const navigate = useNavigate();
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        breakpoint: "md",
        collapsed: { mobile: !mobileToggle, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10px",
            height: "100%",
            backgroundColor: "#FFF",
            boxShadow: "0px 3px 2px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <div className="logo" style={{ margin: "10px" }}>
              <img
                src={bw9log}
                alt="bw9log"
                style={{ position: "relative", width: "80px", height: "40px" }}
              />
            </div>

            {buttonEnable ? (
              <div
                onClick={setToogle}
                style={{ alignContent: "center", padding: 10 }}
              >
                <div
                  style={{
                    maxWidth: 24,
                    maxHeight: 18,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={menuIcon}
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: 1,
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div style={{ display: "flex", gap: "10px", minWidth: "200px" }}>
            <div>
              {/* <img
                src={usa}
                alt="country"
                style={{
                  maxWidth: "25px",
                  maxHeight: "25px",
                  marginTop: "16px",
                  radius: "50%",
                  marginRight: "10px",
                  objectFit: "cover",
                }}
                onClick={LanguageInfo}
              /> */}
              <LanguageSwitcher/>
            </div>
            <div
              style={{
                // backgroundColor: "#F4FBFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                gap: 10,
                // padding: 8,
                // minWidth: 170,
              }}
              radius={0}
            >
              <div
                style={{
                  maxWidth: "25px",
                  maxHeight: "25px",
                  // width: "100%",
                  // height: "100%",
                }}
              >
                <img
                  src={userIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 1,
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={{ paddingLeft: "5px" }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    letterSpacing: 0,
                    color: "#153850",
                    opacity: 1,
                  }}
                >
                  {user.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Roboto",
                    letterSpacing: 0,
                    fontWeight: "normal",
                    color: "#215273",
                  }}
                >
                  {user?.agent?.unique_code}
                </Text>
              </div>
            </div>
            <Popover
              width={120}
              paddingLeft="20px"
              // gap = "20px"
              // trapFocus
              position="bottom"
              offset={{ mainAxis: 7, crossAxis: -30 }}
              // withArrow
              shadow="md"
              opened={logoutOpen}
              onChange={setLogoutOpen}
              onClick={() => {
                logoutOpen ? setLogoutOpen(false) : setLogoutOpen(true);
              }}
            >
              <Popover.Target>
                <div
                  style={{
                    // backgroundColor: "#F4FBFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    gap: 10,
                    padding: 8,
                    // minWidth: 170,
                  }}
                  radius={0}
                >
                  <div
                    style={{
                      // maxWidth: "18px",
                      // maxHeight: "18px",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img
                      src={logoutIcon}
                      style={{
                        maxWidth: "32px",
                        maxheight: "32px",
                        width: "100%",
                        height: "100%",
                        opacity: 1,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </Popover.Target>
              <Popover.Dropdown
                style={{
                  border: "1px solid #E2E2E2",
                  background: "#FFF",
                  padding: 0,
                  width: 100,
                  fontFamily: "Roboto",
                  fontSize: 18,
                  fontStyle: "normal",
                  fontWeight: 500,
                }}
              >
                <Button
                  style={{
                    position: "relative",
                    color: hover ? "#FB5353" : "#626262",
                    background: "#FFFFFF",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // gap: "10px"
                  }}
                  size="xs"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => {
                    localStorage.setItem("token_gasv", "");
                    navigate("/login");
                  }}
                >
                  <LogOut
                    width="22px"
                    height="22px"
                    color={hover ? "#FB5353" : "#626262"}
                  />
                  <p style={{ marginLeft: 5 }}>Logout</p>
                </Button>

                {/* <Button
                  ml="md"
                  size="xs"
                  variant="outline"
                  style={{
                    color: hover ? "#FB5353" : "#153850",
                    background: "none",
                    border: "none",
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => {
                    setLogoutOpen(false);
                  }}
                >
                  Cancel
                </Button> */}
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar
        // bg="#153850"
        bg="#FFF"
        style={{ marginTop: 60, width: isSmallScreen ? "50vw" : "200px" }}
      >
        {buttonEnable ? (
          <div
            onClick={setToogle}
            style={{ alignContent: "center", padding: 15 }}
          >
            <div
              style={{
                maxWidth: 18,
                maxHeight: 18,
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={closeIcon}
                style={{
                  opacity: 1,
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="navContainer">
          <div className="navlinks">
            <NavLink
              href="/home"
              active={"/home" === active}
              label= {t("Overview")}
              leftSection={
                <div className="sideBarIconConatiner">
                  <OverViewSvg
                    width="22px"
                    height="22px"
                    color={active === "/home" ? "#7947E8" : "#626262"}
                  />
                </div>
              }
              style={{
                borderRadius: "4px",
                backgroundColor: "/home" === active ? "#F9F9F9" : "#FFFFFF",
                color: "/home" === active ? "#7947E8" : "#626262",
                borderLeft: `10px solid ${
                  "/home" === active ? "#7947E8" : "#FFFFFF"
                }`,
              }}
              onClick={() => setActive("/home")}
            />
          </div>

          <div className="navlinks">
            <NavLink
              href="/transactions"
              active={"/transactions" === active}
              label= {t("Transactions")}
              leftSection={
                <div className="sideBarIconConatiner">
                  <Transaction
                    width="22px"
                    height="22px"
                    color={active === "/transactions" ? "#7947E8" : "#626262"}
                  />
                </div>
              }
              variant="filled"
              style={{
                borderRadius: "4px",
                backgroundColor:
                  "/transactions" === active ? "#F9F9F9" : "#FFFFFF",
                color: "/transactions" === active ? "#7947E8" : "#626262",
                borderLeft: `10px solid ${
                  "/transactions" === active ? "#7947E8" : "#FFFFFF"
                }`,
              }}
            />
          </div>

          <div className="navlinks">
            <NavLink
              href="/players"
              active={"/players" === active}
              label= {t("Players")}
              // leftSection={<IconUsersGroup size="1rem" stroke={1.5} />}
              leftSection={
                <div className="sideBarIconConatiner">
                  <Users
                    width="22px"
                    height="22px"
                    color={active === "/players" ? "#7947E8" : "#626262"}
                  />
                </div>
              }
              variant="filled"
              style={{
                borderRadius: "4px",
                backgroundColor: "/players" === active ? "#F9F9F9" : "#FFFFFF",
                color: "/players" === active ? "#7947E8" : "#626262",
                borderLeft: `10px solid ${
                  "/players" === active ? "#7947E8" : "#FFFFFF"
                }`,
              }}
            />
          </div>

          <div className="navlinks">
            <NavLink
              href="/winloss"
              active={"/winloss" === active}
              label= {t("Betting Record")}
              // leftSection={<IconCoin size="1rem" stroke={1.5} />}
              leftSection={
                <div className="sideBarIconConatiner">
                  <BettingRecord
                    width="22px"
                    height="22px"
                    color={active === "/winloss" ? "#7947E8" : "#626262"}
                  />
                </div>
              }
              variant="filled"
              style={{
                borderRadius: "4px",
                backgroundColor: "/winloss" === active ? "#F9F9F9" : "#FFFFFF",
                color: "/winloss" === active ? "#7947E8" : "#626262",
                borderLeft: `10px solid ${
                  "/winloss" === active ? "#7947E8" : "#FFFFFF"
                }`,
              }}
            />
          </div>

          <div className="navlinks">
            <NavLink
              href="/agent-list"
              active={"/agent-list" === active}
              label= {t("Agent List")}
              // leftSection={<IconCoin size="1rem" stroke={1.5} />}
              leftSection={
                <div className="sideBarIconConatiner">
                  <AgentIconSvg
                    width="22px"
                    height="22px"
                    color={active === "/agent-list" ? "#7947E8" : "#626262"}
                  />
                </div>
              }
              variant="filled"
              style={{
                borderRadius: "4px",
                backgroundColor:
                  "/agent-list" === active ? "#F9F9F9" : "#FFFFFF",
                color: "/agent-list" === active ? "#7947E8" : "#626262",
                borderLeft: `10px solid ${
                  "/agent-list" === active ? "#7947E8" : "#FFFFFF"
                }`,
              }}
            />
          </div>

          <div className="navlinks">
            <NavLink
              href="/bet-summary"
              active={"/bet-summary" === active}
              label= {t("Bet Summary")}
              // leftSection={<IconCoin size="1rem" stroke={1.5} />}
              leftSection={
                <div className="sideBarIconConatiner">
                  <BetSummarySvg
                    width="22px"
                    height="22px"
                    color={active === "/bet-summary" ? "#7947E8" : "#626262"}
                  />
                </div>
              }
              variant="filled"
              style={{
                borderRadius: "4px",
                backgroundColor:
                  "/bet-summary" === active ? "#F9F9F9" : "#FFFFFF",
                color: "/bet-summary" === active ? "#7947E8" : "#626262",
                borderLeft: `10px solid ${
                  "/bet-summary" === active ? "#7947E8" : "#FFFFFF"
                }`,
              }}
            />
          </div>

          <div className="navlinks">
            <NavLink
              href="/profit-loss"
              active={"/profit-loss" === active}
              label=  {t("Profit Loss")}
              // leftSection={<IconCoin size="1rem" stroke={1.5} />}
              leftSection={
                <div className="sideBarIconConatiner">
                  <ProfitLoss
                    width="22px"
                    height="22px"
                    color={active === "/profit-loss" ? "#7947E8" : "#626262"}
                  />
                </div>
              }
              variant="filled"
              style={{
                borderRadius: "4px",
                backgroundColor:
                  "/profit-loss" === active ? "#F9F9F9" : "#FFFFFF",
                color: "/profit-loss" === active ? "#7947E8" : "#626262",
                borderLeft: `10px solid ${
                  "/profit-loss" === active ? "#7947E8" : "#FFFFFF"
                }`,
              }}
            />
          </div>

          <div
                  style={{
                    color: hover ? "#FB5353" : "#626262",
                    background: "#FFFFFF",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft :"20px"
                  }}
                  
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => {
                    localStorage.setItem("token_gasv", "");
                    navigate("/login");
                  }}
                >
                  <LogOut
                    width="22px"
                    height="22px"
                    color={hover ? "#FB5353" : "#626262"}
                  />
                  <p style={{ marginLeft: 15 }}> {t(`Logout`)}</p>
                </div>

        </div>
      </AppShell.Navbar>
      <AppShell.Main bg="#F9F9F9" ml={isSmallScreen ? 0 : 200}>
        <div
          style={{
            margin: "10px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // background: "#ffffff",
            padding: "0px 10px",
            // borderTop: "1px solid #D5D5D5",
            // boxShadow: "0px 1px 6px #0000001A",
            height: "40px",

            // borderRadius:"5px"
            // marginLeft:`${isSmallScreen} ? 0 : 200px`,
          }}
        >
          <div
            style={{
              textTransform: "capitalize",

              // paddingLeft: "20px",
              // paddingTop: "5px",
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: 0,
              color: "#181818",
              opacity: 1,
              borderBottom: "1px solid #C0C0C0",
              width: "100%",
              height: "90%",
            }}
          >
            {desiredSegment === "winloss" ? "Betting Record" : desiredSegment}
          </div>
        </div>
        <div
          style={{
            padding: "0px 10px",
            paddingBottom: "20px",
          }}
        >
          {children}
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
