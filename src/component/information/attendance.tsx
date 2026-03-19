import { dayjs, WEDDING_DATE, WEDDING_ID } from "../../const"
import { Button } from "../button"
import { useModal } from "../modal"
import { useRef, useState } from "react"
import { SERVER_URL } from "../../env"
import { addDoc, collection } from "firebase/firestore"
import db from "../../utils/firestore"
import { toaster } from "../../utils/utils"

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
  const { openModal } = useModal()
  const now = useRef(dayjs())

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
          const name = inputRef.current.name.value
          const meal = inputRef.current.meal.yes.checked
            ? "yes"
            : inputRef.current.meal.no.checked
              ? "no"
              : null

          if (!name) {
            toaster("Vui lòng nhập tên của bạn.", { type: "error" })
            return
          }
          if (name.length > RULES.name.maxLength) {
            toaster(
              `tên của bạn phải ngắn hơn ${RULES.name.maxLength} ký tự.`,
              { type: "error" },
            )
            return
          }

          if (!meal) {
            toaster("Vui lòng xác nhận tham dự.", { type: "error" })
            return
          }
          let id = localStorage.getItem("browser_id")
          if (id) {
            toaster("Bạn đã xác nhận tham dự rồi, cảm ơn bạn rất nhiều!", {
              type: "success",
            })
          }
          if (!id) {
            id = crypto.randomUUID()
            localStorage.setItem("browser_id", id)
            const createdAt = new Date().toISOString()
            await addDoc(collection(db, WEDDING_ID + "_attendance"), {
              name,
              meal,
              createdAt,
            })

            toaster("Đã gửi xác nhận tham dự.")
          }
          closeModal()
        } catch {
          toaster("Gửi không thành công.", { type: "error" })
        } finally {
          setLoading(false)
        }
      }}
    >
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
          <div>
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
            </label>
            <span>Có, tôi sẽ tham dự</span>
          </div>
          <div>
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
            </label>
            <span>Tôi bận</span>
          </div>
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
