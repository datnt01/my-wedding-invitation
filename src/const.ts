import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2024-08-24 13:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

// 예식 당월 휴무일. 켈린더에 표시하기 위함.
// 예: 예식일 8월 -> 8월 15일 광복절
export const HOLIDAYS = [15]

export const LOCATION = "서울대학교 연구공원 웨딩홀"
export const LOCATION_ADDRESS = "서울시 관악구 관악로 1, 연구공원 본관 1층"

// 카카오톡 공유 시 위치 정보로 사용할 주소.
// LOCATION 과 동일하게 설정해도 무방하나, 필요에 따라 좀 더 상세히 작성 가능.
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
export const BRIDE_TITLE = "Mrs"
export const BRIDE_FATHER = "Nguyễn Trấn"
export const BRIDE_MOTHER = "Nguyễn Thị Thoa"
export const BRIDE_INFO = [
  {
    relation: "Cô dâu",
    name: BRIDE_FULLNAME,
    phone: "0949835540",
    account: "",
  },
  {
    relation: "Bố của cô dâu",
    name: BRIDE_FATHER,
    phone: "",
    account: "",
  },
  {
    relation: "Mẹ của cô dâu",
    name: BRIDE_MOTHER,
    phone: "",
    account: "",
  },
]

export const GROOM_FULLNAME = "Tiến Đạt"
export const GROOM_FIRSTNAME = "Tiến Đạt"
export const GROOM_TITLE = "Mr"
export const GROOM_FATHER = "Ngô Kim Đức"
export const GROOM_MOTHER = "Tô Thị Minh Loan"
export const GROOM_INFO = [
  {
    relation: "Chú rể",
    name: GROOM_FULLNAME,
    phone: "0966134375",
    account: "",
  },
  {
    relation: "Bố của chú rể",
    name: GROOM_FATHER,
    phone: "",
    account: "",
  },
  {
    relation: "Mẹ của chú rể",
    name: GROOM_MOTHER,
    phone: "",
    account: "",
  },
]
