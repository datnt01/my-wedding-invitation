import { GMap } from "./map"
import { LazyDiv } from "../lazyDiv"
import { BRIDE_INFO, GROOM_INFO, LOCATION, WEDDING_HALL_POSITION } from "../../const"
import prizeImage from "../../images/prize.png"
import { Button } from "../button"
import { useModal } from "../modal"
import groomQR from "../../images/groom-qr.png"
import brideQR from "../../images/bride-qr.png"
import weddingCar from "../../images/wedding-car.png"
import "./index.scss"
export const Information2 = () => {
  const { openModal, closeModal } = useModal()
  return (
    <>
      <div className="info-card">
        <div className="label">Quà mừng</div>
        <div className="content">
          <img className="prize" src={prizeImage} alt="prize" />
        </div>
        <br />
        <Button
          onClick={() => {
            openModal({
              className: "contact-modal qr-modal",
              closeOnClickBackground: true,
              header: (
                <div className="title-group">
                  <div className="title">Hộp quà yêu thương</div>
                  <div className="subtitle">
                    Quét QR code để gửi yêu thương trực tiếp đến:
                  </div>
                </div>
              ),
              content: (
                <div className="contact-container">
                  <div className="contact-info">
                    <div className="relation">{BRIDE_INFO[0].relation}</div>
                    <div className="info-card">
                      <div className="qr-code">
                        <img src={brideQR} alt="QR code" />
                      </div>
                      <div className="name">{BRIDE_INFO[0].name}</div>
                      <div className="bank-name">{BRIDE_INFO[0].bankName}</div>
                      <div className="bank-account">
                        {BRIDE_INFO[0].bankAccount}
                      </div>
                    </div>
                  </div>
                  <div className="contact-info groom-info">
                    <div className="relation">{GROOM_INFO[0].relation}</div>
                    <div className="info-card">
                      <div className="qr-code">
                        <img src={groomQR} alt="QR code" />
                      </div>
                      <div className="name">{GROOM_INFO[0].name}</div>
                      <div className="bank-name">{GROOM_INFO[0].bankName}</div>
                      <div className="bank-account">
                        {GROOM_INFO[0].bankAccount}
                      </div>
                    </div>
                  </div>
                </div>
              ),
              footer: (
                <Button
                  buttonStyle="style2"
                  className="bg-light-grey-color text-dark-color"
                  onClick={closeModal}
                >
                  Đóng
                </Button>
              ),
            })
          }}
        >
          Click để mở
        </Button>
      </div>
    </>
  )
}
const openGoogleMaps = () => {
  // 21.293139, 105.443360
  const url = `https://maps.google.com?q=${WEDDING_HALL_POSITION.lat},${WEDDING_HALL_POSITION.long}`;
  window.open(url, '_blank');
};
export const Location = () => {
  return (
    <>
      <LazyDiv className="card location information">
        <h2 className="english">Location</h2>
        <div className="addr">{LOCATION}</div>
        <div className="wedding-car-container">
          <img className="wedding-car" src={weddingCar} alt="wedding car" width={60} />
        </div>
        <Button onClick={openGoogleMaps}>chỉ đường</Button>
      </LazyDiv>
      <LazyDiv className="card location">
        <Information2 />
      </LazyDiv>
    </>
  )
}
