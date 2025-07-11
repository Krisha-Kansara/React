import { forwardRef,useImperativeHandle,useRef} from "react"
import  { createPortal }  from "react-dom";
 const ResultModel = forwardRef(function ResultModel({targetTime,remainingTime,onReset},ref){
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1 - remainingTime/(targetTime*1000))*100);
    
    useImperativeHandle(ref, ()=>{
        return{
        open(){
        dialog.current.showModal();
        }
        };
    })
    return createPortal(
        <dialog ref={dialog} className="result-modal" >
          {userLost && <h2>You Lost</h2>}
          {!userLost && <h2>Your Score: {score}</h2>}
            <p>The Target Time was <strong>{targetTime} Seconds.</strong> </p>
            <p>You Stopped the timer with <strong>{formattedTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )

});
export default ResultModel;