import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/vi"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("vi")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-03-28 15:00", "Asia/Ho_Chi_Minh")
export const WEDDING_DATE_FORMAT = `ngày DD MMMM YYYY dddd HH:mm`

// ngày được đánh dấu trên lịch.
export const HOLIDAYS = [28]

export const LOCATION = "số 4 tổ 2b Phong Châu, Thanh Miếu, Phú Thọ"
export const LOCATION_ADDRESS = "số 4 tổ 2b Phong Châu, Thanh Miếu, Phú Thọ"

export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION


export const WEDDING_HALL_POSITION = { lat: 21.2931472, long: 105.4433575 }


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
    bankName: "Techcombank",
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
