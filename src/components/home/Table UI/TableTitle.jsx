import { Divider, Paper, Text } from "@mantine/core";
import styles from '../../../pages/home/Home.module.css';

export const TableTitle = ({ title }) => {
    console.log("title", title)
    return (
        <Paper>
            <Text px="lg" py='md' className={styles.tableTitleStyle}>
                {title}
            </Text>
            <Divider mb='md' />
        </Paper>
    );
}