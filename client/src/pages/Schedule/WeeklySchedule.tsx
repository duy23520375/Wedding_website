import { Box, Typography, } from "@mui/material";
import { IParty } from "../../interfaces/party.interface";
import { defaultBgColorMap, } from "../Party/PartyTable";
import dayjs from "dayjs";

export default function WeeklySchedule({
    currentWeek,
    partyData,
    onViewPartyDetail
}: {
    currentWeek: dayjs.Dayjs,
    partyData: IParty[],
    onViewPartyDetail: (party: any) => void,
}) {
    const weekStart = currentWeek.startOf('week');

    const getWeekDates = () => {
        return Array.from({ length: 7 }).map((_, index) =>
            weekStart.add(index, "day")
        );
    };

    const weekDates = getWeekDates();

    return (
        <Box sx={{
            height: "100%",
            display: 'grid',
            gridTemplateColumns: { xs: 'none', md: 'repeat(7, 1fr)' },
            gridTemplateRows: { xs: 'repeat(7, 1fr)', md: 'none' },
        }}>
            {weekDates.map((date, index) => (
                <Box
                    key={date.toString()}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        overflow: 'hidden',
                        borderRight: { xs: 'none', md: index < 6 ? '1px solid black' : 'none' },
                        borderBottom: { xs: index < 6 ? '1px solid black' : 'none', md: 'none' },
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: { xs: '67px', md: 'auto' },
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        gap: '5px',
                        paddingBottom: { md: '10px' },
                        borderRight: { xs: '1px black solid', md: 'none' },
                        borderBottom: { xs: 'none', md: '1px black solid' },
                    }}>
                        <Typography sx={{
                            fontSize: '10px',
                            color: '#444746',
                            fontWeight: 'bold',
                        }}>
                            {date.format("ddd").toUpperCase()}
                        </Typography>
                        <Typography sx={{
                            fontSize: '24px',
                            color: '#444746',
                        }}>
                            {date.format("D")}
                        </Typography>
                    </Box>

                    <Box sx={{
                        height: { xs: 'auto', md: 'calc(100% - 67px)' },
                        width: { xs: 'calc(100% - 67px)', md: 'auto' },
                        overflowX: { xs: 'auto', md: 'hidden' },
                        overflowY: { xs: 'hidden', md: 'auto' },
                        scrollbarGutter: 'stable both-edges',
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        padding: '10px',
                        gap: '10px',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                            height: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '10px',
                            backgroundColor: '#e3e3e1'
                        },
                    }}>
                        {partyData
                            .filter((p) => dayjs(p.date).isSame(date, "day"))
                            .map((party) => (
                                <Box
                                    key={party.id}
                                    sx={{
                                        borderRadius: '10px',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: defaultBgColorMap[party.hall],
                                    }}
                                    onClick={() => onViewPartyDetail(party)}
                                >
                                    <Typography variant="body2" sx={{ textWrap: { xs: 'nowrap', md: 'wrap' }, }}>
                                        {`${party.groom} & ${party.bride}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`${party.shift} - Sảnh ${party.hall}`}
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            ))}
        </Box>
    )
}