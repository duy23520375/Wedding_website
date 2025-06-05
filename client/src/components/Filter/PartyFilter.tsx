import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import { defaultBgColorMap, defaultTextColorMap } from "../../pages/Party/PartyTable";

export default function PartyFilter({
    label,
    value,
    onChange,
    children,
}: {
    label: string,
    value: string,
    onChange: (e: any) => void,
    children: string[],
}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                {label}
            </Typography>
            <FormControl
                sx={{
                    "& fieldset": {
                        borderRadius: "10px",
                    },
                    "& .MuiInputBase-input": {
                        display: 'flex',
                        alignItems: 'center',
                        height: '43px',
                        paddingY: '0px',
                        paddingLeft: "14px",
                        backgroundColor: '#fff',
                    },
                }}
            >
                <Select
                    value={value}
                    onChange={onChange}
                    displayEmpty
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                boxSizing: 'border-box',
                                padding: "0 8px",
                                border: "1px solid #e4e4e7",
                                "& .MuiMenuItem-root": {
                                    borderRadius: "6px",
                                    "&:hover": {
                                        backgroundColor: "rgba(117, 126, 136, 0.08)",
                                    },
                                    "&.Mui-selected": {
                                        backgroundColor: "#bcd7ff",
                                    },
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value="">
                        Tất cả
                    </MenuItem>

                    {children.map((item) =>
                        <MenuItem value={item}
                            sx={{
                            }}
                        >
                            <Box sx={{
                                display: 'inline-flex',
                                paddingX: 1.5,
                                paddingY: 0.5,
                                borderRadius: 2,
                                backgroundColor: defaultBgColorMap[item],
                                color: defaultTextColorMap[item],
                                fontWeight: 'bold',
                                zIndex: 100
                            }}>
                                {item}
                            </Box>
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}