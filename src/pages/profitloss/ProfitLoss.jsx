import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import {
    Box,
    Flex,
    Input,
    Popover,
    Select,
    Table,
    Text,
} from "@mantine/core";

import { DatePickerInput } from "@mantine/dates";
import { rem } from "@mantine/core";
import { GetProfitLossListData } from "../../helpers/apis/home/HomeApi";
import {
    addCommasToNumber,
    makeServerDate,
} from "../../helpers/helper_functions";
import { TableDataUI } from "../../components/home/Table UI/TableDataUI";
import { IconCalendar } from "@tabler/icons-react";


const ProfitLoss = () => {
    const [profitLoss, setProfitLoss] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [userName, setUserName] = useState("");
    const [type, setType] = useState("all");

    const [opened, setOpened] = useState(false);

    const getProfitLossData = async (page, type, userName) => {
        setProfitLoss([]);
        setLoader(true);
    
        const response = await GetProfitLossListData(page, type, userName);
        if (response?.data?.data?.length) {
            setProfitLoss(response?.data?.data);
        }
        setPageData(response?.data);
        setLoader(false);
    };


    useEffect(() => {
        getProfitLossData(1,type,userName);
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
            <TableDataUI
                loader={loader}
                data={profitLoss}
                columns={[
                    "username",
                    "deposit",
                    "withdrawal",
                    "valid bet",
                    "win/loss",
                ]}
                totalPages={pageData?.last_page}
                currentPage={pageData?.current_page}
                onPageChange={(i) => getProfitLossData(i,type, userName)}
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
                                    { value: "win", label: "Win" },
                                    { value: "loss", label: "Loss" },
                                ]}
                                defaultValue="all"
                                value={type}
                                onChange={setType}
                            />
                        </Box>
                        <Flex gap="14px" ml="auto">
                            <button
                                onClick={() => {
                                    getProfitLossData(1, [null, null]);
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
                                    getProfitLossData(1, type, userName);
                                    setOpened(false);
                                }}
                            >
                                Search
                            </button>
                        </Flex>
                    </Popover.Dropdown>
                }
            >
                {profitLoss &&
                    profitLoss.map((data) => (
                        <Table.Tr key={data.id} style={{ color: "#667085" }}>
                            <Table.Td>{data.user_name}</Table.Td>
                            <Table.Td>{addCommasToNumber(decimalConverter(data && data.deposit && data.deposit))}</Table.Td>
                            <Table.Td>{addCommasToNumber(decimalConverter(data && data.withdraw && data.withdraw))}</Table.Td>
                            <Table.Td>
                                {data.total_valid_bets
                                    ? decimalConverter(data.total_valid_bets)
                                    : "-"}
                            </Table.Td>
                            <Table.Td c={data && data.win_loss > 0 ? "#22C527" : "#F24E4E"}>{addCommasToNumber(decimalConverter(data && data.win_loss && data.win_loss))}</Table.Td>
                            
                        </Table.Tr>
                    ))}
            </TableDataUI>
        </MainLayout>
    );
};

export default ProfitLoss;
