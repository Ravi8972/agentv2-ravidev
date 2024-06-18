import {
  Box,
  Center,
  Flex,
  Loader,
  Pagination,
  Paper,
  Popover,
  Table,
  Text,
  ScrollArea
} from "@mantine/core";
import { useEffect, useState } from "react";
import NodataFoundIcon from "../../../assets/No data@2x.png";
import filterIcon from "../../../assets/images/filter-lines.png";
import arrowIcon from "../../../assets/images/arrow-down.png";
import { useTranslation } from "react-i18next";

export const TableDataUI = ({
  children,
  loader,
  data,
  columns,
  totalPages,
  footerData,
  onPageChange,
  currentPage,
  popover,
  opened,
  setOpened,
  addAgent = false,
}) => {
  
  const totalLabelStyle = {
    color: "#667085",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    paddingRight: "5px",
  };

  const totalValueStyle = {
    color: "#181818",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    paddingRight: "10px",
  };

  const [activePage, setPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    onPageChange(activePage);
  }, [activePage]);


  return (
    <>
      <Paper
        mx="10px"
        style={{
          borderRadius: "8px 8px 0px 0px",
          border: "1px solid #EAECF0",
          marginTop: 20,
        }}
      >

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 10px",
            borderBottom: "1px solid #EAECF0",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto",
              color: "#101828",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "28px",
            }}
          >
           {t(`List`)}
          </Text>
          <Flex style={{ alignItems: 'center', gap: 10 }}>
            <Popover
              opened={opened}
              onChange={setOpened}
              position="bottom-end"
              closeOnClickOutside={false}
            >
              <Popover.Target>
                <div
                  onClick={() => setOpened((o) => !o)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={filterIcon}
                    alt="filter"
                    style={{ width: 15, height: 15 }}
                  />
                  <Text
                    style={{
                      fontSize: "12px",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      color: "#344054",
                    }}
                  >
                   {t(`Filters`)}
                  </Text>
                </div>
              </Popover.Target>

              {popover}
            </Popover>
            {addAgent}
          </Flex>
        </Box>
        <Table
          // withColumnBorders
          withRowBorders
          verticalSpacing={8}
          // withTableBorder
          style={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <Table.Thead>
            <Table.Tr
              bg="#FCFCFD"
              c="#0F1419"
              style={{ fontSize: "#0F1419", textAlign: "center" }}
            >
              {(() => {
                return columns.map((data) => (
                  <Table.Th>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <Text
                        style={{
                          color: "#0F1419",
                          textAlign: "center",
                          fontFamily: "Roboto",
                          fontSize: 12,
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "normal",
                        }}
                      >
                        {t(data)}
                      </Text>
                      {/* <img
                        src={arrowIcon}
                        alt="arrow"
                        style={{ width: 16, height: 16, cursor: "pointer" }}
                      /> */}
                    </div>
                  </Table.Th>
                ));
              })()}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {(() => {
              if (loader) {
                return (
                  <Table.Tr>
                    <Table.Td
                      colSpan={columns && columns.length ? columns.length : 1}
                    >
                      <Center h={200}>
                        <Loader color="#153850" />
                      </Center>
                    </Table.Td>
                  </Table.Tr>
                );
              } else {
                if (data.length) {
                  return children;
                } else {
                  return (
                    <Table.Th style={{ height: "400px" }} colSpan={7}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              maxWidth: 78,
                              maxHeight: 85,
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <img
                              src={NodataFoundIcon}
                              alt="no data"
                              style={{
                                width: "100%",
                                height: "100%",
                                opacity: 1,
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              fontSize: 16,
                              fontFamily: "roboto",
                              letterSpacing: 0,
                              color: "#E5E5E5",
                              opacity: 1,
                            }}
                          >
                            No data
                          </div>
                        </div>
                      </div>
                    </Table.Th>
                  );
                }
              }
            })()}
            {data.length > 0 && footerData && (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "5px",
                    }}
                  >
                    {(() => {
                      return Object.entries(footerData).map((data) => {
                        return (
                          <>
                            <Text style={totalLabelStyle}>{data[0]}: </Text>
                            <Text style={totalValueStyle}>{data[1]}</Text>
                          </>
                        );
                      });
                    })()}
                  </div>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>
      {data.length > 0 && (
        <Pagination
          size="md"
          m="md"
          total={totalPages}
          value={activePage}
          onChange={setPage}
          color={currentPage === activePage ? "#CBB4FF" : ""}
          styles={{
            root: {
              display: "flex",
              justifyContent: "center",
              marginRight: "10px",
            },
          }}
        />
      )}
    </>
  );
};
