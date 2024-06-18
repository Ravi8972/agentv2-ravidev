import {
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconUserPlus,
  IconCashBanknote,
  IconUsers,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import classes from "./StatCards.module.css";
import { addCommasToNumber } from "../../helpers/helper_functions";
import styles from "../../pages/home/Home.module.css";

import depositIcon from "../../assets/images/Deposits.png";
import firstDepositIcon from "../../assets/images/First Deposit.png";
import withdrawsIcon from "../../assets/images/Withdraws.png";
import totalSignUpsIcon from "../../assets/images/Total Sign ups.png";
import totalPlayersIcon from "../../assets/images/Total Players.png";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

export function StatCards({
  deposits,
  firstDeposits,
  totalPlayers,
  totalSignups,
  withdraws,
}) {
  const isSmallScreen = useMediaQuery("(max-width: 1800px)");
  const {t} = useTranslation()
  const data = [
    {
      title: "Deposits",
      value: deposits,
      icon: depositIcon,
      color: "#DBD8FF",
      icon_color: "#9188FF",
    },
    {
      title: "First Deposits",
      value: firstDeposits,
      icon: firstDepositIcon,
      color: "#FFDEE1",
      icon_color: "#FF8D98",
    },
    {
      title: "Withdraws",
      value: withdraws,
      icon: withdrawsIcon,
      color: "#FFF1D7",
      icon_color: "#FFD383",
    },
    {
      title: "Total Sign Ups",
      value: totalSignups,
      icon: totalSignUpsIcon,
      color: "#D7F0FF",
      icon_color: "#82CFFF",
    },
    {
      title: "Total Players",
      value: totalPlayers,
      icon: totalPlayersIcon,
      color: "#FFD8F4",
      icon_color: "#FF8DDF",
    },
  ];

  const stats = data.map((stat) => {
    return (
      <Paper
        py="md"
        radius="md"
        key={stat.title}
        bg={stat.color}
        w={isSmallScreen ? "240px" : "280px"}
        display="flex"
        style={{
          boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.18)",
        }}
      >
        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: `${stat.icon_color}`,
              borderRadius: "100%",
              padding: "8px",
            }}
          >
            <Image h={25} w={25} src={stat.icon} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <div width="100%">
            <Text fw={700} fz="14px" className={styles.statCardTitle}>
              {t(stat.title)}
            </Text>
            <Text
              c="#153850"
              fw={500}
              fz="12px"
              className={styles.statCardDetail}
            >
              {addCommasToNumber(stat.value)}
            </Text>
          </div>
        </div>
      </Paper>
    );
  });

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          // justifyContent: "space-between",
          gap: isSmallScreen ? `15px` : `30px`,
          flexWrap: "wrap",
        }}
      >
        {stats}
      </div>
    </div>
  );
}
