import { useEffect, useRef, useState } from "react"
import { Button } from "../button"
import { WEDDING_ID } from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { addDoc, collection } from "firebase/firestore"
import db from "../../utils/firestore"
import {
  invitationFirstBatch,
  invitationNextBatch,
  toaster,
} from "../../utils/utils"

const RULES = {
  name: {
    maxLength: 40,
  },
  content: {
    maxLength: 3000,
  },
}

type Post = {
  createdAt: string
  name: string
  content: string
}

export const GuestBook = () => {
  const { openModal, closeModal } = useModal()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    invitationFirstBatch(WEDDING_ID)
      .then((res) => {
        if (res) {
          setPosts(res?.posts || [])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <LazyDiv className="card guestbook">
      <h2 className="english">Guest Book</h2>

      <div className="break" />

      {posts.map((post) => (
        <div key={post.createdAt} className="post">
          <div className="heading"></div>
          <div className="body">
            <div className="title">
              <div className="name">{post.name}</div>
              <div className="date">
                {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
            </div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      ))}

      <div className="break" />

      <>
        <Button
          onClick={() =>
            openModal({
              className: "write-guestbook-modal",
              closeOnClickBackground: false,
              header: (
                <div className="title-group">
                  <div className="title">Hãy viết vào sổ lưu bút</div>
                  <div className="subtitle">
                    Chúng tôi rất vui khi nhận được lời chúc từ bạn!
                  </div>
                </div>
              ),
              content: <WriteGuestBookModal />,
              footer: (
                <>
                  <Button
                    buttonStyle="style2"
                    type="submit"
                    form="guestbook-write-form"
                  >
                    Lưu lại
                  </Button>
                  <Button
                    buttonStyle="style2"
                    className="bg-light-grey-color text-dark-color"
                    onClick={closeModal}
                  >
                    Huỷ
                  </Button>
                </>
              ),
            })
          }
        >
          Viết vào sổ lưu bút
        </Button>
        <div className="break" />
      </>

      <Button
        onClick={() =>
          openModal({
            className: "all-guestbook-modal",
            closeOnClickBackground: true,
            header: <div className="title">Tất cả lưu bút</div>,
            content: <AllGuestBookModal />,
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
        }
      >
        Xem lưu bút
      </Button>
    </LazyDiv>
  )
}

const WriteGuestBookModal = () => {
  const inputRef = useRef({}) as React.RefObject<{
    name: HTMLInputElement
    content: HTMLTextAreaElement
    password: HTMLInputElement
  }>
  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="guestbook-write-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const name = inputRef.current.name.value.trim()
          const content = inputRef.current.content.value.trim()

          if (!name) {
            toaster("vui lòng nhập tên.", {type: "error"})
            return
          }
          if (name.length > RULES.name.maxLength) {
            toaster(`tên không được quá ${RULES.name.maxLength} ký tự.`, {type: "error"})
            return
          }

          if (!content) {
            toaster("vui lòng nhập nội dung.", {type: "error"})
            return
          }
          if (content.length > RULES.content.maxLength) {
            toaster(`nội dung không được quá ${RULES.content.maxLength} ký tự.`, {type: "error"})
            return
          }
          const createdAt = new Date().toISOString()
          await addDoc(collection(db, WEDDING_ID), {
            name,
            content,
            createdAt,
          })

          toaster("cảm ơn bạn đã gửi lời yêu thương đến chúng tôi!")
          closeModal()
        } catch {
          toaster("Không gửi được, vui lòng thử lại.", {type: "error"})
        } finally {
          setLoading(false)
        }
      }}
    >
      Tên
      <input
        disabled={loading}
        type="text"
        placeholder="Vui lòng nhập tên."
        className="name"
        ref={(ref) => {
          inputRef.current.name = ref as HTMLInputElement
        }}
        maxLength={RULES.name.maxLength}
      />
      Nội dung lời nhắn
      <textarea
        disabled={loading}
        placeholder="Vui lòng nhập lời chúc mừng."
        className="content"
        ref={(ref) => {
          inputRef.current.content = ref as HTMLTextAreaElement
        }}
        maxLength={RULES.content.maxLength}
      />
    </form>
  )
}

const AllGuestBookModal = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [lastKey, setLastKey] = useState("")
  const [nextPosts_loading, setNexPostsLoading] = useState(false)
  const fetchMorePosts = (key: string) => {
    if (key.length > 0) {
      setNexPostsLoading(true)
      invitationNextBatch(WEDDING_ID, key)
        .then((res) => {
          if (res) {
            setLastKey(res.lastKey)
            setPosts(posts.concat(res.posts))
            setNexPostsLoading(false)
          }
        })
        .catch((err) => {
          console.log(err)
          setNexPostsLoading(false)
        })
    }
  }
  useEffect(() => {
    invitationFirstBatch(WEDDING_ID)
      .then((res) => {
        if (res) {
          setPosts(res?.posts || [])
          setLastKey(res?.lastKey)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {posts.map((post) => (
        <div key={post.createdAt} className="post">
          <div className="body">
            <div className="title">
              <div className="name">{post.name}</div>
              <div className="date">
                {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
            </div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      ))}

      <div className="break" />

      <div className="pagination">
        {nextPosts_loading ? (
          <p>Loading..</p>
        ) : lastKey.length > 0 ? (
          <Button onClick={() => fetchMorePosts(lastKey)}>More Posts</Button>
        ) : (
          <span>You are up to date!</span>
        )}
      </div>
    </>
  )
}
