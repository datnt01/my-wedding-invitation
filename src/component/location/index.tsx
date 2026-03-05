import { Map } from "./map"
import { LazyDiv } from "../lazyDiv"
import { LOCATION } from "../../const"
import { Information2 } from "../information"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location information">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
       <Information2/>
        
      </LazyDiv>
    </>
  )
}
