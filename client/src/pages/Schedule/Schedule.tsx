import { useEffect, useState } from "react";
import { Box, Typography, IconButton, ToggleButtonGroup, ToggleButton, Popover, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IParty } from "../../interfaces/party.interface";
import PartyForm from "../Party/PartyForm";
import WeeklySchedule from "./WeeklySchedule";
import dayjs from "dayjs";
import { useParams, useNavigate } from 'react-router-dom';
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MonthlySchedule from "./MonthlySchedule";

// Extend dayjs with necessary plugins\

const initialData: IParty[] = [
  {
    id: 1,
    groom: "Nguyễn Văn Nam",
    bride: "Trần Thị Lan",
    phone: "0912345678",
    date: "2025-06-15",
    shift: "Trưa",
    hall: "A",
    deposit: 10000000,
    tables: 1000000,
    reserveTables: 5,
    status: "Đã đặt cọc",
  },
  {
    id: 2,
    groom: "Lê Minh Quân",
    bride: "Phạm Thị Hạnh",
    phone: "0934567890",
    date: "2025-05-11",
    shift: "Tối",
    hall: "B",
    deposit: 15000000,
    tables: 50,
    reserveTables: 3,
    status: "Đã tổ chức",
  },
  {
    id: 3,
    groom: "Trần Văn Hùng",
    bride: "Lê Thị Thảo",
    phone: "0901122334",
    date: "2025-06-25",
    shift: "Trưa",
    hall: "C",
    deposit: 12000000,
    tables: 40,
    reserveTables: 2,
    status: "Đã huỷ",
  },
  {
    id: 4,
    groom: "Phan Thanh Tùng",
    bride: "Nguyễn Thị Mai",
    phone: "0911223344",
    date: "2025-07-01",
    shift: "Tối",
    hall: "D",
    deposit: 20000000,
    tables: 70,
    reserveTables: 4,
    status: "Đã đặt cọc",
  },
  {
    id: 5,
    groom: "Đỗ Văn Lâm",
    bride: "Trần Thị Ngọc",
    phone: "0922334455",
    date: "2025-05-11",
    shift: "Trưa",
    hall: "E",
    deposit: 11000000,
    tables: 35,
    reserveTables: 2,
    status: "Đã đặt cọc",
  },
  {
    id: 6,
    groom: "Ngô Minh Dũng",
    bride: "Võ Thị Thu",
    phone: "0933445566",
    date: "2025-05-10",
    shift: "Tối",
    hall: "A",
    deposit: 18000000,
    tables: 65,
    reserveTables: 5,
    status: "Đã thanh toán",
  },
  {
    id: 7,
    groom: "Hoàng Văn Khánh",
    bride: "Đặng Thị Hương",
    phone: "0944556677",
    date: "2025-03-15",
    shift: "Trưa",
    hall: "B",
    deposit: 13000000,
    tables: 45,
    reserveTables: 3,
    status: "Đã tổ chức",
  },
  {
    id: 8,
    groom: "Vũ Thành Long",
    bride: "Nguyễn Thị Hồng",
    phone: "0955667788",
    date: "2025-03-20",
    shift: "Tối",
    hall: "C",
    deposit: 17000000,
    tables: 60,
    reserveTables: 4,
    status: "Đã tổ chức",
  },
  {
    id: 9,
    groom: "Phạm Hữu Thắng",
    bride: "Trần Thị Yến",
    phone: "0966778899",
    date: "2025-07-25",
    shift: "Trưa",
    hall: "D",
    deposit: 14000000,
    tables: 55,
    reserveTables: 2,
    status: "Đã đặt cọc",
  },
  {
    id: 10,
    groom: "Lý Minh Phát",
    bride: "Huỳnh Thị Linh",
    phone: "0977889900",
    date: "2025-07-30",
    shift: "Tối",
    hall: "E",
    deposit: 16000000,
    tables: 50,
    reserveTables: 3,
    status: "Đã thanh toán",
  },
  {
    id: 11,
    groom: "Trịnh Văn Bình",
    bride: "Phạm Thị Kim",
    phone: "0988990011",
    date: "2025-05-11",
    shift: "Trưa",
    hall: "A",
    deposit: 15500000,
    tables: 42,
    reserveTables: 2,
    status: "Đã thanh toán",
  },
  {
    id: 12,
    groom: "Tống Văn Sơn",
    bride: "Đinh Thị Lệ",
    phone: "0999001122",
    date: "2025-05-09",
    shift: "Tối",
    hall: "B",
    deposit: 19000000,
    tables: 70,
    reserveTables: 5,
    status: "Đã tổ chức",
  },
];

