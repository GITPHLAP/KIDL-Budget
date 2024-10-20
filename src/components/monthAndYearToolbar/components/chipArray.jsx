import { Add, Remove } from '@mui/icons-material';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMonth } from '../../../redux/reducers/monthSlice';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function ChipArray() {
    const { t } = useTranslation()
    const months = useSelector((state) => state.selectedMonths)

    const dispatch = useDispatch()

    const handleToggle = (chipId) => () => {
        dispatch(toggleMonth(chipId))
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
                border: "none"
            }}
            component="ul"
        >
            {months.map((data) => {
                let icon;

                icon = <Add />;
                if (data.isSelected) {
                    icon = <Remove />
                }

                return (
                    <ListItem key={data.id}>
                        <Chip
                            icon={icon}
                            label={t(data.name)}
                            onClick={handleToggle(data.id)}
                            color={data.isSelected ? "primary" : undefined}
                        />
                    </ListItem>
                );
            })}
        </Box>
    );
}
