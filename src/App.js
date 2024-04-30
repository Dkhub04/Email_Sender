import ReactDOM from "react-dom/client";
import EmailSender from "./Components/EmailSender.js";
import { Toaster } from "react-hot-toast";

const Applayout = () => {

    return (
        <div className="app bg-gray-300 dark:bg-gray-900 ">
            <EmailSender />
            <Toaster/>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Applayout />);