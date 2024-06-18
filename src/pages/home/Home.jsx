import {
  Button,
  Card,
  Grid,
  SimpleGrid,
  Loader,
  Center,
  Text,
  Table,
  Paper,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import ChartCard from "../../components/home/ChartCard";
import { ProfileCard } from "../../components/home/ProfileCard";
import { StatCards } from "../../components/home/StatCards";
import { MainLayout } from "../../components/layouts/MainLayout";
import { GetStatsData } from "../../helpers/apis/home/HomeApi";
import {
  SecondChartData,
  ThirdChartdata,
  fourthChartdata,
} from "../../helpers/apis/home/ChartApi";
import DashboardDetailedtable from "../../components/home/DashboardDetailedtable";
import { toNumber } from "lodash";
import { GetAllStatsData } from "../../helpers/apis/home/HomeApi";
import styles from "./Home.module.css";
import classes from "../../components/home/StatCards.module.css";
import { useTranslation } from "react-i18next";

function Home() {
  const [activeDateMode, setActiveDateMode] = useState("today");
  const [loader, setLoader] = useState(false);
  const [statsData, setStatsData] = useState({});
  // 1st table
  const [userLoginData, setUserLoginData] = useState({});
  const [userRegisterData, setUserRegisterData] = useState({});
  const [userFirstDepositData, setUserFirstDepositData] = useState({});
  const [totalBetting, setTotalBetting] = useState({});
  const [validBetting, setValidBetting] = useState({});
  const [winLossBetting, setWinLossBetting] = useState({});
  const [totalAmount, setTotalAmount] = useState({});
  const [totalDepositCount, setTotalDepositCount] = useState({});
  const [withdrawalAmount, setWithdrawalAmount] = useState({});
  const [withdrawalTotalCount, setWithdrawalTotalCount] = useState({});
  const [teamSize, setTeamSize] = useState(null);
  // 2nd chart
  const [registeredUsers, setRegisteredUsers] = useState({});
  const [firstDeposit, setFirstDeposit] = useState({});
  const [registerDepoList, setRegisterDepoList] = useState([]);
  // 3rd chart
  const [totalDeposit, setTotalDeposit] = useState({});
  const [totalWithdraw, setTotalWithdraw] = useState({});
  const [totalRevenue, setTotalRevenue] = useState({});
  const [totalDepoWithdrawList, setTotalDepoWithdrawList] = useState([]);
  // 4th chart
  const [winLossData, setWinLossData] = useState({});
  const [totalWithdrawSuccess, setTotalWithdrawSuccess] = useState({});
  const {t} = useTranslation()

  const DateModeButton = ({ val, label, timestamp }) => {
    const isActive = activeDateMode === val;
    const buttonClass = isActive
      ? `${styles.dateButton} ${styles.dateButtonActive}`
      : `${styles.dateButton} ${styles.dateButtonInactive}`;

    return (
      <button
        className={buttonClass}
        onClick={() => {
          setActiveDateMode(val);
          useEffectForGetStatsData(timestamp);
          getChartsData(timestamp);
        }}
      >
        {label}
      </button>
    );
  };
  const useEffectForGetStatsData = async (timestamp) => {
    setLoader(true);
    const authToken = localStorage.getItem("token_gasv");
    if (authToken) {
      const val = await GetStatsData(timestamp);
      setStatsData(val);
    }
    setLoader(false);
  };

  const getAllStatsChart = async () => {
    setLoader(true);
    const authToken = localStorage.getItem("token_gasv");
    if (authToken) {
      const val = await GetAllStatsData();
      if (Object.keys(val).length) {
        setUserLoginData(val?.logins);
        setUserRegisterData(val?.registered);
        setUserFirstDepositData(val?.firstDeposit);
        setTotalAmount(val?.depositAmount);
        setTotalDepositCount(val?.depositCount);
        setWithdrawalAmount(val?.withdrawalAmount);
        setWithdrawalTotalCount(val?.withdrawalCount);
        setTotalBetting(val?.totalBettings);
        setValidBetting(val?.validBetting);
        setWinLossBetting(val?.winLossBetting);
        setTeamSize(val?.teamSize);
      }
    }
    setLoader(false);
  };

  const getTotalRevenue = (deposit, withdraw) => {
    const sortedKeys = Object.keys(deposit);
    const revenue = {};
    sortedKeys.forEach((key) => {
      revenue[key] = deposit[key] - withdraw[key];
    });

    setTotalRevenue(revenue);
  };

  const decimalConverter = (amount) => {
    if (amount == null) {
      return 0;
    }
    let roundedNumber = parseFloat(amount).toFixed(2);
    return roundedNumber;
  };

  useEffect(() => {
    getTotalRevenue(totalDeposit, totalWithdraw);
  }, [totalDeposit, totalWithdraw]);

  const getChartsData = async (timestamp) => {
    setLoader(true);
    const authToken = localStorage.getItem("token_gasv");
    if (authToken) {
      // const val_1 = await FirstChartData();
      const val_2 = await SecondChartData(timestamp);
      const val_3 = await ThirdChartdata(timestamp);
      const val_4 = await fourthChartdata(timestamp);
      // // First chart _____________________________________________________________________________________________________
      // Object.keys(val_1).forEach(key => {
      //   val_1[key] = Math.abs(parseFloat(val_1[key]));
      // });
      // setWinLossData(val_1);

      // Second chart _____________________________________________________________________________________________________
      // Object.keys(val_2.userArray).forEach(key => {
      //   val_2.userArray[key] = Math.abs(parseFloat(val_2.userArray[key]));
      // });
      const filteredRegistered = val_2.list_of_dates?.map((key) =>
        val_2.transaction_data[key]
          ? val_2.transaction_data[key].registered_user
          : "0"
      );
      setRegisteredUsers(filteredRegistered);

      const filteredDeposit = val_2.list_of_dates?.map((key) =>
        val_2.transaction_data[key]
          ? val_2.transaction_data[key].first_deposit
          : "0"
      );
      const filterslist = val_2.list_of_dates?.map((item) => toNumber(item));
      setRegisterDepoList(filterslist);
      setFirstDeposit(filteredDeposit);

      // // Third chart _____________________________________________________________________________________________________
      // Object.keys(val_3.depositsCount).forEach(key => {
      //   val_3.depositsCount[key] = Math.abs(parseFloat(val_3.depositsCount[key]));
      // });
      const filterTotalDepoWithdrawList = val_3.list_of_dates?.map((item) =>
        toNumber(item)
      );
      setTotalDepoWithdrawList(filterTotalDepoWithdrawList);

      const filteredTotalDeposit = val_3.list_of_dates?.map((key) =>
        val_3.transaction_data[key] ? val_3.transaction_data[key].deposit : "0"
      );
      setTotalDeposit(filteredTotalDeposit);

      // Object.keys(val_3.withdrawsCount).forEach(key => {
      //   val_3.withdrawsCount[key] = Math.abs(parseFloat(val_3.withdrawsCount[key]));
      // });
      const filteredTotalWithdrawal = val_3.list_of_dates?.map((key) =>
        val_3.transaction_data[key]
          ? val_3.transaction_data[key].withdrawal
          : "0"
      );
      setTotalWithdraw(filteredTotalWithdrawal);

      // // Fourth chart _____________________________________________________________________________________________________
      // Object.keys(val_3.depositsArray).forEach(key => {
      //   val_3.depositsArray[key] = Math.abs(parseFloat(val_3.depositsArray[key]));
      // });
      // setTotalDepositSuccess(val_3.depositsArray);

      // Object.keys(val_3.withdrawsArray).forEach(key => {
      //   val_3.withdrawsArray[key] = Math.abs(parseFloat(val_3.withdrawsArray[key]));
      // });
      // setTotalWithdrawSuccess(val_3.withdrawsArray);

      // console.log(getTotalRevenue(val_3.depositsCount, val_3.withdrawsCount))
      // setTotalRevenue(getTotalRevenue(val_3.depositsArray, val_3.withdrawsArray))

      const filteredWinLossData = val_4.list_of_dates?.map((key) =>
        val_4.transaction_data[key] ? val_4.transaction_data[key].winLoss : "0"
      );
      setWinLossData(filteredWinLossData);
    }
    setLoader(false);
  };

  useEffect(() => {
    useEffectForGetStatsData(activeDateMode);
    getChartsData();
    getAllStatsChart();
  }, []);
  return (
    <MainLayout>
      <Box display="flex" justify="center" p={10} style={{ width: "100%" }}>
        <Box style={{ width: "100%" }}>
          <Box
            p={0}
            bg="transparent"
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Text
              c={"#181818"}
              fs="22px"
              fw={700}
              // className={styles.mainTitleStyle}
            >
              {t(`Quick Filter`)}
            </Text>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <DateModeButton val="today" label="Today" timestamp="today" />
              <DateModeButton
                val="this_week"
                label= {t(`This Week`)}
                timestamp="this_week"
              />
              <DateModeButton
                val="last_week"
                label= {t("Last Week")}
                timestamp="last_week"
              />
              <DateModeButton
                val="this_month"
                label= {t("This Month")}
                timestamp="this_month"
              />
              <DateModeButton
                val="last_month"
                label= {t("Last Month")}
                timestamp="last_month"
              />
            </div>
            <div style={{ width: "100%" }}>
              {(() => {
                if (loader) {
                  return (
                    <Center h={100}>
                      <Loader color="#153850" />
                    </Center>
                  );
                } else {
                  return (
                    <StatCards
                      deposits={
                        statsData && statsData?.totalDeposit <= 0
                          ? 0
                          : decimalConverter(statsData?.totalDeposit)
                      }
                      firstDeposits={
                        statsData && statsData?.totalFirstDeposits <= 0
                          ? 0
                          : decimalConverter(statsData?.totalFirstDeposits)
                      }
                      totalPlayers={statsData ? statsData?.totalPlayers : 0}
                      totalSignups={statsData ? statsData?.totalSignUps : 0}
                      withdraws={
                        statsData && statsData?.totalWithdraw <= 0
                          ? 0
                          : decimalConverter(statsData?.totalWithdraw)
                      }
                    />
                  );
                }
              })()}
            </div>
          </Box>
        </Box>
      </Box>

      <Box bg="" justify="center" p={10}>
        <Box display="flex" style={{ flexDirection: "column", gap: "6px" }}>
          <Card style={{ backgroundColor: "transparent" }} p={0}>
            <SimpleGrid cols={{ base: 1, xl: 2 }}>
              <Box
                style={{
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text c={"#181818"} fs="18px" fw={600}>
                  {t(`Overview`)}
                </Text>
                {/* first Chart/table*/}
                <Card withBorder style={{ borderRadius: "10px" }}>
                  <DashboardDetailedtable
                    loginData={userLoginData}
                    registerData={userRegisterData}
                    firstDeposit={userFirstDepositData}
                    totalDepositAmount={totalAmount}
                    depositCount={totalDepositCount}
                    totalWithdrawalAmount={withdrawalAmount}
                    totalWithdrawalCount={withdrawalTotalCount}
                    totalBetting={totalBetting}
                    validBetting={validBetting}
                    winLossBetting={winLossBetting}
                    teamSize={teamSize}
                  />
                </Card>
              </Box>
              {/* Second Chat */}
              <Box
                style={{
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text c={"#181818"} fs="18px" fw={600}>
                  Registered Users/First Deposits
                </Text>
                <Card
                  withBorder
                  h="100%"
                  display="grid"
                  style={{ placeItems: "center" }}
                >
                  <ChartCard
                    // title={`Registered Users/First Deposits ${
                    //   activeDateMode === "today"
                    //     ? "Today"
                    //     : activeDateMode === "this_week"
                    //     ? "This Week"
                    //     : activeDateMode === "last_week"
                    //     ? "Last Week"
                    //     : activeDateMode === "this_month"
                    //     ? "This Month"
                    //     : "Last Month"
                    // }`}
                    label={registerDepoList}
                    dataset={[
                      {
                        label: "Registered Users",
                        data: Object.values(registeredUsers),
                        backgroundColor: "#8FBCFF",
                        borderWidth: 1,
                        pointStyle: "circle",
                        borderPercentage: 1,
                        categoryPercentage: 1,
                        borderRadius: 20,
                      },
                      {
                        label: "First Deposits",
                        data: Object.values(firstDeposit),
                        backgroundColor: "#8BF271",
                        borderWidth: 1,
                        pointStyle: "circle",
                        borderPercentage: 1,
                        categoryPercentage: 1,
                        borderRadius: 20,
                      },
                    ]}
                  />
                </Card>
              </Box>
            </SimpleGrid>
          </Card>
        </Box>
      </Box>

      <Box bg="" justify="center" p={10}>
        <Box display="flex" style={{ flexDirection: "column", gap: "6px" }}>
          <Card style={{ backgroundColor: "transparent" }} p={0}>
            <SimpleGrid cols={{ base: 1, xl: 2 }}>
              {/* Third Chart */}
              <Box
                style={{
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text c={"#181818"} fs="18px" fw={600}>
                  Total Deposit/Withdraw/Revenue This Month
                </Text>
                <Card withBorder>
                  <ChartCard
                    // title={`Total Deposit/Withdraw/Revenue ${
                    //   activeDateMode === "today"
                    //     ? "Today"
                    //     : activeDateMode === "this_week"
                    //     ? "This Week"
                    //     : activeDateMode === "last_week"
                    //     ? "Last Week"
                    //     : activeDateMode === "this_month"
                    //     ? "This Month"
                    //     : "Last Month"
                    // }`}
                    label={totalDepoWithdrawList}
                    dataset={[
                      {
                        label: "Total deposit success",
                        data: Object.values(totalDeposit),
                        backgroundColor: "#9EDBFF",
                        borderWidth: 1,
                        pointStyle: "circle",
                        borderPercentage: 1,
                        categoryPercentage: 1,
                        borderRadius: 20,
                      },
                      {
                        label: "Total withdraw success",
                        data: Object.values(totalWithdraw),
                        backgroundColor: "#D0F48F",
                        borderWidth: 1,
                        pointStyle: "circle",
                        borderPercentage: 1,
                        categoryPercentage: 1,
                        borderRadius: 20,
                      },
                      {
                        label: "Total revenue",
                        data: Object.values(totalRevenue),
                        backgroundColor: "#FFBE87",
                        borderWidth: 1,
                        pointStyle: "circle",
                        borderPercentage: 1,
                        categoryPercentage: 1,
                        borderRadius: 20,
                      },
                    ]}
                  />
                </Card>
              </Box>

              {/* Fourth Chart */}
              <Box
                style={{
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text c={"#181818"} fs="18px" fw={600}>
                  Win Loss This Month
                </Text>
                <Card withBorder>
                  <ChartCard
                    // title={`Win Loss ${
                    //   activeDateMode === "today"
                    //     ? "Today"
                    //     : activeDateMode === "this_week"
                    //     ? "This Week"
                    //     : activeDateMode === "last_week"
                    //     ? "Last Week"
                    //     : activeDateMode === "this_month"
                    //     ? "This Month"
                    //     : "Last Month"
                    // }`}
                    label={totalDepoWithdrawList}
                    isNegative={true}
                    dataset={[
                      {
                        label: "Svenus Win Loss",
                        data: Object.values(winLossData),
                        backgroundColor: "#CBB4FF",
                        borderWidth: 1,
                        pointStyle: "circle",
                        borderPercentage: 1,
                        categoryPercentage: 1,
                        borderRadius: 20,
                      },
                    ]}
                  />
                </Card>
              </Box>
            </SimpleGrid>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Home;

const registerDepositDataaa = {
  dates_of_month: [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ],
  transaction_data: {
    11: {
      registered_user: 50,
      first_deposit: 1000,
    },
    15: {
      registered_user: 30,
      first_deposit: 500,
    },
    17: {
      registered_user: 10,
      first_deposit: 800,
    },
  },
};
