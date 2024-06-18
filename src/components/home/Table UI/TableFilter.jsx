import { Button, Divider, Grid, Paper, Text } from "@mantine/core";
import styles from '../../../pages/home/Home.module.css';
import { useTranslation } from "react-i18next";

export const TableFilter = ({ children, onSubmit, onClear }) => {
    const { t } = useTranslation();

    return (
        <Paper withBorder radius="md" mx="lg" mb="md" style={{ overflow: "auto" }}>
            <div
                style={{
                    backgroundColor: "##FFFFFF",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    paddingTop: "5px",
                }}>
                <Text px="lg" py="xs" className={styles.filterTitle}>
                    {t(`Filters`)}
                </Text>
            </div>
            <Divider />
            <Grid columns={20} pl="lg" m={15}  align="center">
                {children}
                <Grid.Col span={{ base: 24, sm: 9, md: 12, lg: 4 }}>
                    <Button
                        size="xs"
                        pl="lg"
                        pr="lg"
                        bg='#153850'
                        onClick={onSubmit}>{t(`Search`)}</Button>
                    <Button
                        ml="5px"
                        pl="lg"
                        pr='lg'
                        size="xs"
                        variant="outline"
                        color='#153850'
                        bo
                        onClick={onClear}>{t(`Clear`)}</Button>
                </Grid.Col>
            </Grid>
        </Paper>
    );
}