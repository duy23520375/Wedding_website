import { useEffect, useRef, useState } from "react";
import { Box, Typography, } from "@mui/material";
import { IParty } from "../../interfaces/party.interface";
import { defaultBgColorMap, } from "../Party/PartyTable";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

export default function MonthlySchedule({
    currentMonth,
    partyData,
    onViewPartyDetail
}: {
    currentMonth: dayjs.Dayjs,
    partyData: IParty[],
    onViewPartyDetail: (party: any) => void,
}) {
    const monthStart = currentMonth.startOf("month");
    const calendarStart = monthStart.startOf('week')
    const partyListRef = useRef<HTMLDivElement>(null);
    const [maxParty, setMaxParty] = useState(2); // default

    const updateMaxParty = () => {
        const cellHeight = partyListRef.current?.offsetHeight;
        const partyHeight = 14;
        const gap = 3;

        const max = Math.floor((Number(cellHeight) + gap - 15) / (partyHeight + gap));
        setMaxParty(max);
        console.log(cellHeight);
    };

    useEffect(() => {
        updateMaxParty(); // Gọi lần đầu

        window.addEventListener('resize', updateMaxParty);

        return () => {
            window.removeEventListener('resize', updateMaxParty);
        };
    }, []);

    const getCalendarDates = () => {
        return Array.from({ length: 42 }).map((_, index) =>
            calendarStart.add(index, "day")
        );
    };

    const monthDates = getCalendarDates();

    return (
        <Box sx={{
            height: "100%",
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: 'repeat(6, 1fr)',
        }}>
            {monthDates.map((date, index) => {
                const isCurrentMonth = date.month() === currentMonth.month();
                const isTodayDate = date.isToday();
                const datePartys = partyData.filter(e => dayjs(e.date).isSame(date, "day"));

                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '5px 7px',
                            gap: '5px',
                            border: '1px solid #e0e0e0',
                            backgroundColor: isTodayDate ? "#e3f2fd" : isCurrentMonth ? "#fff" : "#f5f5f5",
                            overflow: 'hidden',
                        }}
                    >
                        <Typography sx={{
                            flex: 1,
                            fontWeight: 500,
                            fontSize: '14px',
                            alignSelf: 'flex-end',
                        }}>
                            {date.date()}
                        </Typography>

                        <Box
                            ref={partyListRef}
                            sx={{
                                flex: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '3px',
                            }}>
                            {datePartys.slice(0, maxParty).map(party => (
                                <Box
                                    key={party.id}
                                    sx={{
                                        bgcolor: defaultBgColorMap[party.hall],
                                        padding: '0px 4px',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '11px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        lineHeight: '14px',
                                    }}
                                    onClick={() => onViewPartyDetail(party)}
                                >
                                    {party.shift} - Sảnh {party.hall}
                                </Box>
                            ))}

                            {datePartys.length > maxParty && (
                                <Typography
                                    sx={{
                                        fontSize: '11px',
                                        lineHeight: '12px',
                                        color: '#666666'
                                    }}
                                >
                                    + {datePartys.length - maxParty}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}