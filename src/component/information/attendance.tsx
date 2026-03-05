import {
  BRIDE_FULLNAME,
  dayjs,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { Button } from "../button"
import { useModal } from "../modal"
import { useEffect, useRef, useState } from "react"
import HeartIcon from "../../icons/heart-icon.svg?react"
import CalendarIcon from "../../icons/calendar-icon.svg?react"
import MarkerIcon from "../../icons/marker-icon.svg?react"
import { SERVER_URL } from "../../env"

const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

export const AttendanceInfo = () => {
  const { openModal, closeModal } = useModal()

  const initialized = useRef(false)

  const now = useRef(dayjs())

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return

    openModal({
      className: "attendance-info-modal",
      header: <div className="title">Xác nhận tham dự</div>,
      content: (
        <>
          <div className="info-message">
            Xin vui lòng xác nhận trước với chúng mình để chúng mình có thể sắp
            xếp chỗ ngồi được chu đáo hơn.
            <br />
            Ngày vui chủ yếu là ăn uống vui vẻ, hôm đó có thể bận rộn không kịp
            chăm sóc chu đáo hết mọi người, mong được thông cảm. Hẹn gặp bạn tại
            đám cưới nhé~
          </div>
          <div className="wedding-info">
            <HeartIcon /> {GROOM_FULLNAME} & {BRIDE_FULLNAME}
            <br />
            <CalendarIcon /> {WEDDING_DATE.format(WEDDING_DATE_FORMAT)}
            <br />
            <MarkerIcon /> {LOCATION}
          </div>
        </>
      ),
      footer: (
        <>
          <Button
            buttonStyle="style2"
            onClick={() => {
              closeModal()
              openModal(attendanceModalInfo)
            }}
          >
            Xác nhận tham dự
          </Button>
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={closeModal}
          >
            Đóng
          </Button>
        </>
      ),
    })
  }, [openModal, closeModal])

  if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return null

  return (
    <div className="info-card">
      <div className="label">Xác nhận tham dự</div>
      <div className="content">
      <div className="break" />
        Hãy thông báo cho cô dâu và chú rể về ý định tham dự của bạn.
      </div>


      <Button
        style={{ width: "100%" }}
        onClick={() => {
          openModal(attendanceModalInfo)
        }}
      >
        Xác nhận tham dự
      </Button>
    </div>
  )
}

const AttendanceModalContent = () => {
  const { closeModal } = useModal()
  const inputRef = useRef({ side: {}, meal: {} }) as React.RefObject<{
    side: {
      groom: HTMLInputElement
      bride: HTMLInputElement
    }
    name: HTMLInputElement
    meal: {
      yes: HTMLInputElement
      undecided: HTMLInputElement
      no: HTMLInputElement
    }
    count: HTMLInputElement
  }>
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="attendance-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const side = inputRef.current.side.groom.checked
            ? "groom"
            : inputRef.current.side.bride
              ? "bride"
              : null
          const name = inputRef.current.name.value
          const meal = inputRef.current.meal.yes.checked
            ? "yes"
            : inputRef.current.meal.undecided.checked
              ? "undecided"
              : inputRef.current.meal.no.checked
                ? "no"
                : null
          const count = Number(inputRef.current.count.value)

          if (!side) {
            alert("Vui lòng chọn bên phía cô dâu hoặc chú rể.")
            return
          }

          if (!name) {
            alert("Vui lòng nhập tên của bạn.")
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(`tên của bạn phải ngắn hơn ${RULES.name.maxLength} ký tự.`)
            return
          }

          if (!meal) {
            alert("Vui lòng xác nhận tham dự.")
            return
          }

          if (isNaN(count)) {
            alert("Số lượng người tham dự phải là một số.")
            return
          }
          if (count < RULES.count.min) {
            alert(
              `Số lượng người tham dự phải từ ${RULES.count.min} người trở lên.`,
            )
            return
          }

          const res = await fetch(`${SERVER_URL}/attendance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ side, name, meal, count }),
          })
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert("Đã gửi xác nhận tham dự.")
          closeModal()
        } catch {
          alert("Gửi không thành công.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="input-group">
        <div className="label">Bạn tham dự bên phía cô dâu hay chú rể ?</div>
        <div className="select-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="groom"
              hidden
              defaultChecked
              ref={(ref) => {
                inputRef.current.side.groom = ref as HTMLInputElement
              }}
            />
            <span>Chú rể</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="bride"
              hidden
              ref={(ref) => {
                inputRef.current.side.bride = ref as HTMLInputElement
              }}
            />
            <span>Cô dâu</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">Tên</div>
        <div className="input">
          <input
            disabled={loading}
            type="text"
            placeholder="tên của bạn là gì?"
            maxLength={RULES.name.maxLength}
            ref={(ref) => {
              inputRef.current.name = ref as HTMLInputElement
            }}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="label">Xác nhận tham dự</div>
        <div className="radio-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="yes"
              ref={(ref) => {
                inputRef.current.meal.yes = ref as HTMLInputElement
              }}
            />
            <span>Có, tôi sẽ tham dự</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="undecided"
              ref={(ref) => {
                inputRef.current.meal.undecided = ref as HTMLInputElement
              }}
            />
            <span>Tôi chưa chắc có thể tham dự được</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="no"
              ref={(ref) => {
                inputRef.current.meal.no = ref as HTMLInputElement
              }}
            />
            <span>Tôi bận, rất tiếc không thể tham dự</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">Số lượng người tham dự</div>
        <div>
          <input
            disabled={loading}
            type="number"
            min={RULES.count.min}
            defaultValue={RULES.count.default}
            ref={(ref) => {
              inputRef.current.count = ref as HTMLInputElement
            }}
          />
        </div>
      </div>
    </form>
  )
}
const AttendanceModalFooter = () => {
  const { closeModal } = useModal()
  return (
    <>
      <Button buttonStyle="style2" type="submit" form="attendance-form">
        Xác nhận tham dự
      </Button>
      <Button
        buttonStyle="style2"
        className="bg-light-grey-color text-dark-color"
        onClick={closeModal}
      >
        Đóng
      </Button>
    </>
  )
}

const attendanceModalInfo = {
  className: "attendance-modal",
  header: <div className="title">Xác nhận tham dự</div>,
  content: <AttendanceModalContent />,
  footer: <AttendanceModalFooter />,
}
