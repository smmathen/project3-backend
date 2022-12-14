import { useRouter } from "next/router";

const STORAGE_KEY = "@user";
const STORAGE_PINKEY = "@pin";
const ORDER_LIST_KEY = "@orderList";
const TOTAL_PRICE_KEY = "@totalPrice";
/**
 * @swagger
 * Logout:
 *   put:
 *     description: Logs out a user currently logged in
 *     summary: Displays as a logout button for the manager or server
 */
export default function Logout() {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_PINKEY);
        localStorage.removeItem(ORDER_LIST_KEY);
        localStorage.removeItem(TOTAL_PRICE_KEY);
        router.push("/auth");
    }
    return (
        <>
            <button onClick={logout} >Log out</button>
            <style jsx>{`
                button {
                    height: 50px;
                    margin-top: 5vh;
                    border-radius: 10px;
                    border: none;
                    background-color: red;
                    color: white;
                    font-size: 20px;
                    font-weight: 500;
                    cursor: pointer;
                }
            
            `}
            </style>
        </>
    )
}