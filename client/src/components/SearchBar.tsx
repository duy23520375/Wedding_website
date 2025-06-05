import {
    Box,
    TextField,
    InputAdornment,
} from "@mui/material";
import { SearchIcon } from "lucide-react";

export default function SearchBar({
    value,
    onChange,
}: {
    value: string,
    onChange: (e: any) => void,
}) {
    return (
        <TextField
            id="location-search"
            type="search"
            placeholder={"Tìm kiếm"}
            variant="outlined"
            required
            value={value}
            onChange={onChange}
            sx={{
                flex: 2,
                "& fieldset": {
                    borderRadius: "10px",
                },
                "& .MuiInputBase-root": {
                    paddingLeft: "0px",
                    paddingRight: "12px",
                    backgroundColor: '#fff',
                },
                "& .MuiInputBase-input": {
                    padding: "10px 0px",
                    fontSize: "16px",
                    "&::placeholder": {
                        color: "#a5bed4",
                        opacity: 1,
                    },
                },
            }}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start" >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    color: "#a5bed4",
                                    padding: "12px",
                                    zIndex: 1,
                                }}
                            >
                                <SearchIcon />
                            </Box>
                        </InputAdornment>
                    ),
                },
            }}
        />
    )
}