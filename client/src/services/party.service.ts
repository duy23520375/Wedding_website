import { IParty } from '../interfaces/party.interface';
import { api } from '../utils/api';

export const partyService = {
    // Lấy danh sách tiệc cưới
    getParties: async (): Promise<IParty[]> => {
        try {
            const response = await api.getParties();
            console.log('Kết quả từ BE:', response);
            const mappedData = response.map((party: any) => ({
                _id: party._id,
                id: party.MATIEC,
                groom: party.TENCR,
                bride: party.TENCD,
                phone: party.SDT,
                date: party.NGAYDAI,
                shift: party.CA,
                hall: party.MASANH,
                deposit: party.TIENCOC,
                tables: party.SOLUONGBAN,
                reserveTables: party.SOBANDT,
                status: getPartyStatus(party)
            }));
            return mappedData;
        } catch (error) {
            console.error('Lỗi lấy danh sách tiệc cưới:', error);
            return [];
        }
    },

    // Thêm tiệc cưới mới
    createParty: async (party: Omit<IParty, '_id'>): Promise<IParty> => {
        try {
            const partyData = {
                MATIEC: party.id,
                TENCR: party.groom,
                TENCD: party.bride,
                SDT: party.phone,
                NGAYDAI: party.date,
                CA: party.shift,
                MASANH: party.hall,
                TIENCOC: party.deposit,
                SOLUONGBAN: party.tables,
                SOBANDT: party.reserveTables
            };
            const response = await api.post('/tieccuoi', partyData);
            return response.data;
        } catch (error) {
            console.error('Error creating party:', error);
            throw error;
        }
    },

    // Cập nhật tiệc cưới
    updateParty: async (id: string, party: Partial<IParty>): Promise<IParty> => {
        try {
            const partyData = {
                TENCR: party.groom,
                TENCD: party.bride,
                SDT: party.phone,
                NGAYDAI: party.date,
                CA: party.shift,
                MASANH: party.hall,
                TIENCOC: party.deposit,
                SOLUONGBAN: party.tables,
                SOBANDT: party.reserveTables
            };
            const response = await api.put(`/tieccuoi/${id}`, partyData);
            return response.data;
        } catch (error) {
            console.error('Error updating party:', error);
            throw error;
        }
    },

    // Xóa tiệc cưới
    deleteParty: async (id: string): Promise<void> => {
        try {
            await api.delete(`/tieccuoi/${id}`);
        } catch (error) {
            console.error('Error deleting party:', error);
            throw error;
        }
    }
};

// Hàm helper để xác định trạng thái tiệc cưới
function getPartyStatus(party: any): string {
    // Logic xác định trạng thái dựa trên dữ liệu từ backend
    // Có thể cần điều chỉnh dựa trên logic nghiệp vụ cụ thể
    if (party.TIENCOC > 0) return 'Đã đặt cọc';
    return 'Chưa đặt cọc';
}