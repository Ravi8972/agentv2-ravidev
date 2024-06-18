import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Menu,
  Modal,
  Popover,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";

import { DatePickerInput } from "@mantine/dates";
import { rem } from "@mantine/core";
import {
  addCommasToNumber,
  makeServerDate,
} from "../../helpers/helper_functions";
import { TableDataUI } from "../../components/home/Table UI/TableDataUI";
import { IconCalendar } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import plusIcon from "../../assets/images/plus.png";
import AddAgentForm from "./AddAgentForm";
import { GetAgentListData } from "../../helpers/apis/home/HomeApi";
import actionIcon from "../../assets/images/DotsThreeVertical.png";
import { useTranslation } from "react-i18next";

const labelStyle = {
  color: "#153850",
  fontSize: "15px",
  display: "inline-flex",
  alignItems: "center",
  margin: "5px",
  fontWeight: "600",
};

const titleStyle = {
  color: "#181818",
  fontFamily: "Roboto",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
}
const addAgenBtnStyle = {
  width: "100px",
  height: "30px",
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: "#FFF",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "20px", /* 142.857% */
}

const dropdownMenu = {
  color: "#4F5057",
fontFamily: "Roboto",
fontSize: "14px",
fontStyle: "normal",
fontWeight: 400,
lineHeight: "normal",
}
const AgentList = () => {
  const [agentList, setAgentList] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState([null, null]);
  const [agentId, setAgentId] = useState("");
  const [type, setType] = useState("all");
  const [openedModal, { open, close }] = useDisclosure(false);
  const {t} = useTranslation()

  const [opened, setOpened] = useState(false);

  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const getAgentData = async (page, date, agentId, type) => {
    setAgentList([]);
    setLoader(true);
    if (date) {
      if (!date[0] && !date[1]) {
        date = null;
      } else {
        date = [makeServerDate(date[0]), makeServerDate(date[1])];
      }
    }

    const response = await GetAgentListData(page, date, agentId, type);
    if (response) {
      setAgentList(response?.data);
    }
    setPageData(response);
    setLoader(false);
  };


  useEffect(() => {
    getAgentData(1);
  }, []);

  const decimalConverter = (amount) => {
    if (amount == null) {
      return 0;
    }
    let roundedNumber = parseFloat(amount).toFixed(2);
    return roundedNumber;
  };


  const handleAddDownlineAgent = () => {
    console.log("open add downline agent");
  };

  const handleDepositRecord = () => {
    console.log("open deposit record")
  };

  const handlePromotionRecord = () => {
    console.log("open promotion record")
  };


  return (
    <MainLayout>
      <TableDataUI
        loader={loader}
        data={agentList}
        columns={[
          "Agent ID",
          "Agent Name",
          "Register Date",
          "Upline Agent",
          "Downline Agent",
          "Total Player",
          "Status",
          "Actions",
        ]}
        totalPages={pageData?.last_page}
        currentPage={pageData?.current_page}
        onPageChange={(i) => getAgentData(i, date, agentId, type)}
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
              {t("Filters")}
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
                {t("Date Range")}
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
                {t("Agent ID")}
              </Text>
              <Input
                style={{ width: "100%" }}
                value={agentId}
                onChange={(e) => {
                  setAgentId(e.target.value);
                }}
                placeholder="Enter Agent ID"
              />
            </Box>
            <Box style={{ width: "100%" }}>
              <Text style={{ fontSize: "14px" }} fw={500}>
                {t("Status")}
              </Text>
              <Select
                data={[
                  { value: "all", label: "All" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
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
                  getAgentData(1, [null, null]);
                  setAgentId("");
                  setType("all");
                  setOpened(false);
                }}
                className={"secondaryButton"}
              >
                {t("Reset")}
              </button>
              <button
                className={"primaryButton"}
                onClick={() => {
                  getAgentData(1, date, agentId, type);
                  setOpened(false);
                }}
              >
                {t("Search")}
              </button>
            </Flex>
          </Popover.Dropdown>
        }
        addAgent={<Button onClick={open} style={addAgenBtnStyle}><img src={plusIcon} alt="plus" />Add Agent</Button>}
      >
        {agentList &&
          agentList.map((data) => (
            <Table.Tr key={data.agent_id} style={{ color: "#667085" }}>
              <Table.Td>{data.agent_id}</Table.Td>
              <Table.Td>{data.user_name}</Table.Td>
              <Table.Td>{data && data?.created_at ? new Date(data.created_at).toLocaleDateString() + " " + new Date(data.created_at).toLocaleTimeString() : '-'}</Table.Td>
              <Table.Td>{data.senior_user_name}</Table.Td>
              <Table.Td>{data.downline_agents_count}</Table.Td>
              <Table.Td>{data.players_count}</Table.Td>
              <Table.Td>
                <div
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: "69px",
                    // maxWidth: "69px",
                    // width: "100%",
                    height: 20,
                    // background:
                    //   data && data?.status === 0
                    //     ? "#DEFFDF"
                    //     : "#FFDEDE",
                    borderRadius: "3px",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 12,
                    fontStyle: "normal",
                    fontWeight: 400,
                    // color:
                    //   data && data?.status === 0
                    //     ? "#22C527"
                    //     : "#C52222",
                  }}
                >
                  {/* {data ? (data?.type === 0
                    ? "Inactive"
                    : "Active"):"-"} */}
                  {data && data.status}
                </div>
              </Table.Td>
              <Table.Td>
                {/* <MenuDropdown
                  placement="bottom"
                  menu={{
                    items,
                    onClick
                  }}>
                  <a href="#" style={{ color: '#004a7f' }} onClick={(e) => e.preventDefault()}>
                    ---
                  </a>
                </MenuDropdown> */}

                <Menu shadow="md" width={200} position="bottom">
                  <Menu.Target>
                    <img src={actionIcon} alt="dots img" style={{objectFit:'contain',cursor:'pointer'}}/>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>
                      <Text style={dropdownMenu} onClick={handleAddDownlineAgent}>Add Downline Agent</Text>
                    </Menu.Item>
                    <Menu.Item>
                      <Text style={dropdownMenu} onClick={handleDepositRecord}>Deposit Record</Text>
                    </Menu.Item>
                    <Menu.Item>
                      <Text style={dropdownMenu} onClick={handlePromotionRecord}>Promotion Records</Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>

            </Table.Tr>
          ))}
      </TableDataUI>

      <Modal opened={openedModal} onClose={close} closeOnClickOutside={false} title="Add Agent" centered styles={{ title: titleStyle }} size="xl">
        <AddAgentForm close={close} />
      </Modal>
    </MainLayout>
  );
};

export default AgentList;
