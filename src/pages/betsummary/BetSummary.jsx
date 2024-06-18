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
  Text,
  TextInput,
} from "@mantine/core";

import { DatePickerInput } from "@mantine/dates";
import { rem } from "@mantine/core";
import { useEffect } from "react";
import { GetWinLossData } from "../../helpers/apis/home/HomeApi";
import {
  addCommasToNumber,
  makeServerDate,
} from "../../helpers/helper_functions";
import { TableTitle } from "../../components/home/Table UI/TableTitle";
import { TableFilter } from "../../components/home/Table UI/TableFilter";
import { TableDataUI } from "../../components/home/Table UI/TableDataUI";
import { IconChevronDown, IconCalendar } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { GetBetSummaryData } from "../../helpers/apis/home/HomeApi";
import { GetGameVendorList } from "../../helpers/apis/home/HomeApi";
import { GetCategoryList } from "../../helpers/apis/home/HomeApi";

const labelStyle = {
  color: "#153850",
  fontSize: "15px",
  display: "inline-flex",
  alignItems: "center",
  margin: "5px",
  fontWeight: "600",
};

const BetSummary = () => {
  const [summaryList, setSummaryList] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loader, setLoader] = useState(false);
  // const [date, setDate] = useState([null, null]);
  // const [userName, setUserName] = useState("");
  const [type, setType] = useState("");
  const [gameVendorList, setGameVendorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");

  const [opened, setOpened] = useState(false);

  // const icon = (
  //   <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  // );

  const getSummaryData = async (page, type, category) => {
    setSummaryList([]);
    setLoader(true);

    const response = await GetBetSummaryData(page, type, category);
    if (response?.data?.length) {
      setSummaryList(response?.data);
    }
    setPageData(response);
    setLoader(false);
  };

  const options = [
    // { value: "all", label: "All" },
    ...gameVendorList.map((vendor) => ({
      value: `${vendor?.id}`,
      label: `${vendor?.name}`,
    })),
  ];

  const categoryOptions = [
    // { value: "all", label: "All" },
    ...categoryList.map((category) => ({
      value: `${category?.id}`,
      label: `${category?.name}`,
    })),
  ];

  useEffect(() => {
    getSummaryData(1, type, category);
  }, []);

  const decimalConverter = (amount) => {
    if (amount == null) {
      return 0;
    }
    let roundedNumber = parseFloat(amount).toFixed(2);
    return roundedNumber;
  };

  const getGameVendors = async () => {
    setGameVendorList([]);
    const response = await GetGameVendorList();
    console.log(response);
    if (response) {
      setGameVendorList(response);
    }
    setLoader(false);
  };

  const getCategory = async () => {
    setCategoryList([]);
    const response = await GetCategoryList();
    console.log(response);
    if (response) {
      setCategoryList(response);
    }
    setLoader(false);
  };

  useEffect(() => {
    getGameVendors();
    getCategory();
  }, []);

  return (
    <MainLayout>
      {/* <TableTitle title='SVenus Win Loss' /> */}
      {/* <TableFilter
        onSubmit={() => {
          getSummaryData(1, date, userName, type);
        }}
        onClear={() => {
          setDate([null, null])
          getSummaryData(1, [null, null]);
          setUserName('');
          setType('all');
        }}>
        <Grid.Col span={{ base: 24, sm: 12, md: 12, lg: 4 }} size="xs">
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
        <Grid.Col span={{ base: 24, md: 12, lg: 4 }} size="xs">
          <label style={labelStyle}>
            Username:
            <TextInput size="xs" ml={"sm"} value={userName} onChange={(e) => {
              setUserName(e.target.value);
            }} />
          </label>
        </Grid.Col>
        <Grid.Col span={{ base: 24, md: 12, lg: 4 }} size="xs">
          <label style={labelStyle}>
            Game Vendor:
            <Select
              style={{ width: "55%" }}
              data={options}
              ml={"lg"}
              placeholder="Select an option"
              defaultValue='all'
              value={type}
              onChange={setType}
              rightSection={<IconChevronDown />}
              size="xs"
            />
          </label>
        </Grid.Col>
      </TableFilter> */}
      <TableDataUI
        loader={loader}
        data={summaryList}
        columns={[
          "Vendor",
          "Category",
          "Bet Amount",
          "Win Amount",
          "Valid Bet",
          "Win/Loss",
          "Round",
          "Player",
        ]}
        totalPages={pageData?.last_page}
        currentPage={pageData?.current_page}
        onPageChange={(i) => getSummaryData(i, type, category)}
        // footerData={{
        //   "Total Count": addCommasToNumber(pageData?.total),
        // }}
        opened={opened}
        setOpened={setOpened}
        popover={
          <Popover.Dropdown
            w={300}
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
            {/* <Box
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
            </Box> */}
            <Box style={{ width: "100%" }}>
              <Text style={{ fontSize: "14px" }} fw={500}>
                Category
              </Text>
              <Select
                data={categoryOptions}
                // defaultValue="all"
                value={category}
                onChange={setCategory}
                placeholder="Select Category"
              />
            </Box>
            <Box style={{ width: "100%" }}>
              <Text style={{ fontSize: "14px" }} fw={500}>
                Game Vendor
              </Text>
              <Select
                data={options}
                // defaultValue="all"
                value={type}
                onChange={setType}
                placeholder="Select Game Vendors"
              />
            </Box>
            <Flex gap="14px" ml="auto">
              <button
                onClick={() => {
                  // setDate([null, null]);
                  getSummaryData(1, "", "");
                  // setUserName("");
                  setCategory("");
                  setType("");
                  setOpened(false);
                }}
                className={"secondaryButton"}
              >
                Reset
              </button>
              <button
                className={"primaryButton"}
                onClick={() => {
                  getSummaryData(1, type, category);
                  setOpened(false);
                }}
              >
                Search
              </button>
            </Flex>
          </Popover.Dropdown>
        }
      >
        {summaryList &&
          summaryList.map((data) => (
            <Table.Tr key={data.id} style={{ color: "#667085" }}>
              <Table.Td>{data.game_vendor}</Table.Td>
              <Table.Td>
                {data.game_category_name ? data.game_category_name[0] : `-`}
              </Table.Td>
              <Table.Td>
                {data.bet_amount ? decimalConverter(data.bet_amount) : "-"}
              </Table.Td>{" "}
              <Table.Td>
                {data.win_amount ? decimalConverter(data.win_amount) : "-"}
              </Table.Td>
              <Table.Td>
                {data.total_valid_bets
                  ? decimalConverter(data.total_valid_bets)
                  : "-"}
              </Table.Td>
              <Table.Td
                style={{ color: data.win_loss > 0 ? `#22C527` : `#F24E4E` }}
              >
                {data.win_loss ? decimalConverter(data.win_loss) : "-"}
              </Table.Td>
              <Table.Td>{data?.id ?? "-"}</Table.Td>
              <Table.Td>{data.player_id ?? "-"}</Table.Td>
              {/* <Table.Td>{(parseFloat(data.comission) + parseFloat(data.win_loss)).toFixed(2)}</Table.Td> */}
            </Table.Tr>
          ))}
        <Table.Tr style={{ fontWeight: 500 }}>
          <Table.Td colSpan={2}>Total</Table.Td>{" "}
          <Table.Td>
            {pageData?.totalBetAmount
              ? decimalConverter(pageData?.totalBetAmount)
              : `-`}
          </Table.Td>
          <Table.Td>
            {pageData?.totalWinAmount
              ? decimalConverter(pageData?.totalWinAmount)
              : `-`}
          </Table.Td>
          <Table.Td>
            {pageData?.totalValidBet
              ? decimalConverter(pageData?.totalValidBet)
              : `-`}
          </Table.Td>
          <Table.Td>
            {pageData?.totalWinLoss
              ? decimalConverter(pageData?.totalWinLoss)
              : `-`}
          </Table.Td>
        </Table.Tr>
      </TableDataUI>
    </MainLayout>
  );
};

export default BetSummary;
