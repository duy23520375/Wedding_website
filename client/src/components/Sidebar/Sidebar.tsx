import { useState } from 'react';
import styles from './Sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Landmark,
  Wine,
  Calendar,
  Utensils,
  Gift,
  ChartArea,
  Settings,
} from 'lucide-react';
import IconButton from '@mui/material/IconButton';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: 'sanh-tiec', icon: <Landmark size={26} />, label: 'Sảnh tiệc' },
    { path: 'tiec-cuoi', icon: <Wine size={26} />, label: 'Tiệc cưới' },
    { path: 'lich-su-kien/tuan', icon: <Calendar size={26} />, label: 'Lịch sự kiện' },
    { path: 'mon-an', icon: <Utensils size={26} />, label: 'Món ăn' },
    { path: 'dich-vu', icon: <Gift size={26} />, label: 'Dịch vụ' },
    { path: 'bao-cao', icon: <ChartArea size={26} />, label: 'Báo cáo' },
    { path: 'cai-dat', icon: <Settings size={26} />, label: 'Cài đặt' },
  ];

  return (
    <nav className={`${styles.sidebar} ${!expanded ? styles.sidebarCollapsed : ''}`}>
      <div className={styles.header}>
        <h1 className={`${styles.headerText} ${!expanded ? styles.collapsed : ''}`}>Welcome</h1>
        <IconButton className={styles.expandButton} onClick={() => setExpanded((curr) => !curr)}>
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>

      <div className={styles.sidebarList}>
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link
              key={item.path}
              to={`/${item.path}`}
              className={`${styles.sidebarListItem} ${isActive ? styles.activeTab : ''}`}
            >
              {item.icon}
              <div className={`${styles.sidebarListItemText} ${!expanded ? styles.collapsed : ''}`}>
                {item.label}
              </div>
              {!expanded && <div className={styles.tooltip}>{item.label}</div>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
