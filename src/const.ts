import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("vi")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-03-28 15:00", "Asia/Ho_Chi_Minh")
export const WEDDING_DATE_FORMAT = `YYYY MMMM D dddd HH:mm`

// ngày được đánh dấu trên lịch.
export const HOLIDAYS = [28]

export const LOCATION = "số 4 tổ 2b Phong Châu, Thanh Miếu, Phú Thọ"
export const LOCATION_ADDRESS = "số 4 tổ 2b Phong Châu, Thanh Miếu, Phú Thọ"

export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

// 네이버 지도 및 카카오 네비게이션에 사용할 좌표. [경도, 위도] 형식.
export const WEDDING_HALL_POSITION = [126.9594982, 37.4657134]

// 네이버 지도의 웨딩홀 장소 ID
// 네이버 지도 웹페이지에서 웨딩홀 검색 후 URL에서 확인 가능.
// 예: https://map.naver.com/p/entry/place/13321741 -> 13321741
export const NMAP_PLACE_ID = 13321741

// 카카오 지도의 웨딩홀 장소 ID
// 카카오 지도 웹페이지에서 웨딩홀 검색 후 해당 장소에서 상세보기 클릭 시 URL에서 확인 가능.
// 예: https://place.map.kakao.com/8634826 -> 8634826
export const KMAP_PLACE_ID = 8634826

export const BRIDE_FULLNAME = "Hương Giang"
export const BRIDE_FIRSTNAME = "Hương Giang"
export const BRIDE_INFO = [
  {
    relation: "Cô dâu",
    name: BRIDE_FULLNAME,
    phone: "0949835540",
    account: "",
  },

]

export const GROOM_FULLNAME = "Tiến Đạt"
export const GROOM_FIRSTNAME = "Tiến Đạt"
export const GROOM_INFO = [
  {
    relation: "Chú rể",
    name: GROOM_FULLNAME,
    phone: "0966134375",
    account: "",
  },

]
