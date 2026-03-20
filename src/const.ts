import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/vi"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("vi")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-03-28 16:00", "Asia/Ho_Chi_Minh")
export const WEDDING_DATE_FORMAT = `ngày DD MMMM YYYY dddd HH:mm`

// ngày được đánh dấu trên lịch.
export const HOLIDAYS = [29]

export const LOCATION = "8/63 đường Văn Cao, phường Nam Định, tỉnh Ninh Bình"
export const LOCATION_ADDRESS = "8/63 đường Văn Cao, phường Nam Định, tỉnh Ninh Bình"

export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION


export const WEDDING_HALL_POSITION = { lat: 20.418832, long: 106.1675415 }
export const WEDDING_ID = "giang"
export const WEDDING_GG_MAP_URL = "https://goo.gl/maps/AMLgQBDT64pSuuWm9"


// 예: https://map.naver.com/p/entry/place/13321741 -> 13321741
export const NMAP_PLACE_ID = 13321741


// 예: https://place.map.kakao.com/8634826 -> 8634826
export const KMAP_PLACE_ID = 8634826

export const BRIDE_FULLNAME = "Hương Giang"
export const BRIDE_FIRSTNAME = "Hương Giang"
export const BRIDE_INFO = [
  {
    relation: "Cô dâu",
    name: BRIDE_FULLNAME,
    phone: "0949835540",
    bankAccount: "0949835540",
    bankName: "MBbank",
  },

]

export const GROOM_FULLNAME = "Tiến Đạt"
export const GROOM_FIRSTNAME = "Tiến Đạt"
export const GROOM_INFO = [
  {
    relation: "Chú rể",
    name: GROOM_FULLNAME,
    phone: "0966134375",
    bankAccount: "00126297001",
    bankName: "Tpbank",

  },

]
