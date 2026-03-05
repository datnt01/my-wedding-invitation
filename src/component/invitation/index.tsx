import { Fragment } from "react/jsx-runtime"
import {
  BRIDE_FULLNAME,
  BRIDE_INFO,
  GROOM_FULLNAME,
  GROOM_INFO,
} from "../../const"
import { useModal } from "../modal"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"

export const Invitation = () => {
  const { openModal, closeModal } = useModal()
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Invitation</h2>

      <div className="break" />

      <div className="content">Thời gian trôi tình yêu đong đầy.</div>
      <div className="content">Chúng mình trân trọng kính mời bạn đến dự lễ cưới.</div>
      <div className="content">Cùng chứng kiến lời thề nguyện và sẻ chia khoảng khắc hạnh phúc.</div>
      <div className="content">Sự hiện diện của bạn sẽ làm ngày đặc biệt này thêm rạng ngời</div>
   
      <div className="break" />

      <div className="name">
        {GROOM_FULLNAME}
      </div>
      <div className="name">
        {BRIDE_FULLNAME}
      </div>

      <div className="break" />

      <Button
        onClick={() => {
          openModal({
            className: "contact-modal",
            closeOnClickBackground: true,
            header: (
              <div className="title-group">
                <div className="title">Gửi lời chúc mừng</div>
                <div className="subtitle">
                  Hãy gửi lời chúc mừng của bạn qua điện thoại hoặc tin nhắn.
                </div>
              </div>
            ),
            content: (
              <>
                <div className="contact-info">
                  {GROOM_INFO.filter(({ phone }) => !!phone).map(
                    ({ relation, name, phone }) => (
                      <Fragment key={relation}>
                        <div className="relation">{relation}</div>
                        <div>{name}</div>
                        <div>
                          <PhoneIcon
                            className="flip icon"
                            onClick={() => {
                              window.open(`tel:${phone}`, "_self")
                            }}
                          />
                          <EnvelopeIcon
                            className="icon"
                            onClick={() => {
                              window.open(`sms:${phone}`, "_self")
                            }}
                          />
                        </div>
                      </Fragment>
                    ),
                  )}
                </div>
                <div className="contact-info">
                  {BRIDE_INFO.filter(({ phone }) => !!phone).map(
                    ({ relation, name, phone }) => (
                      <Fragment key={relation}>
                        <div className="relation">{relation}</div>
                        <div>{name}</div>
                        <div>
                          <PhoneIcon
                            className="flip icon"
                            onClick={() => {
                              window.open(`tel:${phone}`, "_self")
                            }}
                          />
                          <EnvelopeIcon
                            className="icon"
                            onClick={() => {
                              window.open(`sms:${phone}`, "_self")
                            }}
                          />
                        </div>
                      </Fragment>
                    ),
                  )}
                </div>
              </>
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
        Liên hệ với chúng tôi
      </Button>
    </LazyDiv>
  )
}
