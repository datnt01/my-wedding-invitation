import { LOCATION, WEDDING_DATE } from "../../const"
import { STATIC_ONLY } from "../../env"
import { LazyDiv } from "../lazyDiv"
import { AttendanceInfo } from "./attendance"

export const Information1 = () => {
  return (
    <>
      <h2 className="english">Information</h2>
      <div className="info-card">
        <div className="label">Tiệc cưới</div>
        <div className="content">
          Giờ đón khách: {WEDDING_DATE.format("HH:mm giờ")}
          <br />
          Địa điểm: {LOCATION}
        </div>
      </div>
    </>
  )
}

export const Information = () => {
  if (STATIC_ONLY) {
    return (
      <>
        <LazyDiv className="card information">
          <Information1 />
        </LazyDiv>
        <LazyDiv className="card information">
        </LazyDiv>
      </>
    )
  }

  return (
    <LazyDiv className="card information">
      <Information1 />
      <AttendanceInfo />
    </LazyDiv>
  )
}
