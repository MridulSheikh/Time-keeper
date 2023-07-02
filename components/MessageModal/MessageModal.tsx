import { Modal } from "../Modal"

export const MessageModal = ({text, setMsg} : any) =>{
    return(
      <Modal>
        <div className="bg-white p-5 rounded-md text-center">
          <h1>{text}</h1>
          <button onClick={() => setMsg(false)} className="bg-cs-black text-white px-5 rounded-md py-1 mt-4 active:opacity-70">ok</button>
        </div>
      </Modal>
    )
  }