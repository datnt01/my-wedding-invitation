import { toast } from "react-toastify";
import { query, collection, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import db from "./firestore";


export function toaster(message, options = {}) {
    toast(message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        ...options
    });
}



const limtit = 4;
    /**
     * this function will be fired when the app is first time run,
     * and it will fetch first 5 posts, here i retrieve them in desc order,
     * until show last added post first.
     */
    export async function invitationFirstBatch(collectionStr) {
        try {
            const q = query(
                collection(db, collectionStr),
                orderBy("createdAt", "desc"),
                limit(limtit))

            let posts = [];
            let lastKey = "";
            const data = await getDocs(q);

            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    name: doc.data().name,
                    content: doc.data().content,
                    creatAt: doc.data().creatAt,
                });
                lastKey = doc.data().createdAt;
            });

            return { posts, lastKey };
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * this function will be fired each time the user click on 'More invitation' button,
     * it receive key of last post in previous batch, then fetch next 5 invitation
     * starting after last fetched post.  
     */
    export async function invitationNextBatch(collectionStr, key){
        try {
            const q = query(
                collection(db, collectionStr),
                orderBy("createdAt", "desc"),
                startAfter(key),
                limit(limtit)
            )
            const data = await getDocs(q);
            let posts = [];
            let lastKey = "";
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    name: doc.data().name,
                    content: doc.data().content,
                    creatAt: doc.data().creatAt,
                });
                lastKey = doc.data().createdAt;
            });
            return { posts, lastKey };
        } catch (e) {
            console.log(e);
        }
    }
