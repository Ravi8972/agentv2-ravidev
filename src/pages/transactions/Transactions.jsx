import React, { useEffect, useState } from "react";
import { Box, Chip, Flex, Grid, Input, Popover, Select, Table, Text, TextInput } from "@mantine/core";

import { MainLayout } from "../../components/layouts/MainLayout";
import { IconChevronDown, IconCalendar } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { rem } from "@mantine/core";
import { GetTransactionsApi } from "../../helpers/apis/home/HomeApi";
import {
  addCommasToNumber,
  makeServerDate,
} from "../../helpers/helper_functions";
import { TableTitle } from "../../components/home/Table UI/TableTitle";
import { TableFilter } from "../../components/home/Table UI/TableFilter";
import { TableDataUI } from "../../components/home/Table UI/TableDataUI";
import styles from "../../pages/home/Home.module.css";

const labelStyle = {
  color: "gray",
  fontSize: "15px",
  display: "inline-flex",
  alignItems: "center",
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

const Transactions = () => {
  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  const [transactions, setTransactions] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [activePage, setPage] = useState(1);
  // const [phone, setPhone] = useState('');
  // const [amount, setAmount] = useState('');
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState([null, null]);
  const [type, setType] = useState("all");

  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [opened, setOpened] = useState(false);

  const getTransactionsData = async (page, date, userName, type) => {
   
    setLoader(true);
    setTransactions([]);

    if (!date[0] && !date[1]) {
      date = null;
    } else {
      date = [makeServerDate(date[0]), makeServerDate(date[1])];
    }

    const response = await GetTransactionsApi(page, date, userName, type);

    // console.log(response)

    if (response?.account?.data?.length) {
      setTransactions(response.account.data);
    }
    setPageData(response);
  };

  useEffect(() => {
    if (pageData) {
      setTotalDeposit(pageData.totalDepositApproved);
      setTotalWithdraw(pageData.totalWithdrawApproved);
      setTotalAmount(
        pageData.totalDepositApproved + pageData.totalWithdrawApproved
      );
      setTotalProfit(
        pageData.totalDepositApproved - pageData.totalWithdrawApproved
      );
      setTotalCount(pageData?.account?.total);
    }
    setLoader(false);
  }, [pageData]);

  useEffect(() => {
    getTransactionsData(1, date, userName, type);
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
      {/* <TableTitle title='Transactions' /> */}
      {false && (
        <TableFilter
          onSubmit={() => {
            getTransactionsData(1, date, userName, type);
          }}
          onClear={() => {
            setDate([null, null]);
            // setPhone('')
            // setAmount('')
            setType("all");
            getTransactionsData(1, [null, null], "", "", "all");
            setUserName("");
          }}
        >
          <Grid.Col span={{ base: 24, md: 12, lg: 4 }} size="xs">
            <label style={labelStyle}>
              Select Date:
              <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePickerInput
                  leftSection={icon}
                  leftSectionPointerEvents="none"
                  type="range"
                  placeholder="Select date range"
                  ml={"sm"}
                  size="xs"
                  value={date}
                  onChange={setDate}
                />
              </div>
            </label>
          </Grid.Col>

          {/* <Grid.Col span={{ base: 24, md: 12, lg: 4 }} size="xs">
          <label style={labelStyle}>
            Phone: <TextInput size="xs" ml={"sm"} value={phone} onChange={(e) => {
              setPhone(e.target.value);
            }} />
          </label>
        </Grid.Col> */}
          <Grid.Col span={{ base: 24, md: 12, lg: 4 }} size="xs">
            <label style={labelStyle}>
              Username:
              <TextInput
                size="xs"
                ml={"sm"}
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </label>
          </Grid.Col>
          {/* <Grid.Col span={{ base: 24, md: 12, lg: 4 }} size="xs">
          <label style={labelStyle}>
            Amount:
            <TextInput size="xs" ml={"sm"} value={amount} onChange={(e) => {
              setAmount(e.target.value);
            }} />
          </label>
        </Grid.Col> */}

          <Grid.Col span={{ base: 24, md: 12, lg: 4 }} size="xs">
            <label style={labelStyle}>
              Type:
              <Select
                style={{ width: "70%" }}
                data={[
                  { value: "all", label: "All" },
                  { value: "deposit", label: "Deposit" },
                  { value: "withdraw", label: "Withdraw" },
                ]}
                ml={"lg"}
                placeholder="Select an option"
                defaultValue="all"
                value={type}
                onChange={setType}
                rightSection={<IconChevronDown />}
                size="xs"
              />
            </label>
          </Grid.Col>
        </TableFilter>
      )}
      <TableDataUI
        loader={loader}
        data={transactions}
        columns={["Reference ID", "Username", "Amount", "Type", "Date"]}
        totalPages={pageData?.account?.last_page}
        currentPage={pageData?.account?.current_page}
        onPageChange={(i) => getTransactionsData(i, date, userName, type)}
        footerData={{
          "Total Desposit": addCommasToNumber(decimalConverter(totalDeposit)),
          "Total Withdraw": addCommasToNumber(decimalConverter(totalWithdraw)),
          "Total Amount": addCommasToNumber(
            decimalConverter(
              parseFloat(totalDeposit) + parseFloat(totalWithdraw)
            )
          ),
          "Total Profit": addCommasToNumber(
            decimalConverter(
              parseFloat(totalDeposit) - parseFloat(totalWithdraw)
            )
          ),
          "Total Count": addCommasToNumber(totalCount),
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
                Date Range
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
            <Box style={{ width: "100%" }}>
              <Text style={{ fontSize: "14px" }} fw={500}>
                Type
              </Text>
              <Select
                data={[
                  { value: "all", label: "All" },
                  { value: "deposit", label: "Deposit" },
                  { value: "withdraw", label: "Withdraw" },
                ]}
                defaultValue="all"
                value={type}
                onChange={setType}
              />
            </Box>
            <Flex gap="14px" ml="auto">
              <button
                onClick={() => {
                  setDate([null, null]);
                  getTransactionsData(1, [null, null], "", "", "all");
                  setUserName("");
                  setType("all");
                  setOpened(false);
                }}
                className={"secondaryButton"}
              >
                Reset
              </button>
              <button
                className={"primaryButton"}
                onClick={() => {
                  getTransactionsData(1, date, userName, type);
                  setOpened(false);
                }}
              >
                Search
              </button>
            </Flex>
          </Popover.Dropdown>
        }
      >
        {transactions &&
          transactions.map((transaction) => (
            <Table.Tr key={transaction.reference_id}>
              <Table.Td className={styles.tableDetailsStyle}>
                {transaction.reference_id}
              </Table.Td>
              <Table.Td className={styles.tableDetailsStyle}>
                {transaction.user_name}
              </Table.Td>
              <Table.Td className={styles.tableDetailsStyle}>
                {addCommasToNumber(decimalConverter(transaction.amount))}
              </Table.Td>
              <Table.Td>
                {/* <Chip
                color={transaction?.type === 0 ? '#DFFEE7' : '#FEE9E9'}
                size="xs"
                checked
                styles={{
                  iconWrapper:{
                    display:'none'
                  },
                  label:{
                    fontSize:'16px',
                    lineHeight:'19px',
                    fontFamily:'roboto',
                    textAlign:'left',
                    fontWeight:'normal',
                    color: transaction?.type === 0 ? '#148F14' : '#C52222',
                    opacity:1,
                  },
                }}
                
              >
                 <span style={{fontSize:40, marginRight:4}}>•</span>
                {transaction && transaction?.type === 0 ? 'Deposit' : 'Withdraw'}
              </Chip> */}
                <div
                  style={{
                    display:'grid',
                    placeItems:'center',
                    width: "69px",
                    // maxWidth: "69px",
                    // width: "100%",
                    height: 20,
                    background:
                      transaction && transaction?.type === 0
                        ? "#DEFFDF"
                        : "#FFDEDE",
                    // padding: "0px 5px",
                    borderRadius: "3px",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 12,
                    fontStyle: "normal",
                    fontWeight: 400,
                    color:
                      transaction && transaction?.type === 0
                        ? "#22C527"
                        : "#C52222",
                  }}
                >
                  {transaction && transaction?.type === 0
                    ? "Deposit"
                    : "Withdraw"}
                </div>
              </Table.Td>
              <Table.Td className={styles.tableDetailsStyle}>
                {transaction.created_at}
              </Table.Td>
            </Table.Tr>
          ))}
      </TableDataUI>
    </MainLayout>
  );
};

export default Transactions;