export default function Schedule() {
  const { view } = useParams<{ view: 'tuan' | 'thang' }>();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'tuan' | 'thang'>(view || 'tuan');
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [tempDate, setTempDate] = useState(currentDate);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [detailData, setDetailData] = useState<IParty | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (view === 'tuan' || view === 'thang') {
      setViewMode(view);
    }
  }, [view]);

  useEffect(() => {
    setTempDate(currentDate);
  }, [currentDate]);
  
  const handleChangeViewMode = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'tuan' | 'thang' | null
  ) => {
    if (newView !== null) {
      navigate(`/lich-su-kien/${newView}`);
    }
  };

  const goToPrevious = () => {
    setCurrentDate(
      viewMode === 'tuan'
        ? currentDate.subtract(1, "week")
        : currentDate.subtract(1, 'month'));
  };

  const goToNext = () => {
    setCurrentDate(
      viewMode === 'tuan'
        ? currentDate.add(1, "week")
        : currentDate.add(1, 'month'));
  };

  const handleOpenCalendar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = (save: boolean) => {
    if (save) setCurrentDate(tempDate);
    else setTempDate(currentDate);
    setAnchorEl(null)
  };

  const handleViewDetail = (party: IParty) => {
    setDetailData(party);
    setIsFormOpen(true);
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: "100%",
      overflow: 'hidden',
      backgroundColor: '#fff',
      borderRadius: '15px',
      padding: '25px',
    }}>
      <Box sx={{
        height: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
      }}>
        <IconButton onClick={goToPrevious}><ChevronLeft /></IconButton>
        <Typography onClick={handleOpenCalendar}
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
          {`${currentDate.endOf('week').format("MMMM")} ${currentDate.add(6, 'day').format("YYYY")}`}
        </Typography>
        <IconButton onClick={goToNext}><ChevronRight /></IconButton>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => handleCloseCalendar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            sx={{
              '& .MuiPopover-paper': {
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                gap: '5px',
              },
              '& .MuiPickersLayout-root': {
                minWidth: 0,
              },
              '& .MuiDateCalendar-root': {
                gap: '10px',
                height: 'auto',
                width: 'auto',
                margin: 0,
              },
              '& .MuiPickersCalendarHeader-root': {
                padding: '0 8px',
                margin: 0,
                justifyContent: 'space-between',
              },
              '& .MuiPickersCalendarHeader-labelContainer': {
                color: '#202224',
                fontWeight: 600,
                fontSize: '15px',
                margin: 0,
              },
              '& .MuiPickersArrowSwitcher-root': {
                gap: '5px'
              },
              '& .MuiPickersArrowSwitcher-button': {
                padding: 0,
                backgroundColor: '#e7e9ee',
                borderRadius: '5px'
              },
              '& .MuiTypography-root': {
                color: '#454545',
              },
              '& .MuiDayCalendar-slideTransition': {
                minHeight: 0,
                marginBottom: '4px'
              },
            }}
          >
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo={viewMode === 'tuan' ? 'day' : 'month'}
              views={viewMode === 'tuan' ? ['year', 'month', 'day'] : ['year', 'month']}
              value={tempDate}
              onChange={(newValue) => {
                if (newValue) setTempDate(newValue);
              }}
              slotProps={{
                actionBar: { style: { display: 'none' } },
                day: {
                  sx: {
                    color: "#8f9091",
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                    },
                    '&.MuiPickersDay-root.Mui-selected': {
                      backgroundColor: '#4880FF',
                      '&:hover': {
                        backgroundColor: '#3578f0'
                      }
                    },
                  },
                },
              }}
            />
            <Button variant="contained" onClick={() => handleCloseCalendar(true)}
              sx={{
                alignSelf: 'flex-end',
                backgroundColor: '#4880FF',
                '&:hover': {
                  backgroundColor: '#3578f0'
                }
              }}>
              Ok
            </Button>
          </Popover>
        </LocalizationProvider>

        <Box sx={{
          position: 'absolute',
          right: 0,
        }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleChangeViewMode}
            sx={{
              height: '36px',
              '& .MuiToggleButtonGroup-firstButton': {
                borderTopLeftRadius: '15px',
                borderBottomLeftRadius: '15px',
              },
              '& .MuiToggleButtonGroup-lastButton': {
                borderTopRightRadius: '15px',
                borderBottomRightRadius: '15px',
              },
              '& .MuiToggleButton-root': {
                fontSize: '14px',
                textTransform: 'none',
                '&.Mui-selected': {
                  backgroundColor: '#4880FF',
                  color: '#fff',
                  ':hover': {
                    backgroundColor: '#3578f0',
                  }
                }
              }
            }}
          >
            <ToggleButton value="tuan" sx={{ flex: 1, }}>
              Tuần
            </ToggleButton>
            <ToggleButton value="thang" sx={{ flex: 1, }}>
              Tháng
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box sx={{
        height: "90%",
      }}>
        {viewMode === 'tuan' ? (
          <WeeklySchedule
            currentWeek={currentDate}
            partyData={initialData}
            onViewPartyDetail={handleViewDetail}
          />
        ) : (
          <MonthlySchedule
            currentMonth={currentDate}
            partyData={initialData}
            onViewPartyDetail={handleViewDetail}
          />
        )}

      </Box>

      <PartyForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={() => { }}
        initialData={detailData}
        readOnly={true}
      />
    </Box>
  );
}
