import './Request.css'
import Confetti from 'react-confetti'

export const RequestSubmitted = () => {

    return <>
    <h3 className="requestsuccess">your request has been submitted!</h3>
    <Confetti
      width={1750}
      height={1750}
    />
    </>
    
}