
import React, { useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import {
  Box,
  Flex,
  Grid,
  Input,
  Popover,
  Select,
  Table,
  Chip,
  Text,
  TextInput,
  Center,
  ScrollArea,
} from "@mantine/core";

import {
  IconBorderNone,
  IconCalendar,
  IconChevronDown,
} from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { rem } from "@mantine/core";
import { useEffect } from "react";
import { GetPlayersApi } from "../../helpers/apis/home/HomeApi";
import {
  addCommasToNumber,
  makeServerDate,
  convertUTCToLocalTime,
} from "../../helpers/helper_functions";
import { TableTitle } from "../../components/home/Table UI/TableTitle";
import { TableFilter } from "../../components/home/Table UI/TableFilter";
import { PlayerTableDataUI } from "../../components/home/Table UI/PlayerTableUI";
// import { IconCalendar } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const labelStyle = {
  color: "#153850",
  fontSize: "15px",
  display: "inline-flex",
  alignItems: "center",
  margin: "5px",
  fontWeight: "600",
};

const totalLabelStyle = {
  color: "gray",
  fontSize: "14px",
  marginRight: "2px",
};

const totalValueStyle = {
  fontWeight: "bold",
  fontSize: "14px",
  marginRight: "10px",
};

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [activePage, setPage] = useState(1);
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState([null, null]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [opened, setOpened] = useState(false);

  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const getPlayersData = async (page, date, name) => {
    setPlayers([]);
    setLoader(true);

    if (date) {
      if (!date[0] && !date[1]) {
        date = null;
      } else {
        date = [makeServerDate(date[0]), makeServerDate(date[1])];
      }
    }

    const response = await GetPlayersApi(page, date, name);

    // console.log(response);

    if (response?.data?.length) {
      setPlayers(response?.data);
      // setPlayers(response.players.data.filter(data => data.user_id !== ""))
      console.log(
        "trial",
        response?.data[0].transactions[0].totalDepositApproved
      );
    }
    setPageData(response);

    setLoader(false);
  };

  useEffect(() => {
    getPlayersData(1);
  }, []);

  const decimalConverter = (amount) => {
    if (amount == null) {
      return 0;
    }
    let roundedNumber = parseFloat(amount).toFixed(2);
    return roundedNumber;
  };

  return (
    <MainLayout>
      <PlayerTableDataUI
        loader={loader}
        data={players}
        columns={[
          "Player ID",
          "Username",
          "Direct Agent",
          "Deposite Count",
          "Deposite Amount",
          "Withdrawal Count",
          "Withdrawal Amount",
          "Total Turnover",
          "Win/Loss",
          "Balance",
          "Register Date",
          "Last Login Date",
          "Last Deposite Time",
        ]}
        totalPages={pageData?.last_page}
        currentPage={pageData?.current_page}
        onPageChange={(i) => getPlayersData(i, date, name, phone)}
        footerData={{
          "Total Count": addCommasToNumber(pageData?.total),
        }}
        opened={opened}
        setOpened={setOpened}
        popover={
          <Popover.Dropdown
            w={350}
            style={{
              borderRadius: "10px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <Text style={{ fontSize: "16px" }} fw={500}>
              Filters
            </Text>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: "14px" }} fw={500}>
                Date
              </Text>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePickerInput
                  rightSection={icon}
                  rightSectionPointerEvents="none"
                  type="range"
                  placeholder="Select date range"
                  size="xs"
                  value={date}
                  style={{ width: "100%" }}
                  onChange={setDate}
                />
              </div>
            </Box>
            <Box style={{ width: "100%" }}>
              <Text style={{ fontSize: "14px" }} fw={500}>
                Username
              </Text>
              <Input
                style={{ width: "100%" }}
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="Enter Username"
              />
            </Box>

            <Flex gap="14px" ml="auto">
              <button
                onClick={() => {
                  setDate([null, null]);
                  getPlayersData(1, [null, null]);
                  setUserName("");
                  // setType("all");
                  setOpened(false);
                }}
                className={"secondaryButton"}
              >
                Reset
              </button>
              <button
                className={"primaryButton"}
                onClick={() => {
                  getPlayersData(1, date, userName);
                  setOpened(false);
                }}
              >
                Search
              </button>
            </Flex>
          </Popover.Dropdown>
        }
      >
        {players.map((player) => (
          <Table.Tr key={player.id} style={{ color: "#667085" }}>
            <Table.Td>{player && player.wallet.player_id}</Table.Td>
            <Table.Td>{player && player.user.user_name}</Table.Td>
            <Table.Td>{player && player.agent_id}</Table.Td>
            {/* <Table.Td>
              {player.transactions.length > 0
                ? player.transactions[0].totalDeposits === 0
                  ? 0
                  : addCommasToNumber(
                      decimalConverter(player.transactions[0].totalDeposits)
                    )
                : 0}
            </Table.Td> */}
            <Table.Td>
              {player.transactions.length > 0
                ? player.transactions[0].totalDeposits === 0
                  ? "0"
                  : Math.floor(
                      player.transactions[0].totalDeposits
                    ).toLocaleString()
                : "0"}{" "}
            </Table.Td>
            <Table.Td>
              {player.transactions.length > 0
                ? player.transactions[0].totalDepositApproved === 0
                  ? 0
                  : addCommasToNumber(
                      decimalConverter(
                        player.transactions[0].totalDepositApproved
                      )
                    )
                : 0}
            </Table.Td>
            {/* <Table.Td>
              {player.transactions.length > 0
                ? player.transactions[0].totalWithdraw === 0
                  ? 0
                  : addCommasToNumber(
                      decimalConverter(player.transactions[0].totalWithdraw)
                    )
                : 0}
            </Table.Td> */}
            <Table.Td>
              {player.transactions.length > 0
                ? player.transactions[0].totalWithdraw === 0
                  ? "0" 
                  : Math.floor(
                      player.transactions[0].totalWithdraw
                    ).toLocaleString()
                : "0"}{" "}
            </Table.Td>

            <Table.Td>
              {player.transactions.length > 0
                ? player.transactions[0].totalWithdrawApproved === 0
                  ? 0
                  : addCommasToNumber(
                      decimalConverter(
                        player.transactions[0].totalWithdrawApproved
                      )
                    )
                : 0}
            </Table.Td>

            <Table.Td>
              {player.bet_rounds.length > 0
                ? player.bet_rounds[0].total_turnover === 0
                  ? 0
                  : addCommasToNumber(
                      decimalConverter(player.bet_rounds[0].total_turnover)
                    )
                : 0}
            </Table.Td>

            {/* <Table.Td>
              {player.bet_rounds.length > 0
                ? player.bet_rounds[0].total_win_loss === 0
                  ? 0
                  : addCommasToNumber(
                      decimalConverter(player.bet_rounds[0].total_win_loss)
                    )
                : 0}
            </Table.Td> */}

            <Table.Td
              style={{
                color:
                  player.bet_rounds.length > 0
                    ? player.bet_rounds[0].total_win_loss > 0
                      ? "#22C527"
                      : player.bet_rounds[0].total_win_loss < 0
                      ? "#F24E4E"
                      : "inherit"
                    : "inherit",
              }}
            >
              {player.bet_rounds.length > 0
                ? player.bet_rounds[0].total_win_loss === 0
                  ? 0
                  : addCommasToNumber(
                      decimalConverter(player.bet_rounds[0].total_win_loss)
                    )
                : 0}
            </Table.Td>

            <Table.Td>
              {addCommasToNumber(
                player && player.wallet.balance && player.wallet.balance == 0
                  ? 0
                  : decimalConverter(player.wallet.balance)
              )}
            </Table.Td>

            <Table.Td>
              {player && player.user.created_at
                ? convertUTCToLocalTime(player.user.created_at)
                : `-`}
            </Table.Td>

            <Table.Td>
              {player.user.login_history.length > 0
                ? player.user.login_history[0].lastLoginDate === 0
                  ? "-"
                  : convertUTCToLocalTime(
                      player.user.login_history[0].lastLoginDate
                    )
                : `-`}
            </Table.Td>

            <Table.Td>
              {player.transactions.length > 0 &&
              player.transactions[0].lastDepositDate !== 0
                ? convertUTCToLocalTime(player.transactions[0].lastDepositDate)
                : `-`}
            </Table.Td>
          </Table.Tr>
        ))}
      </PlayerTableDataUI>
    </MainLayout>
  );
};

export default Players;
