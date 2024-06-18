import { Center, Paper, Table } from "@mantine/core";
import React from "react";
import UserIcon from "../../assets/Dashboard/User@2x.png";
import BettingIcon from "../../assets/Dashboard/Betting@2x.png";
import DepostIcon from "../../assets/Dashboard/Deposit@2x.png";
import WithdrawalIcon from "../../assets/Dashboard/Withdrawal@2x.png";
import styles from "./DashboardDetailedtable.module.css";
import { Loader } from "@mantine/core";
import { useTranslation } from "react-i18next";

const DashboardDetailedtable = ({
  loginData,
  registerData,
  firstDeposit,
  totalBetting,
  validBetting,
  winLossBetting,
  totalDepositAmount,
  depositCount,
  totalWithdrawalAmount,
  totalWithdrawalCount,
  teamSize,
}) => {
  const columns = [
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
  ];
  const {t} = useTranslation()
  return (
    <Table
      verticalSpacing={6}
      horizontalSpacing={10}
      style={{
        width: "100%",
      }}
    >
      <Table.Thead>
        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
          c="#000000"
        >
          <Table.Th
            colSpan={2}
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {t(`Team Size :`)} {teamSize}
          </Table.Th>
          {(() => {
            return columns.map((data) => (
              <Table.Th
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
                className={styles.titleLabelStyling}
              > 
                {t(data)}
              </Table.Th>
            ));
          })()}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {/* User section */}
        <Table.Tr
          style={{
            borderBottom: "0px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #E6E6E6",
              top: "12px",
            }}
          ></div>
          <Table.Th colSpan={10}>
            <div
              style={{
                height: "1px",
              }}
            ></div>
          </Table.Th>
        </Table.Tr>
        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Th rowSpan={3} w="100px">
            <div className={styles.imgtextContainer}>
              <div className={styles.imgContainer}>
                <img src={UserIcon} alt="img" className={styles.imgStyle} />
              </div>
              <div className={styles.labelStyling}>User</div>
            </div>
          </Table.Th>

          <Table.Td className={styles.labelStyling}>Logins</Table.Td>
          {Object.keys(loginData).length > 0 ? (
            Object.values(loginData).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>

        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Td className={styles.labelStyling}>Registers</Table.Td>
          {Object.keys(registerData).length > 0 ? (
            Object.values(registerData).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>
        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Td className={styles.labelStyling}>First Deposit</Table.Td>
          {Object.keys(firstDeposit).length > 0 ? (
            Object.values(firstDeposit).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>

        {/* Betting Section */}
        <Table.Tr
          style={{
            borderBottom: "0px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #E6E6E6",
              top: "12px",
            }}
          ></div>
          <Table.Th colSpan={10}>
            <div
              style={{
                height: "1px",
              }}
            ></div>
          </Table.Th>
        </Table.Tr>

        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Th rowSpan={3}>
            <div className={styles.imgtextContainer}>
              <div className={styles.imgContainer}>
                <img src={BettingIcon} alt="img" className={styles.imgStyle} />
              </div>
              <div className={styles.labelStyling}>Betting</div>
            </div>
          </Table.Th>
          <Table.Td className={styles.labelStyling}>Valid bet</Table.Td>
          {Object.keys(validBetting).length > 0 ? (
            Object.values(validBetting).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>

        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Td className={styles.labelStyling}>Win/Loss</Table.Td>
          {Object.keys(winLossBetting).length > 0 ? (
            Object.values(winLossBetting).map((item, index) => (
              <Table.Td
                key={index}
                style={{
                  color: item < 0 ? "#22C527" : item > 0 ? "red" : "",
                  textAlign: "center",
                }}
              >
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>
        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Td className={styles.labelStyling}>Bettings</Table.Td>
          {Object.keys(totalBetting).length > 0 ? (
            Object.values(totalBetting).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>

        {/* Deposit Section */}
        <Table.Tr
          style={{
            borderBottom: "0px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "65px",
              borderRadius: "10px",
              border: "1px solid #E6E6E6",
              top: "12px",
            }}
          ></div>
          <Table.Th colSpan={10}>
            <div
              style={{
                height: "1px",
              }}
            ></div>
          </Table.Th>
        </Table.Tr>
        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Th rowSpan={2} pt={3} pb={3}>
            <div className={styles.imgtextContainer}>
              <div className={styles.imgContainer}>
                <img src={DepostIcon} alt="img" className={styles.imgStyle} />
              </div>
              <div className={styles.labelStyling}>Deposit</div>
            </div>
          </Table.Th>
          <Table.Td className={styles.labelStyling}>Total amount</Table.Td>

          {Object.keys(totalDepositAmount).length > 0 ? (
            Object.values(totalDepositAmount).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>

        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Td className={styles.labelStyling}>Total count</Table.Td>
          {Object.keys(depositCount).length > 0 ? (
            Object.values(depositCount).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>

        {/* Withdrawal Section */}
        <Table.Tr
          style={{
            borderBottom: "0px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "65px",
              borderRadius: "10px",
              border: "1px solid #E6E6E6",
              top: "12px",
            }}
          ></div>
          <Table.Th colSpan={10}>
            <div
              style={{
                height: "1px",
              }}
            ></div>
          </Table.Th>
        </Table.Tr>
        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Th rowSpan={2} pt={3} pb={3}>
            <div className={styles.imgtextContainer}>
              <div className={styles.imgContainer}>
                <img
                  src={WithdrawalIcon}
                  alt="img"
                  className={styles.imgStyle}
                />
              </div>
              <div className={styles.labelStyling}>Withdrawal</div>
            </div>
          </Table.Th>
          <Table.Td className={styles.labelStyling}>Total amount</Table.Td>

          {Object.keys(totalWithdrawalAmount).length > 0 ? (
            Object.values(totalWithdrawalAmount).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>

        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Td className={styles.labelStyling}>Total count</Table.Td>

          {Object.keys(totalWithdrawalCount).length > 0 ? (
            Object.values(totalWithdrawalCount).map((item, index) => (
              <Table.Td key={index} className={styles.allStatDetail}>
                {item}
              </Table.Td>
            ))
          ) : (
            <Table.Td colSpan={6} style={{ textAlign: "center" }}></Table.Td>
          )}
        </Table.Tr>
        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Th colSpan={10}>
            <div
              style={{
                height: "1px",
              }}
            ></div>
          </Table.Th>
        </Table.Tr>
        <Table.Tr
          style={{
            borderBottom: "0px",
          }}
        >
          <Table.Td colSpan={7} className={styles.tipsText}>
           Tips : Win/Loss, Team P&L - Red represents a positive amount meaning
            the player is winning. Green represents a negative amount which is
            the player is losing. Green color is the profit where you can get a
            commission.
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};

export default DashboardDetailedtable;
